var routeJson = {
	"type": "FeatureCollection",
	"features": []
}

//From https://sailwind.fandom.com/wiki/Economy?file=World_Trade_Map.png
let trade_routes = [
	[[-4.9, 31.15], [-5.1, 32.75]], //gold rock -> fortoasis 
	[[-5.1, 32.75], [0.63, 40.3]], //oasis -> fort aestrin
	[[-5.1, 32.75], [3.55, 35.3]], //oasis -> happy bay
	[[1.2, 39.9], [3.55, 35.3]],  //mt malefic -> happy bay
	[[3.55, 35.2], [4.79, 31.4]], //happy bay -> dragon cliffs
	[[0.63, 40.3], [4.73, 31.4]], //fort aestrin -> dragon cliffs
	[[4.75, 31.3], [-4.9, 31.15]], //dragon cliffs -> gold rock
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