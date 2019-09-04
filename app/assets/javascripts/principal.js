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

function initialize() {
    geocoder = new google.maps.Geocoder();
    console.log("iniciando api");
    console.log(geocoder);
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

	
