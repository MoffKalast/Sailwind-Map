var mapBorderJson = {
	"type": "FeatureCollection",
	"features": []
}

let limits = [
	[[-12, 46], [32, 46]],
	[[32, 46], [32, 26]],
	[[-12, 26], [32, 26]],
	[[-12, 46], [-12, 26]]
]

for (const line of limits){
	mapBorderJson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": line
		}
	});
}



let maxLat = 70;
let minLat = 0;

let maxLong = 60;
let minLong = -60;

var gridJson = {
	"type": "FeatureCollection",
	"features": []
}

var fineGrid = {
	"type": "FeatureCollection",
	"features": []
}

var ufineGrid = {
	"type": "FeatureCollection",
	"features": []
}

// Generate lines without duplication, upscaled by 100 to get percise integer mod comparisons

// Longitude lines
for (let i = minLong*100; i <= maxLong*100; i+=5) {
	let float_i = i/100.0;
    if (i % 100 === 0) {
		gridJson.features.push({
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [[float_i, maxLat + 0.25], [float_i, minLat - 0.25]]
			}
		});
    }
    // draw lines every 0.25 units
    else if (i % 25 === 0) {
		fineGrid.features.push({
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [[float_i, maxLat + 0.1], [float_i, minLat - 0.1]]
			}
		});
    }
    // draw lines every 0.05 units
    else if (i % 5 === 0) {
		ufineGrid.features.push({
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [[float_i, maxLat + 0.035], [float_i, minLat - 0.035]]
			}
		});
    }
}

// Latitude lines
for (let i = minLat*100; i <= maxLat*100; i+=5) {
	let float_i = i/100.0;
    if (i % 100 === 0) {
		gridJson.features.push({
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [[minLong - 0.25, float_i], [maxLong + 0.25, float_i]]
			}
		});
    }
    // draw lines every 0.25 units
    else if (i % 25 === 0) {
		fineGrid.features.push({
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [[minLong - 0.1, float_i], [maxLong + 0.1, float_i]]
			}
		});
    }
    // draw lines every 0.05 units
    else if (i % 5 === 0) {
		ufineGrid.features.push({
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [[minLong - 0.035, float_i], [maxLong + 0.035, float_i]]
			}
		});
    }
}

var bigLabelJson = {
	"type": "FeatureCollection",
	"features": []
}

bigLabelJson.features.push({
	"type": "Feature",
	"geometry": {
		"type": "Point",
		"coordinates": [-4, 32.4]
	}, "properties": {
		"TextString": "Al'Ankh",
	}
});

bigLabelJson.features.push({
	"type": "Feature",
	"geometry": {
		"type": "Point",
		"coordinates": [0.5, 38.8]
	}, "properties": {
		"TextString": "Aestrin",
	}
});

bigLabelJson.features.push({
	"type": "Feature",
	"geometry": {
		"type": "Point",
		"coordinates": [2.85, 32]
	}, "properties": {
		"TextString": "Emerald\nArchipelago",
	}
});

bigLabelJson.features.push({
	"type": "Feature",
	"geometry": {
		"type": "Point",
		"coordinates": [3, 28.7]
	}, "properties": {
		"TextString": "Fire Fish Lagoon",
	}
});

/* bigLabelJson.features.push({
	"type": "Feature",
	"geometry": {
		"type": "Point",
		"coordinates": [11.1, 38.5]
	}, "properties": {
		"TextString": "Here be dragons",
	}
});
 */
