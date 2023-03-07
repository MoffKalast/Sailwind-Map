//cursor indicator lines
window.onmousemove = function (element) {
	document.getElementById("horizCursorline").style.top = event.y;
	document.getElementById("vertCursorline").style.left = event.x;
};

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
function deg2rad(deg) {
	return deg * (Math.PI / 180)
}

function toRadians(degrees) {
	return degrees * Math.PI / 180;
};

function toDegrees(radians) {
	return radians * 180 / Math.PI;
};

function getBearing(startLat, startLng, destLat, destLng) {
	var deltaX = destLat - startLat;
	var deltaY = destLng - startLng;

	var radians = Math.atan2(deltaY, deltaX)
	var degrees = ((radians * 180) / Math.PI);

	//startLat = toRadians(startLat);
	//startLng = toRadians(startLng);
	//destLat = toRadians(destLat);
	//destLng = toRadians(destLng);

	//y = Math.sin(destLng - startLng) * Math.cos(destLat);
	//x = Math.cos(startLat) * Math.sin(destLat) -
	//      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
	//brng = Math.atan2(y, x);
	//brng = toDegrees(brng);
	return (degrees + 360) % 360;
};