var routeJson = {
	"type": "FeatureCollection",
	"features": []
}

//From https://sailwind.fandom.com/wiki/Economy?file=World_Trade_Map.png
let trade_routes = [
	[[-4.9, 31.15], [-5.1, 32.75]], //gold rock -> oasis 
	[[-5.1, 32.75], [1.2, 39.9]], //oasis -> aestrin
	[[-5.1, 32.75], [3.55, 35.3]], //oasis -> happy bay
	[[1.2, 39.9], [3.55, 35.3]], //aestrin -> happy bay
	[[3.55, 35.2], [4.75, 31.4]], //happy bay -> dragon cliffs
	[[4.75, 31.4], [-4.9, 31.15]], //dragon cliffs -> gold rock
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


