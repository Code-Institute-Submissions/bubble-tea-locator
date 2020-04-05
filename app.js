
$(function() {

    let map = createMap("map", [1.3521, 103.8198], 13);
    
    // axios.get("testingtiger.geojson",{
    //     params:{
    //         "name":"name",
    //         "address":"address",
    //         "hour":"hour",
    //     }
    // }).then(function(response){
        
        
    //     // let location = response.data.features[0].geometry.coordinates;
    //     let locations = response.data.features;
    //     for(l of locations){
    //         let lat = l.geometry.coordinates[1];
    //         let lng = l.geometry.coordinates[0];
    //         let m = L.marker([lat,lng]);
    //         console.log(l.geometry.coordinates);
    //         m.bindPopup(`<table><tr><th>Name:</th><td>${l.properties.name}</td></tr>
    //                     <tr><th>Address:</th><td>${l.properties.address}</td></tr>
    //                     <tr><th>Opening-hours:</th><td>${l.properties.hour}</td></tr></table>`);
    //         m.addTo(map)
        

    //     }
        
    // })

    let promise = [axios.get('testingtiger.geojson'),axios.get('xinfutang.geojson')];
    axios.all(promise).then(axios.spread(function(tiger,xinfutang){
        
        let tigerGroup = L.layerGroup();
        for (let t of tiger.data.features){
             let lat = t.geometry.coordinates[1];
             let lng = t.geometry.coordinates[0];
             let marker = L.marker([lat,lng]);
             tigerGroup.addLayer(marker);
        }
        
        let xinfutangGroup = L.layerGroup();
        for (let x of xinfutang.data.features){
             let lat = x.geometry.coordinates[1];
             let lng = x.geometry.coordinates[0];
             let marker = L.marker([lat,lng]);
             xinfutangGroup.addLayer(marker);
        }

        map.addLayer(tigerGroup);
        map.addLayer(xinfutangGroup);


    }))
    
})

