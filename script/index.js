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
	drawBarChart(getData(2008,2012));
}
function ShowSlide2() {
	currentSlide = 2;
	setTitle("Phase 2 - 2013 to 2015");
	setContent("Phase 2 lorem ipsum.");
	drawBarChart(getData(2008,2015));
}
function ShowSlide3() {
	currentSlide = 3;
	setTitle("Phase 3 - 2016 to 2019");
	setContent("Phase 3 lorem ipsum.");
	drawBarChart(getData(2008,2019));
}
function ShowSlide4() {
	currentSlide = 4;
	setTitle("Phase 4 - 2021 to 2022");
	setContent("Phase 4 lorem ipsum.");
	drawBarChart(getData(2008,2022));
}
function ShowSlide5() {
	currentSlide = 5;
	setTitle("Phase 5 - 2023 and ongoing");
	setContent("Phase 5 lorem ipsum.");
	drawBarChart(getData(2008,2023));
}
function ShowSlide6() {
	currentSlide = 6;
	setTitle("Marvel Cinematic Universe");
	setContent("Overall.");
	drawBarChart(localData);
}

function getData(startYear, endYear) {
	var subsetData = [];
	for (var i = 0; i < localData.length; i++) {
		if (localData[i].Year_Release >= startYear && localData[i].Year_Release <= endYear) {
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

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 50},
	width = 460 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;



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

function drawBarChart(data) {
	
	var svg = d3.select("#chartContent");
	
	var years = d3.map(data, function(d){return d.Year_Release;}).keys()
	
	console.log(data);
	
	
	
	var groups = d3.map(data, function(d){return(d.Year_Release)}).keys()
	console.log(groups);
		  
	// List of subgroups = header of the csv files = soil condition here
	var subgroups = localData.columns.slice(1)
	console.log(subgroups);

	// List of groups = species here = value of the first column called group -> I show them on the X axis
	var groups = d3.map(data, function(d){return(d.Year_Release)}).keys()
	console.log(groups);
	
	
	var x = d3.scaleBand().range([0, width]).padding(0.5);
	var y = d3.scaleLinear().range([height, 0]);
	
	x.domain(years);
	y.domain([0,sumBoxOffice]);
	

  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 60])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8','#4daf4a'])

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.group); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())	  
}

// first time load? show slide 1
ShowLoading();
initBarChart();

// local placeholder for data once acquired from CSV
var localData = null;
var annualRevenueDict = {};

console.log("HELLO");

// load the full dataset
d3.csv("https://abarrie2.github.io/data/box_office.csv", d3.autoType)
.then(function(data) {
	localData = data;
    /*
	for (var i = 0; i < data.length; i++) {
        console.log(data[i].Phase);
        console.log(data[i].Film);
    }
	*/
	
	
	ShowSlide1();
});





/*
const svg = d3.select('svg');
const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);
svg.append('path')
	.attr('class', 'sphere')
	.attr('d', pathGenerator({type: 'Sphere'}));
d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
  .then(data => {
	const countries = topojson.feature(data, data.objects.countries);
	svg.selectAll('path').data(countries.features)
	  .enter().append('path')
		.attr('class', 'country')
		.attr('d', pathGenerator);
  });
  */