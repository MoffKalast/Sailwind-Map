var windJson = {
	"type": "FeatureCollection",
	"features": []
}

//From https://sailwind.fandom.com/wiki/Trade_winds

let skip = false;

for (let long = minLong+0.5; long <= maxLong; long++) {
	for (let lat = minLat+0.5; lat <= maxLat; lat++) {
		
		if(lat > 33){
			let deltax = Math.sin(1.106539)*0.15;
			let deltay = Math.cos(1.106539)*0.15;
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
		else if(long < -2){
			let deltax = Math.sin(0.78539)*0.15;
			let deltay = Math.cos(0.78539)*0.15;
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
		else if(lat < 32){
			let deltax = Math.sin(4.2481314)*0.15;
			let deltay = Math.cos(4.2481314)*0.15;
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