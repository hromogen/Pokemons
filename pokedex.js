
///// ******08.04.2015.********////*********18,03***********//////
var color = ["#9faaaa", "#68190a", "#578c95", "#9b60c2", "#4f3939", "gray", "#856b05", "silver", "#80a2c2", "#cd0c53", 
"aqua", "green", "#dcc98a", "#c946d1", "navy", "olive", "#404040", "#03eb86" ];
var downloader = function ()
{	$('#selected').css({"visibility":"hidden", "border":"0px"});
	if(!(localStorage.getItem('ind')))
	{var ind = 1;
	localStorage.setItem("ind",  ind.toString())}
	else
	{var ind = Number(localStorage.getItem('ind'));
	localStorage.removeItem('ind');}
  for (var i = 0, Data = [], avURL = [], ID = [], basURL = "http://pokeapi.co";  (i < 12);i++)
	{
	$.ajax({
		type: "GET",
		url: basURL + "/api/v1/pokemon/" + ind + "/", 
		dataType: 'json',
		async:false,
		data: null,
		success: function(data)
						{ ID[i] = ind.toString(); Data[i] = data; avURL[i] = '"'+basURL+'/media/img/'+ ind +'.png"'}
				})
	ind++;}
	localStorage.setItem("ind", ind.toString());
	console.log(ID)
	for (var n = 0, URI = [], ChTNs = []; (n < Data.length); n++)
	{
			$('#'+n).html("<img id = img"+n+" src=" + avURL[n] + ">");
			$('#img'+n).after("<center><b>"+Data[n].name+"</b></center><br id='name"+n+"'>")
			ChTNs[n] = "";	
				for (var u = 0, tName; u < Data[n].types.length; u++)
				{tName= Data[n].types[u].name.substring(0, 1).toUpperCase() + Data[n].types[u].name.substring(1);	
				ChTNs[n] += tName+"<br>";	
				$('#name'+n).after('<button type="button" disabled id="butt'+n+''+u+'"></button>');
				$("#butt" + n +''+u).html("<center id='tN'>"+tName+"</center>");
				$("#butt" + n +''+u).css({"backgroundColor": color[Data[n].types[u].resource_uri.substring(13).match(/\d{1,2}/)-1], "border":"1px solid "+color[Data[n].types[u].resource_uri.substring(13).match(/\d{1,2}/) - 1]});
				}
			URI[n] = "<img id = 'ChosAv' src=" + avURL[n] + "><p>";
			$('#'+n).click(function(){$('#selected').css({"visibility":"visible", "margin-left":"40px"})});
			$('#'+n).click(function(){$('#selected').html('<table id = "ChT"><tr><td id = "chosTD">'+this[2]+'<br><b id="ChosName">'+this[1].name+' #' +('000'.substring(this[3].length)+this[3])+'</b><br><table id="ChosT"><tr><td id="chosRow1">Types</td><td id="chosRow2">' + this[0] + '</td></tr><tr><td id="chosRow1">Attack</td><td id="chosRow2">' + this[1].attack + '</td></tr><tr><td id="chosRow1">Defense</td><td id="chosRow2">' + this[1].defense + '</td></tr><tr><td id="chosRow1">HP</td><td id="chosRow2">' + this[1].hp + '</td></tr><tr><td id="chosRow1">SP Attack</td><td id="chosRow2">' + this[1].sp_atk + '</td></tr><tr><td id="chosRow1">SP Defense</td><td id="chosRow2">' + this[1].sp_def + '</td></tr><tr><td id="chosRow1">Speed</td><td id="chosRow2">' + this[1].speed + '</td></tr><tr><td id=chosRow1>Weight</td><td id="chosRow2">' + this[1].weight + '</td></tr><tr><td id="chosRow1">Total moves</td><td id="chosRow2">' + this[1].total + '</td></tr></table></td></tr></table>')}.bind([ChTNs[n], Data[n], URI[n], ID[n]]));
		}
	 $("#LoadMore").click($("#LoadMore").data("clicked", true));
	};
$('.table').after('<button type="button" id="LoadMore"><b>Load More!</b></button>');
$(document).ready(downloader);
$(document).load(localStorage.removeItem('ind'));
$("#LoadMore").click(downloader);