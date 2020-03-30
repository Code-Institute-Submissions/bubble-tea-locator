
$(function() {

    let map = createMap("map", [1.3521, 103.8198], 13);

  
});
  let client_id = "TP1OGF4LPNBRT25GCKPPD035ZWX5ZEVUHR0VBVA5VYU3WTLF";
  let client_secret = "WS143U3Y1EXII1WNZZWOYV2I30DTACSTX5IJMM0C1HTWMW0U";

  let apiURL = "https://api.foursquare.com/v2/venues/search";
  let apiCategoryURL = "https://api.foursquare.com/v2/venues/categories";
  let venueDetailsURL = "https://api.foursquare.com/v2/venues/";
  axios
    .get(apiCategoryURL, {
      params: {
        client_id,
        client_secret,
        v: "20200326"
      }
    })
    .then(function(r) {
      console.log(r.data);
    });
