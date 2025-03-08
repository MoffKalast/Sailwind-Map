function updateThemeColors(dark_mode) {
	_currentThemeColor = dark_mode ? DarkThemeGraphics : LightThemeGraphics;
}

class DarkThemeGraphics {
	static backgroundColor = { color: [40, 40, 40] }

	static borderColor = [255, 255, 255, 0.7];

	static gridColor = [255, 255, 255, 0.5];

	static emeralWindColor = [40, 190, 40, 0.3]
	static emeralWindArrowColor = [40, 190, 40, 0.6]

	static aestrinWindColor = [150, 150, 250, 0.3]
	static aestrinWindArrowColor = [150, 150, 250, 0.6]

	static alankhWindColor = [180, 90, 30, 0.3]
	static alankhWindArrowColor = [180, 90, 30, 0.6]

	static routeDownwindColor = [178, 165, 152, 0.43];
	static routeClosehauledColor = [225, 60, 60, 0.35];
	static routeBeamreach = [120, 120, 255, 0.2];

	static bigLabelColor = "#706860";
	static bigLabelHalo = [0, 0, 0, 0.0];

	static labelColor = "black";
	static labelHalo = [221, 218, 215, 1.0];

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

	static yellowPoint = {
		geometry: {
			type: "point",
			longitude: 0,
			latitude: 0
		},
		symbol: {
			type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
			style: "circle",
			color: [255, 216, 0, 0.95],
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
			color: [200, 6, 7, .75],
			outline: {
				// autocasts as new SimpleLineSymbol()
				color: [200, 6, 7, .75],
				width: 3
			}
		}
	};

	static blackLine = {
		geometry: {
			type: "polyline",
			paths: [[0, 0]]
		},
		symbol: {
			type: "simple-line",  // autocasts as SimpleLineSymbol()
			color: [255, 255, 255, 0.6],
			style: 'solid',
			width: 1,
			marker: { // autocasts from LineSymbolMarker
				style: "arrow",
				color: [255, 255, 255, 0.6],
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
			color: [255, 30, 30, 0.5],
			style: 'solid',
			width: 1,
			marker: { // autocasts from LineSymbolMarker
				style: "arrow",
				color: [255, 30, 30, 0.5],
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
			color: [255, 255, 255, 0.4],
			style: 'dash',
			width: 1,
			marker: { // autocasts from LineSymbolMarker
				style: "arrow",
				color: [255, 255, 255, 0.4],
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
			color: [122, 6, 7, 0.75],
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

	//Graticule indicator numbers
	static degreeSideLabel = {
		geometry: {
			type: "point",
			longitude: 0,
			latitude: 0
		},
		symbol: {
			type: "text",
			color: "white",
			haloColor: [63, 72, 80, 0.95],
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
			color: "white",
			haloColor: [63, 72, 80, 0.95],
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

	static distanceLabel = {
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
				family: "Montserrat",
				size: 13
			},
			text: "",
			xoffset: 3,
			yoffset: 0,
		}
	};
}

class LightThemeGraphics {
	static backgroundColor = null;

	static borderColor = [0, 0, 0, 0.7];

	static gridColor = [0, 0, 0, 0.5];

	static emeralWindColor = [0, 150, 0, 0.3]
	static emeralWindArrowColor = [0, 150, 0, 0.6]

	static aestrinWindColor = [100, 100, 200, 0.3]
	static aestrinWindArrowColor = [100, 100, 200, 0.6]

	static alankhWindColor = [150, 60, 0, 0.3]
	static alankhWindArrowColor = [150, 60, 0, 0.6]

	static routeDownwindColor = [178, 165, 152, 0.23];
	static routeClosehauledColor = [175, 10, 10, 0.15];
	static routeBeamreach = [30, 30, 175, 0.1];

	static bigLabelColor = "#706860";
	static bigLabelHalo = [0, 0, 0, 0.0];

	static labelColor = "black";
	static labelHalo = [221, 218, 215, 1.0];

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

	static yellowPoint = {
		geometry: {
			type: "point",
			longitude: 0,
			latitude: 0
		},
		symbol: {
			type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
			style: "circle",
			color: [255, 216, 0, 0.95],
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

	static distanceLabel = {
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
				family: "Montserrat",
				size: 13
			},
			text: "",
			xoffset: 3,
			yoffset: 0,
		}
	};
}

let _currentThemeColor = LightThemeGraphics;

class GraphicsLibrary {
	static get backgroundColor() {
		return _currentThemeColor.backgroundColor;
	}

	static get borderColor() {
		return _currentThemeColor.borderColor;
	}

	static get gridColor() {
		return _currentThemeColor.gridColor;
	}

	static get emeralWindColor() {
		return _currentThemeColor.emeralWindColor;
	}

	static get emeralWindArrowColor() {
		return _currentThemeColor.emeralWindArrowColor;
	}

	static get aestrinWindColor() {
		return _currentThemeColor.aestrinWindColor;
	}

	static get aestrinWindArrowColor() {
		return _currentThemeColor.aestrinWindArrowColor;
	}

	static get alankhWindColor(){
		return _currentThemeColor.alankhWindColor;
	}

	static get alankhWindArrowColor(){
		return _currentThemeColor.alankhWindArrowColor;
	}

	static get routeDownwindColor(){
		return _currentThemeColor.routeDownwindColor;
	}

	static get routeClosehauledColor(){
		return _currentThemeColor.routeClosehauledColor;
	}

	static get routeBeamreach(){
		return _currentThemeColor.routeBeamreach;
	}

	static get bigLabelColor(){
		return _currentThemeColor.bigLabelColor;
	}
	static get bigLabelHalo(){
		return _currentThemeColor.bigLabelHalo;
	}

	static get labelColor(){
		return _currentThemeColor.labelColor;
	}
	static get labelHalo(){
		return _currentThemeColor.labelHalo;
	}


	// Route graphics
	static get orangePoint() {
		return _currentThemeColor.orangePoint;
	}

	static get bluePoint() {
		return _currentThemeColor.bluePoint;
	}

	static get yellowPoint() {
		return _currentThemeColor.yellowPoint;
	}

	static get greenPoint() {
		return _currentThemeColor.greenPoint;
	}

	static get destinationPoint() {
		return _currentThemeColor.destinationPoint;
	}

	static get points() {
		return {
			"orangepoint": GraphicsLibrary.orangePoint,
			"bluepoint": GraphicsLibrary.bluePoint,
			"yellowpoint": GraphicsLibrary.yellowPoint,
			"greenpoint": GraphicsLibrary.greenPoint,
			"goalpoint": GraphicsLibrary.destinationPoint
		}
	}

	static get blackLine() {
		return _currentThemeColor.blackLine;
	}

	static get grayLine() {
		return _currentThemeColor.grayLine;
	}

	static get redLine() {
		return _currentThemeColor.redLine;
	}

	static get orangeLine() {
		return _currentThemeColor.orangeLine;
	}

	static get dottedOrangeLine() {
		return _currentThemeColor.dottedOrangeLine;
	}

	static get lines() {
		return {
			"blackline": GraphicsLibrary.blackLine,
			"grayline": GraphicsLibrary.grayLine,
			"redline": GraphicsLibrary.redLine,
			"orangeline": GraphicsLibrary.orangeLine,
			"orangedottedline": GraphicsLibrary.dottedOrangeLine
		}
	}

	static get eraser() {
		return _currentThemeColor.eraser;
	}

	static get boat() {
		return _currentThemeColor.boat;
	}

	//Graticule indicator numbers
	static get degreeSideLabel(){
		return _currentThemeColor.degreeSideLabel;
	}

	static get degreeTopLabel(){
		return _currentThemeColor.degreeTopLabel;
	}

	static get distanceLabel(){
		return _currentThemeColor.distanceLabel;
	}

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
}