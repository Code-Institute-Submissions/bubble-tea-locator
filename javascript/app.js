$(function () {

    let map = createMap("map", [1.3521, 103.8198], 11);

    let promise = [axios.get('Data/testingtiger.geojson'), axios.get('Data/xinfutang.geojson'), axios.get('Data/koi.geojson'), axios.get('Data/thealley.geojson')];
    axios.all(promise).then(axios.spread(function (tiger, xinfutang, koi, thealley) {

        let tigerGroup = L.layerGroup();
        for (let t of tiger.data.features) {
            let lat = t.geometry.coordinates[1];
            let lng = t.geometry.coordinates[0];
            let marker = L.marker([lat, lng], { icon: tigerIcon });
            marker.bindPopup(`<table><tr><th>Name:</th><td>${t.properties.name}</td></tr>
                                <tr><th>Address:</th><td>${t.properties.address}</td></tr>
                                <tr><th>Opening-hours:</th><td>${t.properties.hour}</td></tr></table>`);
            marker.on('click', function () {
                $('#venuedetail').text(t.properties.name)
                $('#venueaddress').text(`Address: ${t.properties.address}`)
                $('#venuehour').text(`Opening-Hour: ${t.properties.hour}`)
                map.setView([lat, lng], 20)

            })
            tigerGroup.addLayer(marker);
        }

        let xinfutangGroup = L.layerGroup();
        for (let x of xinfutang.data.features) {
            let lat = x.geometry.coordinates[1];
            let lng = x.geometry.coordinates[0];
            let marker = L.marker([lat, lng], { icon: xftIcon });
            marker.bindPopup(`<table><tr><th>Name:</th><td>${x.properties.name}</td></tr>
                                <tr><th>Address:</th><td>${x.properties.address}</td></tr>
                                <tr><th>Opening-hours:</th><td>${x.properties.hour}</td></tr></table>`);
            marker.on('click', function () {
                $('#venuedetail').text(x.properties.name);
                $('#venueaddress').text(`Address: ${x.properties.address}`);
                $('#venuehour').text(`Opening-Hour: ${x.properties.hour}`)
                map.setView([lat, lng], 20)

            })

            xinfutangGroup.addLayer(marker);


        }

        let koiGroup = L.layerGroup();
        for (let k of koi.data.features) {
            let lat = k.geometry.coordinates[1];
            let lng = k.geometry.coordinates[0];
            let marker = L.marker([lat, lng], { icon: koiIcon });
            marker.bindPopup(`<table><tr><th>Name:</th><td>${k.properties.name}</td></tr>
                                <tr><th>Address:</th><td>${k.properties.address}</td></tr>
                                <tr><th>Opening-hours:</th><td>${k.properties.hour}</td></tr></table>`);
            marker.on('click', function () {
                $('#venuedetail').text(k.properties.name);
                $('#venueaddress').text(`Address: ${k.properties.address}`);
                $('#venuehour').text(`Opening-Hour: ${k.properties.hour}`)
                map.setView([lat, lng], 20)

            })

            koiGroup.addLayer(marker);


        }

        let alleyGroup = L.layerGroup();
        for (let a of thealley.data.features) {
            let lat = a.geometry.coordinates[1];
            let lng = a.geometry.coordinates[0];
            let marker = L.marker([lat, lng], { icon: alleyIcon });
            marker.bindPopup(`<table><tr><th>Name:</th><td>${a.properties.name}</td></tr>
                                <tr><th>Address:</th><td>${a.properties.address}</td></tr>
                                <tr><th>Opening-hours:</th><td>${a.properties.hour}</td></tr></table>`);
            marker.on('click', function () {
                $('#venuedetail').text(a.properties.name)
                $('#venueaddress').text(`Address: ${a.properties.address}`)
                $('#venuehour').text(`Opening-Hour: ${a.properties.hour}`)
                map.setView([lat, lng], 20)

            })
            alleyGroup.addLayer(marker);
        }

        map.addLayer(tigerGroup);
        map.addLayer(xinfutangGroup);
        map.addLayer(koiGroup);
        map.addLayer(alleyGroup);


        let bbtLayers = {
            'Tiger Sugar': tigerGroup,
            'Xinfutang': xinfutangGroup,
            'Koi': koiGroup,
            'The Alley': alleyGroup,

        }



        let control = L.control.layers(bbtLayers).addTo(map);
        map.addControl(control);

        // To Reset The Map
        $("#reset").click(function () {
            map.addLayer(tigerGroup);
            map.addLayer(xinfutangGroup);
            map.addLayer(koiGroup);
            map.addLayer(alleyGroup);
            map.setView([1.3521, 103.8198], 11);
            map.closePopup();

        })
        // To Remove all marker
        $("#Removebbmarker").click(function () {
            map.removeLayer(tigerGroup)
            map.removeLayer(xinfutangGroup)
            map.removeLayer(koiGroup)
            map.removeLayer(alleyGroup)

        })



    }))
    // changing from default icon
    let bubbleIcon = L.Icon.extend({
        options: {
            iconSize: [25, 60],
            iconAnchor: [22, 54],
            popupAnchor: [-3, -76]
        }
    });

    let tigerIcon = new bubbleIcon({ iconUrl: 'image/tiger.png' }),
        koiIcon = new bubbleIcon({ iconUrl: 'image/koilogo.png' }),
        xftIcon = new bubbleIcon({ iconUrl: 'image/xftlogo.png' }),
        alleyIcon = new bubbleIcon({ iconUrl: 'image/alleylogo.png' })
    menIcon = new bubbleIcon({ iconUrl: 'image/men.png' })


    let clientID = "TP1OGF4LPNBRT25GCKPPD035ZWX5ZEVUHR0VBVA5VYU3WTLF";
    let clientSecret = "WS143U3Y1EXII1WNZZWOYV2I30DTACSTX5IJMM0C1HTWMW0U";

    let apiURL = "https://api.foursquare.com/v2/venues/search";
    let venueURL = "https://api.foursquare.com/v2/venues/";

    // get all shopping mall api
    axios.get(apiURL, {
        params: {
            client_id: clientID,
            client_secret: clientSecret,
            near: 'Singapore',
            intent: 'browse',
            v: "20200408",
            categoryId: "4bf58dd8d48988d1fd941735"

        }
    }).then(function (response) {
        let venues = response.data.response.venues;
        for (let place of venues) {
            let bbmarker = L.circle([place.location.lat, place.location.lng], {
                radius: 200,
                color: 'red'
            });
            bbmarker.bindPopup(`<table><tr><th>Name: </th><td>${place.name}</td></tr>
                                <tr><th>Address: </th><td>${place.location.address}</td></table>`);
            bbmarker.on('click', function () {
                axios.get(venueURL + place.id, {
                    params: {
                        client_id: clientID,
                        client_secret: clientSecret,
                        v: "20200409"

                    }
                }).then(function (detail) {
                    $('#venuedetail').text(detail.data.response.venue.name)
                    $('#venueaddress').text(`Address: ${detail.data.response.venue.location.address}`)
                    map.setView([place.location.lat, place.location.lng], 17)


                })
            })



            // on and off shopping layer
            $("#shopping").click(function () {
                if (map.hasLayer(bbmarker)) {
                    map.removeLayer(bbmarker)
                } else {
                    bbmarker.addTo(map);


                }
            })


        }
    })

    // Alert welcome
    window.alert("Hello!!!\nWelcome to the Bubble Tea Store Locator");


    // Button to view current location
    L.easyButton('fas fa-male', function (btn, map) {

        function onLocationFound(e) {
            let men = L.marker(e.latlng, { icon: menIcon });
            men.bindPopup("You are Here!!").openPopup();
            men.addTo(map);
            men.on('click', function () {
                map.setView(e.latlng, 13)

            })


        }

        map.on('locationfound', onLocationFound);
        map.locate({ setView: true, watch: true, maxZoom: 13 });
        // function to let u know current location is disable
        function onLocationError() {
            alert("Please enable location to view current location");
        }

        map.on('locationerror', onLocationError);





    }).addTo(map);


})





