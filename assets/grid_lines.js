let maxLat = 44;
let minLat = 27;
let maxLong = 12;
let minLong = -12;

let latdif = maxLat - minLat;
let longdif = maxLong - minLong;

var json = {
	"type": "FeatureCollection",
	"features": []
}


for (i = 0; i <= longdif; i++) {
	json.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[minLong + i, maxLat + .25], [minLong + i, minLat - .25]]
		}
	});
}

for (i = 0; i <= latdif; i++) {
	json.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[minLong - .25, minLat + i], [maxLong + .25, minLat + i]]
		}
	});
}

var gridJson = json

var fjson = {
	"type": "FeatureCollection",
	"features": []
}

for (i = 0; i <= longdif; i += .25) {
	fjson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[minLong + i, maxLat + .1], [minLong + i, minLat - .1]]
		}
	});
}

for (i = 0; i <= latdif; i += .25) {
	fjson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[minLong - .1, minLat + i], [maxLong + .1, minLat + i]]
		}
	});
}
var fineGrid = fjson

var ujson = {
	"type": "FeatureCollection",
	"features": []
}

for (i = 0; i <= longdif; i += .05) {
	ujson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[minLong + i, maxLat + .035], [minLong + i, minLat - .035]]
		}
	});
}

for (i = 0; i <= latdif; i += .05) {
	ujson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "LineString",
			"coordinates": [[minLong - .035, minLat + i], [maxLong + .035, minLat + i]]
		}
	});
}
var ufineGrid = ujson

var labeljson = {
	"type": "FeatureCollection",
	"features": []
}


for (i = 0; i <= longdif; i++) {
	labeljson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [minLong + i, maxLat + .25]
		}, "properties": {
			"TextString": minLong + i + "°",
		}
	});
	labeljson.features.push({
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
	labeljson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [minLong - .25, minLat + i]
		}, "properties": {
			"TextString": minLat + i + "°",
		}
	});
	labeljson.features.push({
		"type": "Feature",
		"geometry": {
			"type": "Point",
			"coordinates": [maxLong + .25, minLat + i]
		}, "properties": {
			"TextString": minLat + i + "°",
		}
	});
}
//console.log(labeljson)
var labels = labeljson