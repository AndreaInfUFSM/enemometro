var res = [], arr = [], arr2 = [], arrEsc = [], arrEsc2 = [];

$(document).ready(function(){
  $("#chart_div").on('DOMSubtreeModified',function(){
    var elm = document.getElementById("chart_div");
    elm.scrollIntoView({behavior: "smooth"});
  });

  $(document).keypress(function(e){
    if (e.which == 13){
        if(document.getElementById("selectComparacao").value == 'cdXcd')
        {
          clickGrafico('cdXcd');
        }
        else if(document.getElementById("selectComparacao").value == 'cdXEsc')
        {
          clickGrafico('cdXEsc');
        }
        else if(document.getElementById("selectComparacao").value == 'EscXEsc')
        {
          clickGrafico('EscXEsc');
        }
    }
  });
  $("#selectComparacao").change(function(){
      var x = document.getElementById("selectComparacao");
      if(x.options[0].value == 'sel'){
        x.remove(0);
      }
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
                  <button type="button" id="botaozinCidade" class="btn btn-dark" style="margin-top: 5%;" onclick="clickGrafico('cdXcd');">Buscar</button>
         `;
         fetchBancoCidade();
      }
      else if(document.getElementById("selectComparacao").value == "cdXEsc")
      {
        var span = '';
        span = document.getElementById("inputs");
        span.innerHTML = `
        <div class="card-group">
                   <div class="card bg-dark text-white">
                       <div class="card-body"   style="background-color:rgba(55,64,53,0.7);">
                         <h5 class="card-title">Selecione a escola</h5>
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
                     <br><input class="form-control" style="color:black; background-color: rgba(255,255,255,0.8);" id = "caixaEscola" required type="text" placeholder="Qual a sua escola?">
                   </div>
                   </div>
                   <div class="card bg-dark text-white">
                     <div class="card-body"   style="background-color:rgba(55,64,53,0.7);">
                       <h5 class="card-title">Selecione a cidade</h5>
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
                 <button type="button" id="botaozinCidadeEscola" class="btn btn-dark" style="margin-top: 5%;" onclick="clickGrafico('cdXEsc');">Buscar</button>
        `;
        fetchBancoCidade();
        fetchBancoEscola();
      }
      else if(document.getElementById("selectComparacao").value == "EscXEsc")
      {
        var span = '';
        span = document.getElementById("inputs");
        span.innerHTML = `
        <div class="card-group">
                   <div class="card bg-dark text-white">
                       <div class="card-body"   style="background-color:rgba(55,64,53,0.7);">
                         <h5 class="card-title">Selecione a primeira escola</h5>
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
                     <br><input class="form-control" style="color:black; background-color: rgba(255,255,255,0.8);" id = "caixaEscola" required type="text" placeholder="Qual a sua escola?">
                   </div>
                   </div>
                   <div class="card bg-dark text-white">
                     <div class="card-body"   style="background-color:rgba(55,64,53,0.7);">
                       <h5 class="card-title">Selecione a segunda escola</h5>
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
                   <br><input class="form-control" style="color:black; background-color: rgba(255,255,255,0.8);" id = "caixaEscola2" required type="text" placeholder="Qual a sua escola?">
                   </div>
                   </div>
                 </div>
                 <button type="button" id="botaozinCidadeEscola" class="btn btn-dark" style="margin-top: 5%;" onclick="clickGrafico('EscXEsc');">Buscar</button>
        `;
        fetchBancoCidade();
        fetchBancoEscola();
      }
    });
});

function fetchBancoCidade()
{
  $("#selectEstado").change(function(){
    carregaCidadesBanco(document.getElementById("selectEstado").value, 1);
  });
  $("#selectEstado2").change(function(){
    carregaCidadesBanco(document.getElementById("selectEstado2").value, 2);
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

function fetchBancoEscola()
{
   $("#caixaEscola").click(function(){
    if($("#caixaCidade").val().length > 1)
    {
      carregaEscolasBanco(document.getElementById("selectEstado").value, 
                          document.getElementById("caixaCidade").value, 1);
    }
   });
   $("#caixaEscola2").click(function(){
    if($("#caixaCidade2").val().length > 1)
    {
      carregaEscolasBanco(document.getElementById("selectEstado2").value, 
                          document.getElementById("caixaCidade2").value, 2);
    }
   });
   $("#caixaEscola").focus(function(){
    if($("#caixaCidade").val().length > 1)
    {
      carregaEscolasBanco(document.getElementById("selectEstado").value, 
                          document.getElementById("caixaCidade").value, 1);
    }
   });
   $("#caixaEscola2").focus(function(){
    if($("#caixaCidade2").val().length > 1)
    {
      carregaEscolasBanco(document.getElementById("selectEstado2").value, 
                          document.getElementById("caixaCidade2").value, 2);
    }
   });
  $(function(){
    $('#caixaEscola2').autocomplete({
        source: function(request, response) {
          var results = $.ui.autocomplete.filter(arrEsc2, request.term);
          response(results.slice(0, 12));
      },        
        delay:  50,
        minLength: 1,
    });
  });
  $(function(){
    $('#caixaEscola').autocomplete({
        source: function(request, response) {
          var results = $.ui.autocomplete.filter(arrEsc, request.term);
          response(results.slice(0, 12));
      },        
        delay:  50,
        minLength: 1,
    });
  });
}

// fetch do DB retornando as cidades em JSON
// opc = 1: Coluna da primeira cidade
// opc = 2: Coluna da segunda cidade
function carregaCidadesBanco(val, opc)
{
  $.ajax({
    type: 'GET',
    url: '/'+'?cid=TRUE&SG_UF_ESC=' + val,
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

function carregaEscolasBanco(val, city, opc)
{
  console.log('carregado');
  $.ajax({
    type: 'GET',
    url: '/'+'?esc=TRUE&SG_UF_ESC=' + val + '&NO_MUNICIPIO_ESC=' + city,
    success: function(data){
      res = data;
      if(opc == 1)
      {
        arrEsc = [];
        for(var i = 0; i < res.length; i++)
        {
          arrEsc.push(res[i]);
        }
      }
      else if (opc == 2)
      {
        arrEsc2 = [];
        for(var i = 0; i < res.length; i++)
        {
          arrEsc2.push(res[i]);
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
function clickGrafico(tipoGraph)
{
  if(tipoGraph == 'cdXcd')
  {
    if(document.getElementById("caixaCidade").value != '' && document.getElementById("caixaCidade2").value != '')
    {
      $(".loader").show(); 
      $.ajax({
        type:'POST',
        url:'/?tipo=graphCidade' +'&nocidade1='+ document.getElementById("caixaCidade").value +
                '&SG_UF_ESC1=' + document.getElementById("selectEstado").value +
                '&nocidade2=' + document.getElementById("caixaCidade2").value +
                '&SG_UF_ESC2=' + document.getElementById("selectEstado2").value,
        success:function(jason){
        console.log(JSON.stringify(jason));
        json = jason;
        desenhaGrafico('cdXcd');
        }
      });
    }
    else
    {
      alert("Preencha todos os campos!");
    }
  }
  else if(tipoGraph == 'cdXEsc')
  {
    if(document.getElementById("caixaCidade").value != '' 
    && document.getElementById("caixaCidade2").value != ''
    && document.getElementById("caixaEscola").value != '')
    {
    $(".loader").show(); 
      $.ajax({
        type:'POST',
        url:'/?tipo=graphEscolaCidade' +'&nocidade1='+ document.getElementById("caixaCidade").value +
                '&SG_UF_ESC1=' + document.getElementById("selectEstado").value +
                '&nocidade2=' + document.getElementById("caixaCidade2").value +
                '&SG_UF_ESC2=' + document.getElementById("selectEstado2").value +
                '&NO_ESCOLA=' + document.getElementById("caixaEscola").value,
        success:function(jason){
        console.log(JSON.stringify(jason));
        json = jason;
        desenhaGrafico('cdXEsc');
        }
      });
    }
    else
    {
      alert("Preencha todos os campos!");
    }
  }
  else if(tipoGraph == 'EscXEsc')
  {
    if(document.getElementById("caixaCidade").value != '' 
    && document.getElementById("caixaCidade2").value != ''
    && document.getElementById("caixaEscola").value != ''
    && document.getElementById("caixaEscola2").value != '')
    {
    $(".loader").show(); 
      $.ajax({
        type:'POST',
        url:'/?tipo=graphEscolaEscola' +'&nocidade1='+ document.getElementById("caixaCidade").value +
                '&SG_UF_ESC1=' + document.getElementById("selectEstado").value +
                '&nocidade2=' + document.getElementById("caixaCidade2").value +
                '&SG_UF_ESC2=' + document.getElementById("selectEstado2").value +
                '&NO_ESCOLA1=' + document.getElementById("caixaEscola").value +
                '&NO_ESCOLA2=' + document.getElementById("caixaEscola2").value,
        success:function(jason){
        console.log(JSON.stringify(jason));
        json = jason;
        desenhaGrafico('EscXEsc');
        }
      });
    }
    else
    {
      alert("Preencha todos os campos!");
    }
  }
}

function desenhaGrafico(tipoGraph){
  if(tipoGraph == 'cdXcd')
  {
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
                      'width':1200,
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
  else if(tipoGraph == 'cdXEsc')
  {
    console.log("entrei na desenha cdXEsc."); 
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
      data.addColumn('number', document.getElementById("caixaCidade2").value);
      data.addColumn('number', document.getElementById("caixaEscola").value);
      data.addRows(json);

      // Set chart options
      var options = {'title':'Média da cidade vs escola',
                      'width':1200,
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
  else if(tipoGraph == 'EscXEsc')
  {
    console.log("entrei na desenha EscXEsc."); 
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
      data.addColumn('number', document.getElementById("caixaEscola").value);
      data.addColumn('number', document.getElementById("caixaEscola2").value);
      data.addRows(json);

      // Set chart options
      var options = {'title':'Média das Escolas',
                      'width':1200,
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
}