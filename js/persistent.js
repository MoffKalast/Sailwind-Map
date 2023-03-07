//saving and loading with localstorage

function saveLocal() {
	bob = lineGraphicsLayer.graphics.items[0]
	console.log(bob.geometry.paths)
	localStorage.setItem("paths", JSON.stringify(bob.geometry.paths));
};

function getLocal() {
	loaded = true;
	var nemo = localStorage.getItem("paths")
	paths = JSON.parse(nemo);

	var newLineGraphic = polylineGraphic.clone();
	newLineGraphic.geometry.paths = JSON.parse(nemo);
	paths = paths[0]

	for (i = 0; i < paths.length; i++) {
		var newPointGraphic = pointGraphic.clone();
		part = paths[i]
		newPointGraphic.geometry.latitude = part[1];
		newPointGraphic.geometry.longitude = part[0];
		graphicsLayer.add(newPointGraphic)
	}

	var totalDist = 0;
	if (paths.length > 1) {
		for (i = 0; i < paths.length; i++) {
			if (i != paths.length - 1) {
				totalDist += getDistanceFromLatLonInKm(paths[i][1], paths[i][0], paths[i + 1][1], paths[i + 1][0])
			}
		}
		document.getElementById("traveldist").innerHTML = String(Math.round(totalDist * 10) / 10 + "nm");
	}
	lineGraphicsLayer.add(newLineGraphic);

};