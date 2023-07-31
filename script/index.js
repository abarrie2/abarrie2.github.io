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
	
	
	var annotations = [
	  {
		note: {
			label: "Iron Man is released May 2, 2008. This marks the beginning of the MCU.",
			bgPadding: 20,
			title: "It Begins!"
		},
		x: 115,
		y: 315,
		dy: -50,
		dx: 150,
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  },
	  {
		note: {
			label: "Captain America: The First Avenger is released July 22, 2011 and marks a significant uptick in box office achieved by a release in the series.",
			bgPadding: 20,
			title: "A New Peak!"
		},
		x: 500,
		y: 50,
		dy: 100,
		dx: 150,
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  }
	];
	
	drawBarChart(getData(2008,2012), getData(2008,2012), annotations);
}
function ShowSlide2() {
	currentSlide = 2;
	setTitle("Phase 2 - 2013 to 2015");
	setContent("Phase 2 lorem ipsum.");
	
	var annotations = [
	  {
		note: {
			label: "Hi",
			bgPadding: 20,
			title: "Annotations!"
		},
		x: 25,
		y: 25,
		dy: 150,
		dx: 250,
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  },
	];
	
	drawBarChart(getData(2008,2015), getData(2013,2015), annotations);
}
function ShowSlide3() {
	currentSlide = 3;
	setTitle("Phase 3 - 2016 to 2019");
	setContent("Phase 3 lorem ipsum.");
	
	var annotations = [
	  {
		note: {
			label: "Hi",
			bgPadding: 20,
			title: "Annotations!"
		},
		x: 150,
		y: 100,
		dy: 150,
		dx: 250,
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  },
	];
	
	drawBarChart(getData(2008,2019), getData(2016,2019), annotations);
}
function ShowSlide4() {
	currentSlide = 4;
	setTitle("Phase 4 - 2021 to 2022");
	setContent("Phase 4 lorem ipsum.");
	
	var annotations = [
	  {
		note: {
			label: "Hi",
			bgPadding: 20,
			title: "Annotations!"
		},
		x: 200,
		y: 100,
		dy: 150,
		dx: 250,
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  },
	];
	
	drawBarChart(getData(2008,2022), getData(2021,2022), annotations);
}
function ShowSlide5() {
	currentSlide = 5;
	setTitle("Phase 5 - 2023 and ongoing");
	setContent("Phase 5 lorem ipsum.");
	
	var annotations = [
	  {
		note: {
			label: "Hi",
			bgPadding: 20,
			title: "Annotations!"
		},
		x: 500,
		y: 175,
		dy: 150,
		dx: -250,
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  },
	];
	
	drawBarChart(getData(2008,2023), getData(2023,2023), annotations);
}
function ShowSlide6() {
	currentSlide = 6;
	setTitle("Marvel Cinematic Universe");
	setContent("Overall.");
	
	var annotations = [];
	
	drawBarChart(localData, localData, annotations);
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
var margin = {top: 10, right: 50, bottom: 10, left: 50},
	width = chartElement.clientWidth - margin.left - margin.right,
	height = 700 - margin.top - margin.bottom;

function drawBarChart(cumulativeData, phaseData, annotations) {
	
	// reset the chart panel
	var  elem = document.getElementById("chartContent");
	elem.innerHTML = "";
	
	// cluster box office by year for line chart
	var boxByYear = d3.rollup(cumulativeData, v => d3.sum(v, d => d.boxOfficeGrossGlobal) / 1000000.0, d => d.releaseDate)
	var revenueMax = d3.max(boxByYear, d => d[1]);
	
	
	// get min and max years
	var years = [...new Set(cumulativeData.map((d) => d.releaseDate))]
	var allYears = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
	var minYear = 2008;
	var maxYear = d3.max(cumulativeData, d => d.releaseYear);
	
	// populate annual and cumulative box office data structures
	var annualData = {};
	var cumeData = {};
	
	// seed annual box data structure
	for (let i = minYear; i <= maxYear; i++)
	{
		annualData[i] = {
			releaseYear: i,
			releaseDate: new Date(i, 1, 1),
			total: 0
		};
	}
	
	// calculate annual data totals
	// rescale into millions
	cumulativeData.forEach((item) => {
		annualData[item.releaseYear].total += item.boxOfficeGrossGlobal / 1000000.0;
	});
	
	// calculate cumulative data totals
	var runningTotal = 0;
	for (let i = minYear; i <= maxYear; i++)
	{
		runningTotal += annualData[i].total;
		
		cumeData[i] = {
			releaseYear: i,
			releaseDate: new Date(i, 1, 1),
			total: runningTotal
		};
	}
	
	
	
	var annualDataArray = Object.values(annualData);
	var cumeDataArray = Object.values(cumeData);
	
	var cumeMax = d3.max(cumeDataArray, d => d.total);
	
	console.log(cumeDataArray);
	
	var xDomain = annualDataArray.map(d => d.releaseYear);

	// define scales
	var x = d3.scaleBand()
		.domain(allYears)
		.rangeRound([margin.left, width-margin.right])
		.padding(0.1);
	var y = d3.scaleLinear()
		.domain([0, revenueMax])
		.rangeRound([height - margin.bottom, margin.top]);
	var y2 = d3.scaleLinear()
		.domain([0, cumeMax])
		.rangeRound([height - margin.bottom, margin.top]);
	

	// define the line
	var line = d3.line()
		.x(function(d) { return x(d.releaseYear); })
		.y(function(d) { return y(d.total); })
		
	var cumeLine = d3.line()
		.x(function(d) { return x(d.releaseYear); })
		.y(function(d) { return y2(d.total); })


	var svg = d3.select("#chartContent").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
	
 
	
	var tooltip = d3.select("body")
		.append("div")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.style("background", "#000")
		.text("a simple tooltip");
 

	var xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x)
        .tickValues(d3.ticks(...d3.extent(x.domain()), width / 40).filter(v => x(v) !== undefined))
        .tickSizeOuter(0));

	var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .style("color", "red")
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Global Box Office ($ Millions)")
	);
	
	var y2Axis = g => g
    .attr("transform", `translate(${width - margin.right},0)`)
	.style("color", "grey")
    .call(d3.axisRight(y2))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", margin.right)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Cumulative Box Office ($ Millions)")
	);

	// draw axes
	svg.append("g").call(xAxis);
	svg.append("g").call(yAxis);
	svg.append("g").call(y2Axis);


	// Data Lines:
	svg.append("path")
		.datum(annualDataArray)
		.attr("class", "revLine")
		.attr("d", line);
		
	svg.append("path")
		.datum(Object.values(cumeData))
		.attr("class", "cumeLine")
		.attr("d", cumeLine);

	const type = d3.annotationCustomType(
	  d3.annotationCalloutCircle, 
	  {"className":"custom",
		"connector":{"type":"elbow",
		"end":"arrow"},
		"note":{"lineType":"vertical",
		"align":"middle"}})

	var makeAnnotations = d3.annotation()
		.type(type)
		.notePadding(15)
		.annotations(annotations);

	d3.select("svg")
	  .append("g")
	  .attr("class", "annotation-group")
	  .call(makeAnnotations)
}

// first time load? show slide 1
ShowLoading();

// local placeholder for data once acquired from CSV
var localData = null;

// load the full dataset
d3.csv(csvUrl, d3.autoType)
.then(function(data) {
	localData = data;
	for (var i = 0; i < data.length; i++) {
        // console.log(data[i].phase);
        // console.log(data[i].film);
		data[i].releaseDate = new Date(data[i].releaseYear, 1, 1);
    }
	
	
	ShowSlide1();
});

