import React from 'react';

export class Azure extends React.Component {
    static defaultProps = {
        updatePassword: () => { }
    }

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        return (
            <React.Fragment>
                <div
                    style={{
                        backgroundColor: '#000',
                        height: 45
                    }}
                >
                    <div
                        style={{
                            padding: 10,
                            width: 150
                        }}
                    >
                        <a aria-label="Microsoft Azure" href="https://azure.microsoft.com/en-us/" data-event="global-navigation-header-clicked-msazurelogo" data-bi-id="global-navigation-header-clicked-msazurelogo" data-bi-an="header" data-bi-tn="undefined">
                            <svg xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" viewBox="0 0 506 72" data-slug-id="msazure-logo">
                                <path clipRule="evenodd" fill="white" fillRule="evenodd" transform="translate(350.999 14.3985)" d="M 20.244 8.014 L 13.857 26.209 H 26.811 L 20.455 8.014 H 20.244 Z M 24.702 0 L 40.97 43.201 H 32.716 L 28.89 32.476 H 11.869 L 8.194 43.201 H 0 L 16.267 0 H 24.702 Z" />
                                <path clipRule="evenodd" fill="white" fillRule="evenodd" transform="translate(394.539 26.6293)" d="M 1.145 0 H 25.878 V 2.923 L 9.64 25.186 H 25.968 V 30.97 H 0 V 27.505 L 15.997 5.784 H 1.145 V 0 Z" />
                                <path clipRule="evenodd" fill="white" fillRule="evenodd" transform="translate(424.786 26.6293)" d="M 27.806 0 V 30.97 H 20.455 V 26.902 H 20.335 C 19.371 28.309 18.08 29.408 16.464 30.201 C 14.847 30.994 13.035 31.392 11.027 31.392 C 7.431 31.392 4.695 30.372 2.817 28.333 C 0.939 26.295 0 23.127 0 18.829 V 0 H 7.381 V 17.955 C 7.381 20.566 7.898 22.529 8.933 23.845 C 9.967 25.16 11.528 25.818 13.618 25.818 C 15.686 25.818 17.342 25.09 18.588 23.634 C 19.833 22.178 20.455 20.274 20.455 17.925 V 0 H 27.806 Z" />
                                <path clipRule="evenodd" fill="white" fillRule="evenodd" transform="translate(458.27 26.1176)" d="M 15.274 0 C 15.856 0 16.378 0.04 16.84 0.12 C 17.302 0.201 17.694 0.301 18.015 0.422 V 7.803 C 17.633 7.521 17.076 7.256 16.343 7.004 C 15.61 6.753 14.721 6.628 13.677 6.628 C 11.889 6.628 10.378 7.381 9.143 8.887 C 7.908 10.394 7.291 12.713 7.291 15.846 V 31.481 H 0 V 0.512 H 7.291 V 5.393 H 7.411 C 8.074 3.705 9.078 2.385 10.423 1.431 C 11.769 0.478 13.385 0 15.274 0 Z" />
                                <path clipRule="evenodd" fill="white" fillRule="evenodd" transform="translate(476.741 25.9979)" d="M 21.238 12.983 C 21.238 10.573 20.68 8.736 19.566 7.47 C 18.451 6.205 16.88 5.573 14.851 5.573 C 13.104 5.573 11.538 6.201 10.152 7.456 C 8.76601 8.711 7.84201 10.553 7.38101 12.983 H 21.238 Z M 25.908 23.798 V 29.794 C 24.703 30.557 23.126 31.174 21.177 31.646 C 19.229 32.118 17.151 32.354 14.942 32.354 C 10.221 32.354 6.551 30.959 3.93 28.167 C 1.31 25.376 0 21.489 0 16.508 C 0 11.709 1.4 7.756 4.202 4.654 C 7.004 1.55 10.553 0 14.851 0 C 19.13 0 22.458 1.309 24.838 3.93 C 27.217 6.551 28.408 10.171 28.408 14.791 V 18.316 H 7.2 C 7.52 21.429 8.52 23.602 10.197 24.837 C 11.874 26.073 14.038 26.69 16.689 26.69 C 18.436 26.69 20.103 26.424 21.69 25.892 C 23.276 25.36 24.682 24.662 25.908 23.798 Z" />
                                <path clipRule="evenodd" fill="white" fillRule="evenodd" transform="translate(93.5977 11.2052)" d="M 229.35 21.39 H 218.492 V 46.394 H 211.112 V 21.39 H 205.93 V 15.425 H 211.112 V 11.117 C 211.112 7.863 212.17 5.197 214.29 3.119 C 216.408 1.039 219.124 0 222.438 0 C 223.322 0 224.105 0.045 224.788 0.136 C 225.471 0.227 226.074 0.362 226.596 0.542 V 6.839 C 226.354 6.699 225.933 6.528 225.33 6.327 C 224.728 6.126 224.035 6.026 223.252 6.026 C 221.725 6.026 220.551 6.502 219.727 7.456 C 218.903 8.411 218.492 9.822 218.492 11.689 V 15.425 H 229.35 V 8.465 L 236.67 6.237 V 15.425 H 244.052 V 21.39 H 236.67 V 35.879 C 236.67 37.788 237.017 39.134 237.71 39.916 C 238.403 40.7 239.492 41.091 240.978 41.091 C 241.4 41.091 241.907 40.992 242.5 40.79 C 243.092 40.59 243.609 40.349 244.052 40.068 V 46.092 C 243.589 46.354 242.821 46.594 241.746 46.816 C 240.672 47.036 239.613 47.147 238.568 47.147 C 235.495 47.147 233.191 46.329 231.655 44.692 C 230.118 43.055 229.35 40.59 229.35 37.295 V 21.39 Z M 180.943 31.12 C 180.943 34.354 181.676 36.824 183.142 38.532 C 184.607 40.239 186.706 41.091 189.438 41.091 C 192.089 41.091 194.108 40.239 195.493 38.532 C 196.879 36.824 197.572 34.293 197.572 30.939 C 197.572 27.606 196.854 25.09 195.418 23.393 C 193.982 21.696 191.968 20.848 189.378 20.848 C 186.706 20.848 184.633 21.736 183.157 23.514 C 181.68 25.29 180.943 27.827 180.943 31.12 Z M 173.351 31.361 C 173.351 26.24 174.797 22.183 177.689 19.19 C 180.581 16.198 184.598 14.702 189.739 14.702 C 194.579 14.702 198.36 16.143 201.082 19.025 C 203.803 21.908 205.163 25.798 205.163 30.699 C 205.163 35.72 203.717 39.716 200.826 42.688 C 197.933 45.661 193.997 47.147 189.016 47.147 C 184.216 47.147 180.405 45.737 177.584 42.914 C 174.762 40.093 173.351 36.242 173.351 31.361 Z M 156.933 23.559 C 156.933 24.603 157.265 25.421 157.928 26.014 C 158.59 26.606 160.056 27.354 162.326 28.258 C 165.238 29.423 167.282 30.734 168.456 32.19 C 169.631 33.646 170.219 35.408 170.219 37.477 C 170.219 40.389 169.099 42.729 166.86 44.495 C 164.62 46.264 161.593 47.147 157.777 47.147 C 156.492 47.147 155.07 46.992 153.514 46.68 C 151.957 46.369 150.637 45.972 149.552 45.49 V 38.321 C 150.878 39.244 152.304 39.977 153.83 40.519 C 155.357 41.062 156.742 41.333 157.988 41.333 C 159.634 41.333 160.85 41.102 161.633 40.64 C 162.416 40.178 162.808 39.405 162.808 38.321 C 162.808 37.316 162.401 36.467 161.588 35.775 C 160.775 35.081 159.233 34.283 156.963 33.379 C 154.272 32.255 152.365 30.99 151.24 29.584 C 150.115 28.178 149.552 26.391 149.552 24.221 C 149.552 21.43 150.662 19.135 152.881 17.337 C 155.1 15.54 157.978 14.642 161.513 14.642 C 162.597 14.642 163.812 14.762 165.158 15.002 C 166.503 15.244 167.628 15.556 168.532 15.937 V 22.866 C 167.568 22.223 166.443 21.671 165.158 21.208 C 163.872 20.746 162.597 20.516 161.332 20.516 C 159.946 20.516 158.866 20.787 158.093 21.329 C 157.32 21.871 156.933 22.615 156.933 23.559 Z M 121.868 31.12 C 121.868 34.354 122.6 36.824 124.067 38.532 C 125.533 40.239 127.632 41.091 130.363 41.091 C 133.015 41.091 135.033 40.239 136.418 38.532 C 137.804 36.824 138.497 34.293 138.497 30.939 C 138.497 27.606 137.779 25.09 136.343 23.393 C 134.907 21.696 132.893 20.848 130.303 20.848 C 127.632 20.848 125.558 21.736 124.082 23.514 C 122.605 25.29 121.868 27.827 121.868 31.12 Z M 114.276 31.361 C 114.276 26.24 115.722 22.183 118.614 19.19 C 121.506 16.198 125.523 14.702 130.664 14.702 C 135.505 14.702 139.285 16.143 142.007 19.025 C 144.728 21.908 146.089 25.798 146.089 30.699 C 146.089 35.72 144.642 39.716 141.751 42.688 C 138.859 45.661 134.922 47.147 129.941 47.147 C 125.141 47.147 121.33 45.737 118.509 42.914 C 115.687 40.093 114.276 36.242 114.276 31.361 Z M 111.14 14.912 C 111.722 14.912 112.245 14.953 112.706 15.034 C 113.168 15.114 113.56 15.213 113.882 15.334 V 22.715 C 113.5 22.434 112.942 22.168 112.21 21.917 C 111.476 21.665 110.587 21.54 109.544 21.54 C 107.756 21.54 106.245 22.293 105.01 23.799 C 103.775 25.306 103.157 27.625 103.157 30.758 V 46.394 H 95.866 V 15.425 H 103.157 V 20.305 H 103.277 C 103.94 18.618 104.944 17.298 106.29 16.343 C 107.635 15.39 109.252 14.912 111.14 14.912 Z M 83.184 41.091 C 84.268 41.091 85.463 40.841 86.768 40.339 C 88.074 39.836 89.279 39.174 90.384 38.35 V 45.128 C 89.219 45.791 87.898 46.293 86.422 46.634 C 84.947 46.976 83.324 47.147 81.557 47.147 C 76.997 47.147 73.292 45.706 70.441 42.824 C 67.588 39.942 66.163 36.262 66.163 31.784 C 66.163 26.802 67.619 22.701 70.531 19.476 C 73.443 16.253 77.57 14.642 82.913 14.642 C 84.279 14.642 85.659 14.818 87.055 15.169 C 88.451 15.52 89.56 15.926 90.384 16.388 V 23.378 C 89.259 22.554 88.109 21.917 86.934 21.464 C 85.76 21.013 84.559 20.787 83.334 20.787 C 80.462 20.787 78.143 21.721 76.375 23.589 C 74.608 25.456 73.724 27.977 73.724 31.15 C 73.724 34.283 74.572 36.724 76.27 38.471 C 77.967 40.218 80.272 41.091 83.184 41.091 Z M 53.781 46.394 H 61.071 V 15.425 H 53.781 V 46.394 Z M 53.028 6.478 C 53.028 5.273 53.465 4.263 54.339 3.45 C 55.212 2.636 56.251 2.23 57.456 2.23 C 58.741 2.23 59.807 2.647 60.65 3.48 C 61.494 4.313 61.915 5.313 61.915 6.478 C 61.915 7.662 61.483 8.657 60.62 9.459 C 59.756 10.263 58.702 10.664 57.456 10.664 C 56.211 10.664 55.162 10.258 54.309 9.445 C 53.454 8.631 53.028 7.642 53.028 6.478 Z M 46.755 3.194 V 46.394 H 39.254 V 12.533 H 39.133 L 25.727 46.394 H 20.757 L 7.019 12.533 H 6.929 V 46.394 H 0 V 3.194 H 10.755 L 23.167 35.217 H 23.347 L 36.452 3.194 H 46.755 Z" />
                                <path clipRule="evenodd" fill="#f25022" fillRule="evenodd" transform="translate(0.00499725 0.00601196)" d="M 0 34.219 H 34.219 V 0 H 0 V 34.219 Z" />
                                <path clipRule="evenodd" fill="#7fba00" fillRule="evenodd" transform="translate(37.779)" d="M 0 34.219 H 34.219 V 0 H 0 V 34.219 Z" />
                                <path clipRule="evenodd" fill="#00a4ef" fillRule="evenodd" transform="translate(0 37.779)" d="M 0 34.219 H 34.219 V 0 H 0 V 34.219 Z" />
                                <path clipRule="evenodd" fill="#ffb900" fillRule="evenodd" transform="translate(37.779 37.779)" d="M 0 34.219 H 34.219 V 0 H 0 V 34.219 Z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}