//let maxLat = 44;
//let minLat = 27;
//let maxLong = 12;
//let minLong = -12;
let maxLat = 90;
let minLat = -90;
let maxLong = 90;
let minLong = -90;

let latdif = maxLat - minLat;
let longdif = maxLong - minLong;

var gridJson = {
	"type": "FeatureCollection",
	"features": []
}

for (i = 0; i <= longdif; i++) {
	gridJson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[minLong + i, maxLat + .25], [minLong + i, minLat - .25]]
		}
	});
}

for (i = 0; i <= latdif; i++) {
	gridJson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[minLong - .25, minLat + i], [maxLong + .25, minLat + i]]
		}
	});
}

var fineGrid = {
	"type": "FeatureCollection",
	"features": []
}

for (i = 0; i <= longdif; i += .25) {
	fineGrid.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[minLong + i, maxLat + .1], [minLong + i, minLat - .1]]
		}
	});
}

for (i = 0; i <= latdif; i += .25) {
	fineGrid.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[minLong - .1, minLat + i], [maxLong + .1, minLat + i]]
		}
	});
}

var ufineGrid = {
	"type": "FeatureCollection",
	"features": []
}

for (i = 0; i <= longdif; i += .05) {
	ufineGrid.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[minLong + i, maxLat + .035], [minLong + i, minLat - .035]]
		}
	});
}

for (i = 0; i <= latdif; i += .05) {
	ufineGrid.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[minLong - .035, minLat + i], [maxLong + .035, minLat + i]]
		}
	});
}

var labels = {
	"type": "FeatureCollection",
	"features": []
}

for (i = 0; i <= longdif; i++) {
	labels.features.push({
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [minLong + i, maxLat + .25]
		}, "properties": {
			"TextString": minLong + i + "°",
		}
	});
	labels.features.push({
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [minLong + i, minLat - .25]
		}, "properties": {
			"TextString": minLong + i + "°",
		}
	});
}

for (i = 0; i <= latdif; i++) {
	labels.features.push({
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [minLong - .25, minLat + i]
		}, "properties": {
			"TextString": minLat + i + "°",
		}
	});
	labels.features.push({
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [maxLong + .25, minLat + i]
		}, "properties": {
			"TextString": minLat + i + "°",
		}
	});
}


var bigLabels = {
	"type": "FeatureCollection",
	"features": []
}

bigLabels.features.push({
	"type": "Feature",
	"geometry": {
		"type": "Point",
		"coordinates": [-4, 32.4]
	}, "properties": {
		"TextString": "Al'Ankh",
	}
});

bigLabels.features.push({
	"type": "Feature",
	"geometry": {
		"type": "Point",
		"coordinates": [0.5, 38.8]
	}, "properties": {
		"TextString": "Aestrin",
	}
});

bigLabels.features.push({
	"type": "Feature",
	"geometry": {
		"type": "Point",
		"coordinates": [2.85, 32]
	}, "properties": {
		"TextString": "Emerald\nArchipelago",
	}
});

bigLabels.features.push({
	"type": "Feature",
	"geometry": {
		"type": "Point",
		"coordinates": [15.1, 35.5]
	}, "properties": {
		"TextString": "Here be dragons",
	}
});