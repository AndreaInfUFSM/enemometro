function preencheLocal(value1, value2)
{
    document.getElementById("cidadeNome").innerHTML = `Você está em: ` + value1 + ', ' + value2;
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
var estado;
//Get the latitude and the longitude;
function successFunction2(position) {
    var lng = position.coords.longitude;
    var lat = position.coords.latitude;
    codeLatLng(lat, lng);
}

function initialize() {
    geocoder = new google.maps.Geocoder();
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(successFunction2, errorFunction);
    } 
    successFunction2(geocoder);
}

function consultaAoLoad(cidade, uf)
{
    $.ajax({
        type:'POST',
        url:'/' +'?nocidade='+ cidade +
                 '&SG_UF_ESC=' + uf +
                 '&ano=2018',
        success:function(cidade){
          var initialC = 0;
          var initialR = 0;
          var limitC  = 0;
          var limitR = 0;
          if(cidade != undefined)
          {
            console.log("Cidade: "+ cidade.NO_MUNICIPIO_ESC);
            console.log("Média: " + cidade.MED);
            console.log("Pos. Rank: " + cidade.rank);
            if(limitR == 0 && limitR == 0){
              limitC = cidade.MED;
              limitR = cidade.rank;
              $("#cntMedia").countTo({from: initialC, to: limitC});
              $("#rnkNacional").countTo({from: initialR, to: limitR});
            }
            else if(limitC > 0 && limitR > 0){
              if(cidade.MED > limitC){
                initialC =  cidade.MED - limitC;
                limitC - cidade.MED;
              }
              else if(cidade.MED < limitC){
                initialC = limitC - cidade.MED;
                limitC - cidade.MED;
              }
              if(cidade.rank > limitR){
                initialR = cidade.rank - limitR;
                limitR = cidade.rank;
  
              }
              else if (cidade.rank < limitR){
                initialR = limitR - cidade.rank;
                limitR = cidade.rank;
              }
            }
            $("#cntMedia").countTo({from: initialC, to: limitC});
            $("#rnkNacional").countTo({from: initialR, to: limitR});
            var elemento = document.getElementById("fh5co-counter");
            elemento.scrollIntoView({
              behavior: 'smooth'
            });
          }
          else
          {
            alert("Cidade não encontrada!");
          }
        },
        error: function(){
          alert("Erro na busca!");
        }
      });  
}

function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        console.log(results)
        if (results[1]) {
        //Procura nome da cidade
            for (var i=0; i<results[0].address_components.length; i++) {
                for (var b=0;b<results[0].address_components[i].types.length;b++) {
                //As cidades brasileiras são representadas pela área administrativa nível 2, em outros países pode mudar
                    if (results[0].address_components[i].types[b] == "administrative_area_level_2") {
                        city= results[0].address_components[i];
                        cityName = city.long_name;
                        break;
                    }
                }
            }  
            for (var i=0; i<results[0].address_components.length; i++) {
                for (var b=0;b<results[0].address_components[i].types.length;b++) {
                    if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                        estado = results[0].address_components[i];
                        UF = estado.short_name;
                        break;
                    }
                }
            }  
        } 
            else 
            {
                alert("No results found");
            }
        } 
        else 
        {
            alert("Geocoder failed due to: " + status);
        }
        preencheLocal(cityName, UF);
        consultaAoLoad(cityName, UF);
    });
}