
$(function() {

    let map = createMap("map", [1.3521, 103.8198], 13);
    
    axios.get("testingtiger.json").then(function(response){
        
        
        
        // let location = response.data.features[0].geometry.coordinates;
        let locations = response.data.features;
        for(l of locations){
            let lat = l.geometry.coordinates[1];
            let lng = l.geometry.coordinates[0];
            let m = L.marker([lat,lng]);
            console.log(l.geometry.coordinates);
            m.addTo(map);
        }
        
    })

    
})

