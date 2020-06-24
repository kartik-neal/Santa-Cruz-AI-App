import cv2
import os
import logging
import time, math
import json
import datetime
import numpy as np
from azure.storage.blob import BlobServiceClient
import requests
import threading
from streamer.videostream import VideoStream

from messaging.iotmessenger import IoTInferenceMessenger

logging.basicConfig(format='%(asctime)s  %(levelname)-10s %(message)s', datefmt="%Y-%m-%d-%H-%M-%S",
                    level=logging.INFO)

camera_config = None
intervals_per_cam = dict()

def parse_twin(data):
    global camera_config

    logging.info(f"Retrieved updated properties: {data}")

    if "desired" in data:
      data = data["desired"]

    if "cameras" in data:
      cams = data["cameras"]
    blob = None

    # if blob is not specified we will message
    # the images to the IoT hub
    if "blob" in data:
      blob = data["blob"]

    camera_config = dict()
    camera_config["cameras"] = cams
    camera_config["blob"] = blob

    logging.info(f"config set: {camera_config}")

def module_twin_callback(client):

  while True:
    payload = client.receive_twin_desired_properties_patch()
    parse_twin(payload)

def main():
    global camera_config

    messenger = IoTInferenceMessenger()
    client = messenger.client

    twin_update_listener = threading.Thread(target=module_twin_callback, args=(client,))
    twin_update_listener.daemon = True
    twin_update_listener.start()

    blob_service_client = None

    # Should be properly asynchronous, but since we don't change things often
    # Wait for it to come back from twin update the very first time
    for i in range(20):
      if camera_config is not None:
        break
      time.sleep(1)

    if camera_config is None:
      payload = client.get_twin()
      parse_twin(payload)

    logging.info("Created camera configuration from twin")

    if camera_config["blob"] is not None:
      blob_service_client = BlobServiceClient.from_connection_string(camera_config["blob"])
      logging.info(f"Created blob service client: {blob_service_client.account_name}")

    while True:
       
      for key, cam in camera_config["cameras"].items():

        if not cam["enabled"]:
            continue
        
        if key not in intervals_per_cam:
          intervals_per_cam[key] = dict()
          intervals_per_cam[key]['rtsp'] = cam['rtsp']
          intervals_per_cam[key]['interval'] = float(cam['interval'])
          intervals_per_cam[key]['video'] = VideoStream(cam['rtsp'], cam['interval'])
          intervals_per_cam[key]['video'].start()

        curtime = time.time()
        current_source = intervals_per_cam[key]
        
        # not enough time has passed since the last collection
        if curtime - current_source['interval'] < float(cam['interval']):
            continue

        # start queuing up images on a different thread
        if current_source['rtsp'] != cam['rtsp'] or current_source['interval'] != float(cam['interval']):
          current_source['rtsp'] = cam['rtsp']
          current_source['interva']

          # stop an existing thread
          current_source['video'].cam = cam['rtsp']

        # block until we get something
        img = frame_queue.get()
    
        logging.info(f"Grabbed image from {cam['rtsp']}")

        camId = f"{cam['space']}/{key}"

        curtimename = None
        if camera_config["blob"] is not None:
            curtimename, full_cam_id = send_img_to_blob(blob_service_client, img, camId)

        if "inference" in cam and cam["inference"]:
          if "detector" not in cam:
              logging.error(f"Cannot perform inference: detector not specified for camera {key}")
          else:
              infer_and_report(messenger, full_cam_id, cam["detector"], img, curtimename)

        # message the image capture upstream
        if curtimename is not None:
          messenger.send_image(camId, curtimename)
          logging.info(f"Notified of image upload: {cam['rtsp']} to {cam['space']}")

        # update collection time for camera
        current_source['interval'] = curtime


def infer_and_report(messenger, cam_id, detector, img, curtimename):
  try:
    classes, scores, boxes, proc_time = infer(detector, img)

    report(messenger, cam_id, classes, scores,
            boxes, curtimename, proc_time)

  except Exception as e:
    logging.error(f"Exception occured during inference: {e}")


def infer(detector, img):
  im = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
  im = cv2.resize(im, (300, 300), interpolation=cv2.INTER_LINEAR)

  data = json.dumps({"img": im.tolist()})
  headers = {'Content-Type': "application/json"}
  start = time.time()
  resp = requests.post(detector, data, headers=headers)
  proc_time = time.time() - start
  resp.raise_for_status()
  result = resp.json()

  return result["classes"], result["scores"], result["bboxes"], proc_time


def report(messenger, cam, classes, scores, boxes, curtimename, proc_time):
  messenger.send_upload(cam, len(scores), curtimename, proc_time)
  time.sleep(0.01)
  messenger.send_inference(cam, classes, scores, boxes, curtimename)


def get_image_local_name(curtime):
  return os.path.abspath(curtime.strftime("%Y_%m_%d_%H_%M_%S_%f") + ".jpg")


def send_img_to_blob(blob_service_client, img, camId):

  curtime = datetime.datetime.utcnow()
  name = curtime.isoformat() + "Z"

  # used to write temporary local file
  # because that's how the SDK works.
  # the file name is used upload to blob
  local_name = get_image_local_name(curtime)
  day = curtime.strftime("%Y-%m-%d")

  blob_client = blob_service_client.get_blob_client("still-images", f"{camId}/{day}/{name}.jpg")
  cv2.imwrite(local_name, img)

  with open(local_name, "rb") as data:
    blob_client.upload_blob(data)

  os.remove(local_name)
  return name, f"{camId}/{day}"

if __name__ == "__main__":
    # remote debugging (running in the container will listen on port 5678)
    debug = False

    if debug:

        logging.info("Please attach a debugger to port 56780")

        import ptvsd
        ptvsd.enable_attach(('0.0.0.0', 56780))
        ptvsd.wait_for_attach()
        ptvsd.break_into_debugger()

    main()
