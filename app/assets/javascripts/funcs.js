var res = [], arr = [];

$(document).ready(function(){
    $("#selectEstado").change(function(){
      carregaBanco(document.getElementById("selectEstado").value);
      document.getElementById("caixaCidade").style.visibility = "visible";
      document.getElementById("selectAno").style.visibility = "visible";
    });
    $(function(){
        $('#caixaCidade').autocomplete({
            source: function(request, response) {
              var results = $.ui.autocomplete.filter(arr, request.term);
              response(results.slice(0, 12));
          },        
            delay:  50,
            minLength: 3,
        });
    });
    
    $('#caixaCidade').keypress(function(e){
      if(e.keyCode==13){
        if(document.getElementById("caixaCidade").style.visibility == "visible")
          callExecuter();
        else
          alert("Selecione o seu estado");
      }
    });
});

// fetch do DB retornando as cidades em JSON
function carregaBanco(val)
{
  console.log('jaaj');
  $.ajax({
    type: 'GET',
    url: '/'+'?inic=TRUE&SG_UF_ESC=' + val,
    success: function(data){
      arr = [];
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
      url:'/' +'?nocidade='+ document.getElementById("caixaCidade").value +
               '&SG_UF_ESC=' + document.getElementById("selectEstado").value +
               '&ano=' + document.getElementById("selectAno").value,
      success:function(cidade){
        var initialC = 0;
        var initialR = 0;
        var limitC  = 0;
        var limitR = 0;

        if(cidade != undefined)
        {
          console.log("Cidade: "+ cidade.NO_MUNICIPIO_ESC);
          console.log("Média: " + cidade.MED);
          console.log("Média: " + cidade.rank);
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

  function desenhaGrafico(){ 
    console.log("entrei na desenha.");  
       // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawChart);

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {
          console.log("cheguei no draw.");
          // Create the data table.
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Topping');
          data.addColumn('number', 'Slices');
          data.addRows([
            ['Português', 680],
            ['Inglês', 600],
            ['Ciências da Natureza', 450],
            ['Redação', 800]
          ]);
  
          // Set chart options
          var options = {'title':'Média por área',
                         'width':700,
                         'height':600};
  
          // Instantiate and draw our chart, passing in some options.
          var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
          chart.draw(data, options);
        }
      }