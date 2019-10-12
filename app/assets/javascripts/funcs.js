var res = [], arr = [], arr2 = [];

$(document).ready(function(){
  $("#chart_div").on('DOMSubtreeModified',function(){
    var elm = document.getElementById("chart_div");
    elm.scrollIntoView({behavior: "smooth"});
  });

  $("#selectComparacao").change(function(){
      if(document.getElementById("selectComparacao").value == "cdXcd")
      {
         var span = '';
         span = document.getElementById("inputs");
         span.innerHTML = `
         <div class="card-group">
										<div class="card bg-dark text-white">
												<div class="card-body"   style="background-color:rgba(55,64,53,0.7);">
													<h5 class="card-title">Selecione a primeira cidade</h5>
													<select class="custom-select custom-select-lg mb-3" id="selectEstado" style="color:black; background-color: rgba(255,255,255,0.8);">
												<option>Selecione</option>
												<option>AC</option>
												<option>AL</option>
												<option>AM</option>
												<option>AP</option>
												<option>BA</option>
												<option>CE</option>
												<option>DF</option>
												<option>ES</option>
												<option>GO</option>
												<option>MA</option>
												<option>MG</option>
												<option>MS</option>
												<option>MT</option>
												<option>PA</option>
												<option>PB</option>
												<option>PE</option>
												<option>PI</option>
												<option>PR</option>
												<option>RJ</option>
												<option>RN</option>
												<option>RO</option>
												<option>RR</option>
												<option>RS</option>
												<option>SC</option>
												<option>SP</option>
												<option>SE</option>
												<option>TO</option>
											</select><br>
											<input class="form-control" style="color:black; background-color: rgba(255,255,255,0.8);" id = "caixaCidade" type="text" required placeholder="Qual a sua cidade?">
										</div>
										</div>
										<div class="card bg-dark text-white">
											<div class="card-body"   style="background-color:rgba(55,64,53,0.7);">
												<h5 class="card-title">Selecione a segunda cidade</h5>
												<select class="custom-select custom-select-lg mb-3" id="selectEstado2" style="color:black; background-color: rgba(255,255,255,0.8);">
													<option>Selecione</option>
													<option>AC</option>
													<option>AL</option>
													<option>AM</option>
													<option>AP</option>
													<option>BA</option>
													<option>CE</option>
													<option>DF</option>
													<option>ES</option>
													<option>GO</option>
													<option>MA</option>
													<option>MG</option>
													<option>MS</option>
													<option>MT</option>
													<option>PA</option>
													<option>PB</option>
													<option>PE</option>
													<option>PI</option>
													<option>PR</option>
													<option>RJ</option>
													<option>RN</option>
													<option>RO</option>
													<option>RR</option>
													<option>RS</option>
													<option>SC</option>
													<option>SP</option>
													<option>SE</option>
													<option>TO</option>
												</select><br>
										<input class="form-control" style="color:black; background-color: rgba(255,255,255,0.8);" id = "caixaCidade2" required type="text" placeholder="Qual a sua cidade?">
										</div>
										</div>
									</div>
         `;
         fetchBanco();
      }
    });
});

function fetchBanco()
{
  $("#selectEstado").change(function(){
    carregaBanco(document.getElementById("selectEstado").value, 1);
  });
  $("#selectEstado2").change(function(){
    carregaBanco(document.getElementById("selectEstado2").value, 2);
  });
  $(function(){
    $('#caixaCidade2').autocomplete({
        source: function(request, response) {
          var results = $.ui.autocomplete.filter(arr2, request.term);
          response(results.slice(0, 12));
      },        
        delay:  50,
        minLength: 3,
    });
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
}

// fetch do DB retornando as cidades em JSON
// opc = 1: Coluna da primeira cidade
// opc = 2: Coluna da segunda cidade
function carregaBanco(val, opc)
{
  $.ajax({
    type: 'GET',
    url: '/'+'?inic=TRUE&SG_UF_ESC=' + val,
    success: function(data){
      res = data;
      if(opc == 1)
      {
        arr = [];
        for(var i = 0; i < res.length; i++)
        {
          arr.push(res[i]);
        }
      }
      else if (opc == 2)
      {
        arr2 = [];
        for(var i = 0; i < res.length; i++)
        {
          arr2.push(res[i]);
        }
      }
    }
  });
}

var callExecuter=function(nocidade, sg_uf, ano){
    $.ajax({
      type:'POST',
      url:'/' +'?nocidade='+ nocidade +
               '&SG_UF_ESC=' + sg_uf +
               '&ano=' + ano,
      success:function(cidade){
        var initialC = 0;
        var initialR = 0;
        var limitC  = 0;
        var limitR = 0;

        if(cidade != undefined)
        {
          console.log("Cidade: "+ cidade.NO_MUNICIPIO_ESC);
          console.log("Média: " + cidade.MED);
          console.log("Pos.Rank: " + cidade.rank);
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
  var json = [];
  function clickGrafico()
  {
    if(document.getElementById("caixaCidade").value != '' && document.getElementById("caixaCidade2").value != '')
    {
      $(".loader").show(); 
      $.ajax({
        type:'POST',
        url:'/?tipo=graph' +'&nocidade1='+ document.getElementById("caixaCidade").value +
                '&SG_UF_ESC1=' + document.getElementById("selectEstado").value +
                '&nocidade2=' + document.getElementById("caixaCidade2").value +
                '&SG_UF_ESC2=' + document.getElementById("selectEstado2").value,
        success:function(jason){
        console.log(JSON.stringify(jason));
        json = jason;
        desenhaGrafico();
        }
      });
    }
    else
    {
      alert("Preencha todos os campos!");
    }
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
          data.addColumn('string', 'Ano');
          data.addColumn('number', document.getElementById("caixaCidade").value);
          data.addColumn('number', document.getElementById("caixaCidade2").value);
          data.addRows(json);
  
          // Set chart options
          var options = {'title':'Média das cidades por ano',
                         'width':1400,
                         'height':600,
                         'pointSize': 4,
                         'lineWidth': 2,
                         'legend': 'bottom',
                         'backgroundColor': {
                          'fill': '#FFFFFF',
                          'opacity': 30
                          },
                         'is3D': true
                        };
  
          // Instantiate and draw our chart, passing in some options.
          var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
          chart.draw(data, options);
          $('.loader').fadeOut("slow");
        }
      }