
$(function() {

    let map = createMap("map", [1.3521, 103.8198], 13);
    
    axios.get("testingtiger.json",{
        params:{
            "name":"name",
            "address":"address",
            "hour":"hour",
        }
    }).then(function(response){
        
        
        // let location = response.data.features[0].geometry.coordinates;
        let locations = response.data.features;
        for(l of locations){
            let lat = l.geometry.coordinates[1];
            let lng = l.geometry.coordinates[0];
            let m = L.marker([lat,lng]);
            console.log(l.geometry.coordinates);
            m.bindPopup(`<table><tr><th>Name:</th><td>${l.properties.name}</td></tr>
                        <tr><th>Address:</th><td>${l.properties.address}</td></tr>
                        <tr><th>Opening-hours:</th><td>${l.properties.hour}</td></tr></table>`);
            m.addTo(map)
        

        }
        
    })

    
})

