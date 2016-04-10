# Pokemon-lister client
#### Basic description
The client folder consists of *index.html*, *jquery-1.12.3.min.js*, *pokedex.js* and *style.css* files. The client is available by running of the *index.html* file. After one executes the file, the first chunk of Pokémons (with ids from 1 to 12) is immediately downloaded and displayed at the page. By clicking on a Pokémon at the page, one can view its details in the right sector of the page. Previously shown Pokémon details disappear. On click of ‘Load More’ another chunk of the list (for instance with ids 13, 14 and so on) is being loaded and displayed on the page and previously shown Pokémon details also disappear. After the page’ reloading the first chunk of Pokémons (with id from 1 to 12) is displayed again.

#### Descriptions of the files included

###### *index.html*
The file contains the basic markup of the page. The `<script>` tags link to the JavaScript files *jquery-1.12.2.min.js* and *pokedex.js* both have an attribute “defer”, meaning they will not run until after the page has loaded. This is done because the file *pokedex.js* operates with the page’ markup that is not available before that. The `<link>` tag defer the style of the page and has a link to the *style.css* file in its attribute `<href>`. The `<h6></h6>` tags frame the header of the page (“Pokedex”) and has an id “header”. The `<table></table>` tags frame the set of `<tr></tr>` and `<td></td>` tags that markup the basis of the page. Each of the `<td>` tags has the `<id>` attribute. The `<td></td>` tags with the `<id>` attributes from 0 to 11 are filled with the *pokedex.js* file by the list of the Pokémons displayed after one loads the page or clicks the ‘Load more!’ button. The `<td></td>` tag with the `id="selected"` is invisible by default (set by the * pokedex.js* file) but becomes visible after clicking on a Pokémon at the page being filled by its details (also set by the * pokedex.js* file).

###### *pokedex.js*
This file contains the main part of the client consisting of the additional *css* and *html* markup setters/changers and Pokémon details downloader. The `var color` is the Array of the colors used further for the buttons with different types of Pokémons. The colors are given in hexadecimal numbers (e.g. "#856b05") or in definers (e.g. "gray"). The position of each color is defined by its ID at the “All possible types list” available at http://pokeapi.co/api/v1/type/?limit=999 . For a simpler management the types according to their colors in the `color` Array are following: ["Normal","Fighting", "Flying","Poison", "Ground", "Rock", "Bug", "Ghost", "Steel","Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"]. The ‘downloader’ is the function executed first at the page download (set by the ‘$(document).ready(downloader)’ function at line 45) and executed further repeatedly after clicking on the “Load More!” button (set by the function ` $("#LoadMore").click(downloader)` at line 47). `$('#selected').css({"visibility":"hidden", "border":"0px"})` at the start of the function immediately makes invisible the cell with id “selected” which is used for displaying of the details of the selected Pokémon. The block 
```javascript
	if(!(localStorage.getItem('ind')))
		{var ind = 1;
		localStorage.setItem("ind",  ind.toString())}
	else
		{var ind = Number(localStorage.getItem('ind'));
		localStorage.removeItem('ind');
	}
```
tries, whether the function is executed the first time. If it is so (and therefore it is no such a unit named `ind` in the localStorage) the `val int` is set equal to 1. If the function was executed before the value `val int` is taken from the `localStorage` and afterwards it is emptied by the method ` removeItem()`.
The block
 ```javascript
   for (var i = 0, Data = [], avURL = [], ID = [], basURL = "http://pokeapi.co"; (i < 12);i++)
	{
	$.ajax({
		type: "GET",
		url: basURL + "/api/v1/pokemon/" + ind + "/", 
		dataType: 'json',
		async: false,
		data: null,
		success: function(data)
			{ID[i] = ind.toString(); Data[i] = data; avURL[i] = '"'+basURL+'/media/img/'+ ind +'.png"'}
	})
	ind++;
	}
```
mainly contains the `ajax` function of the library jQuery (available through the *jquery-1.12.2.min.js* file). It performs a series of HTTP (Ajax) requests. 
`ID` array in the head of the block is to write the string meanings of the `ind` variable for further usage. `var Data` in the head of the block is the array were the information about each Pokémon is to be written after each HTTP (Ajax) request. `avURL` is the array were the URI of an avatar of each Pokémon is to be written after each HTTP (Ajax) request. `basURL` is the variable to contain the part of URI common for sources of the Pokémons data and avatars. `var i = 0 …(i<12)` defies the number of HTTP (Ajax) requests. The attributes and the meanings of the $.ajax() function are following: ` type: "GET"` means the request is to get information; `url: …` defies the source of information ( ‘ind’ variable here defies the id of the Pokémon which data to request); `dataType: 'json'` evaluates the response as JSON and returns a JavaScript object; ` async: false` means that the requests are synchronous; `data: null` - no data is sent to the server after each request; `success: function(data)` - the function to be called if the request succeeds (in this case the saving obtained data to the `ID` array of the strings with IDs of each Pokémon, `Data` array of the JSON objects with complete information about each Pokémon and `URL` array of the URLs of Pokémons’ avatars). After each iteration the `ind` variable is increased by 1. 

After this block the method `localStorage.setItem("ind", ind.toString())` is executed to memorize the value of the `ind` variable for further usage. In the next block `for(….) {}` the variables to define are following: `n` - changes from 0 to 11 and is a counter of cycles, `URI` - additional array containing attributes (source) for the avatars of Pokémons to be chosen; `ChTNs` – array for the information on each Pokémon’ types name(s) to be used if the Pokémon is chosen. The function `$('#'+n).html("<img id = img"+n+" src=" + avURL[n] + ">")` place the code, containing the link to the Pokémon’ avatar (as `<img … src =”link”>`) into the cell with certain identifier (equal to n, e.g. if n = 3 the cell to fill would have the `id=“3”` and the avatar URL to be used would have the index “3” in the array ` avURL `). Also for the image inserted attribute `id=”img**n**”` is unique for each cell because **n** is different for each iteration and it also links each iteration (and each `<img>` object) to the IDs of the cells defined in *index.html*. Then the function `$('#img'+n).after("<center><b>"+Data[n].name+"</b></center><br id='name"+n+"'>")` sets the name of each Pokémon obtained from the HTTP (Ajax) requests data (array Data, attribute `name`). The unique ID, that was set to each Pokémon’ avatar’ image made possible to use method `$().after()` here. Also for the end of each name the unique attribute `id='name"+n+"'>")` is set. 
Next the n-th member of the massive of types `ChTNs` is set as an empty literal and inside block `for()...` follows to obtain and set the attributes for the type(s) of each Pokémon. The types for each Pokémon are described at the property `.types` as an array of objects. Therefor the number of iterations to get the name of each type to be `< Data[n].types.length` (the length of the array). The `tName` variable sets the type name at each iteration to be used.
In the body of the cycle
```javascript
tName = Data[n].types[u].name.substring(0, 1).toUpperCase() + Data[n].types[u].name.substring(1);	
ChTNs[n] += tName+"<br>";	
$('#name'+n).after('<button type="button" disabled id="butt'+n+''+u+'"></button>');
$("#butt" + n +''+u).html("<center id='tN'>"+tName+"</center>");
$("#butt" + n +''+u).css({"backgroundColor": color[Data[n].types[u].resource_uri.substring(13).match(/\d{1,2}/)-1], "border":"1px solid "+color[Data[n].types[u].resource_uri.substring(13).match(/\d{1,2}/) - 1]});
```    
the following is done:
	* Line1: the name of u-th Pokémon' type is capitalized and defined
	* Line2: the names of types are written for usage if the Pokémon to be chosen
	* Line3: the empty button with attribute `id="butt'+n+''+u+'"` (unique identifier) is incerted after the name of the Pokémon (identified before as '#name'+n)
	* Line4: the name of the u-th type is set for the button
	* Line5: the background and border colors for the button are obtained from the attribute `types.resource_uri` by the RegExp tools and set by the `$().css()` method *(this stage migth be simplified by adding some reference data)*
The next line 
`$('#'+n).click(function(){$('#selected').css({"visibility":"visible", "margin-left":"40px"})});` makes the cell with the data on the chosen Pokemon visible by changing its css properties (methods `$().click(function()) and $().css())
Finally the line
```javascript
$('#'+n).click(function(){$('#selected').html('<table id = "ChT"><tr><td id = "chosTD">'+this[2]+'<br><b id="ChosName">'+this[1].name+' #' +('000'.substring(this[3].length)+this[3])+'</b><br><table id="ChosT"><tr><td id="chosRow1">Types</td><td id="chosRow2">' + this[0] + '</td></tr><tr><td id="chosRow1">Attack</td><td id="chosRow2">' + this[1].attack + '</td></tr><tr><td id="chosRow1">Defense</td><td id="chosRow2">' + this[1].defense + '</td></tr><tr><td id="chosRow1">HP</td><td id="chosRow2">' + this[1].hp + '</td></tr><tr><td id="chosRow1">SP Attack</td><td id="chosRow2">' + this[1].sp_atk + '</td></tr><tr><td id="chosRow1">SP Defense</td><td id="chosRow2">' + this[1].sp_def + '</td></tr><tr><td id="chosRow1">Speed</td><td id="chosRow2">' + this[1].speed + '</td></tr><tr><td id=chosRow1>Weight</td><td id="chosRow2">' + this[1].weight + '</td></tr><tr><td id="chosRow1">Total moves</td><td id="chosRow2">' + this[1].total + '</td></tr></table></td></tr></table>')}.bind([ChTNs[n], Data[n], URI[n], ID[n]]));
```
binds to the *onclick* event applied to each cell the creating inside the cell with identifier `'#selected'` the html-table. To function, that contains the  jQuery library' method `html`  creating the table, the array of `this` variables is attached which are:[`ChTNs[n]`(name(s) of the types of chosen Pokémon), `Data[n]` (full data on chosen Pokémon), `URI[n]`(attribute `<img>` of the avatar of chosen Pokémon),`ID[n]`(the ID of chosen Pokémon)]. In the function they are refered to as `this[0]`...`this[3]. The table has the identifier `ChT` and the only cell with the identifier "chosTD". First the avatar of chosen Pokémon is inserted as `this[2]`. Next the name is inserted through `this[1].name` having an attribute `id="ChosName"` on the number obtained from the `ID[n]` (this[3]) by the `substring` method. Aftervard the table with detailed data on the Pokémon chosen is added. It has an attribute `id="ChosT"`, every cell of the first row has an identifier "chosRow1" and of the second - chosRow2. The value is inserted to the second row of the first line of the table from the `ChTNs[n]` variable (`this[0]`). The values to every other cell of the second row of the table are incerted from the attributes of the Data[n] variable (`this[1]`).

###### *style.css*
 * `table#ChT` defies the style of the table in which the information of the Pokémon chosen is shown.
 * `table#ChosT` defies the table of the properties of the Pokémon chosen.
 * `td#chosTD` defies the properties of the single cell of the table containing the avatar, the name, the ID and the table of detailed information of the Pokémon chosen
 * td#chosRow1 and td#chosRow2 defies the style of the rows of the table of properties.
 * button#LoadMore defies the style of the button "Load More"
 * `img#ChosAv` defies the style of the avatar of the Pokémon chosen.
 * `#header` defies the style of the line "Pokedex" at the top of the page
 * `#ChosName` defies the style of the name of the Pokémon chosen.
