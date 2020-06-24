import React from 'react';

export class Edit extends React.Component {
    static defaultProps = {
        border: '2px solid #ee82ee',
        width: 300,
        height: 300,
        aggregator: {
            lines: [],
            zones: []
        },
        fps: 30
    }
    constructor(props) {
        super(props);
        this.state = {
            aggregator: JSON.parse(JSON.stringify(this.props.aggregator)),
            selectedZoneIndex: 0,
            selectedPointIndex: -1,
            selectedPointRadius: 0.025
        };

        this.canvasRef = React.createRef();
        this.mousePos = { x: 0, y: 0 }
        this.mouseInside = false;
        this.dragging = false;
    }

    componentDidMount() {
        setInterval(() => {
            this.draw();
        }, 1000/this.props.fps);
    }

    componentDidUpdate() {
        // this.setState({
        //     aggregator: JSON.parse(JSON.stringify(this.props.aggregator))
        // })
    }

    render() {
        return (
            <React.Fragment>
                <div style={{
                    margin: 10,
                    textAlign: 'center',
                    border: this.props.border,
                    width: this.props.width,
                    height: this.props.height
                }}>
                    <canvas
                        ref={this.canvasRef}
                        width={this.props.width}
                        height={this.props.height}
                        tabIndex={1}
                        onKeyUp={this.handleKeyUp}
                        onClick={this.addPoint}
                        onMouseDown={(e) => this.dragging = true}
                        onMouseUp={(e) => this.dragging = false}
                        onMouseMove={(e) => { this.updateMousePos(e); this.movePoint(e); }}
                        onMouseOver={this.handleMouseOver}
                        onMouseOut={this.handleMouseOut}
                    />
                    {
                        this.state.aggregator.zones.map((zone, index) => {
                            return (
                                <div
                                    key={index}
                                    style={index === this.state.selectedZoneIndex ? {
                                        cursor: 'pointer',
                                        backgroundColor: '#ee82ee',
                                        color: 'white'
                                    } : {
                                            cursor: 'pointer',
                                            color: '#ee82ee'
                                        }}
                                    onClick={(e) => {
                                        this.setState({
                                            selectedZoneIndex: index,
                                            selectedPointIndex: -1
                                        })
                                    }}>
                                        {zone.name}
                                        {zone.threshold}
                                </div>
                            )
                        })
                    }
                </div>
            </React.Fragment>
        );
    }

    updateMousePos = (e) => {
        this.mousePos = { x: e.clientX, y: e.clientY };
    }

    handleMouseOver = (e) => {
        this.dragging = false;
        this.mouseInside = true;
        this.setState({
            selectedPointIndex: -1
        });
    }

    handleMouseOut = (e) => {
        this.dragging = false;
        this.mouseInside = false;
        this.setState({
            selectedPointIndex: -1
        });
        this.props.updateAggregator(this.state.aggregator);
    }

    handleKeyUp = (e) => {
        if (e.keyCode === 45) {
            this.insertPoint();
        } else if (e.keyCode === 46) {
            this.removePoint();
        }
    }

    addPoint = (e) => {
        if (this.canvasRef.current && this.state.selectedPointIndex === -1) {
            const rect = this.canvasRef.current?.getBoundingClientRect();
            const x = this.clamp((e.clientX - rect.left) / this.props.width, 0, 1);
            const y = this.clamp((e.clientY - rect.top) / this.props.height, 0, 1);
            this.state.aggregator.zones[this.state.selectedZoneIndex].polygon.push([x, y]);
        }
    }

    insertPoint = () => {
        if (
            this.canvasRef.current &&
            this.state.selectedZoneIndex !== -1 &&
            this.state.selectedPointIndex !== -1 &&
            this.state.aggregator.zones[this.state.selectedZoneIndex].polygon.length > 1
        ) {
            const point = this.state.aggregator.zones[this.state.selectedZoneIndex].polygon[this.state.selectedPointIndex];

            this.state.aggregator.zones[this.state.selectedZoneIndex].polygon.splice(this.state.selectedPointIndex, 0, [point[0], point[1]]);

            this.setState({
                selectedPointIndex: -1
            });
        }
    }

    movePoint = (e) => {
        if (
            this.dragging &&
            this.canvasRef.current &&
            this.state.selectedZoneIndex !== -1 &&
            this.state.selectedPointIndex !== -1 &&
            this.state.aggregator.zones[this.state.selectedZoneIndex].polygon.length > this.state.selectedPointIndex
        ) {
            const rect = this.canvasRef.current?.getBoundingClientRect();
            const x = this.clamp((e.clientX - rect.left) / this.props.width, 0, 1);
            const y = this.clamp((e.clientY - rect.top) / this.props.height, 0, 1);
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.aggregator.zones[this.state.selectedZoneIndex].polygon[this.state.selectedPointIndex] = [x, y];
        }
    }

    removePoint = () => {
        if (
            this.state.selectedZoneIndex !== -1 &&
            this.state.selectedPointIndex !== -1 &&
            this.state.aggregator.zones[this.state.selectedZoneIndex].polygon.length > this.state.selectedPointIndex
        ) {
            this.state.aggregator.zones[this.state.selectedZoneIndex].polygon.splice(this.state.selectedPointIndex, 1);
            this.setState({
                selectedPointIndex: -1
            });
        }
    }

    selectPoint = () => {
        if (this.canvasRef.current && this.state.selectedZoneIndex !== -1) {
            const rect = this.canvasRef.current?.getBoundingClientRect();
            const x = this.clamp((this.mousePos.x - rect.left) / this.props.width, 0, 1);
            const y = this.clamp((this.mousePos.y - rect.top) / this.props.height, 0, 1);
            const nearestPointIndex = this.findNearestPoint({ x: x, y: y });

            if (nearestPointIndex !== this.state.selectedPointIndex) {
                this.setState({
                    selectedPointIndex: nearestPointIndex
                });
            }
        }
    }

    clamp = (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    }

    findNearestPoint = (point) => {
        let nearestPointIndex = -1;
        let nearestPointDistance = -1;
        const l = this.state.aggregator.zones[this.state.selectedZoneIndex].polygon.length;
        for (let i = 0; i < l; i++) {
            const p = this.state.aggregator.zones[this.state.selectedZoneIndex].polygon[i];
            const distance = Math.hypot(point.x - p[0], point.y - p[1]);
            if (distance <= nearestPointDistance || nearestPointDistance === -1) {
                nearestPointDistance = distance;
                nearestPointIndex = i;
            }
        }
        return nearestPointDistance < this.state.selectedPointRadius ? nearestPointIndex : -1;
    }

    draw = () => {
        setInterval(() => {
            const canvasContext = this.canvasRef.current?.getContext("2d");
            if (canvasContext) {
                canvasContext.clearRect(0, 0, this.props.width, this.props.height);
                this.drawZones(canvasContext);
                if(this.mouseInside) {
                    this.selectPoint();
                    this.drawSelectedPoint(canvasContext);
                }
            }
        }, 1000 / this.state.fps);
    }

    drawZones = (canvasContext) => {
        canvasContext.strokeStyle = 'violet';
        canvasContext.lineWidth = 3;

        const zl = this.state.aggregator.zones.length;
        for (let z = 0; z < zl; z++) {
            const zone = this.state.aggregator.zones[z];
            const pl = zone.polygon.length;
            for (let p = 0; p < pl; p++) {
                if (p > 0) {
                    const start = {
                        x: this.props.width * zone.polygon[p - 1][0],
                        y: this.props.height * zone.polygon[p - 1][1]
                    };
                    const end = {
                        x: this.props.width * zone.polygon[p][0],
                        y: this.props.height * zone.polygon[p][1]
                    };
                    canvasContext.setLineDash([]);
                    canvasContext.beginPath();
                    canvasContext.moveTo(start.x, start.y);
                    canvasContext.lineTo(end.x, end.y);
                    canvasContext.closePath();
                    canvasContext.stroke();
                }
            }
            if (pl > 2) {
                const first = {
                    x: this.props.width * zone.polygon[0][0],
                    y: this.props.height * zone.polygon[0][1]
                };
                const last = {
                    x: this.props.width * zone.polygon[pl - 1][0],
                    y: this.props.height * zone.polygon[pl - 1][1]
                };
                if (this.state.selectedZoneIndex === z && this.mouseInside) {
                    canvasContext.setLineDash([3, 5]);
                } else {
                    canvasContext.setLineDash([]);
                }
                canvasContext.beginPath();
                canvasContext.moveTo(last.x, last.y);
                canvasContext.lineTo(first.x, first.y);
                canvasContext.closePath();
                canvasContext.stroke();
            }
            if (this.state.selectedZoneIndex === z && this.mouseInside) {
                for (let p = 0; p < pl; p++) {
                    const point = {
                        x: this.props.width * zone.polygon[p][0],
                        y: this.props.height * zone.polygon[p][1]
                    };
                    canvasContext.setLineDash([]);
                    canvasContext.beginPath();
                    canvasContext.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                    canvasContext.closePath();
                    canvasContext.stroke();
                }
            }
        }
    }

    drawSelectedPoint = (canvasContext) => {
        if (this.state.selectedZoneIndex !== -1 && this.state.selectedPointIndex !== -1) {
            canvasContext.strokeStyle = 'yellow';
            canvasContext.lineWidth = 3;

            const point = {
                x: this.props.width * this.state.aggregator.zones[this.state.selectedZoneIndex].polygon[this.state.selectedPointIndex][0],
                y: this.props.height * this.state.aggregator.zones[this.state.selectedZoneIndex].polygon[this.state.selectedPointIndex][1]
            };
            canvasContext.beginPath();
            canvasContext.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            canvasContext.stroke();
        }
    }
}