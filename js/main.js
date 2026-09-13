var extents_checksum = 0;

var mouseGrabMoving = undefined;
var menuPoint = undefined;

const DrawMode ={
	None: "none",
	BlackLine: "blackline",
	GrayLine: "grayline",
	RedLine: "redline",
	Circle: "circle",
	Path: "path",
	Point: "point",
	Goal: "goal",
	Erase: "erase"
}
var drawMode = DrawMode.None;
var showDistances = false;
var showSecrets = false;
let dark_mode = false;

const CURRENT_SAVE_VERSION = 1;
var mapObjects = createDefaultSaveData();

// save the zoom and position of the map
let positionData={
	center:{x:0, y:0},
	scale:0
}

function setMode(event, newMode){

	if(drawMode === newMode){
		drawMode = DrawMode.None;
	}else{
		drawMode = newMode;
	}

	const buttons = document.getElementsByClassName("iconbutton");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].style.backgroundColor = dark_mode ? "#2a242073": "#ffd8c273";
	}

	if(drawMode !== DrawMode.None){
		event.target.style.backgroundColor = dark_mode ? "black" : "white";
	}
}

function fetchJSON(url) {
    return fetch(url)
        .then(response => response.json())
        .catch((error) => {
            console.log(error);
        });
}

require([
	"esri/Map",
	"esri/views/MapView",
	"esri/layers/GeoJSONLayer",
	"esri/Graphic",
	"esri/layers/GraphicsLayer",
	"esri/geometry/Circle"
], (ArcGISMap, MapView, GeoJSONLayer, Graphic, GraphicsLayer, Circle) => {

	(async()=>{

		await load_islands();
	const biglabelBlob = new Blob([JSON.stringify(bigLabelJson)], {
		type: "application/json"
	});

	const borderBlob = new Blob([JSON.stringify(mapBorderJson)], {
		type: "application/json"
	});

	const blob = new Blob([islands_data_to_json()], {
		type: "application/json"
	});

	const secretBlob = new Blob([islands_secrets_data_to_json()], {
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

	const borderRenderer = {
		type: "simple",
		symbol: {
			type: "simple-line",  // autocasts as SimpleLineSymbol()
			color: [0, 0, 0, 0.7],
			style: 'dash',
			width: 4
		}
	};

	const fGridRenderer = {
		type: "simple",
		symbol: {
			type: "simple-line",  // autocasts as SimpleLineSymbol()
			color: [0, 0, 0, 0.6],
			style: 'long-dash-dot',
			width: 0.2
		}
	};

	const ufGridRenderer = {
		type: "simple",
		symbol: {
			type: "simple-line",  // autocasts as SimpleLineSymbol()
			color: [0, 0, 0, 0.4],
			style: 'long-dash-dot',
			width: 0.1
		}
	};

	const routeRenderer = {
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

	const windRenderer = {
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

	const gridRenderer = {
		type: "simple",
		symbol: {
			type: "simple-line",  // autocasts as SimpleLineSymbol()
			color: [0, 0, 0, 0.5],
			style: 'solid',
			width: 1
		}
	};

	const renderer = {
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
			value: "Rock",
			symbol: {
				type: "simple-fill",  // autocasts as new SimpleFillSymbol()
				color: "gray",
				outline: {  // autocasts as new SimpleLineSymbol()
					color: [0, 0, 0, 0.8],
					width: "5em"
				}
			}
		}, {
			value: "Fire Fish Lagoon",
			symbol: {
				type: "simple-fill",  // autocasts as new SimpleFillSymbol()
				color: "orange",
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

	const bigLabelsRenderer = {
		type: "simple",  // autocasts as new SimpleRenderer()
		symbol: {
			type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
			size: 0,
			color: [0, 0, 0, 0.0]
		}
	};

	const bigLabelClass = {
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

	const labelClass = {
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

	const circleFactory = ({center, radius}) => {
		const circleGeometry = new Circle({
			center: center,
			radius: radius,
			radiusUnit: "kilometers",
			numberOfPoints: 200
		})
		return {
			geometry: circleGeometry,
			symbol: GraphicsLibrary.compassLine.symbol
		}
	}

	
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

		if (newScale !== view.scale) {
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
		
		positionData.center = view.center;
		positionData.scale=view.scale;
		localStorage.setItem("positionData", JSON.stringify(positionData));
	});

	view.ui._removeComponents(["attribution"]);
	view.scale = 10000000;

	if(Object.hasOwn(localStorage, "positionData")){
		positionData = JSON.parse(localStorage.getItem("positionData"));

		view.scale = positionData.scale;
		view.center = positionData.center;
	}else{
		positionData.scale = view.scale;
		positionData.center = view.center;

		localStorage.setItem("positionData", JSON.stringify(positionData));
	}

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


	view.on('pointer-move', async (event) => {
		if(drawMode === DrawMode.Erase){
			const object = await findObjectAt(event);
			view.container.classList.toggle(
			    "cursor-eraser-active",
			    object !== undefined
			);
		} else {
			view.container.classList.toggle(
			    "cursor-eraser-active",
			    false
			);
		}
	});

	view.on('pointer-move', (event) => {

		const point = view.toMap({ x: event.x, y: event.y });

		document.getElementById("yposition").innerHTML = String(Math.round(point.latitude * 100) / 100) + "°";
		document.getElementById("xposition").innerHTML = String(Math.round(point.longitude * 100) / 100) + "°";

		topTempLayer.removeAll();
		tempLayer.removeAll();
		document.getElementById("arrow_needle").style.display = "none";

		//draw temp lines
		for (const linedata of mapObjects.lines) {
			if(linedata.p1 === undefined){
				const line = new Graphic(GraphicsLibrary.lines[linedata.type]);
				line.geometry.paths = [linedata.p0, [point.longitude, point.latitude]];
				tempLayer.add(line);

				const length = getDistance(linedata.p0, [point.longitude, point.latitude]);

				let bearing = getBearing(linedata.p0[1], linedata.p0[0], point.latitude, point.longitude);
				bearing = Math.round(bearing * 10) / 10;

				const length_text = new Graphic(GraphicsLibrary.distanceLabel);
				length_text.geometry.longitude = (linedata.p0[0] + point.longitude)/2;
				length_text.geometry.latitude = (linedata.p0[1] + point.latitude)/2;
				length_text.symbol.text = `${(length*140).toFixed(1)} NM  ${bearing.toFixed(1)}°`;
				
				topTempLayer.add(length_text);

				document.getElementById("arrow_needle").style.transform = 'rotate(' + bearing + 'deg)';
				document.getElementById("arrow_needle").style.display = "block";
			}
		}
		// temp circles
		for (const circledata of mapObjects.circles){	
			if (circledata.radius === undefined) {
				const length = getDistance(circledata.center, [point.longitude, point.latitude]);

				const circle = new Graphic(circleFactory({
					center: circledata.center,
				 	radius: approximateDistanceToKilometers(length)
				}));

				const line = new Graphic(GraphicsLibrary.compassLine);
				line.geometry.paths = [circledata.center, [point.longitude, point.latitude]];

				tempLayer.add(circle);	
				tempLayer.add(line);	

				const length_text = new Graphic(GraphicsLibrary.distanceLabel);
				length_text.geometry.longitude = (circledata.center[0] + point.longitude)/2;
				length_text.geometry.latitude = (circledata.center[1] + point.latitude)/2;
				length_text.symbol.text = `${(length*140).toFixed(1)} NM`;
				
				topTempLayer.add(length_text);
			}							
		}

		if(mouseGrabMoving !== undefined){
			mouseGrabMoving.array[getIndexById(mouseGrabMoving.array, mouseGrabMoving.id)].pos = [point.longitude, point.latitude];
			redrawMap();

			// update quicksave
			updateSaveData();
		}
	});

	view.on("immediate-click", async (event) => {

		const lat = event.mapPoint.y;
		const long = event.mapPoint.x;

		if(drawMode !== DrawMode.Erase && !drawMode.includes("line") && drawMode !== DrawMode.Circle){
			const result = await findObjectAt(event);
			if(result !== undefined && (result.array === mapObjects.path || result.array === mapObjects.points)){
				openDetails(result);
				return;
			}
		}
		
		if(menuPoint !== undefined){
			closeDetails();
			return;
		}

		if(drawMode === DrawMode.Path){

			// do we insert the point between other two points?
			let inserted = false;
			const degreesPerPixel = view.extent.width/window.screen.width;

			for (let i = 0; i+1 < mapObjects.path.length; i++) {

				const p0 = mapObjects.path[i].pos;
				const p1 = mapObjects.path[i+1].pos;

				if(distancePointToLineSegment([long, lat], p0, p1) < degreesPerPixel * 7){
					mapObjects.path.splice(i+1, 0, {
						id: getNextFreeId(mapObjects.path),
						type: drawMode,
						description: "",
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
					id: getNextFreeId(mapObjects.path),
					type: drawMode,
					description: "",
					pos: [long, lat],
					colour: "orangepoint",
					day: 0,
					time: 0,
					winddir: "NE",
				});	
			}
		}
		else if(drawMode === DrawMode.Point){
			mapObjects.points.push({
				id: getNextFreeId(mapObjects.points),
				type: drawMode,
				description: "Click to Rename",
				pos: [long, lat],
				colour: "bluepoint",
				day: 0,
				time: 0,
				winddir: "NE",
			});	
		}
		else if(drawMode === DrawMode.Goal){
			mapObjects.goals = [{
				id: getNextFreeId(mapObjects.goals),
				type: drawMode,
				pos: [long, lat]
			}];
		}
		else if(drawMode === DrawMode.Erase){
			const result = await findObjectAt(event);

			if(result !== undefined){
				const index = result.array.findIndex(object => object.id === result.id)
				result.array.splice(index, 1)
			}
		}
		else if(drawMode.includes("line")){
			let unfinished = undefined;
			for (let i = mapObjects.lines.length-1; i >= 0; i--) {
				if(mapObjects.lines[i].p1 === undefined){
					unfinished = mapObjects.lines[i];
					break;
				}
			}

			if(unfinished === undefined){
				mapObjects.lines.push({
					id: getNextFreeId(mapObjects.lines),
					type: drawMode,
					p0: [long, lat],
					p1: undefined
				});
			}else{
				unfinished.p1 = [long, lat];
			}
		}
		else if(drawMode === DrawMode.Circle){
			let unfinished;
			for (const circledata of mapObjects.circles) {
				if(circledata.radius === undefined){
					unfinished = circledata;
					break;
				}
			}

			if(unfinished === undefined){
				mapObjects.circles.push({
					id: getNextFreeId(mapObjects.circles),
					type: drawMode,
					center: [long, lat],
					radius: undefined,
					endpoint: undefined
				});
			}else{
				unfinished.radius = approximateDistanceToKilometers(getDistance(unfinished.center, [long, lat]))
				unfinished.endpoint = [long, lat]
			}
		}

		redrawMap();

		// update quicksave
		updateSaveData();
	});

	view.on("drag", (event) => {
		if(mouseGrabMoving !== undefined){
			event.stopPropagation();
		}
		positionData.center = view.center;
		positionData.scale=view.scale;
		localStorage.setItem("positionData", JSON.stringify(positionData));
	});

	view.on("hold", async (event) => {
		if(drawMode === DrawMode.Erase){
			return;
		}

		const result = await findObjectAt(event);
		if(result !== undefined && result.array !== mapObjects.lines && result.array !== mapObjects.circles){
			mouseGrabMoving = result;
			document.getElementById("viewDiv").style.cursor = "move";
		}
	});


	view.on("pointer-up", (event) => {
		if(mouseGrabMoving !== undefined){
			mouseGrabMoving = undefined;
			document.getElementById("viewDiv").style.cursor = "crosshair";
		}
	});

	async function findObjectAt(event){
		const response = await view.hitTest(event, {
			include: [renderLayer]
		});
		const results = response.results;

		for (const result of results){
			const graphic = result.graphic;
			let targetObjects;
			switch (graphic.attributes?.type){
				case DrawMode.BlackLine:
				case DrawMode.GrayLine:
				case DrawMode.RedLine:
					targetObjects = mapObjects.lines;				
					break;
				case DrawMode.Circle:
					// Some additional logic is needed here. Currently, the circle is erased even if you click inside it, not just along its border.
					// Since we are using ArcGIS v4.21, we don't have any convenient ways to solve this problem (proximityOperator with testPolygonInterior added in v4.31) 
					// upd: Hmm, maybe there is a way around (note about Polygone) -> https://developers.arcgis.com/javascript/latest/references/core/views/MapView/#hitTest
					targetObjects = mapObjects.circles;
					break;
				case DrawMode.Path:
					targetObjects = mapObjects.path;	
					break;
				case DrawMode.Point:
					targetObjects = mapObjects.points;
					break;
				case DrawMode.Goal:
					targetObjects = mapObjects.goals;
					break;
			}
			if (targetObjects === undefined){
				continue;
			}
			for (const objectdata of targetObjects){
				const id = graphic.attributes.id;
				if (id === objectdata.id){
					return {
						array: targetObjects,
						id: id
					}
				}
			}
		}
	}

	function redrawMap(){

		topTempLayer.removeAll();
		tempLayer.removeAll();
		renderLayer.removeAll();

		// draw lines
		if(mapObjects.lines.length > 0){
			for (const linedata of mapObjects.lines) {
				if (linedata.p1 !== undefined){
					const line = new Graphic(GraphicsLibrary.lines[linedata.type]);
					line.geometry.paths = [linedata.p0, linedata.p1];
					line.attributes = {id: linedata.id, type: linedata.type}
					renderLayer.add(line);
				}
			}
		}

		// draw circles
		if(mapObjects.circles.length > 0){
			for (const circledata of mapObjects.circles) {
				if (circledata.radius !== undefined){
					const circle = new Graphic(circleFactory({
						center: circledata.center,
						radius: circledata.radius
					}));
					circle.attributes = {id: circledata.id, type: circledata.type}

					const line = new Graphic(GraphicsLibrary.compassLine);
					line.geometry.paths = [circledata.center, circledata.endpoint];
					line.attributes = {id: circledata.id, type: circledata.type}
					
					renderLayer.add(circle);
					renderLayer.add(line);

					if(showDistances){
						const length = getDistance(circledata.center, circledata.endpoint)		
						const length_text = new Graphic(GraphicsLibrary.distanceLabel);
						length_text.geometry.longitude = (circledata.center[0] + circledata.endpoint[0])/2;
						length_text.geometry.latitude = (circledata.center[1] + circledata.endpoint[1])/2;
						length_text.symbol.text = `${(length*140).toFixed(1)} NM`;
						
						renderLayer.add(length_text);
					}
				}
			}
		}

		//draw route line
		if(mapObjects.path.length > 1){
			const linedata = [];
			mapObjects.path.forEach((e) => {linedata.push(e.pos)});

			const line = new Graphic(GraphicsLibrary.orangeLine);
			line.geometry.paths = linedata;
			renderLayer.add(line);
		}

		//draw route line distances
		if(showDistances && mapObjects.path.length > 1){
			for (i = 0; i < mapObjects.path.length-1; i++) {
				const p0 = mapObjects.path[i].pos;
				const p1 = mapObjects.path[i+1].pos;
				const length  = Math.hypot(
					p0[0] - p1[0],
					p0[1] - p1[1],
				);
	
				const length_text = new Graphic(GraphicsLibrary.distanceLabel);
				length_text.geometry.longitude = (p0[0] + p1[0])/2;
				length_text.geometry.latitude = (p0[1] + p1[1])/2;
				length_text.symbol.text = (length*140).toFixed(1)+" NM";
				renderLayer.add(length_text);
			}
		}
		// draw goal leg
		if(mapObjects.path.length > 0 && mapObjects.goals.length > 0){
			const line = new Graphic(GraphicsLibrary.dottedOrangeLine);
			line.geometry.paths = [
				mapObjects.path[mapObjects.path.length-1].pos,
				mapObjects.goals[0].pos
			];
			renderLayer.add(line);
		}

		//draw route dots
		if(mapObjects.path.length > 0){
			for (const pointdata of mapObjects.path) {
				const point = new Graphic(GraphicsLibrary.points[pointdata.colour]);
				point.geometry.latitude = pointdata.pos[1];
				point.geometry.longitude = pointdata.pos[0];
				point.attributes = {id: pointdata.id, type: pointdata.type}
				renderLayer.add(point);

				if(pointdata.description !== "")
				{
					const description_text = new Graphic(GraphicsLibrary.distanceLabel);
					description_text.geometry.longitude =pointdata.pos[0];
					description_text.geometry.latitude = pointdata.pos[1];
					description_text.symbol.text = pointdata.description;
					description_text.symbol.yoffset = 10;
					renderLayer.add(description_text);
				}
			}
		}

		//draw scatter dots
		if(mapObjects.points.length > 0){
			for (const pointdata of mapObjects.points) {
				const point = new Graphic(GraphicsLibrary.points[pointdata.colour]);
				point.geometry.latitude = pointdata.pos[1];
				point.geometry.longitude = pointdata.pos[0];
				point.attributes = {id: pointdata.id, type: pointdata.type}
				renderLayer.add(point);

				if(pointdata.description !== "")
				{
					const description_text = new Graphic(GraphicsLibrary.distanceLabel);
					description_text.geometry.longitude = pointdata.pos[0];
					description_text.geometry.latitude = pointdata.pos[1];
					description_text.symbol.text = pointdata.description;
					description_text.symbol.yoffset = 10;
					renderLayer.add(description_text);
				}
			}
		}

		//draw destinations
		if(mapObjects.goals.length > 0){
			for (const pointdata of mapObjects.goals) {
				const point = new Graphic(GraphicsLibrary.destinationPoint);
				point.geometry.latitude = pointdata.pos[1];
				point.geometry.longitude = pointdata.pos[0];
				point.attributes = {id: pointdata.id, type: pointdata.type}
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
				if (i !==  mapObjects.path.length - 1) {
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
			const pos = mapObjects.path[mapObjects.path.length-1].pos;
			const tgt = mapObjects.goals[0].pos;

			const dist = getDistanceFromLatLonInNm(pos[1], pos[0], tgt[1], tgt[0])
			
			let bearing = getBearing(pos[1], pos[0], tgt[1], tgt[0]);
			bearing = Math.round(bearing * 10) / 10;

			document.getElementById("distance").innerHTML = String(Math.round(dist * 10) / 10 + " NM");
			document.getElementById("heading").innerHTML = String(bearing + "°");
			document.getElementById("compass_needle").src = "assets/img/downscaled_needle.png";

			setArrow(bearing);
		}
		else if(mapObjects.path.length > 1){
			const pos = mapObjects.path[mapObjects.path.length-2].pos;
			const tgt = mapObjects.path[mapObjects.path.length-1].pos;
			
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

	document.getElementById('daynightSliderToggle').addEventListener('click', function () {
		this.classList.toggle('night');
		dark_mode = this.classList.contains('night');
		changeTheme(dark_mode);
		localStorage.setItem("dark_mode", dark_mode);
	});

	//Info Menu
	document.getElementById('clearcoords').onclick = () => {
		mapObjects = createDefaultSaveData();
	
		redrawMap();
		updateSaveData();
	}

	document.getElementById('export_map').onclick = async () => {
		const map_name = await prompt('What manner of chart be this?');

		if(map_name === "" || map_name == null)
			return;

		const url = window.URL.createObjectURL(new Blob([JSON.stringify(mapObjects)], {type: "octet/stream"}));

		const a = document.createElement("a");
		a.href = url
		a.download = map_name+'.json';
		a.click();

		window.URL.revokeObjectURL(url);
	}

	document.getElementById('import_map').onclick = () => {
		// causes file input to prompt for file
		document.getElementById('map_file').click();
		// if user did upload file, goes to 'map_file'.onchange (below)
	}

	document.getElementById('map_file').onchange = () => {
		const file = document.getElementById('map_file').files?.[0];		
		if (!file) {
			return;
		}

		const fr = new FileReader();
		fr.onload = (e) => {
			try {
				const importedData = JSON.parse(e.target.result);
				mapObjects = prepareSaveData(importedData);

				localStorage.setItem(
					"quicksave_data",
					JSON.stringify(mapObjects)
				);
				redrawMap();
			} catch (err) {
				console.error(err);
			} finally {
				document.getElementById('map_file').value = '';
			}
		}; 
		fr.readAsText(file);
	}

	//Details menu
	function updateMenuPoint(callback) {
		if(!menuPoint)
			return;

		const item = menuPoint.array[getIndexById(menuPoint.array, menuPoint.id)];
		if(!item)
			return;

		callback(item);
		updateSaveData();
		redrawMap();
	}

	const detailsDescription = document.getElementById('details_description');
	const detailsLatitude = document.getElementById('details_latitude');
	const detailsLongitude = document.getElementById('details_longitude');
	const detailsColour = document.getElementById("details_colour")
	const detailsDay = document.getElementById("details_day")
	const detailsTime = document.getElementById("details_time")
	const detailsWinddir = document.getElementById("details_winddir")

	detailsDescription.addEventListener('input', () => updateMenuPoint((item) => {
		item.description = detailsDescription.value;
	}))

	detailsLatitude.addEventListener('input', () => updateMenuPoint((item) => {
		const v = parseFloat(detailsLatitude.value);
		if(!Number.isNaN(v))
			item.pos[1] = v;		
	}))

	detailsLongitude.addEventListener('input', () => updateMenuPoint((item) => {
		const v = parseFloat(detailsLongitude.value);
		if(!Number.isNaN(v))
			item.pos[0] = v;	
	}))

	detailsColour.addEventListener('input', () => updateMenuPoint((item) => {
		item.colour = detailsColour.value;
	}))

	detailsDay.addEventListener('input', () => updateMenuPoint((item) => {
		item.day = detailsDay.value;
	}))

	detailsTime.addEventListener('input', () => updateMenuPoint((item) => {
		item.day = detailsTime.value;
	}))

	detailsWinddir.addEventListener('input', () => updateMenuPoint((item) => {
		item.winddir = detailsWinddir.value;
	}))

	function openDetails(result) {
		const entry = result.array[getIndexById(result.array, result.id)];

		const screenPoint = view.toScreen({
			x: entry.pos[0], // longitude
			y: entry.pos[1], // latitude
			spatialReference: view.spatialReference, // match the view's spatial reference
		});
	
		document.getElementById("form_position_details").style.top = screenPoint.y+"px";
		document.getElementById("form_position_details").style.left = screenPoint.x+"px";
		document.getElementById("form_position_details").style.display = "block";
	
		detailsDescription.value = entry.description;
		detailsLatitude.value = entry.pos[1];
		detailsLongitude.value = entry.pos[0];
		detailsColour.value = entry.colour;	
		detailsDay.value = entry.day;
		detailsTime.value = entry.time;
		detailsWinddir.value = entry.winddir;
	
		menuPoint = result;	
	}
	
	function closeDetails() {
		document.getElementById("form_position_details").style.display = "none";
		menuPoint = undefined;
	}

	// dynamic degree number renderer
	view.watch('extent', (newextent, oldextent) => {
		const xmin = view.extent.xmin;
		const xmax = view.extent.xmax;
		const ymin = view.extent.ymin;
		const ymax = view.extent.ymax;

		const checksum = xmin+xmax+ymin+ymax;

		if(checksum === extents_checksum)
			return;

		extents_checksum = checksum;
		edgeLayer.removeAll();
	});

	// dynamic degree number renderer
	view.watch('stationary', (newextent, oldextent) => {

		redrawEdge();

	});

	document.getElementById('coordsfile').addEventListener('change', (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsText(file);
		reader.addEventListener('load', (event) => {

			let day = 0;
			let contents = event.target.result.split('\n');
			for(let i = 0; i < contents.length; i++){
				let line = contents[i];

				if(line.startsWith("Day")){
					day = Number(line.split(":")[1]);
				}else if(line.includes(" ") && (line.includes(".") || line.includes(","))){
					let description = ""
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
						description: description,
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

	if(Object.hasOwn(localStorage, "distances_visible")){
		showDistances = localStorage.getItem("distances_visible") === 'true';
		document.getElementById("distancescheck").checked = showDistances;
		redrawMap();
	}

	if(Object.hasOwn(localStorage, "border_visible")){
		borderLayer.visible = localStorage.getItem("border_visible") === 'true';
		document.getElementById("bordercheck").checked = borderLayer.visible;
	}

	if(Object.hasOwn(localStorage, "secrets_visible")){
		showSecrets = localStorage.getItem("secrets_visible") === 'true';
		secretlayer.visible = showSecrets && layer.visible;
		secretRoute.visible = showSecrets && route.visible;
		document.getElementById("secretcheck").checked = showSecrets;
	}

	if(Object.hasOwn(localStorage, "route_visible")){
		route.visible = localStorage.getItem("route_visible") === 'true';
		secretRoute.visible = showSecrets && route.visible;
		document.getElementById("routescheck").checked = route.visible;
	}

	if(Object.hasOwn(localStorage, "wind_visible")){
		wind.visible = localStorage.getItem("wind_visible") === 'true';
		document.getElementById("windscheck").checked = wind.visible;
	}

	if(Object.hasOwn(localStorage, "islands_hidden")){
		const hidden = localStorage.getItem("islands_hidden") === 'true';
		secretlayer.visible = showSecrets && !hidden;
		layer.visible = !hidden;
		biglabel.visible = !hidden;
		document.getElementById("hideislandscheck").checked = hidden;
	}

	if(Object.hasOwn(localStorage, "dark_mode")){
		dark_mode = localStorage.getItem("dark_mode") === "true"
		changeTheme(dark_mode)

		if(dark_mode){
			document.getElementById('daynightSliderToggle').classList.toggle('night')
		}
	}

	if(!Object.hasOwn(localStorage, "modal_tutorial")){
		Modal.open('modal_tutorial');
		localStorage.setItem("modal_tutorial", true);
	}

	if(Object.hasOwn(localStorage, "quicksave_data")) {
		let data;
		try {
			data = JSON.parse(localStorage.getItem("quicksave_data"));	
		} catch {
			data = {}
		}
		mapObjects = prepareSaveData(data);

		updateSaveData();
		redrawMap();
	}

	function changeTheme(darkMode){
		imageLayer.removeAll();
		updateThemeColors(darkMode);
		// Boat svg
		imageLayer.add(new Graphic(GraphicsLibrary.boat));

		view.background = GraphicsLibrary.backgroundColor;
		borderLayer.renderer.symbol.color = GraphicsLibrary.borderColor;
		grid.renderer.symbol.color = GraphicsLibrary.gridColor;

		wind.renderer.uniqueValueInfos[0].symbol.color = GraphicsLibrary.emeralWindColor;
		wind.renderer.uniqueValueInfos[0].symbol.marker.color = GraphicsLibrary.emeralWindArrowColor;

		wind.renderer.uniqueValueInfos[1].symbol.color = GraphicsLibrary.aestrinWindColor;
		wind.renderer.uniqueValueInfos[1].symbol.marker.color = GraphicsLibrary.aestrinWindArrowColor;

		wind.renderer.uniqueValueInfos[2].symbol.color = GraphicsLibrary.alankhWindColor;
		wind.renderer.uniqueValueInfos[2].symbol.marker.color = GraphicsLibrary.alankhWindArrowColor;

		route.renderer.uniqueValueInfos[0].symbol.color = GraphicsLibrary.routeDownwindColor;
		route.renderer.uniqueValueInfos[1].symbol.color = GraphicsLibrary.routeClosehauledColor;
		route.renderer.uniqueValueInfos[2].symbol.color = GraphicsLibrary.routeBeamreach;

		secretRoute.renderer.uniqueValueInfos[0].symbol.color = GraphicsLibrary.routeDownwindColor;
		secretRoute.renderer.uniqueValueInfos[1].symbol.color = GraphicsLibrary.routeClosehauledColor
		secretRoute.renderer.uniqueValueInfos[2].symbol.color = GraphicsLibrary.routeBeamreach;

		biglabel.labelingInfo[0].symbol.color = GraphicsLibrary.bigLabelColor;
		biglabel.labelingInfo[0].symbol.haloColor = GraphicsLibrary.bigLabelHalo;

		route.labelingInfo[0].symbol.color = GraphicsLibrary.bigLabelColor;
		route.labelingInfo[0].symbol.haloColor = GraphicsLibrary.bigLabelHalo;

		secretRoute.labelingInfo[0].symbol.color = GraphicsLibrary.bigLabelColor;
		secretRoute.labelingInfo[0].symbol.haloColor = GraphicsLibrary.bigLabelHalo;

		layer.labelingInfo[0].symbol.color = GraphicsLibrary.labelColor;
		layer.labelingInfo[0].symbol.haloColor = GraphicsLibrary.labelHalo;

		secretlayer.labelingInfo[0].symbol.color = GraphicsLibrary.labelColor;
		secretlayer.labelingInfo[0].symbol.haloColor = GraphicsLibrary.labelHalo;

		const elementsMap = {
			"compass-container": "compass-container-dark",
			"box": "box-dark",
			"button": "button-dark",
			"clearcoords": "clearcoords-dark",
			"comment": "comment-dark",
			"daynight-slider-toggle-container": "daynight-slider-toggle-container-dark"
		};
	
		for (const [baseClass, darkClass] of Object.entries(elementsMap)) {
			const elements = document.getElementsByClassName(baseClass);
			for (let i = 0; i < elements.length; i++) {
				elements[i].classList.toggle(darkClass, darkMode);
			}
		}

		const buttons = document.getElementsByTagName("button");
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].classList.toggle("button-dark", darkMode);
		}

		document.body.classList.toggle(
		    "dark-theme",
		    darkMode
		);
		document.getElementById("compass_image").src =  darkMode ? "assets/img/downscaled_compass_dark.png" :  "assets/img/downscaled_compass.png";

		//tools
		document.getElementById("tool_line_black").src =  darkMode ? "assets/img/tools/line_white.svg" :  "assets/img/tools/line_black.svg";
		document.getElementById("tool_line_gray").src =  darkMode ? "assets/img/tools/line_darkgray.svg" :  "assets/img/tools/line_gray.svg";
		document.getElementById("tool_line_red").src =  darkMode ? "assets/img/tools/line_brightred.svg" :  "assets/img/tools/line_red.svg";
		document.getElementById("tool_circle").src =  darkMode ? "assets/img/tools/pair_of_compasses_dark.svg" :  "assets/img/tools/pair_of_compasses.svg";
		document.getElementById("tool_path").src =  darkMode ? "assets/img/tools/path_dark.svg" :  "assets/img/tools/path.svg";
		document.getElementById("tool_path_nolines").src =  darkMode ? "assets/img/tools/path_nolines_dark.svg" :  "assets/img/tools/path_nolines.svg";
		document.getElementById("tool_destination").src =  darkMode ? "assets/img/tools/destination_dark.svg" :  "assets/img/tools/destination.svg";
		document.getElementById("tool_eraser").src =  darkMode ? "assets/img/tools/eraser_dark.svg" :  "assets/img/tools/eraser.svg";

		for (let i = 0; i < buttons.length; i++) {
			buttons[i].style.backgroundColor = dark_mode ? "#2a242073": "#ffd8c273";
		}

		//annoying zoom menu that's controlled by arcgis internally
		function toggleEsriZoomDarkMode(isDark) {
			// Find the stylesheet and rule index for .esri-zoom
			let styleSheet = null, ruleIndex = -1;
			
			for (let i = 0; i < document.styleSheets.length && !styleSheet; i++) {
				try {
				const rules = document.styleSheets[i].cssRules || document.styleSheets[i].rules;
				for (let j = 0; j < rules.length; j++) {
					if (rules[j].selectorText === '.esri-zoom') {
						styleSheet = document.styleSheets[i];
						ruleIndex = j;
						break;
					}
				}
				} catch (e) { continue; } // Skip CORS-restricted stylesheets
			}
			
			if (!styleSheet || ruleIndex === -1) {
				console.error('Could not find .esri-zoom rule');
				return;
			}
			
			// Delete existing rule and insert modified version
			styleSheet.deleteRule(ruleIndex);
			
			const bgImages = isDark 
				? 'url("../assets/img/zenbg1_dark.png"), url("../assets/img/zenbg2_dark.png")'
				: 'url("../assets/img/zenbg1.png"), url("../assets/img/zenbg2.png")';
				
			const boxShadow = isDark
				? '0 0 .1vh .1vw #453e3a, 0 0 .15vh .15vw rgba(0, 0, 0, 0.671), 0 -.1vh .30vh .30vw #282422 !important'
				: '0 0 .1vh .1vw #E6E0D9, 0 0 .15vh .15vw rgba(0, 0, 0, 0.671), 0 -.1vh .30vh .30vw #C4B2A4 !important';
			
			styleSheet.insertRule(`.esri-zoom{
				font-size: 2vh;
				background: #c5b26300;
				background-image: ${bgImages};
				background-repeat: repeat-x, repeat;
				border-radius: .7vh;
				padding: .5vh;
				margin-bottom: 2vh;
				width: 100%;
				height: 100%;
				border: 0.3vh;
				border-style: solid;
				display: block;
				border-color: #00000096;
				box-shadow: ${boxShadow};
			}`, ruleIndex);
		}

		toggleEsriZoomDarkMode(darkMode);

		redrawMap();
		redrawEdge();
	}

	function redrawEdge(){
		if(!view.extent)
			return;

		const xmin = view.extent.xmin;
		const xmax = view.extent.xmax;
		const ymin = view.extent.ymin;
		const ymax = view.extent.ymax;
		const width_offset = view.extent.width * 0.03;
		const height_offset = view.extent.height * 0.04;

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
			const testpoint = new Graphic(GraphicsLibrary.degreeSideLabel);
			testpoint.geometry.latitude = i;
			testpoint.geometry.longitude = xmin + width_offset;
			testpoint.symbol.text = i.toFixed(decimals)+"°";
			edgeLayer.add(testpoint);
		}

		for(let i = long_min; i <= long_max; i+=step){
			const testpoint = new Graphic(GraphicsLibrary.degreeTopLabel);
			testpoint.geometry.latitude = ymax - height_offset;
			testpoint.geometry.longitude = i;
			testpoint.symbol.text = i.toFixed(decimals)+"°";
			edgeLayer.add(testpoint);
		}
	}

})()});

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
		const lat = parseFloat(mapObjects.path[i].pos[1]).toFixed(14);
		const long = parseFloat(mapObjects.path[i].pos[0]).toFixed(14);

		outstring += "						[\n";
		outstring += "							"+long+",\n";
		outstring += "							"+lat+"\n";

		if(i === mapObjects.path.length-1)
			outstring += "						]\n";
		else
			outstring += "						],\n";
	}

	outstring += "					]\n";

	console.log(outstring);
}

function updateSaveData(){
	localStorage.setItem("quicksave_data", JSON.stringify(mapObjects));
}

function prepareSaveData(data) {
	let version = data.version ?? 0;

	if(version < CURRENT_SAVE_VERSION){
		if(version === 0){
			// “circles” array has been added. Each element in the other arrays now has “id” and “type” values
			let nextId = 0;
			const circles = (data.circles || []).map(circle => ({
				...circle,
				id: nextId++,
				type: DrawMode.Circle
			}));

			nextId = 0;
			const lines = (data.lines || []).map(line => ({
				...line,
				id: nextId++
			}));

			nextId = 0;
			const paths = (data.path || []).map(path => ({
				...path,
				id: nextId++,
				type: DrawMode.Path
			}));

			nextId = 0;
			const points = (data.points || []).map(point => ({
				...point,
				id: nextId++,
				type: DrawMode.Point
			}));

			nextId = 0;
			const goals = (data.goals || []).map(point => ({
				...point,
				id: nextId++,
				type: DrawMode.Goal
			}));

			data = {
				...data,	
				lines: lines,
				circles: circles,
				path: paths,
				points: points,
				goals: goals,
				version: 1
			}
			version = 1
		}
	}

	return data;
}

function createDefaultSaveData() {
    return {
        version: CURRENT_SAVE_VERSION,
		lines: [],
		circles: [],
		path: [],
		points: [],
		goals: []
    };
}
