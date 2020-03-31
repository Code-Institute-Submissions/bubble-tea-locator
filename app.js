
$(function() {

    let map = createMap("map", [1.3521, 103.8198], 13);
    console.log("testingtiger.geojson")

    axios.get("testingtiger.geojson").then(function(b){
        let location = b.features[x].geometry.coordinates
        console.log(location)
        for (let l of location){
            let place = L.marker([l[1],l[0]]);
            place.addTo(map);
        }
        
    })
  
})

