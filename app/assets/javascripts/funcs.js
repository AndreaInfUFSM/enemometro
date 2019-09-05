var res = [], arr = [];

$(document).ready(function(){
    $(function(){
        $('#caixaCidade').autocomplete({
            source: arr,        
            delay: 150,
            minLength: 3
        });
    });
    
    $('#caixaCidade').keypress(function(e){
      if(e.keyCode==13){
        callExecuter();
      }
    });
});

function carregaBanco()
{
  console.log('jaaj');
  $.ajax({
    type: 'GET',
    url: '/'+'?inic=TRUE',
    success: function(data){
      res = data;
      for(var i = 0; i < res.length; i++)
      {
        arr.push(res[i]);
      }
    }
  });
}

var callExecuter=function(){
    $.ajax({
      type:'POST',
      url:'/' +'?nocidade='+ document.getElementById("caixaCidade").value,
      success:function(cidade){
          console.log("Cidade: "+ cidade.NO_MUNICIPIO_ESC);
          console.log("Média: " + cidade.MED);
      }
    });
  }

function teste()
{
    alert("cliqued");
}