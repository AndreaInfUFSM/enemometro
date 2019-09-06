function criaPesquisa(value){
 	var span = "";
 	span = value;
 	span.innerHTML = `
 	<td>
	    <td>&nbsp;</td>
	    <div class="md-form active-cyan active-cyan-2 mb-3" id="campo_cidade">
	 	    <legend>Pesquisar</legend><input class="form-control" style=" width: 40%; margin-left: 9%;" type="text" placeholder="Cidade..." aria-label="Search" id="estado">
		</div>
		<td>&nbsp;</td>
	</td>`;
}

function preencheLocal(value)
{
    document.getElementById("cidadeNome").innerHTML = `Você está em: ` + value;
}

function Geo_location(){
	console.log("cheguei");
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(successFunction);
    }
}

function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;	
	console.log("Entrei na de sucesso");

}

function errorFunction(){
    alert("Não foi possível localizar");
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
infoWindow.open(map);
}

// Funções para exibir a geolocalização e cidade ao carregar a página
var geocoder;
var cityName;
//Get the latitude and the longitude;
function successFunction2(position) {
var lat = position.coords.latitude;
var lng = position.coords.longitude;
preencheLocal();
codeLatLng(lat, lng)
}

function initialize() {
geocoder = new google.maps.Geocoder();
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction2, errorFunction);
} 

successFunction2(geocoder);
}

function codeLatLng(lat, lng) {

var latlng = new google.maps.LatLng(lat, lng);
geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
    console.log(results)
    if (results[1]) {
    //find country name
            for (var i=0; i<results[0].address_components.length; i++) {
        for (var b=0;b<results[0].address_components[i].types.length;b++) {

        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
            if (results[0].address_components[i].types[b] == "administrative_area_level_2") {
                //this is the object you are looking for
                city= results[0].address_components[i];
                cityName = city.long_name;
                break;
            }
        }
    }    
    } else {
        alert("No results found");
    }
    } else {
    alert("Geocoder failed due to: " + status);
    }
    preencheLocal(cityName);
});
}

	
