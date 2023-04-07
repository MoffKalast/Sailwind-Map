var routeJson = {
	"type": "FeatureCollection",
	"features": []
}

//From https://sailwind.fandom.com/wiki/Economy?file=World_Trade_Map.png
let trade_routes = [
	[[[-4.8682, 31.14], [-5.1, 32.75]],"beamreach"], //gold rock -> oasis 
	[[[-5.1, 32.75], [0.63, 40.3]],"downwind"], //oasis -> fort aestrin
	[[[-5.1, 32.75], [3.5802, 35.363]],"downwind"], //oasis -> happy bay
	[[[0.63, 40.3], [3.5802, 35.363]],"beamreach"],  //fort aestrin -> happy bay
	[[[3.5802, 35.363], [4.79, 31.4]],"beamreach"], //happy bay -> dragon cliffs
	[[[4.75, 31.3], [-2, 31.14]],"downwind"], //dragon cliffs -> midpoint
	[[[-2, 31.14], [-4.8682, 31.14]],"closehauled"], //midpoint -> gold rock
];

for (const route of trade_routes){
	routeJson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": route[0]
		},
		"properties":{
			"Type": route[1]
		}
	});
}

var secretRouteJson = {
	"type": "FeatureCollection",
	"features": []
}

let secret_routes = [
	[[[0.63, 40.3], [22.42764, 38.4074]],"downwind"], // fort aestrin -> chronos
	[[[3.5802, 35.363], [22.42764, 38.4074]],"downwind"], // happy bay -> chronos
	[[[4.79, 31.4], [5.9867, 33.0134]],"closehauled"], // dragon cliffs -> teapoint
	[[[5.9867, 33.0134], [22.42764, 38.4074]],"downwind"], // teapoint -> chronos
	[[[22.42764, 38.4074], [22.381017, 31.510734]],"closehauled"], // chronos -> dogleg
	[[[22.381017, 31.510734], [4.75, 31.3]],"downwind"], // dogleg  -> dragon cliffs
];


for (const route of secret_routes){
	secretRouteJson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": route[0]
		},
		"properties":{
			"Type": route[1]
		}
	});
}