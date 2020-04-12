function createMap(container, initialCoordinates, zoomLevel) {
    let map = L.map(container);
    map.setView(initialCoordinates, zoomLevel);

    let layer = L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
                "pk.eyJ1IjoieGVub25pYSIsImEiOiJjazhkeWprZWkwd3UwM2xuMmt6ODRnMG03In0.8u5wKtDY_4Fkqu0V11reKQ"
        }
    );

    layer.addTo(map);
    return map;
}