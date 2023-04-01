var routeJson = {
	"type": "FeatureCollection",
	"features": []
}

//From https://sailwind.fandom.com/wiki/Economy?file=World_Trade_Map.png
let trade_routes = [
	[[-4.8682, 31.14], [-5.1, 32.75]], //gold rock -> fortoasis 
	[[-5.1, 32.75], [0.63, 40.3]], //oasis -> fort aestrin
	[[-5.1, 32.75], [3.5802, 35.363]], //oasis -> happy bay
	[[0.63, 40.3], [3.5802, 35.363]],  //fort aestrin -> happy bay
	[[3.5802, 35.363], [4.79, 31.4]], //happy bay -> dragon cliffs
	[[4.75, 31.3], [-4.8682, 31.14]], //dragon cliffs -> gold rock
];




for (const route of trade_routes){
	routeJson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": route
		}
	});
}