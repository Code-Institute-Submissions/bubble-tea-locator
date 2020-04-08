$(function() {

    let map = createMap("map", [1.3521, 103.8198], 12);

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
             marker.on('click',function(){
                $('#venuedetail').text(`Name: ${t.properties.name}`)
                $('#venueaddress').text(`Address: ${t.properties.address}`)

             })
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
            marker.on('click',function(){
                $('#venuedetail').text(`Name: ${x.properties.name}`)
                $('#venueaddress').text(`Address: ${x.properties.address}`)

             })
             xinfutangGroup.addLayer(marker);
        }

        map.addLayer(tigerGroup);
        map.addLayer(xinfutangGroup);

        let bbtLayers = {
            'Tiger Sugar':tigerGroup,
            'Xinfutang':xinfutangGroup,
            
        }

        let control = L.control.layers(bbtLayers).addTo(map);
        map.addControl(control);

        $("#reset").click(function(){
            if(map.hasLayer(tigerGroup)){
                map.addLayer(xinfutangGroup)
                map.closePopup();
            } else if(map.hasLayer(xinfutangGroup)){
                map.addLayer(tigerGroup)
                map.closePopup();
                

            } 
        })



    }))

    let clientID="CDFVB3SURCZJXSPXHG3T253BMK1ORA2WBFJIFMHXLYC2HGUF";
    let clientSecret="ZHLZQQ11MP5AZW1TPND2E01CYGECL2MCDJAMCUHBRDU0S1HS";

    let apiURL="https://api.foursquare.com/v2/venues/search";
    let venueURL="https://api.foursquare.com/v2/venues/";

    axios.get(apiURL,{
        params:{
            client_id:clientID,
            client_secret:clientSecret,
            near:'Singapore',
            intent:'browse',
            v:"20200408",
            categoryId:"52e81612bcbc57f1066b7a0c"

        }
    }).then(function(response){
        let venues = response.data.response.venues;
        for(let place of venues){
            let bbmarker=L.marker([place.location.lat,place.location.lng]);
            bbmarker.bindPopup(`<table><tr><th>Name:</th><td>${place.name}</td></tr>
                                <tr><th>Address:</th><td>${place.location.formattedAddress}</td></table>`);
            bbmarker.on('click',function(){
                axios.get(venueURL+place.id,{params:{
                    client_id:clientID,
                    client_secret:clientSecret,
                    v:"20200804"
                    
                }
                }).then(function(detail){
                    $('#venuedetail').text(detail.data.response.venue.name)
                    $('#venueaddress').text(detail.data.response.venue.location.formattedAddress)

                   
                })
            })

            
            bbmarker.addTo(map);
        }
    })
    
})




