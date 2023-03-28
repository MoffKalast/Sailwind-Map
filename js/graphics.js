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
			color: [90, 118, 170, 0.95],
			size: 10,
			outline: {
				// autocasts as new SimpleLineSymbol()
				color: [60, 20, 20, 0.75],
				width: 1.5
			}
		}
	};

	static greenPoint = {
		geometry: {
			type: "point",
			longitude: 0,
			latitude: 0
		},
		symbol: {
			type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
			style: "circle",
			color: [94, 175, 65, 0.95],
			size: 10,
			outline: {
				// autocasts as new SimpleLineSymbol()
				color: [20, 20, 20, 0.75],
				width: 1.5
			}
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

	static points = {
		"orangepoint": GraphicsLibrary.orangePoint,
		"bluepoint": GraphicsLibrary.bluePoint,
		"greenpoint": GraphicsLibrary.greenPoint,
		"goalpoint": GraphicsLibrary.destinationPoint
	}

	static blackLine = {
		geometry: {
			type: "polyline",
			paths: [[0, 0]]
		},
		symbol: {
			type: "simple-line",  // autocasts as SimpleLineSymbol()
			color: [0, 0, 0, 0.6],
			style: 'solid',
			width: 1,
			marker: { // autocasts from LineSymbolMarker
				style: "arrow",
				color: [0, 0, 0, 0.6],
				placement: "end"
			}
		}
	};

	static redLine = {
		geometry: {
			type: "polyline",
			paths: [[0, 0]]
		},
		symbol: {
			type: "simple-line",  // autocasts as SimpleLineSymbol()
			color: [255, 0, 0, 0.5],
			style: 'solid',
			width: 1,
			marker: { // autocasts from LineSymbolMarker
				style: "arrow",
				color: [255, 0, 0, 0.5],
				placement: "end"
			}
		}
	};

	static grayLine = {
		geometry: {
			type: "polyline",
			paths: [[0, 0]]
		},
		symbol: {
			type: "simple-line",  // autocasts as SimpleLineSymbol()
			color: [0, 0, 0, 0.4],
			style: 'dash',
			width: 1,
			marker: { // autocasts from LineSymbolMarker
				style: "arrow",
				color: [0, 0, 0, 0.4],
				placement: "end"
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

	static lines = {
		"blackline": GraphicsLibrary.blackLine,
		"grayline": GraphicsLibrary.grayLine,
		"redline": GraphicsLibrary.redLine,
		"orangeline": GraphicsLibrary.orangeLine,
		"orangedottedline": GraphicsLibrary.dottedOrangeLine
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

	//Line heading text
	static headingLabel = {
		geometry: {
			type: "point",
			longitude: 0,
			latitude: 0
		},
		symbol: {
			type: "text",
			color: "black",
			haloColor: [221, 218, 215, 1.0],
			haloSize: "2pt",
			font: {
				family: "Oregano",
				size: 12
			},
			text: "",
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

	static minicompass = {
		geometry: {
			type: "point",
			longitude: 0,
			latitude: 0
		},
		symbol: {
			type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
			url: "assets/img/downscaled_simpel_compass.png",
			width: "70pt",
			height: "70pt"
		}
	};

	static eraser = {
		geometry: {
			type: "point",
			longitude: 0,
			latitude: 0
		},
		symbol: {
			type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
			url: "assets/img/tools/eraser.svg",
			width: 20,
			height: 18
		}
	};
}