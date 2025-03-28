var windJson = {
	"type": "FeatureCollection",
	"features": []
}

//From https://sailwind.fandom.com/wiki/Trade_winds

//last known in-game code
/* if (z < 30f){
    return Vector3.zero;
}
if (z > 33){
    return new Vector3(1f, 0f, 0.5f).normalized;
}
if (x < -2f){
    return new Vector3(0.75f, 0f, 0.75f).normalized;
}
if (z < 32){
    return new Vector3(-1f, 0f, -0.5f).normalized;
}
return Vector3.zero; */


let skip = false;

for (let long = minLong+0.5; long <= maxLong; long++) {
	for (let lat = minLat+0.5; lat <= maxLat; lat++) {
		
		if(lat > 33){
			let deltax = 0.134164;//Math.sin(1.106539)*0.15;
			let deltay = 0.0670820;//Math.cos(1.106539)*0.15;
			windJson.features.push({
				"type": "Feature",
				"geometry": {
					"type": "LineString",
					"coordinates": [[long-deltax, lat-deltay], [long+deltax, lat+deltay]]
				},
				"properties":{
					"Region": "Aestrin"
				}
			});
		}
		else if(long < -2 && lat > 30){
			let deltax = 0.106066;//Math.sin(0.78539)*0.15;
			let deltay = 0.106066;//Math.cos(0.78539)*0.15;
			windJson.features.push({
				"type": "Feature",
				"geometry": {
					"type": "LineString",
					"coordinates": [[long-deltax, lat-deltay], [long+deltax, lat+deltay]]
				},
				"properties":{
					"Region": "Al'Ankh"
				}
			});
		}
		else if(lat < 32 && lat > 30){
			let deltax = -0.1341640;//Math.sin(4.2481314)*0.15;
			let deltay =  -0.0670828;//Math.cos(4.2481314)*0.15;
			windJson.features.push({
				"type": "Feature",
				"geometry": {
					"type": "LineString",
					"coordinates": [[long-deltax, lat-deltay], [long+deltax, lat+deltay]]
				},
				"properties":{
					"Region": "Emerald"
				}
			});
		}
	}
}

/* for (let i = minLong; i <= maxLong; i+=2) {
	let opposite = Math.tan(1.106539) * (70-30);
	windJson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[i, 33], [i+opposite, 70]]
		},
		"properties":{
			"Region": "Aestrin"
		}
	});
}

for (let i = minLat; i <= maxLat; i+=2) {
	let opposite = Math.tan(-0.78539) * 58;
	windJson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[-2, i], [-60, i+opposite]]
		},
		"properties":{
			"Region": "Al'Ankh"
		}
	});
}

for (let i = minLong; i <= maxLong; i+=2) {
	let opposite = Math.tan(4.2481314) * 32;
	windJson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[i, 32], [i-opposite, 0]]
		},
		"properties":{
			"Region": "Emerald"
		}
	});
} */