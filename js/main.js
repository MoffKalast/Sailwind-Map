var path = [];
var times = [];

var destination_set = false;

var plotBool = false;
var drawBool = true;
var loaded = false;
var checkBool = false;

var buttonpressed = false;

var route;
var wind;

var extents_checksum = 0;

var plotlineGraphic;
var polylineGraphic;
var pointGraphic;
var plotPointGraphic;

var compass_labels = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

require([
	"esri/Map",
	"esri/views/MapView",
	"esri/layers/GeoJSONLayer",
	"esri/Graphic",
	"esri/layers/GraphicsLayer",
	"esri/symbols/LineSymbolMarker"
], function (ArcGISMap, MapView, GeoJSONLayer, Graphic, GraphicsLayer, LineSymbolMarker) {

	const biglabelBlob = new Blob([JSON.stringify(bigLabels)], {
		type: "application/json"
	});

	const blob = new Blob([JSON.stringify(geojson)], {
		type: "application/json"
	});

	const routeBlob = new Blob([JSON.stringify(routeJson)], {
		type: "application/json"
	});

	const windBlob = new Blob([JSON.stringify(windJson)], {
		type: "application/json"
	});

	const gridBlob = new Blob([JSON.stringify(gridJson)], {
		type: "application/json"
	});

	const fGridBlob = new Blob([JSON.stringify(fineGrid)], {
		type: "application/json"
	});

	const ufGridBlob = new Blob([JSON.stringify(ufineGrid)], {
		type: "application/json"
	});

	let fGridRenderer = {
		type: "simple",
		symbol: {
			type: "simple-line",  // autocasts as SimpleLineSymbol()
			color: [0, 0, 0, 0.6],
			style: 'long-dash-dot',
			width: 0.2
		}
	};

	let ufGridRenderer = {
		type: "simple",
		symbol: {
			type: "simple-line",  // autocasts as SimpleLineSymbol()
			color: [0, 0, 0, 0.4],
			style: 'long-dash-dot',
			width: 0.1
		}
	};

 	let routeRenderer = {
		type: "simple",
		symbol: {
			type: "simple-line",  // autocasts as SimpleLineSymbol()
			color: [178, 165, 152, 0.2],
			style: 'solid',
			width: 6
		}
	};

	let windRenderer = {
		type: "unique-value",  // autocasts as new UniqueValueRenderer()
		field: "Region",
		defaultSymbol: { type: "simple-line" },  // autocasts as new SimpleLineSymbol()
		uniqueValueInfos: [{
			value: "Emerald",
			symbol: {
				type: "simple-line",  // autocasts as SimpleLineSymbol()
				color: [0, 150, 0, 0.3],
				style: 'solid',
				width: 1,
				marker: { // autocasts from LineSymbolMarker
					style: "arrow",
					color: [0, 150, 0, 0.6],
					placement: "end"
				}
			}
		}, {
			value: "Aestrin",
			symbol: {
				type: "simple-line",  // autocasts as SimpleLineSymbol()
				color: [100, 100, 200, 0.3],
				style: 'solid',
				width: 1,
				marker: { // autocasts from LineSymbolMarker
					style: "arrow",
					color: [100, 100, 200, 0.6],
					placement: "end"
				}
			}
		}, {
			value: "Al'Ankh",
			symbol: {
				type: "simple-line",  // autocasts as SimpleLineSymbol()
				color: [150, 60, 0, 0.3],
				style: 'solid',
				width: 1,
				marker: { // autocasts from LineSymbolMarker
					style: "arrow",
					color: [150, 60, 0, 0.6],
					placement: "end"
				}
			}
		}],
		visualVariables: []
	};

	let gridRenderer = {
		type: "simple",
		symbol: {
			type: "simple-line",  // autocasts as SimpleLineSymbol()
			color: [0, 0, 0, 0.5],
			style: 'solid',
			width: 1
		}
	};

	let renderer = {
		type: "unique-value",  // autocasts as new UniqueValueRenderer()
		field: "Region",
		defaultSymbol: { type: "simple-fill" },  // autocasts as new SimpleFillSymbol()
		uniqueValueInfos: [{
			// All features with value of "North" will be blue
			value: "Emerald Archipelago",
			symbol: {
				type: "simple-fill",  // autocasts as new SimpleFillSymbol()
				color: "orange",
				outline: {  // autocasts as new SimpleLineSymbol()
					color: [0, 0, 0, 0.8],
					width: "5em"
				}
			}
		}, {
			// All features with value of "East" will be green
			value: "Al'Ankh",
			symbol: {
				type: "simple-fill",  // autocasts as new SimpleFillSymbol()
				color: "orange",
				outline: {  // autocasts as new SimpleLineSymbol()
					color: [0, 0, 0, 0.8],
					width: "5em"
				}
			}
		}, {
			// All features with value of "South" will be red
			value: "Happy Bay",
			symbol: {
				type: "simple-fill",  // autocasts as new SimpleFillSymbol()
				color: "orange",
				outline: {  // autocasts as new SimpleLineSymbol()
					color: [0, 0, 0, 0.8],
					width: "5em"
				}
			}
		}, {
			// All features with value of "South" will be red
			value: "City",
			symbol: {
				type: "simple-fill",  // autocasts as new SimpleFillSymbol()
				color: "Red",
				outline: {  // autocasts as new SimpleLineSymbol()
					color: [0, 0, 0, 0.8],
					width: "5em"
				}
			}
		}, {
			// All features with value of "West" will be yellow
			value: "Aestrin",
			symbol: {
				type: "simple-fill",  // autocasts as new SimpleFillSymbol()
				color: "orange",
				outline: {  // autocasts as new SimpleLineSymbol()
					color: [0, 0, 0, 0.8],
					width: "5em"
				}
			}
		}],
		visualVariables: [{
			type: "opacity",
			field: "SHAPE_Area",
			stops: [{ value: 0.000006, opacity: 0.75 },
			{ value: 0.005, opacity: 1.0 }]
		}]
	};

	let bigLabelsRenderer = {
		type: "simple",  // autocasts as new SimpleRenderer()
		symbol: {
			type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
			size: 0,
			color: [0, 0, 0, 0.0]
		}
	};

	let bigLabelClass = {
		symbol: {
			type: "text",
			color: "#706860",
			haloColor: [0, 0, 0, 0.0],
			font: {
				family: "Oregano",
				size: 24
			}
		},
		labelPlacement: "center-center",
		labelExpressionInfo: {
			expression: "$feature.TextString"
		}

	};

	let labelClass = {
		symbol: {
			type: "text",
			color: "black",
			haloColor: [221, 218, 215, 0.6],
			haloSize: "3pt",
			font: {
				family: "Oregano",
				size: 16.5
			},
			yoffset: 14
		},
		labelPlacement: "above-center",
		labelExpressionInfo: {
			expression: "$feature.name"
		}

	};

	const biglabel = new GeoJSONLayer({
		url: URL.createObjectURL(biglabelBlob),
		renderer: bigLabelsRenderer,
		labelingInfo: [bigLabelClass],
		maxScale: 4000000
	});

	const route = new GeoJSONLayer({
		url: URL.createObjectURL(routeBlob),
		renderer: routeRenderer
	});

	const wind = new GeoJSONLayer({
		url: URL.createObjectURL(windBlob),
		renderer: windRenderer
	});

	const grid = new GeoJSONLayer({
		url: URL.createObjectURL(gridBlob),
		renderer: gridRenderer
	});

	const ufGrid = new GeoJSONLayer({
		url: URL.createObjectURL(ufGridBlob),
		renderer: ufGridRenderer,
		minScale: 800000
	});

	const fGrid = new GeoJSONLayer({
		url: URL.createObjectURL(fGridBlob),
		renderer: fGridRenderer,
		minScale: 3000000
	});

	const layer = new GeoJSONLayer({
		url: URL.createObjectURL(blob),
		renderer: renderer,
		labelingInfo: [labelClass]
	});

	const map = new ArcGISMap({
		layers: [route, wind, layer, grid, fGrid, ufGrid, biglabel]
	});

	const view = new MapView({
		container: "viewDiv",
		map: map,
		center: [1, 36],
		constraints: {
			minScale: 16000000,
			maxScale: 20000,
			extent: {
				xmin: -90,
				ymin: -90,
				xmax: 90,
				ymax: 90
			},
			rotationEnabled: false
		}
	});

	view.ui._removeComponents(["attribution"]);
	view.scale = 6000000;

	edgeLayer = new GraphicsLayer();
	gridLayer = new GraphicsLayer();
	graphicsLayer = new GraphicsLayer();
	lineGraphicsLayer = new GraphicsLayer();
	plotLayer = new GraphicsLayer();
	plotPoint = new GraphicsLayer();

	map.add(edgeLayer);
	map.add(plotPoint);
	map.add(plotLayer);
	map.add(graphicsLayer);
	map.add(lineGraphicsLayer);

	// Boat svg
	testLayer = new GraphicsLayer();
 	map.add(testLayer);

	let boat = new Graphic({
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
	});
	testLayer.add(boat);

	let point = {
		type: "point",
		longitude: 0,
		latitude: 0
	};

	let polyline = {
		type: "polyline",
		paths: [[0, 0]]
	};

	let polylineAtt = {
		day: null,
		time: null,
		windForce: null,
		windDir: null
	};

	const plotSymbol = {
		type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
		style: "x",
		color: [72, 6, 7, .75],
		outline: {
			// autocasts as new SimpleLineSymbol()
			color: [72, 6, 7, .75],
			width: 3
		}
	};

	const markerSymbol = {
		type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
		style: "circle",
		color: [255, 82, 29, 0.808],
		outline: {
			// autocasts as new SimpleLineSymbol()
			color: [60, 20, 20, .75],
			width: 2
		}
	};

	let polylineSymbol = {
		type: "simple-line",  // autocasts as SimpleLineSymbol()
		color: [72, 6, 7, .75],
		style: 'dash-dot',
		width: 2
	};

	let plotlineSymbol = {
		type: "simple-line",  // autocasts as SimpleLineSymbol()
		color: [225, 55, 0, .75],
		style: 'short-dot',
		width: 2
	};

	plotlineGraphic = new Graphic({
		geometry: polyline,
		symbol: plotlineSymbol,
		attributes: polylineAtt
	});

	polylineGraphic = new Graphic({
		geometry: polyline,
		symbol: polylineSymbol
	});

	pointGraphic = new Graphic({
		geometry: point,
		symbol: markerSymbol,
		attributes: polylineAtt
	});

	plotPointGraphic = new Graphic({
		geometry: point,
		symbol: plotSymbol
	});

	view.on('pointer-move', function (event) {
		const opts = {
			include: graphicsLayer
		}

		let point = view.toMap({ x: event.x, y: event.y });

		document.getElementById("yposition").innerHTML = String(Math.round(point.latitude * 100) / 100) + "&#176;";
		document.getElementById("xposition").innerHTML = String(Math.round(point.longitude * 100) / 100) + "&#176;";

		document.getElementById("horizCursorline").style.top = event.y;
		document.getElementById("vertCursorline").style.left = event.x;

		view.hitTest(event, opts).then((response) => {
			// check if a feature is returned from the hurricanesLayer
			if (response.results.length) {
				const graphic = response.results[0].graphic;
				//console.log(graphic);
				if (document.getElementById("form_position_details").style.display != "block") { openSum(graphic) }

			}
			else {
				closeSum()
			}

		});
	});

	view.on("immediate-click", function (event) {
		buttonpressed = false;
		//console.log(event)
		if (drawBool) {

			if (checkBool) {
				openDetails()
			}
			var lat = event.mapPoint.y;
			var long = event.mapPoint.x;
			var newPointGraphic = pointGraphic.clone();
			var newLineGraphic = polylineGraphic.clone();
			newPointGraphic.geometry.latitude = lat;
			newPointGraphic.geometry.longitude = long;
			if (loaded == true) {
				var nemo = localStorage.getItem("paths")
				paths = JSON.parse(nemo);
				paths = paths[0]
				for (i = 0; i < paths.length; i++) {
					path.push(paths[i]);
				}
				loaded = false;
			}
			path.push([long, lat])
			var totalDist = 0;
			if (path.length > 1) {
				for (i = 0; i < path.length; i++) {
					//console.log(path[i][1], path[i][0], path[i+1][1], path[i+1][0])
					if (i != path.length - 1) {
						totalDist += getDistanceFromLatLonInKm(path[i][1], path[i][0], path[i + 1][1], path[i + 1][0])
					}
				}
			}
			document.getElementById("traveldist").innerHTML = String(Math.round(totalDist * 10) / 10 + "nm");
			newLineGraphic.geometry.paths = path;
			graphicsLayer.add(newPointGraphic);
			lineGraphicsLayer.removeAll();
			lineGraphicsLayer.add(newLineGraphic);
			line = plotLayer.graphics.items
			lastPoint = []
			if (line.length > 0) {
				lastPoint = line[0].geometry.paths[0].at(-1);

				if(lastPoint != undefined)
					plotCourse(lastPoint[1], lastPoint[0]);
			}


		}
		if (plotBool) {
			var lat = event.mapPoint.y;
			var long = event.mapPoint.x;
			plotCourse(lat, long)
		}
		//console.log(graphicsLayer)
	});

	view.on("hold", function (event) {
		if (drawBool) {
			const opts = {
				include: graphicsLayer
			}
			view.hitTest(event, opts).then((response) => {
				// check if a feature is returned from the hurricanesLayer
				if (response.results.length) {
					const graphic = response.results[0].graphic;
					bob = []
					bob[0] = graphic.geometry.longitude;
					bob[1] = graphic.geometry.latitude;
					stuff = lineGraphicsLayer.graphics.items[0].geometry.paths[0]
					graphicsLayer.removeAll()
					for (i = 0; i < stuff.length; i++) {
						if (arraysEqual(bob, stuff[i])) {
							stuff.splice(i, 1)
						}
					}
					for (i = 0; i < stuff.length; i++) {
						var newPointGraphic = pointGraphic.clone();
						newPointGraphic.geometry.latitude = stuff[i][1];
						newPointGraphic.geometry.longitude = stuff[i][0];
						graphicsLayer.add(newPointGraphic);
					}
					var newLinGraphic = polylineGraphic.clone();
					newLinGraphic.geometry.paths = stuff;
					path = stuff;
					lineGraphicsLayer.removeAll();
					lineGraphicsLayer.add(newLinGraphic);
				}
			});
		}
	});

	document.getElementById('detailscheck').onclick = function () {
		// access properties using this keyword
		if (this.checked) {
			checkBool = true
		} else {
			checkBool = false
		}
	}


	document.getElementById('routescheck').onclick = function () {
		route.visible = this.checked;
		localStorage.setItem("route_visible", this.checked);
	}

	document.getElementById('windscheck').onclick = function () {
		wind.visible = this.checked;
		localStorage.setItem("wind_visible", this.checked);
	}

	let degreeSideLabelGraphic = new Graphic({
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
	});

	let degreeTopLabelGraphic = new Graphic({
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
	});

	// dynamic degree number renderer
	view.watch('extent', function(newextent, oldextent) {
		let xmin = view.extent.xmin;
		let xmax = view.extent.xmax;
		let ymin = view.extent.ymin;
		let ymax = view.extent.ymax;

		let checksum = xmin+xmax+ymin+ymax;

		if(checksum == extents_checksum)
			return;

		extents_checksum = checksum;
		edgeLayer.removeAll();
	});

	// dynamic degree number renderer
	view.watch('stationary', function(newextent, oldextent) {

		if(view.extent == undefined)
			return;

		let xmin = view.extent.xmin;
		let xmax = view.extent.xmax;
		let ymin = view.extent.ymin;
		let ymax = view.extent.ymax;
		let width_offset = view.extent.width * 0.03;
		let height_offset = view.extent.height * 0.04;

		//would be better to just reuse objects, but there's no way to iterate over existing ones
		edgeLayer.removeAll();

		let lat_min = parseInt(ymin)-1;
		let lat_max = parseInt(ymax)+1;

		let long_min = parseInt(xmin)-1;
		let long_max = parseInt(xmax)+1;

		if(lat_min < 0)
			lat_min = 0;

		if(lat_max > 70)
			lat_max = 70;

		if(long_min < -60)
			long_min = -60;

		if(long_max > 60)
			long_max = 60;

		let step = 1;
		let decimals = 0;

		if(view.extent.height < 0.4){
			step = 0.05;
			decimals = 2;
		}
		else if(view.extent.height < 2){
			step = 0.25;
			decimals = 2;
		}
		else if(view.extent.height < 5){
			step = 0.5;
			decimals = 1;
		}

		for(let i = lat_min; i <= lat_max; i+=step){
			let testpoint = degreeSideLabelGraphic.clone();
			testpoint.geometry.latitude = i;
			testpoint.geometry.longitude = xmin + width_offset;
			testpoint.symbol.text = i.toFixed(decimals)+"°";
			edgeLayer.add(testpoint);
		}

		for(let i = long_min; i <= long_max; i+=step){
			let testpoint = degreeTopLabelGraphic.clone();
			testpoint.geometry.latitude = ymax - height_offset;
			testpoint.geometry.longitude = i;
			testpoint.symbol.text = i.toFixed(decimals)+"°";
			edgeLayer.add(testpoint);
		}

	});

	if(localStorage.hasOwnProperty("route_visible")){
		route.visible = localStorage.getItem("route_visible") === 'true';
		document.getElementById("routescheck").checked = route.visible;
	}

	if(localStorage.hasOwnProperty("wind_visible")){
		wind.visible = localStorage.getItem("wind_visible") === 'true';
		document.getElementById("windscheck").checked = wind.visible;
	}
});

function wait() {
	if (!buttonpressed) {
		setTimeout(wait, 2500);
	}
	else {
		console.log("exit menu")
	}
}
function openDetails() {
	document.getElementById("form_position_details").style.top = event.y;
	document.getElementById("form_position_details").style.left = event.x;
	document.getElementById("form_position_details").style.display = "block";
	wait()
}

function openSum(graphic) {
	document.getElementById("form_position_summary").style.top = event.y;
	document.getElementById("form_position_summary").style.left = event.x;
	document.getElementById("dayout").innerHTML = graphic.attributes.day;
	document.getElementById("timeout").innerHTML = graphic.attributes.time;
	document.getElementById("winddout").innerHTML = graphic.attributes.windDir;
	document.getElementById("windfout").innerHTML = graphic.attributes.windForce;
	document.getElementById("form_position_summary").style.display = "block";
}

function closeSum() {
	document.getElementById("form_position_summary").style.display = "none";
}

function getDetails() {
	buttonpressed = true;
	item = graphicsLayer.graphics.items[graphicsLayer.graphics.items.length - 1]
	item.attributes.day = document.getElementById("day").value
	item.attributes.time = document.getElementById("time").value;
	item.attributes.windDir = document.getElementById("windd").value;
	item.attributes.windForce = document.getElementById("windf").value;
	document.getElementById("day").value = null;
	document.getElementById("time").value = null;
	document.getElementById("windd").value = null;
	document.getElementById("windf").value = null;
	document.getElementById("form_position_details").style.display = "none";
};


function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
};

function saveLocal() {
	bob = lineGraphicsLayer.graphics.items[0]
	console.log(bob.geometry.paths)
	localStorage.setItem("paths", JSON.stringify(bob.geometry.paths));
};

function getLocal() {
	loaded = true;
	var nemo = localStorage.getItem("paths")
	paths = JSON.parse(nemo);

	var newLineGraphic = polylineGraphic.clone();
	newLineGraphic.geometry.paths = JSON.parse(nemo);
	paths = paths[0]

	for (i = 0; i < paths.length; i++) {
		var newPointGraphic = pointGraphic.clone();
		part = paths[i]
		newPointGraphic.geometry.latitude = part[1];
		newPointGraphic.geometry.longitude = part[0];
		graphicsLayer.add(newPointGraphic)
	}

	var totalDist = 0;
	if (paths.length > 1) {
		for (i = 0; i < paths.length; i++) {
			if (i != paths.length - 1) {
				totalDist += getDistanceFromLatLonInKm(paths[i][1], paths[i][0], paths[i + 1][1], paths[i + 1][0])
			}
		}
		document.getElementById("traveldist").innerHTML = String(Math.round(totalDist * 10) / 10 + "nm");
	}
	lineGraphicsLayer.add(newLineGraphic);

};
function clearLocal() {
	lineGraphicsLayer.removeAll();
	graphicsLayer.removeAll();
}

function toggleDestination() {

	if(destination_set){
		plotLayer.removeAll();
		document.getElementById("heading").innerHTML = null;
		document.getElementById("distance").innerHTML = null;
		setArrow(0);
		plotBool = false;
		drawBool = true;
		document.getElementById("destination_button").style.backgroundColor = "#ffd8c273";
		document.getElementById("destination_icon").src = "assets/img/tools/destination.svg";
	}
	else{
		plotBool = true;
		drawBool = false;
		document.getElementById("destination_button").style.backgroundColor = "#ffAF9D5F";
		document.getElementById("destination_icon").src = "assets/img/tools/destination_set.svg";
	}

	destination_set = !destination_set;


};

function getCoords() {
	var lat = document.getElementById("latin").value;
	var long = document.getElementById("longin").value;
	if (!lat || !long) {
		alert("Enter Numbers")
		return
	}
	var newPointGraphic = pointGraphic.clone();
	var newLineGraphi = polylineGraphic.clone();
	newPointGraphic.geometry.latitude = lat;
	newPointGraphic.geometry.longitude = long;
	path.push([long, lat])
	newLineGraphi.geometry.paths = path;
	var totalDist = 0;
	if (path.length > 1) {
		for (i = 0; i < path.length; i++) {
			//console.log(path[i][1], path[i][0], path[i+1][1], path[i+1][0])
			if (i != path.length - 1) {
				totalDist += getDistanceFromLatLonInKm(path[i][1], path[i][0], path[i + 1][1], path[i + 1][0])
			}
		}
	}
	document.getElementById("traveldist").innerHTML = String(Math.round(totalDist * 10) / 10 + "nm");
	lineGraphicsLayer.add(newLineGraphi);
	graphicsLayer.add(newPointGraphic);
	lineGraphicsLayer.removeAll();
	lineGraphicsLayer.add(newLineGraphi);
	line = plotLayer.graphics.items
	lastPoint = []
	if (line.length > 0) {
		lastPoint = line[0].geometry.paths[0].at(-1)
		plotCourse(lastPoint[1], lastPoint[0])
	}
	document.getElementById("latin").value = null;
	document.getElementById("longin").value = null;
};

function setArrow(degree) {

	var img = $('.arrow');
	var img2 = $('.arrow2');
	var img3 = $('.arrow3');
	var imgc = $('.arrowc');
	if (img.length > 0) {
		img.css('-moz-transform', 'rotate(' + degree + 'deg)');
		img.css('-webkit-transform', 'rotate(' + degree + 'deg)');
		img.css('-o-transform', 'rotate(' + degree + 'deg)');
		img.css('-ms-transform', 'rotate(' + degree + 'deg)');
		img2.css('-moz-transform', 'rotate(' + degree + 'deg)');
		img2.css('-webkit-transform', 'rotate(' + degree + 'deg)');
		img2.css('-o-transform', 'rotate(' + degree + 'deg)');
		img2.css('-ms-transform', 'rotate(' + degree + 'deg)');
		img3.css('-moz-transform', 'rotate(' + degree + 'deg)');
		img3.css('-webkit-transform', 'rotate(' + degree + 'deg)');
		img3.css('-o-transform', 'rotate(' + degree + 'deg)');
		img3.css('-ms-transform', 'rotate(' + degree + 'deg)');
		imgc.css('-moz-transform', 'rotate(' + degree + 'deg)');
		imgc.css('-webkit-transform', 'rotate(' + degree + 'deg)');
		imgc.css('-o-transform', 'rotate(' + degree + 'deg)');
		imgc.css('-ms-transform', 'rotate(' + degree + 'deg)');

	}

};


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	//var R =  5765; // Radius of the earth in km
	//var dLat = deg2rad(lat2-lat1);  // deg2rad below
	//var dLon = deg2rad(lon2-lon1); 
	//var a = 
	//  Math.sin(dLat/2) * Math.sin(dLat/2) +
	//  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	// Math.sin(dLon/2) * Math.sin(dLon/2)
	//  ; 
	//var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	// var d = R * c; // Distance in km

	var d = Math.sqrt(Math.pow((lat2 - lat1), 2) + Math.pow((lon2 - lon1), 2)) * 90
	return d;
}
function deg2rad(deg) {
	return deg * (Math.PI / 180)
}
function calcDistance(coordPair) {
	var degUnit = 10000;

};

function calcSpeed(coords) {

};

function clearCoords() {
	coords = []
	document.getElementById("traveldist").innerHTML = null
	graphicsLayer.removeAll();
	lineGraphicsLayer.removeAll();
	plotLayer.removeAll();
	path = []
	plotBool = false;
	drawBool = true;
};

function plotCourse(destLat, destLong) {
	plotLayer.removeAll();
	line = lineGraphicsLayer.graphics.items;
	lastPoint = []
	//console.log(line)
	if (line.length > 0) {
		//console.log(line[0].geometry.paths[0].at(-1))
		lastPoint = line[0].geometry.paths[0].at(-1)
	}
	else { 
		alert("Must Select a starting location") 
	}

	let newPlotGraphi = plotlineGraphic.clone();
	let newPointGraphic = plotPointGraphic.clone();

	newPointGraphic.geometry.latitude = destLat;
	newPointGraphic.geometry.longitude = destLong;

	pat = []

	pat.push([lastPoint[0], lastPoint[1]])
	pat.push([destLong, destLat])

	distToTarget = getDistanceFromLatLonInKm(lastPoint[1], lastPoint[0], destLat, destLong)
	newPlotGraphi.geometry.paths = pat;
	plotLayer.add(newPlotGraphi);
	plotLayer.add(newPointGraphic);

	bob = bearing(lastPoint[1], lastPoint[0], destLat, destLong)
	bob = Math.round(bob * 10) / 10;

	document.getElementById("heading").innerHTML = String(bob + "&#176;");
	document.getElementById("distance").innerHTML = String(Math.round(distToTarget * 10) / 10 + "nm");
	setArrow(bob);

	plotBool = false;
	drawBool = true;

};

function toRadians(degrees) {
	return degrees * Math.PI / 180;
};

function toDegrees(radians) {
	return radians * 180 / Math.PI;
};

function bearing(startLat, startLng, destLat, destLng) {
	var deltaX = destLat - startLat;
	var deltaY = destLng - startLng;

	var radians = Math.atan2(deltaY, deltaX)
	var degrees = ((radians * 180) / Math.PI);

	//startLat = toRadians(startLat);
	//startLng = toRadians(startLng);
	//destLat = toRadians(destLat);
	//destLng = toRadians(destLng);

	//y = Math.sin(destLng - startLng) * Math.cos(destLat);
	//x = Math.cos(startLat) * Math.sin(destLat) -
	//      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
	//brng = Math.atan2(y, x);
	//brng = toDegrees(brng);
	return (degrees + 360) % 360;
};