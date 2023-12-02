var extents_checksum = 0;

var mouseGrabMoving = undefined;
var menuPoint = undefined;

const DrawMode ={
	None: "none",
	BlackLine: "blackline",
	GrayLine: "grayline",
	RedLine: "redline",
	Path: "path",
	Point: "point",
	Goal: "goal",
	Erase: "erase"
}
var drawMode = DrawMode.None;
var showDistances = false;
var showSecrets = false;

var mapObjects = {
	lines: [],
	path: [],
	points: [],
	goals: []
}

function setMode(event, newMode){

	if(drawMode == newMode){
		drawMode = DrawMode.None;
	}else{
		drawMode = newMode;
	}

	let buttons = document.getElementsByClassName("iconbutton");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].style.backgroundColor = "#ffd8c273";
	}

	if(drawMode != DrawMode.None){
		event.target.style.backgroundColor = "#FFFBEE";
	}
}

require([
	"esri/Map",
	"esri/views/MapView",
	"esri/layers/GeoJSONLayer",
	"esri/Graphic",
	"esri/layers/GraphicsLayer",
	"esri/symbols/LineSymbolMarker"
], function (ArcGISMap, MapView, GeoJSONLayer, Graphic, GraphicsLayer, LineSymbolMarker) {

	const biglabelBlob = new Blob([JSON.stringify(bigLabelJson)], {
		type: "application/json"
	});

	const borderBlob = new Blob([JSON.stringify(mapBorderJson)], {
		type: "application/json"
	});

	const blob = new Blob([JSON.stringify(geoJson)], {
		type: "application/json"
	});

	const secretBlob = new Blob([JSON.stringify(secretJson)], {
		type: "application/json"
	});

	const routeBlob = new Blob([JSON.stringify(routeJson)], {
		type: "application/json"
	});

	const secretRouteBlob = new Blob([JSON.stringify(secretRouteJson)], {
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

	let borderRenderer = {
		type: "simple",
		symbol: {
			type: "simple-line",  // autocasts as SimpleLineSymbol()
			color: [0, 0, 0, 0.7],
			style: 'dash',
			width: 4
		}
	};

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
		type: "unique-value",  // autocasts as new UniqueValueRenderer()
		field: "Type",
		defaultSymbol: { type: "simple-line" },  // autocasts as new SimpleLineSymbol()
		uniqueValueInfos: [
			{
				value: "downwind",
				symbol: {
					type: "simple-line",  // autocasts as SimpleLineSymbol()
					color: [178, 165, 152, 0.23],
					style: 'solid',
					width: 6
				}
			},
			{
				value: "closehauled",
				symbol: {
					type: "simple-line",  // autocasts as SimpleLineSymbol()
					color: [175, 10, 10, 0.15],
					style: 'solid',
					width: 6
				}
			},
			{
				value: "beamreach",
				symbol: {
					type: "simple-line",  // autocasts as SimpleLineSymbol()
					color: [30, 30, 175, 0.1],
					style: 'solid',
					width: 6
				}
			}

		],
		visualVariables: []
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
			haloColor: [221, 218, 215, 1.0],
			haloSize: "2pt",
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

	
	const borderLayer = new GeoJSONLayer({
		url: URL.createObjectURL(borderBlob),
		renderer: borderRenderer,
		visible: false
	});

	const biglabel = new GeoJSONLayer({
		url: URL.createObjectURL(biglabelBlob),
		renderer: bigLabelsRenderer,
		labelingInfo: [bigLabelClass],
		maxScale: 4000000
	});

	const route = new GeoJSONLayer({
		url: URL.createObjectURL(routeBlob),
		labelingInfo: [bigLabelClass],
		renderer: routeRenderer
	});

	const secretRoute = new GeoJSONLayer({
		url: URL.createObjectURL(secretRouteBlob),
		renderer: routeRenderer,
		labelingInfo: [bigLabelClass],
		visible: false
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

	const secretlayer = new GeoJSONLayer({
		url: URL.createObjectURL(secretBlob),
		renderer: renderer,
		labelingInfo: [labelClass],
		visible: false
	});

	const map = new ArcGISMap({
		layers: [route, secretRoute, wind, layer, secretlayer, grid, fGrid, ufGrid, biglabel, borderLayer]
	});

	const view = new MapView({
		container: "viewDiv",
		map: map,
		center: [1, 36],
		constraints: {
			minScale: 10000000, //16000000
			maxScale: 8000,
			extent: {
				xmin: -90,
				ymin: -90,
				xmax: 90,
				ymax: 90
			},
			rotationEnabled: false
		}
	});

	// fix the terrible stock scroll behaviour
	view.on("mouse-wheel", (event) => {
		event.stopPropagation();

		const customZoomFactor = 1.25;
		let newScale = view.scale * (event.deltaY < 0 ? 1 / customZoomFactor : customZoomFactor);
		newScale = clamp(newScale, view.constraints.maxScale, view.constraints.minScale)

		if (newScale != view.scale) {
			const screenPoint = {
				x: event.x,
				y: event.y,
			};

			const mapPoint = view.toMap(screenPoint);
			const scaleChange = newScale / view.scale;

			const newCenter = {
				x: (mapPoint.x - view.center.x) * (1 - scaleChange) + view.center.x,
				y: (mapPoint.y - view.center.y) * (1 - scaleChange) + view.center.y,
			};
			
			view.center = newCenter;
		}
		view.scale = newScale;

	});

	view.ui._removeComponents(["attribution"]);
	view.scale = 10000000;

	edgeLayer = new GraphicsLayer();
	imageLayer = new GraphicsLayer();
	tempLayer = new GraphicsLayer();
	renderLayer = new GraphicsLayer();
	topTempLayer = new GraphicsLayer();

	map.add(edgeLayer);
	map.add(imageLayer);
	map.add(tempLayer);
	map.add(renderLayer);
	map.add(topTempLayer);

	// Boat svg
	imageLayer.add(new Graphic(GraphicsLibrary.boat));

	view.on('pointer-move', function (event) {

		let point = view.toMap({ x: event.x, y: event.y });

		document.getElementById("yposition").innerHTML = String(Math.round(point.latitude * 100) / 100) + "°";
		document.getElementById("xposition").innerHTML = String(Math.round(point.longitude * 100) / 100) + "°";

		topTempLayer.removeAll();
		tempLayer.removeAll();
		document.getElementById("arrow_needle").style.display = "none";

		//draw temp line
		for (let i = mapObjects.lines.length-1; i >= 0; i--) {
			let linedata = mapObjects.lines[i];

			if(linedata.p1 == undefined){
				let line = new Graphic(GraphicsLibrary.lines[linedata.type]);
				line.geometry.paths = [linedata.p0, [point.longitude, point.latitude]];
				tempLayer.add(line);

/* 				let start_bearing = getBearing(point.latitude, point.longitude, linedata.p0[1], linedata.p0[0]);
				let end_bearing = getBearing(linedata.p0[1], linedata.p0[0], point.latitude, point.longitude);

				let start_text = new Graphic(GraphicsLibrary.headingLabel);
				start_text.geometry.longitude = linedata.p0[0];
				start_text.geometry.latitude = linedata.p0[1];
				start_text.symbol.text = getCompassStringFromDeg(start_bearing);
				topTempLayer.add(start_text);

				let end_text = new Graphic(GraphicsLibrary.headingLabel);
				end_text.geometry.longitude = point.longitude;
				end_text.geometry.latitude = point.latitude;
				end_text.symbol.text = getCompassStringFromDeg(end_bearing);
				topTempLayer.add(end_text);

				let length  = Math.hypot(
					linedata.p0[0] - point.longitude,
					linedata.p0[1] - point.latitude,
				);

				let degreesPerPixel = view.extent.width/window.screen.width;

				if(length/degreesPerPixel > 140){
					let minicompass = new Graphic(GraphicsLibrary.minicompass);
					minicompass.geometry.longitude = (linedata.p0[0] + point.longitude)/2;
					minicompass.geometry.latitude = (linedata.p0[1] + point.latitude)/2;
					topTempLayer.add(minicompass);
				} */

				let length  = Math.hypot(
					linedata.p0[0] - point.longitude,
					linedata.p0[1] - point.latitude,
				);

				let length_text = new Graphic(GraphicsLibrary.distanceLabel);
				length_text.geometry.longitude = (linedata.p0[0] + point.longitude)/2;
				length_text.geometry.latitude = (linedata.p0[1] + point.latitude)/2;
				length_text.symbol.text = (length*90).toFixed(1)+" NM";
				topTempLayer.add(length_text);

				let bearing = getBearing(linedata.p0[1], linedata.p0[0], point.latitude, point.longitude);
				bearing = Math.round(bearing * 10) / 10;

				document.getElementById("arrow_needle").style.transform = 'rotate(' + bearing + 'deg)';
				document.getElementById("arrow_needle").style.display = "block";
			}

		}

		if(drawMode == DrawMode.Erase){
			let result = findObjectAt(point.longitude, point.latitude);
			if(result != undefined){
				let offset = (view.extent.width/window.screen.width)*11;
				let eraser = new Graphic(GraphicsLibrary.eraser);
				eraser.geometry.longitude = point.longitude + offset;
				eraser.geometry.latitude = point.latitude + offset;
				topTempLayer.add(eraser);
				document.getElementById("viewDiv").style.cursor = "none";
			}
			else{
				document.getElementById("viewDiv").style.cursor = "crosshair";
			}
		}


		if(mouseGrabMoving != undefined){
			mouseGrabMoving.array[mouseGrabMoving.index].pos = [point.longitude, point.latitude];
			redrawMap();
		}
	});

	view.on("immediate-click", function (event) {

		let lat = event.mapPoint.y;
		let long = event.mapPoint.x;

		if(drawMode != DrawMode.Erase && !drawMode.includes("line")){
			let result = findObjectAt(long, lat);
			if(result != undefined && (result.array == mapObjects.path || result.array == mapObjects.points)){
				openDetails(result);
				return;
			}
		}
		
		if(menuPoint != undefined){
			closeDetails();
			return;
		}

		if(drawMode == DrawMode.Path){

			// do we insert the point between other two points?
			let inserted = false;
			let degreesPerPixel = view.extent.width/window.screen.width;

			for (let i = 0; i+1 < mapObjects.path.length; i++) {

				let p0 = mapObjects.path[i].pos;
				let p1 = mapObjects.path[i+1].pos;

				if(distancePointToLineSegment([long, lat], p0, p1) < degreesPerPixel * 7){
					mapObjects.path.splice(i+1, 0, {
						pos: [long, lat],
						colour: "orangepoint",
						day: 0,
						time: 0,
						winddir: "NE",
					});
					inserted = true;
					break;
				}
			}

			if(!inserted){
				mapObjects.path.push({
					pos: [long, lat],
					colour: "orangepoint",
					day: 0,
					time: 0,
					winddir: "NE",
				});	
			}
		}
		else if(drawMode == DrawMode.Point){
			mapObjects.points.push({
				pos: [long, lat],
				colour: "bluepoint",
				day: 0,
				time: 0,
				winddir: "NE",
			});	
		}
		else if(drawMode == DrawMode.Goal){
			mapObjects.goals = [{
				pos: [long, lat]
			}];
		}
		else if(drawMode == DrawMode.Erase){
			let result = findObjectAt(long, lat);
			if(result != undefined){
				result.array.splice(result.index, 1);
			}
		}
		else if(drawMode.includes("line")){
			let unfinished = undefined;
			for (let i = mapObjects.lines.length-1; i >= 0; i--) {
				if(mapObjects.lines[i].p1 == undefined){
					unfinished = mapObjects.lines[i];
					break;
				}
			}

			if(unfinished == undefined){
				mapObjects.lines.push({
					type: drawMode,
					p0: [long, lat],
					p1: undefined
				});
			}else{
				unfinished.p1 = [long, lat];
			}
		}

		redrawMap();
	});

	view.on("drag", (event) => {
		if(mouseGrabMoving != undefined){
			event.stopPropagation();
		}
	});

	view.on("hold", function (event) {

		if(drawMode == DrawMode.Erase){
			return;
		}

		let lat = event.mapPoint.y;
		let long = event.mapPoint.x;

		let result = findObjectAt(long, lat);
		if(result != undefined && result.array != mapObjects.lines){
			mouseGrabMoving = result;
			document.getElementById("viewDiv").style.cursor = "move";
		}
	});

	view.on("pointer-up", function (event) {
		if(mouseGrabMoving != undefined){
			mouseGrabMoving = undefined;
			document.getElementById("viewDiv").style.cursor = "crosshair";
		}
	});

	function findObjectAt(long, lat){
		let degreesPerPixel = view.extent.width/window.screen.width;

		//check route
		for (let i = 0; i < mapObjects.path.length; i++) {

			let pLong = mapObjects.path[i].pos[0];
			let pLat = mapObjects.path[i].pos[1];

			if(Math.hypot(long - pLong,lat - pLat) < degreesPerPixel * 15){
				return {
					array: mapObjects.path,
					index: i
				}
			}
		}

		//check points
		for (let i = 0; i < mapObjects.points.length; i++) {

			let pLong = mapObjects.points[i].pos[0];
			let pLat = mapObjects.points[i].pos[1];

			if(Math.hypot(long - pLong,lat - pLat) < degreesPerPixel * 15){
				return {
					array: mapObjects.points,
					index: i
				}
			}
		}

		//check destination(s?)
		for (let i = 0; i < mapObjects.goals.length; i++) {

			let pLong = mapObjects.goals[i].pos[0];
			let pLat = mapObjects.goals[i].pos[1];

			if(Math.hypot(long - pLong,lat - pLat) < degreesPerPixel * 15){
				return {
					array: mapObjects.goals,
					index: i
				}
			}
		}

		//check line segments
		distancePointToLineSegment
		for (let i = 0; i < mapObjects.lines.length; i++) {

			let p0 = mapObjects.lines[i].p0;
			let p1 = mapObjects.lines[i].p1;

			if (p1 != undefined){	
				if(distancePointToLineSegment([long, lat], p0, p1) < degreesPerPixel * 7){
					return {
						array: mapObjects.lines,
						index: i
					}
				}
			}
		}

		return undefined;
	}

	function redrawMap(){

		topTempLayer.removeAll();
		tempLayer.removeAll();
		renderLayer.removeAll();

		// draw lines
		if(mapObjects.lines.length > 0){
			for (i = 0; i < mapObjects.lines.length; i++) {
				let linedata = mapObjects.lines[i];
				if (linedata.p1 != undefined){
					let line = new Graphic(GraphicsLibrary.lines[linedata.type]);
					line.geometry.paths = [linedata.p0, linedata.p1];
					renderLayer.add(line);
				}
			}
		}

		//draw route line
		if(mapObjects.path.length > 1){
			let linedata = [];
			mapObjects.path.forEach(e => linedata.push(e.pos));

			let line = new Graphic(GraphicsLibrary.orangeLine);
			line.geometry.paths = linedata;
			renderLayer.add(line);
		}

		//draw route line distances
		if(showDistances && mapObjects.path.length > 1){
			for (i = 0; i < mapObjects.path.length-1; i++) {
				let p0 = mapObjects.path[i].pos;
				let p1 = mapObjects.path[i+1].pos;
				let length  = Math.hypot(
					p0[0] - p1[0],
					p0[1] - p1[1],
				);
	
				let length_text = new Graphic(GraphicsLibrary.distanceLabel);
				length_text.geometry.longitude = (p0[0] + p1[0])/2;
				length_text.geometry.latitude = (p0[1] + p1[1])/2;
				length_text.symbol.text = (length*90).toFixed(1)+" NM";
				renderLayer.add(length_text);
			}
		}
		// draw goal leg
		if(mapObjects.path.length > 0 && mapObjects.goals.length > 0){
			let line = new Graphic(GraphicsLibrary.dottedOrangeLine);
			line.geometry.paths = [
				mapObjects.path[mapObjects.path.length-1].pos,
				mapObjects.goals[0].pos
			];
			renderLayer.add(line);
		}

		//draw route dots
		if(mapObjects.path.length > 0){
			for (i = 0; i < mapObjects.path.length; i++) {
				let point = new Graphic(GraphicsLibrary.points[mapObjects.path[i].colour]);
				point.geometry.latitude = mapObjects.path[i].pos[1];
				point.geometry.longitude = mapObjects.path[i].pos[0];
				renderLayer.add(point);
			}
		}

		//draw scatter dots
		if(mapObjects.points.length > 0){
			for (i = 0; i < mapObjects.points.length; i++) {
				let point = new Graphic(GraphicsLibrary.points[mapObjects.points[i].colour]);
				point.geometry.latitude = mapObjects.points[i].pos[1];
				point.geometry.longitude = mapObjects.points[i].pos[0];
				renderLayer.add(point);
			}
		}

		//draw destinations
		if(mapObjects.goals.length > 0){
			for (i = 0; i < mapObjects.goals.length; i++) {
				let point = new Graphic(GraphicsLibrary.destinationPoint);
				point.geometry.latitude = mapObjects.goals[i].pos[1];
				point.geometry.longitude = mapObjects.goals[i].pos[0];
				renderLayer.add(point);
			}
		}

		computeInfo();
	}

	function computeInfo(){

		// Total travel distance
		let totalDist = 0;
		if (mapObjects.path.length > 1) {
			for (i = 0; i <  mapObjects.path.length; i++) {
				if (i !=  mapObjects.path.length - 1) {
					totalDist += getDistanceFromLatLonInNm(
						mapObjects.path[i].pos[1],
						mapObjects.path[i].pos[0], 
						mapObjects.path[i + 1].pos[1], 
						mapObjects.path[i + 1].pos[0]
					)
				}
			}
		}
		document.getElementById("traveldist").innerHTML = String(Math.round(totalDist * 10) / 10 + " NM");	

		// Heading and distance to target
		if(mapObjects.path.length > 0 && mapObjects.goals.length > 0){

			let pos = mapObjects.path[mapObjects.path.length-1].pos;
			let tgt = mapObjects.goals[0].pos;

			let dist = getDistanceFromLatLonInNm(pos[1], pos[0], tgt[1], tgt[0])
			
			let bearing = getBearing(pos[1], pos[0], tgt[1], tgt[0]);
			bearing = Math.round(bearing * 10) / 10;

			document.getElementById("distance").innerHTML = String(Math.round(dist * 10) / 10 + " NM");
			document.getElementById("heading").innerHTML = String(bearing + "°");
			document.getElementById("compass_needle").src = "assets/img/downscaled_needle.png";

			setArrow(bearing);
		}
		else if(mapObjects.path.length > 1){

			let pos = mapObjects.path[mapObjects.path.length-2].pos;
			let tgt = mapObjects.path[mapObjects.path.length-1].pos;
			
			let bearing = getBearing(pos[1], pos[0], tgt[1], tgt[0]);
			bearing = Math.round(bearing * 10) / 10;

			document.getElementById("heading").innerHTML = String(bearing + "°");
			document.getElementById("distance").innerHTML = "";
			document.getElementById("compass_needle").src = "assets/img/downscaled_needle2.png";

			setArrow(bearing);
		}
		else{
			document.getElementById("heading").innerHTML = "";
			document.getElementById("distance").innerHTML = "";
			document.getElementById("compass_needle").src = "assets/img/downscaled_needle2.png";

			setArrow(0);
		}
	}

	//Settings checkboxes
	document.getElementById('distancescheck').onclick = function () {
		showDistances = this.checked;
		localStorage.setItem("distances_visible", showDistances);
		redrawMap();
	}

	document.getElementById('secretcheck').onclick = function () {
		showSecrets = this.checked;
		secretlayer.visible = showSecrets && layer.visible;
		secretRoute.visible = showSecrets && route.visible;
		localStorage.setItem("secrets_visible", showSecrets);
	}

	document.getElementById('routescheck').onclick = function () {
		route.visible = this.checked;
		secretRoute.visible = this.checked && showSecrets;
		localStorage.setItem("route_visible", this.checked);
	}

	document.getElementById('windscheck').onclick = function () {
		wind.visible = this.checked;
		localStorage.setItem("wind_visible", this.checked);
	}

	document.getElementById('bordercheck').onclick = function () {
		borderLayer.visible = this.checked;
		localStorage.setItem("border_visible", this.checked);
	}

	document.getElementById('hideislandscheck').onclick = function () {
		layer.visible = !this.checked;
		biglabel.visible = !this.checked;
		secretlayer.visible = !this.checked && showSecrets;
		localStorage.setItem("islands_hidden", this.checked);
	}

	//Info Menu
	document.getElementById('clearcoords').onclick = function () {
		mapObjects = {
			lines: [],
			path: [],
			points: [],
			goals: []
		}
	
		redrawMap();
	}

	document.getElementById('save_map').onclick = function () {
		localStorage.setItem("mapObjects", JSON.stringify(mapObjects));
	}


	document.getElementById('load_map').onclick = function () {
		if(!localStorage.hasOwnProperty("mapObjects"))
			return;

		mapObjects = JSON.parse(localStorage.getItem("mapObjects"));	
		redrawMap();
	}

	//Details menu
	document.getElementById('details_lattitude').onchange = function () {
		if(menuPoint == undefined)
			return;

		let val = document.getElementById("details_lattitude").value;
		menuPoint.array[menuPoint.index].pos[1] = val;

	
		redrawMap();
	}

	document.getElementById('details_longitude').onchange = function () {
		if(menuPoint == undefined)
			return;

		let val = document.getElementById("details_longitude").value;
		menuPoint.array[menuPoint.index].pos[0] = val;
	
		redrawMap();
	}

	document.getElementById('details_colour').onchange = function () {
		if(menuPoint == undefined)
			return;

		let val = document.getElementById("details_colour").value;
		menuPoint.array[menuPoint.index].colour = val;
	
		redrawMap();
	}

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
			let testpoint = new Graphic(GraphicsLibrary.degreeSideLabel);
			testpoint.geometry.latitude = i;
			testpoint.geometry.longitude = xmin + width_offset;
			testpoint.symbol.text = i.toFixed(decimals)+"°";
			edgeLayer.add(testpoint);
		}

		for(let i = long_min; i <= long_max; i+=step){
			let testpoint = new Graphic(GraphicsLibrary.degreeTopLabel);
			testpoint.geometry.latitude = ymax - height_offset;
			testpoint.geometry.longitude = i;
			testpoint.symbol.text = i.toFixed(decimals)+"°";
			edgeLayer.add(testpoint);
		}

	});

	document.getElementById('coordsfile').addEventListener('change', (event) => {
		let file = event.target.files[0];
		let reader = new FileReader();
		reader.readAsText(file);
		reader.addEventListener('load', (event) => {

			let day = 0;
			let contents = event.target.result.split('\n');
			for(let i = 0; i < contents.length; i++){
				let line = contents[i];

				if(line.startsWith("Day")){
					day = Number(line.split(":")[1]);
				}else if(line.includes(" ") && (line.includes(".") || line.includes(","))){
					let coords = line.replaceAll(",", ".").split(" ");
					let time = 0;
					let winddir = "";
					let colour = "yellowpoint";

					if(coords.length == 4){
						let hours = ('00'+parseInt(coords[2])).slice(-2)
						let minutes = ('00'+parseInt((coords[2] - parseInt(coords[2]))*60)).slice(-2)

						time = hours+":"+minutes;
						winddir = getCompassStringFromDeg(Math.round(coords[3]));

						if(coords[2] < 8 || coords[2] > 21)
							colour = "bluepoint"
					}

					mapObjects.path.push({
						pos: [coords[1], coords[0]],
						colour: colour,
						day: day,
						time: time,
						winddir: winddir,
					});	

					
				}
			}

			Modal.close('modal_import');
			redrawMap();
		});
	});

	if(localStorage.hasOwnProperty("distances_visible")){
		showDistances = localStorage.getItem("distances_visible") === 'true';
		document.getElementById("distancescheck").checked = showDistances;
		redrawMap();
	}

	if(localStorage.hasOwnProperty("border_visible")){
		borderLayer.visible = localStorage.getItem("border_visible") === 'true';
		document.getElementById("bordercheck").checked = borderLayer.visible;
	}

	if(localStorage.hasOwnProperty("secrets_visible")){
		showSecrets = localStorage.getItem("secrets_visible") === 'true';
		secretlayer.visible = showSecrets && layer.visible;
		secretRoute.visible = showSecrets && route.visible;
		document.getElementById("secretcheck").checked = showSecrets;
	}

	if(localStorage.hasOwnProperty("route_visible")){
		route.visible = localStorage.getItem("route_visible") === 'true';
		secretRoute.visible = showSecrets && route.visible;
		document.getElementById("routescheck").checked = route.visible;
	}

	if(localStorage.hasOwnProperty("wind_visible")){
		wind.visible = localStorage.getItem("wind_visible") === 'true';
		document.getElementById("windscheck").checked = wind.visible;
	}

	if(localStorage.hasOwnProperty("islands_hidden")){
		let hidden = localStorage.getItem("islands_hidden") === 'true';
		secretlayer.visible = showSecrets && !hidden;
		layer.visible = !hidden;
		biglabel.visible = !hidden;
		document.getElementById("hideislandscheck").checked = hidden;
	}


	if(!localStorage.hasOwnProperty("modal_tutorial")){
		Modal.open('modal_tutorial');
		localStorage.setItem("modal_tutorial", true);
	}

	function openDetails(result) {
		let entry = result.array[result.index];

		const screenPoint = view.toScreen({
			x: entry.pos[0], // longitude
			y:  entry.pos[1], // latitude
			spatialReference: view.spatialReference, // match the view's spatial reference
		});
	
		document.getElementById("form_position_details").style.top = screenPoint.y+"px";
		document.getElementById("form_position_details").style.left = screenPoint.x+"px";
		document.getElementById("form_position_details").style.display = "block";
	
		document.getElementById("details_longitude").value = entry.pos[0];
		document.getElementById("details_lattitude").value = entry.pos[1];
		document.getElementById("details_colour").value = entry.colour;
	
		document.getElementById("details_day").value = entry.day;
		document.getElementById("details_time").value = entry.time;
		document.getElementById("details_winddir").value = entry.winddir;
	
		menuPoint = result;	
	}
	
	function closeDetails() {
		document.getElementById("form_position_details").style.display = "none";
		menuPoint = undefined;
	} 

});

/* function clearLocal() {
	lineGraphicsLayer.removeAll();
	graphicsLayer.removeAll();
} */

function setArrow(degree) {
	document.getElementById("compass_needle").style.transform = 'rotate(' + degree + 'deg)';
};

function pathToData(){
	

	let outstring = "					[\n";

	for(let i = 0; i < mapObjects.path.length; i++){

		let lat = parseFloat(mapObjects.path[i].pos[1]).toFixed(14);
		let long = parseFloat(mapObjects.path[i].pos[0]).toFixed(14);

		outstring += "						[\n";
		outstring += "							"+long+",\n";
		outstring += "							"+lat+"\n";

		if(i == mapObjects.path.length-1)
			outstring += "						]\n";
		else
			outstring += "						],\n";
	}

	outstring += "					]\n";

	console.log(outstring);
}