//cursor indicator lines
window.onmousemove = function (e) {
	console.log(e)
	document.getElementById("horizCursorline").style.top = e.screenY+"px";
	document.getElementById("vertCursorline").style.left = e.screenX+"px";
};

function getCompassStringFromDeg(deg){
	const compassLabels = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	let index = clamp(parseInt((deg + 11.5) / 22.5), 0, 16);

	if(index < 0 || index > 15)
		index = 0;

	return compassLabels[index];
}

// utils
function getDistanceFromLatLonInNm(lat1, lon1, lat2, lon2) {
	//var R =  5765; // Radius of the earth in km
	//var dLat = deg2rad(lat2-lat1);  // deg2rad below
	//var dLon = deg2rad(lon2-lon1); 
	//var a = 
	//  Math.sin(dLat/2) * Math.sin(dLat/2) +
	//  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	// Math.sin(dLon/2) * Math.sin(dLon/2)
	//  ; 
	//var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	// var d = R * c; // Distance in km

	var d = Math.sqrt(Math.pow((lat2 - lat1), 2) + Math.pow((lon2 - lon1), 2)) * 90
	return d;
}

function distancePointToLineSegment(point, segmentStart, segmentEnd) {
    const [px, py] = point;
    const [x1, y1] = segmentStart;
    const [x2, y2] = segmentEnd;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const lengthSquared = dx * dx + dy * dy;

    let t = ((px - x1) * dx + (py - y1) * dy) / lengthSquared;
    t = Math.max(0, Math.min(1, t));

    const closestX = x1 + t * dx;
    const closestY = y1 + t * dy;

    const distanceSquared = (px - closestX) * (px - closestX) + (py - closestY) * (py - closestY);

    return Math.sqrt(distanceSquared);
}

function deg2rad(deg) {
	return deg * (Math.PI / 180)
}

function toRadians(degrees) {
	return degrees * Math.PI / 180;
};

function toDegrees(radians) {
	return radians * 180 / Math.PI;
};

function clamp(val, from, to){
    if(val > to)
        return to;
    if(val < from)
        return from;
    return val;
}

function getBearing(startLat, startLng, destLat, destLng) {
	var deltaX = destLat - startLat;
	var deltaY = destLng - startLng;

	var radians = Math.atan2(deltaY, deltaX)
	var degrees = ((radians * 180) / Math.PI);

	return (degrees + 360) % 360;
};