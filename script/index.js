var csvUrl = "https://abarrie2.github.io/data/box_office.csv";
var currentSlide = 1;

function NextSlide() {
	switch(currentSlide) {
		case 1:
			ShowSlide2();
			break;
		case 2:
			ShowSlide3();
			break;
		case 3:
			ShowSlide4();
			break;
		case 4:
			ShowSlide5();
			break;
		case 5:
			ShowSlide6();
			break;
		case 6:
			// do nothing
			break;
	}
}

function PreviousSlide() {
	switch(currentSlide) {
		case 1:
			// do nothing
			break;
		case 2:
			ShowSlide1();
			break;
		case 3:
			ShowSlide2();
			break;
		case 4:
			ShowSlide3();
			break;
		case 5:
			ShowSlide4();
			break;
		case 6:
			ShowSlide5();
			break;
	}
}

function ShowLoading() {
	currentSlide = 1;
	setTitle("Loading Data.");
	setContent("Please enjoy your patient moment. Think about something beautiful. We recommend cats.");
}

function ShowSlide1() {
	currentSlide = 1;
	setTitle("Phase 1 - 2008 to 2012");
	setContent("Our story begins in 2008. After Hollywood's occasional return to classic comic books, Marvel Studios release Iron Man.");
	drawBarChart(getData(2008,2012), getData(2008,2012));
}
function ShowSlide2() {
	currentSlide = 2;
	setTitle("Phase 2 - 2013 to 2015");
	setContent("Phase 2 lorem ipsum.");
	drawBarChart(getData(2008,2015), getData(2013,2015));
}
function ShowSlide3() {
	currentSlide = 3;
	setTitle("Phase 3 - 2016 to 2019");
	setContent("Phase 3 lorem ipsum.");
	drawBarChart(getData(2008,2019), getData(2016,2019));
}
function ShowSlide4() {
	currentSlide = 4;
	setTitle("Phase 4 - 2021 to 2022");
	setContent("Phase 4 lorem ipsum.");
	drawBarChart(getData(2008,2022), getData(2021,2022));
}
function ShowSlide5() {
	currentSlide = 5;
	setTitle("Phase 5 - 2023 and ongoing");
	setContent("Phase 5 lorem ipsum.");
	drawBarChart(getData(2008,2023), getData(2023,2023));
}
function ShowSlide6() {
	currentSlide = 6;
	setTitle("Marvel Cinematic Universe");
	setContent("Overall.");
	drawBarChart(localData, localData);
}

function getData(startYear, endYear) {
	var subsetData = [];
	for (var i = 0; i < localData.length; i++) {
		if (localData[i].releaseYear >= startYear && localData[i].releaseYear <= endYear) {
			subsetData.push(localData[i]);
		}
    }
	
	return subsetData;
};

function setTitle(title) {
	const elem = document.getElementById("slideTitle");
	elem.innerHTML = "";
	elem.appendChild(document.createTextNode(title));
}

function setContent(text) {
	const elem = document.getElementById("textContent");
	if (elem != null) {
		elem.innerHTML = "";
		elem.appendChild(document.createTextNode(text));
	}
}


const chartElement = document.getElementById("chartContent");

// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
	width = chartElement.clientWidth - margin.left - margin.right,
	height = 700 - margin.top - margin.bottom;

function initBarChart() {
	// append the svg object to the body of the page
	var svg = d3.select("#chartContent")
	  .append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform",
			  "translate(" + margin.left + "," + margin.top + ")");
}

function drawBarChart(cumulativeData, phaseData) {
	
	var svg = d3.select("#chartContent");
	
	var years = d3.map(cumulativeData, function(d){return d.releaseYear;}).keys()

	var grossByYear = d3.rollup(cumulativeData, v => d3.sum(v, d => d.boxOfficeGrossGlobal), d => d.releaseYear)
	
	console.log("Gross By Year: " + grossByYear);
	
	
	
	var groups = d3.map(cumulativeData, function(d){return(d.releaseYear)}).keys()
	console.log(groups);
		  
	// List of subgroups = header of the csv files = soil condition here
	var subgroups = localData.columns.slice(1)
	console.log(subgroups);

	// List of groups = species here = value of the first column called group -> I show them on the X axis
	var groups = d3.map(cumulativeData, function(d){return(d.releaseYear)}).keys()
	console.log(groups);
	
	
	var x = d3.scaleBand().range([0, width]).padding(0.5);
	var y = d3.scaleLinear().range([height, 0]);
	
	
	console.log(years);
	x.domain(years);
	y.domain([0,800000000]);
	
	svg.selectAll("chart")
		.data(grossByYear)
		.enter()
		.append("rect")
			.attr("x", function(d) { return x(d.releaseYear); })
			.attr("y", function(d) { return y(d.boxOfficeGrossGlobal); })
			.attr("width", x.bandwidth())
			.attr("height", function(d) { return height - y(d.boxOfficeGrossGlobal); })
			.attr("fill", "#69b3a2")
}

// first time load? show slide 1
ShowLoading();
initBarChart();

// local placeholder for data once acquired from CSV
var localData = null;
var annualRevenueDict = {};

// load the full dataset
d3.csv(csvUrl, d3.autoType)
.then(function(data) {
	localData = data;
    /*
	for (var i = 0; i < data.length; i++) {
        console.log(data[i].phase);
        console.log(data[i].film);
    }
	*/
	
	
	ShowSlide1();
});

