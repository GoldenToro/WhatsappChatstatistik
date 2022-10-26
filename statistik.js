var allText="";
var varTextD="";
var varTextT="";
var n1="";
var n2="";
var grad1N=0;
var grad1W=0;
var linesD="";
var linesT="";
var daysC=0;
google.charts.load('current', {'packages':['corechart']});



window.onload = function () { 
 //Check the support for the File API support 
 if (window.File && window.FileReader && window.FileList && window.Blob) {
    var fileSelected = document.getElementById('txtfiletoread');
    fileSelected.addEventListener('change', function (e) { 
         //Set the extension for the file 
         var fileExtension = /text.*/; 
         //Get the file object 
         var fileTobeRead = fileSelected.files[0];
        //Check of the extension match 
         if (fileTobeRead.type.match(fileExtension)) { 
             //Initialize the FileReader object to read the 2file 
             var fileReader = new FileReader(); 
             fileReader.onload = function (e) { 
                 allText=fileReader.result;
				 //allText = allText.replace(/(\r\n\t|\n|\r\t)/gm,"");
             } 
             fileReader.readAsText(fileTobeRead); 
         } 
         else { 
             alert("Please select text file"); 
         }
 
    }, false);
} 
 else { 
     alert("Files are not supported"); 
 } 
}

function loadData() {
	//console.log(allText);
	allText = allText.replace(/(\n[^0-9])/gm," ");
	//console.log(allText);
	oldLines = allText.split('\n');
	
	for(var i = 0;i < oldLines.length;i++){
		if(oldLines[i].substring(2,3) === "." && oldLines[i].substring(5,6) === ".") {
			oldLines[i]=oldLines[i].replace('\r',"");
			if (varTextD == "") {
				varTextT=oldLines[i].substring(18,oldLines[i].length);
				varTextD=oldLines[i]
			} else {
				varTextT+="\n"+oldLines[i].substring(18,oldLines[i].length);
				varTextD+="\n"+oldLines[i];
			}
		} else {
			varTextT+=" "+oldLines[i];	
			varTextD+=" "+oldLines[i];	
		}
	}	
	linesD= varTextD.split('\n');
	linesT= varTextT.split('\n');
	//console.log("Here" );
	//console.log(justText);
	
}

function show(div) {
	document.getElementById(div).style.display = "block";
}

function hide(div) {
	document.getElementById(div).style.display = "none";
}

function startStatistik() {

	if(allText == "") {
		alert("Bitte einen Chatverlauf auswählen");
	} else {
		show("laden");
		setTimeout(function() {
			
			console.log("<------------------------------------------->");
			console.log("Start:");
			
			hide("containerActions");
			show("daStatistik");
			
			loadData();

			getNames();
			countDays();
			countNachrichten();

			console.log("fertig");
			console.log("<------------------------------------------->");
			console.log("");
			hide("laden");	
						
		}, 500);


	}
}

function getNames() {

	
	n1=linesT[0].substring(0,linesT[0].indexOf(": "));
	//console.log("name 1:"	);
	//console.log(linesT[1]);
	//console.log(n1);
	for(var i = 2;i < linesT.length;i++){
		n2=linesT[i].substring(0,linesT[i].indexOf(": "));
		if(n1 != n2) {
			break;
		}
	}
}

function countDays() {
	
	var d1= new Date("20"+linesD[0].substring(6,8),linesD[0].substring(3,5)-1,linesD[0].substring(0,2));
	var dd = d1.getDate();
	var mm = d1.getMonth()+1; //January is 0!
	var yyyy = d1.getFullYear();
	if(dd<10) {dd = '0'+dd} 
	if(mm<10) {mm = '0'+mm} 
	date1 = dd + '.' + mm + '.' + yyyy;
	
	var d2= new Date("20"+linesD[linesD.length-1].substring(6,8),linesD[linesD.length-1].substring(3,5)-1,linesD[linesD.length-1].substring(0,2));
	var dd = d2.getDate();
	var mm = d2.getMonth()+1; //January is 0!
	var yyyy = d2.getFullYear();
	if(dd<10) {dd = '0'+dd} 
	if(mm<10) {mm = '0'+mm} 
	date2 = dd + '.' + mm + '.' + yyyy;
	
	//console.log("here")
	//console.log("20"+lines[0].substring(6,8)+","+lines[0].substring(3,5)+","+lines[0].substring(0,2));
	//console.log("20"+lines[lines.length-2].substring(6,8)+","+lines[lines.length-2].substring(3,5)+","+lines[lines.length-2].substring(0,2));
	
	console.log(d1),
	console.log(d2);
	daysC=Math.abs(Math.round((d1-d2)/(1000*60*60*24)));
	//console.log(d2);
	
	document.getElementById('Count_Days_Data').innerText = (daysC+1)+" Tage";	
	document.getElementById('Count_Since_Data').innerText = date1+" - "+date2;
	document.getElementById('containerTitle').innerText = (daysC+1)+" Tage "+n1+" und "+n2+":";	
}

function drawPieChart(beschreibung, div, titel) {
	//console.log(beschreibung);
	//console.log(Array.isArray(beschreibung));
	//console.log(div);
	//console.log(titel);
	var data = google.visualization.arrayToDataTable(beschreibung);
	var chart = new google.visualization.PieChart(document.getElementById(div));
	var options={
		'title':titel,
		'colors': ['#DD0006', '#FD6367'],
		'width':'98%', 
		'height':'98%',
		titleTextStyle: {
			fontSize: 18
		},
		legendTextStyle: {
			fontSize: 15
		},
		backgroundColor: { 
			fill:'transparent' 
		}
	};
	chart.draw(data,options);
}

function drawColumnChart(beschreibung, div, titel) {
	//console.log("Diagramm Daten:");
	//console.log(beschreibung);
	//console.log(Array.isArray(beschreibung));
	//console.log(div);
	//console.log(titel);
	var data = google.visualization.arrayToDataTable(beschreibung);
	var chart = new google.visualization.ColumnChart(document.getElementById(div));
	var options={
		'title':titel,
		'colors': ['#DD0006', '#FD6367'],
		'width':'98%', 
		'height':'98%',
		titleTextStyle: {
			fontSize: 20
		},
		legendTextStyle: {
			fontSize: 15
		},
		backgroundColor: {
			fill:'transparent' 
		},
		isStacked: true
	};
	chart.draw(data,options);
}

function countNachrichten() {
	var varText="";
	var lineNb=0;
	var wordNb=0;
	var jodelNb=0;
	var linkNb=0;
		
	console.log("Zählt Nachrichten");
	lineNb=linesD.length;
	
	
	console.log("Zählt Wörter");
	for(var i = 0;i < linesT.length;i++){
		varText=linesT[i].substring(0,linesT[i].length);
		if(linesT[i].indexOf("jodel.com")>0) {jodelNb++}
		if(linesT[i].indexOf("ttp")>=0) {linkNb++}
		//console.log(varText);
		var words=varText.split(" ");
		wordNb+=words.length;
	}
	wordNb-=lineNb;
	
	console.log("Sucht den aktivsten Tag");
	var mostTexts=0;
	var mostDate=linesD[0].substring(0,8);
	var textHere=0;
	var dateHere=linesD[0].substring(0,8);
	for(var i = 0;i < linesD.length;i++){
		//console.log(textHere)
		if(dateHere === linesD[i].substring(0,8)) {
			textHere++;
		} else {
			if(textHere > mostTexts) {
				mostTexts=textHere;
				mostDate=dateHere;
			}
			dateHere=linesD[i].substring(0,8)
			textHere=1;
		}
	}
	if(textHere > mostTexts) {
		mostTexts=textHere;
		mostDate=dateHere;
	}

	console.log("Vergleich Nutzer Nachrichten");
	var user1N=0;
	var user2N=0;
	for(var i = 0;i < linesT.length;i++){
		if(linesT[i].substring(0,n1.length).indexOf(n1) >= 0 ) {user1N++}
		if(linesT[i].substring(0,n2.length).indexOf(n2) >= 0 ) {user2N++}
	}

	console.log("Vergleich Nutzer Wörter");
	var user1W=0;
	var user2W=0;
	for(var i = 0;i < linesT.length;i++){
		if(linesT[i].substring(0,n1.length).indexOf(n1) >= 0 ) {
			varText=linesT[i].substring(linesT[i].indexOf(": ")+2,linesT[i].length);
			var words=varText.split(" ");
			user1W=user1W+words.length;
		}
		if(linesT[i].substring(0,n2.length).indexOf(n2) >= 0 ) {
			varText=linesT[i].substring(linesT[i].indexOf(": ")+2,linesT[i].length);
			var words=varText.split(" ");
			user2W=user2W+words.length;
		}
	}	
	
	console.log("Anzahl pro Jahr");
	var textsCountedYear=[];
	var dateHere=oldLines[1].substring(0,8);
	var textHere1=0;
	var textHere2=0;
	var lastLine=true;
	
	if(daysC == 0) {
		for(var i = 0;i < linesD.length;i++){
			if(linesD[i].substring(linesD[i].indexOf(n1),linesD[i].indexOf(n1)+n1.length).indexOf(n1) >= 0 ) {textHere1++}
			if(linesD[i].substring(linesD[i].indexOf(n2),linesD[i].indexOf(n2)+n2.length).indexOf(n2) >= 0 ) {textHere2++}
		}
		textsCountedYear.push([dateHere,textHere1,textHere2]);
		textHere1=0;
		textHere2=0;
	} else {
		j=0;
		dateHere="0";
		for(var i = 0;i < linesD.length;i++){
			if(linesD[i].substring(linesD[i].indexOf(n1),linesD[i].indexOf(n1)+n1.length).indexOf(n1) >= 0 ) {textHere1++}
			if(linesD[i].substring(linesD[i].indexOf(n2),linesD[i].indexOf(n2)+n2.length).indexOf(n2) >= 0 ) {textHere2++}
			
			if(dateHere === linesD[i].substring(0,8)) {
				textsCountedYear[j-1][1]+=textHere1;
				textsCountedYear[j-1][2]+=textHere2;
			} else {
				//console.log(dateHere);
				dateHere=linesD[i].substring(0,8);
				textsCountedYear.push([dateHere,textHere1,textHere2]);
				j++;
			}
			textHere1=0;
			textHere2=0;
		}
	}
	//console.log(allWords);
	
	console.log("Medien raussuchen");
	var mediaCountedYear=[];
	var dateHere=oldLines[1].substring(0,8);
	var textHere1=0;
	var textHere2=0;
	var lastLine=true;
	

	j=0;
	dateHere="0";
	for(var i = 0;i < linesD.length;i++){
		if(linesD[i].substring(linesD[i].indexOf(n1),linesD[i].indexOf(n1)+n1.length).indexOf(n1) >= 0 && linesD[i].indexOf("<Medien ausgeschlossen>") >= 0) {textHere1++}
		if(linesD[i].substring(linesD[i].indexOf(n2),linesD[i].indexOf(n2)+n2.length).indexOf(n2) >= 0 && linesD[i].indexOf("<Medien ausgeschlossen>") >= 0) {textHere2++}
		
		if(dateHere === linesD[i].substring(0,8)) {
			mediaCountedYear[j-1][1]+=textHere1;
			mediaCountedYear[j-1][2]+=textHere2;
		} else {
			//console.log(dateHere);
			dateHere=linesD[i].substring(0,8);
			mediaCountedYear.push([dateHere,textHere1,textHere2]);
			j++;
		}
		textHere1=0;
		textHere2=0;
	}
	
	console.log("Anzahl pro Monat");
	var textsCountedMonth=[];
	textsCountedMonth.push(["Januar",0,0]);		
	textsCountedMonth.push(["Februar",0,0]);		
	textsCountedMonth.push(["März",0,0]);		
	textsCountedMonth.push(["April",0,0]);		
	textsCountedMonth.push(["Mai",0,0]);		
	textsCountedMonth.push(["Juni",0,0]);		
	textsCountedMonth.push(["Juli",0,0]);		
	textsCountedMonth.push(["August",0,0]);		
	textsCountedMonth.push(["September",0,0]);		
	textsCountedMonth.push(["Oktober",0,0]);		
	textsCountedMonth.push(["November",0,0]);		
	textsCountedMonth.push(["Dezember",0,0]);		
	
	//console.log(textsCountedMonth);
	//console.log(textsCountedMonth);
	//console.log(linesD.length);
	
	for(var i = 0;i < linesD.length;i++){
		var monat =parseInt(linesD[i].substring(3,5));
		var name=linesD[i].substring(linesD[i].indexOf(" - ")+3,linesD[i].indexOf(": "));
		if(name == n1 || name == n2) {
			//console.log(monat);
			if( name == n1 ) {
				textsCountedMonth[monat-1][1]+=1;
			} else {
				textsCountedMonth[monat-1][2]+=1;	
			}
		}
	}
	//console.log(textsCountedMonth);
		
	
	console.log("Anzahl pro Wochentag");
	var textsCountedDay=[];
	var textHere1=0;
	var textHere2=0;
	textsCountedDay.push(["Montag",0,0]);		
	textsCountedDay.push(["Dienstag",0,0]);		
	textsCountedDay.push(["Mittwoch",0,0]);		
	textsCountedDay.push(["Donnerstag",0,0]);		
	textsCountedDay.push(["Freitag",0,0]);		
	textsCountedDay.push(["Samstag",0,0]);		
	textsCountedDay.push(["Sonntag",0,0]);		

	//console.log(textsCountedDay);
	//console.log(textsCountedDay);
	//console.log(linesD.length);
	for(var i = 0;i < linesD.length;i++){
		var dateHere= new Date("20"+linesD[i].substring(6,8),linesD[i].substring(3,5)-1,linesD[i].substring(0,2));
		var weekday=dateHere.getDay();
		if (weekday == 0) {
			weekday=6;
		} else {
			weekday-=1;
		}
		var name=linesD[i].substring(linesD[i].indexOf(" - ")+3,linesD[i].indexOf(": "));
		if(name == n1 || name == n2) {
			if( name == n1 ) {
				textsCountedDay[weekday][1]+=1;
			} else {
				textsCountedDay[weekday][2]+=1;	
			}
		}
	}
	
	console.log("Anzahl pro Stunde");
	var textsCountedHour=[];
	for( var i = 0;i<24;i++){
		if(i<10){
			textsCountedHour.push(["0"+i,0,0]);		
		} else {
			textsCountedHour.push([i,0,0]);		
		}
	}
	//console.log(textsCountedDay);
	//console.log(textsCountedDay);
	//console.log(linesD.length);
	for(var i = 0;i < linesD.length;i++){
		var stunde =parseInt(linesD[i].substring(10,12));
		var name=linesD[i].substring(linesD[i].indexOf(" - ")+3,linesD[i].indexOf(": "));
		if(name == n1 || name == n2) {
			if( name == n1 ) {
				textsCountedHour[stunde][1]+=1;
			} else {
				textsCountedHour[stunde][2]+=1;	
			}
		}
	}
	//console.log(textsCountedHour);
	
	console.log("Ordnet Wörter");
	
	var allWords=[];
	var oldWord=0;
	var countW=0;
	var prozW="";
	var person=1;
	for(var i = 0;i < linesT.length;i++){
		

		console.log("Fortschritt: " + i + " von " + linesT.length + "(" + Math.round((i/linesT.length)*100) +"%)");
		//document.getElementById('wait').innerHTML = "(" + Math.round((i/linesT.length)*100) +"%)";
		var name=linesT[i].substring(0, linesT[i].indexOf(":"));
		if( name == n1 ) {
			person=1;
		} else if( name == n2 ){
			person=2;	
		}
		//console.log(name);
		
		varText=linesT[i].replace(n1+": ","");
		varText=varText.replace(n2+": ","");
		var wordsInLine=varText.split(" ");
		for(var j = 0; j < wordsInLine.length; j++) {
			//countW++;
			//prozW=String(Math.round((countW*10000)/wordNb));
			//prozW=prozW.substring(0,prozW.length-2)+","+prozW.substring(prozW.length-2,prozW.length)+"%";
			//console.log("Ordnet Wörter ("+prozW+")");	
		
			//console.log("Neues Wort");
			var newW=true;
			wordS=wordsInLine[j];
			if(wordS != "<Medien" && wordS != "ausgeschlossen>" && wordS != "") {
				for(var k = 0; k < allWords.length; k++) {
					if(wordS.toUpperCase() == allWords[k][0].toUpperCase()) {
						newW=false;
						oldWord=k;
						break;
					}
				}
				if(newW) {
					if(person == 1) {
						allWords.push([wordS,1,0]);
					} else {
						allWords.push([wordS,0,1]);					
					}
				} else {
					allWords[oldWord][person]++;
				}
			}
		}
	
	}

		
	
	console.log("Meisten Wörter allgemein");
	var mostWords=[];
	for(var i = 0; i<10;i++) { mostWords.push(["Placeholder "+i,0,0]);}
	for(var i = 0; i<allWords.length; i++) {
		if((allWords[i][1] + allWords[i][2]) > (mostWords[0][1] + mostWords[0][2])) {
			var k=0;	
			for(var j = 0; j<10; j++) {
				if((allWords[i][1] + allWords[i][2]) > (mostWords[j][1] + mostWords[j][2])) {
					k=j;
				} else {break;}			
			}
			mostWords.splice(0, 1);
			mostWords.splice(k, 0, allWords[i]);
		}
	}
	//	console.log(mostWords);
		
	console.log("Meisten Wörter besonders");
	var mostDivWords=[];
	var mostUsedGermansWords=["der","die","und","in","den","von","zu","das","mit","sich","des","auf","für","ist","im","dem","nicht","ein","eine","als","auch","es","an","werden","aus","er","hat","dass","sie","nach","wird","bei","einer","um","am","sind","noch","wie","einem","über","einen","so","zum","war","haben","nur","oder","aber","vor","zur","bis","mehr","durch","man","sein","wurde","sei","prozent","hatte","kann","gegen","vom","können","schon","wenn","habe","seine","ihre","dann","unter","wir","soll","ich","eines","jahr","diese","dieser","wieder","keine","uhr","seiner","worden","und","will","zwischen","immer","millionen","was","sagte","du"]
	for(var i = 0; i<100;i++) { mostDivWords.push(["Placeholder "+i,0,0]);}
	for(var i = 0; i<allWords.length; i++) {
		//console.log(allWords[i][0].toLowerCase());
		//console.log(mostUsedGermansWords.includes(allWords[i][0].toLowerCase()));
		if(!mostUsedGermansWords.includes(allWords[i][0].toLowerCase())) {
			if((allWords[i][1] + allWords[i][2]) > (mostDivWords[0][1] + mostDivWords[0][2])) {
				var k=0;	
				for(var j = 0; j<100; j++) {
					if((allWords[i][1] + allWords[i][2]) > (mostDivWords[j][1] + mostDivWords[j][2])) {
						k=j;
					} else {break;}			
				}
				mostDivWords.splice(0, 1);
				mostDivWords.splice(k, 0, allWords[i]);
			}
		}
	}
	
	
	
	console.log("Baut WordCloud");
	
	var CloudData=[];
	var CloudNb=0;
	var CloudElement=[];
	
	for(var i = 0; i<mostDivWords.length; i++){
		CloudElement={};
		if (i == 0) {
			CloudElement.name=mostDivWords[i][0];
			CloudElement.value=mostDivWords[i][1] + mostDivWords[i][2]; 
			CloudElement.textStyle={ 
				normal: {
					color: 'black'
				},
				emphasis: {
					color: 'red'
				}
			}
		} else {
			CloudElement.name=mostDivWords[i][0];
			CloudElement.value=mostDivWords[i][1] + mostDivWords[i][2]; 
		}
		CloudData.push(CloudElement);
	
	}
	//console.log(CloudData);
	           

	var chart = echarts.init(document.getElementById('containerStatistic_WordCloud'));

            var option = {
                tooltip: {},
                series: [ {
                    type: 'wordCloud',
                    gridSize: 6,
                    sizeRange: [10, 100],
                    rotationRange: [-45, 45],
                    shape: 'cardioid',
					left: 0,
					top: 0,
					width: '100%',
					height: '100%',
					drawOutOfBound: false,
                    textStyle: {
                        normal: {
                            color: function () {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: CloudData
                } ]
            };

            chart.setOption(option);
	
	
	console.log("Bereitet alles auf");

	var showLines=insertPoints(lineNb);
	var showWords=insertPoints(wordNb);
	var showLink=insertPoints(linkNb);
	var showJodel=insertPoints(jodelNb);
	var showMost=insertPoints(mostTexts);

	document.getElementById('Count_Messages_Data').innerText = showLines;	
	document.getElementById('Count_Words_Data').innerText = showWords;	
	document.getElementById('Count_Links_Data').innerText = showLink;	
	document.getElementById('Count_Jodel_Data').innerText = "(Davon Jodel: "+showJodel+")";	
	document.getElementById('Count_MostActiveDay_Data').innerText = mostDate;	
	document.getElementById('Count_MostActiveWords_Data').innerText = "(Nachrichten: "+showMost+")";	
	
	document.getElementById('filecontents').innerText = varTextT +"\n\n\n"+ varTextD;	
	
	console.log("Zeichnet Diagramme");
	
	//Vergleich Nachrichten
	var datenDiagram = [
		['Nachrichten', 'Anzahl'],
		[n1, user1N],
		[n2, user2N]
	];
	drawPieChart(datenDiagram,"Prop_Chats","... nach gezählten Nachrichten");
	
	//Vergleich Wörter
	var datenDiagram = [
		['Wörter', 'Anzahl'],
		[n1, user1W],
		[n2, user2W]
	];
	drawPieChart(datenDiagram,"Prop_Words","... nach gezählten Wörtern");

	//Vergleich Jahr
	var datenDiagram = [];
	datenDiagram.push(['Nachrichten', n1, n2]);
	//console.log("check");
	//console.log(textsCountedYear);
	for (var i = 0; i<textsCountedYear.length;i++){
		datenDiagram.push(textsCountedYear[i])
	}
	drawColumnChart(datenDiagram,"containerStatistic_Year","... als Übersicht");
	
	//Vergleich Monat
	var datenDiagram = [];
	datenDiagram.push(['Nachrichten', n1, n2]);
	//console.log("check");
	//console.log(textsCountedMonth);
	for (var i = 0; i<textsCountedMonth.length;i++){
		datenDiagram.push(textsCountedMonth[i])
	}
	drawColumnChart(datenDiagram,"containerStatistic_Month","... pro Monat");
	
	//Vergleich Woche
	var datenDiagram = [];
	datenDiagram.push(['Nachrichten', n1, n2]);
	//console.log("check");
	//console.log(textsCountedMonth);
	for (var i = 0; i<textsCountedDay.length;i++){
		datenDiagram.push(textsCountedDay[i])
	}
	drawColumnChart(datenDiagram,"containerStatistic_Day","... pro Woche");
	
	//Vergleich Stunde
	var datenDiagram = [];
	datenDiagram.push(['Nachrichten', n1, n2]);
	//console.log("check");
	//console.log(textsCountedMonth);
	for (var i = 0; i<textsCountedHour.length;i++){
		datenDiagram.push(textsCountedHour[i])
	}
	drawColumnChart(datenDiagram,"containerStatistic_Hour","... pro Stunde");	
	
	//Vergleich Medien im Jahr
	var datenDiagram = [];
	datenDiagram.push(['Nachrichten', n1, n2]);
	//console.log("check");
	//console.log(textsCountedMonth);
	for (var i = 0; i<mediaCountedYear.length;i++){
		datenDiagram.push(mediaCountedYear[i])
	}
	drawColumnChart(datenDiagram,"containerStatistic_Media","Medien (Bilder, Videos, Sprachnachrichten, ...)");

	//Vergleich Wörter Allgemein
	var datenDiagram = [];
	datenDiagram.push(['Nachrichten', n1, n2]);
	//console.log("check");
	//console.log(textsCountedMonth);
	for (var i = 0; i<mostWords.length;i++){
		datenDiagram.push(mostWords[i])
	}
	drawColumnChart(datenDiagram,"containerStatistic_Count","Meistbenutzte Wörter");
		
	//Vergleich Wörter Speziell
	var datenDiagram = [];
	datenDiagram.push(['Nachrichten', n1, n2]);
	//console.log("check");
	//console.log(textsCountedMonth);
	for (var i = 0; i<10;i++){
		datenDiagram.push(mostDivWords[90 + i])
	}
	drawColumnChart(datenDiagram,"containerStatistic_CountMore","Meistbenutzte Wörter (ohne die 100 meistgenutzten Wörter in der deutschen Sprache)");
		
	
	
}

function insertPoints(number) {
	//console.log(number);
	var newNumber=String(number);
	if(String(number).length>6) {
		newNumber=newNumber.substring(0,newNumber.length-6)+"."+newNumber.substring(newNumber.length-6,newNumber.length-3)+"."+newNumber.substring(newNumber.length-3,newNumber.length);
	} else if(String(number).length>3) {
		newNumber=newNumber.substring(0,newNumber.length-3)+"."+newNumber.substring(newNumber.length-3,newNumber.length);
	}

	return newNumber;
}




