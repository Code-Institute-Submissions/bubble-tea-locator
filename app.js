
$(function() {

    let map = createMap("map", [1.3521, 103.8198], 13);

    let promise = [axios.get('testingtiger.geojson'),axios.get('xinfutang.geojson')];
    axios.all(promise).then(axios.spread(function(tiger,xinfutang){
        
        let tigerGroup = L.layerGroup();
        for (let t of tiger.data.features){
             let lat = t.geometry.coordinates[1];
             let lng = t.geometry.coordinates[0];
             let marker = L.marker([lat,lng]);
             marker.bindPopup(`<table><tr><th>Name:</th><td>${t.properties.name}</td></tr>
                                <tr><th>Address:</th><td>${t.properties.address}</td></tr>
                                <tr><th>Opening-hours:</th><td>${t.properties.hour}</td></tr></table>`);
             tigerGroup.addLayer(marker);
        }
        
        let xinfutangGroup = L.layerGroup();
        for (let x of xinfutang.data.features){
             let lat = x.geometry.coordinates[1];
             let lng = x.geometry.coordinates[0];
             let marker = L.marker([lat,lng]);
             marker.bindPopup(`<table><tr><th>Name:</th><td>${x.properties.name}</td></tr>
                                <tr><th>Address:</th><td>${x.properties.address}</td></tr>
                                <tr><th>Opening-hours:</th><td>${x.properties.hour}</td></tr></table>`);
             xinfutangGroup.addLayer(marker);
        }

        map.addLayer(tigerGroup);
        map.addLayer(xinfutangGroup);

        let bbtLayers = {
            'Tiger Sugar':tigerGroup,
            'Xinfutang':xinfutangGroup
        }

        let control = L.control.layers(bbtLayers).addTo(map);
        map.addControl(control);

    



    }))
    
})

