$(function() {

    let map = createMap("map", [1.3521, 103.8198], 12);

    let promise = [axios.get('Data/testingtiger.geojson'),axios.get('Data/xinfutang.geojson'),axios.get('Data/koi.geojson')];
    axios.all(promise).then(axios.spread(function(tiger,xinfutang,koi){
        
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
                $('#venuehour').text(`Opening-Hour: ${t.properties.hour}`)

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
                $('#venuedetail').text(`Name: ${x.properties.name}`);
                $('#venueaddress').text(`Address: ${x.properties.address}`);
                $('#venuehour').text(`Opening-Hour: ${x.properties.hour}`)
                
             })

             xinfutangGroup.addLayer(marker);
            
             
        }

        let koiGroup = L.layerGroup();
        for (let k of koi.data.features){
             let lat = k.geometry.coordinates[1];
             let lng = k.geometry.coordinates[0];
             let marker = L.marker([lat,lng]);
             marker.bindPopup(`<table><tr><th>Name:</th><td>${k.properties.name}</td></tr>
                                <tr><th>Address:</th><td>${k.properties.address}</td></tr>
                                <tr><th>Opening-hours:</th><td>${k.properties.hour}</td></tr></table>`);
            marker.on('click',function(){
                $('#venuedetail').text(`Name: ${k.properties.name}`);
                $('#venueaddress').text(`Address: ${k.properties.address}`);
                $('#venuehour').text(`Opening-Hour: ${k.properties.hour}`)
                
             })

             koiGroup.addLayer(marker);
            
             
        }

        map.addLayer(tigerGroup);
        map.addLayer(xinfutangGroup);
        map.addLayer(koiGroup);
        

        let bbtLayers = {
            'Tiger Sugar':tigerGroup,
            'Xinfutang':xinfutangGroup,
            'Koi':koiGroup,
            
        }

    

        let control = L.control.layers(bbtLayers).addTo(map);
        map.addControl(control);

        $("#reset").click(function(){
            if(map.hasLayer(tigerGroup) && map.hasLayer(xinfutangGroup) && map.hasLayer(koiGroup)){
                map.removeLayer(tigerGroup)
                map.removeLayer(xinfutangGroup)
                map.removeLayer(koiGroup)
            }
            if(map.hasLayer(tigerGroup)){
                map.addLayer(xinfutangGroup)
                map.addLayer(koiGroup)
                map.closePopup();
            } else if(map.hasLayer(xinfutangGroup)){
                map.addLayer(tigerGroup)
                map.addLayer(koiGroup)
                map.closePopup();
            } else if(map.hasLayer(koiGroup)){
                map.addLayer(xinfutangGroup)
                map.addLayer(tigerGroup)
                map.closePopup();
            } 
        })



    }))

    let clientID="TP1OGF4LPNBRT25GCKPPD035ZWX5ZEVUHR0VBVA5VYU3WTLF";
    let clientSecret="WS143U3Y1EXII1WNZZWOYV2I30DTACSTX5IJMM0C1HTWMW0U";

    let apiURL="https://api.foursquare.com/v2/venues/search";
    let venueURL="https://api.foursquare.com/v2/venues/";

    axios.get(apiURL,{
        params:{
            client_id:clientID,
            client_secret:clientSecret,
            near:'Singapore',
            intent:'browse',
            v:"20200408",
            categoryId:"4bf58dd8d48988d1fd941735"

        }
    }).then(function(response){
        let venues = response.data.response.venues;
        for(let place of venues){
            let bbmarker=L.circle([place.location.lat,place.location.lng],{
                    radius:200,
                    color:'red'
            });
            bbmarker.bindPopup(`<table><tr><th>Name: </th><td>${place.name}</td></tr>
                                <tr><th>Address: </th><td>${place.location.address}</td></table>`);
            bbmarker.on('click',function(){
                axios.get(venueURL+place.id,{params:{
                    client_id:clientID,
                    client_secret:clientSecret,
                    v:"20200409"
                    
                }
                }).then(function(detail){
                    $('#venuedetail').text(`Name: ${detail.data.response.venue.name}`)
                    $('#venueaddress').text(`Address: ${detail.data.response.venue.location.address}`)

                   
                })
            })

            
            

            $("#shopping").click(function(){
            if(map.hasLayer(bbmarker)){
               map.removeLayer(bbmarker)
            } else{
                bbmarker.addTo(map);
                

            } 
        })


        }
    })

    
    
})





