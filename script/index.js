var csvUrl = "https://abarrie2.github.io/data/box_office.csv";
var currentSlide = 1;

const chartElement = document.getElementById("chartContent");

// set the dimensions and margins of the graph
var margin = {top: 10, right: 50, bottom: 10, left: 50},
	width = chartElement.clientWidth - margin.left - margin.right,
	height = 700 - margin.top - margin.bottom;

var annoWidthUnit = width / 20;
var annoHeightUnit = width / 20;

String.prototype.toHex = function() {
    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        hash = this.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    var color = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 255;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}


// const stringToColour = (str: string) => {
  // const hash = 0;
  // str.split('').forEach(char => {
    // hash = char.charCodeAt(0) + ((hash << 5) - hash)
  // })
  // let colour = '#'
  // for (let i = 0; i < 3; i++) {
    // const value = (hash >> (i * 8)) & 0xff
    // colour += value.toString(16).padStart(2, '0')
  // }
  // return colour
// };

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
	setTitle("Phase 1 - 2008 to 2011");
	setContent("Our story begins in 2008. After Hollywood's occasional return to classic comic books, Marvel Studios release Iron Man. One month later, The Hulk is released. These films mark the first steps towards a collection of films with interwoven stories carrying through multiple-year release schedules with continuous themes like a television series.");
	
	
	var annotations = [
	  {
		note: {
			label: "Iron Man is released May 2, 2008. This marks the beginning of the MCU.",
			bgPadding: 20,
			title: "It Begins!"
		},
		data: { releaseYear: 2008, total: 825.0 },
		dy: (3 * annoHeightUnit),
		dx: (6 * annoWidthUnit),
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  }
	];
	
	drawBarChart(getData(2008,2011), getData(2008,2011), annotations, 2008, 2011);
}
function ShowSlide2() {
	currentSlide = 2;
	setTitle("Phase 2 - 2012 to 2014");
	setContent("In Phase 2, the MCU sees an increase in the freqncy of films being released, and the first entry in the significant Avengers series - one of which will eventually become the highest grossing film of all time. However, those achivements won't be reached in this phase. Still, a radical growth in total box office gross from the MCU is clearly seen during this time.");
	
	var annotations = [
	  {
		note: {
			label: "The Avengers is released on May 4, 2012 and demonstrates a massive box office pull that would continue through the Avengers sequels.",
			bgPadding: 20,
			title: "Avengers Assemble!"
		},
		data: { releaseYear: 2012, total: 1500.0 },
		dy: (3 * annoHeightUnit),
		dx: (4 * annoWidthUnit),
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  },
	  {
		note: {
			label: "Iron Man 3 and Thor: Dark World are both released in 2012. While neither performs in the vicinity of The Avengers, this multiple-release year does exceed 2012 in terms of annual gross.",
			bgPadding: 20,
			title: "Stack Them!"
		},
		data: { releaseYear: 2013, total: 1800.0 },
		dy: (2 * annoHeightUnit),
		dx: (4 * annoWidthUnit),
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  }
	];
	
	drawBarChart(getData(2008,2014), getData(2013,2014), annotations, 2013, 2014);
}
function ShowSlide3() {
	currentSlide = 3;
	setTitle("Phase 3 - 2016 to 2019");
	setContent("Phase 3 of the MCU is when an explosion occurs. Many films are being released and the storylines between each entry have become increasingly interwoven. It seems as if the experiment has worked, and the studio has built a hungry following of movie goers excited to consume the entire breadth of films being produced. This concludes in 2019 which included the release of Avengers: End Game which has gone on to become the highest grossing film in history.");
	
	var annotations = [
	  {
		note: {
			label: "Three films are released in 2019: Captain Marvel, Spider-Man: Far From Home, and Avengers: End Game. End Game alone grosses nearly $2.8 billion.",
			bgPadding: 20,
			title: "End Game!"
		},
		data: { releaseYear: 2019, total: 4800.0 },
		dy: annoHeightUnit,
		dx: -(3 * annoWidthUnit),
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  }
	];
	
	drawBarChart(getData(2008,2019), getData(2016,2019), annotations, 2016, 2019);
}
function ShowSlide4() {
	currentSlide = 4;
	setTitle("Phase 4 - 2021 to 2022");
	setContent("While one cannot understate the impact of the COVID-19 pandemic on box office records, one also cannot deny the absolute lack of film-going enthusiasm that followed the return to theatres in 2021 and 2022 for the MCU. Box office take does not come anywhere near the peak of 2019. Further, the gross revenue continuse to drop in 2022. HAve audiences grown exhausted of the volume of media delivered through this experiment?");
	
	var annotations = [
	  {
		note: {
			label: "Unsurprisingly, the COVID-19 pandemic forced and corresponding lockdowns and safety measures caused studios to defer film releases through the year.",
			bgPadding: 20,
			title: "Pandemic!"
		},
		data: { releaseYear: 2020, total: 0 },
		dy: -(5 * annoHeightUnit),
		dx: -(5 * annoWidthUnit),
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  },
	  {
		note: {
			label: "2021 sees the release of four films but also a dramatic reduction in box office gross.",
			bgPadding: 20,
			title: "Exhaustion?"
		},
		data: { releaseYear: 2021, total: 3000 },
		dy: -(2 * annoHeightUnit),
		dx: annoWidthUnit,
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  },
	  {
		note: {
			label: "2022 sees the release three films and a continued downward trend in box office gross.",
			bgPadding: 20,
			title: "Exhaustion!"
		},
		data: { releaseYear: 2022, total: 2500 },
		dy: -(annoHeightUnit),
		dx: annoWidthUnit,
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  }
	];
	
	drawBarChart(getData(2008,2022), getData(2021,2022), annotations, 2021, 2022);
}
function ShowSlide5() {
	currentSlide = 5;
	setTitle("Phase 5 - 2023 and ongoing");
	setContent("Though we are only in the nascent parts of Phase 5, which began in 2023, the continued drop in gross box office continues. It seems that the hey day of the MCU has passed, and audiences are moving on to greener pastures.");
	
	var annotations = [
	  {
		note: {
			label: "By July 2023, 2 films have been released during the year and total gross plummets even further.",
			bgPadding: 20,
			title: "Continuation!"
		},
		data: { releaseYear: 2023, total: 1200 },
		dy: -(4 * annoHeightUnit),
		dx: -(annoWidthUnit),
		className: "show-bg",
		subject: { radius: 50, radiusPadding: 0 },
	  }
	];
	
	drawBarChart(getData(2008,2023), getData(2023,2023), annotations, 2023, 2023);
}
function ShowSlide6() {
	currentSlide = 6;
	setTitle("Marvel Cinematic Universe");
	setContent("Feel free to interact with the unrestricted revenue chart to explore the trends in MCU box office revenues.");
	
	var annotations = [];
	
	drawBarChart(localData, localData, annotations, 2008, 2023);
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




function drawBarChart(cumulativeData, phaseData, annotations, startYear, endYear) {
	
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
	
	var allNames = [];
	var allColors = {};
	
	cumulativeData.forEach((item) => {
		allNames.push(item.film);
		allColors[item.film] = item.film.toHex();
	});
	
	// seed annual box data structure
	for (let i = minYear; i <= maxYear; i++)
	{
		annualData[i] = {
			releaseYear: i,
			releaseDate: new Date(i, 1, 1),
			total: 0,
			usTotal: 0,
			rowTotal: 0
		};
	}
	
	// calculate annual data totals
	// rescale into millions
	cumulativeData.forEach((item) => {
		annualData[item.releaseYear].total += item.boxOfficeGrossGlobal / 1000000.0;
		annualData[item.releaseYear].usTotal += item.boxOfficeGrossUsCanada / 1000000.0;
		annualData[item.releaseYear].rowTotal += item.boxOfficeGrossRestOfWorld / 1000000.0;
	});
	
	// calculate cumulative data totals
	var runningTotal = 0;
	var runningTotalUs = 0;
	var runningTotalRow = 0;
	for (let i = minYear; i <= maxYear; i++)
	{
		runningTotal += annualData[i].total;
		runningTotalUs += annualData[i].usTotal;
		runningTotalRow += annualData[i].rowTotal;
		
		cumeData[i] = {
			releaseYear: i,
			releaseDate: new Date(i, 1, 1),
			total: runningTotal,
			usTotal: runningTotalUs,
			rowTotal: runningTotalRow
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

	var stackGen = d3.stack()
		.keys(allNames)
		.value((obj, key) => obj.film == key ? obj.boxOfficeGrossGlobal / 1000000.0 : 0.0 );
	
	var stackedSeries = stackGen(phaseData);
	console.log(stackedSeries);

	svg.append("g")
      .attr("fill", "steelblue")
      .attr("fill-opacity", 0.8)
    .selectAll("rect")
    .data(annualDataArray)
    .join("rect")
      .attr("x", d => x(d.releaseYear))
      .attr("width", x.bandwidth())
      .attr("y", d => y(d.total))
      .attr("height", d => y(0) - y(d.total));
	  
	  
	// svg.select('g')
	  // .selectAll('g.series')
	  // .data(stackedSeries)
	  // .join('g')
	  // .classed('series', true)
	  // .style('fill', (d) => allColors[d.key]);
	  
	// svg.append("g")
    // .selectAll("rect")
    // .data((d) => d)
    // .join("rect")
      // .attr('width', 40)
	  // .attr('y', (d) => yScale(d[1]))
	  // .attr('x', (d) => xScale(d.releaseYear))
	  // .attr('height', (d) => yScale(d[0]) -  yScale(d[1]));

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
		.annotations(annotations)
		.accessors({
		  x: d => x(d.releaseYear) + margin.left,
		  y: d => y(d.total) + margin.top
		});

	d3.select("svg")
	  .append("g")
	  .attr("class", "annotation-group")
	  .call(makeAnnotations);
	  
	  
	
	var tooltip = d3.select("#chartContent")
	  .append("div")
		.style("position", "absolute")
		.style("visibility", "hidden")
		.text("I'm a circle!");

	//
	d3.select("#circleBasicTooltip")
	  .on("mouseover", function(){return tooltip.style("visibility", "visible");})
	  .on("mousemove", function(){return tooltip.style("top", (event.pageY-800)+"px").style("left",(event.pageX-800)+"px");})
	  .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
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

