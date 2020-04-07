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
            categoryId:"52e81612bcbc57f1066b7a0c"

        }
    }).then(function(response){
        let venues = response.data.response.venues;
        for(let v of venues){
            let bbmarker=L.marker([v.location.lat,v.location.lng]);
            bbmarker.bindPopup(`<p>${v.name}</p>`);
            bbmarker.on('click',function(e){
                axios.get(venueURL+v.id,{params:{
                    client_id:clientID,
                    client_secret:clientSecret,
                    v:"20200804"
                }
                }).then(function(detail){
                    $('#venuedetail').text(detail.data.response.venue.name)
                })
            })

            
            bbmarker.addTo(map);
        }
    })
    
})




