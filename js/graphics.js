class GraphicsLibrary{

    // Route graphics
    static orangePoint = {
        geometry: {
            type: "point",
            longitude: 0,
            latitude: 0
        },
        symbol: {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            style: "circle",
            color: [255, 82, 29, 0.95],
            size: 10,
            outline: {
                // autocasts as new SimpleLineSymbol()
                color: [60, 20, 20, 0.75],
                width: 1.5
            }
        },
        attributes: {
            day: null,
            time: null,
            windForce: null,
            windDir: null
        }
    };

    static bluePoint = {
        geometry: {
            type: "point",
            longitude: 0,
            latitude: 0
        },
        symbol: {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            style: "circle",
            color: [29, 82, 255, 0.95],
            size: 10,
            outline: {
                // autocasts as new SimpleLineSymbol()
                color: [60, 20, 20, 0.75],
                width: 1.5
            }
        },
        attributes: {
            day: null,
            time: null,
            windForce: null,
            windDir: null
        }
    };

    static destinationPoint = {
        geometry: {
            type: "point",
            longitude: 0,
            latitude: 0
        },
        symbol: {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            style: "x",
            color: [72, 6, 7, .75],
            outline: {
                // autocasts as new SimpleLineSymbol()
                color: [72, 6, 7, .75],
                width: 3
            }
        }
    };

    static orangeLine = {
		geometry: {
            type: "polyline",
            paths: [[0, 0]]
        },
		symbol: {
            type: "simple-line",  // autocasts as SimpleLineSymbol()
            color: [72, 6, 7, 0.75],
            style: 'dash-dot',
            width: 2
        }
	};

    static dottedOrangeLine = {
		geometry: {
            type: "polyline",
            paths: [[0, 0]]
        },
		symbol: {
            type: "simple-line",  // autocasts as SimpleLineSymbol()
            color: [225, 55, 0, .75],
            style: 'short-dot',
            width: 2
        }
	}


    //Graticule indicator numbers
    static degreeSideLabel = {
		geometry: {
			type: "point",
			longitude: 0,
			latitude: 0
		},
		symbol: {
			type: "text",
			color: "black",
			haloColor: [192, 183, 175, 0.95],
			haloSize: "4pt",
			font: {
				family: "Montserrat",
				size: 14
			},
			text: "0°",
			xoffset: 0,
			yoffset: -5,
		  }
	};

	static degreeTopLabel = {
		geometry: {
			type: "point",
			longitude: 0,
			latitude: 0
		},
		symbol: {
			type: "text",
			color: "black",
			haloColor: [192, 183, 175, 0.95],
			haloSize: "4pt",
			font: {
				family: "Montserrat",
				size: 14
			},
			text: "0°",
			xoffset: 3,
			yoffset: 0,
		  }
	};


    // Images
    static boat = {
		geometry: {
			type: "point",
			longitude: -18,
			latitude: 42
		},
		symbol: {
			type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
			url: "assets/img/boat.svg",
			width: "200px",
			height: "200px"
		  }
	};
}