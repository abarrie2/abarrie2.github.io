var currentSlide = 1;

function() NextSlide() {
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

function() PreviousSlide() {
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

function() ShowSlide1() {
	currentSlide = 1;
}
function() ShowSlide2() {
	currentSlide = 2;
}
function() ShowSlide3() {
	currentSlide = 3;
}
function() ShowSlide4() {
	currentSlide = 4;
}
function() ShowSlide5() {
	currentSlide = 5;
}
function() ShowSlide6() {
	currentSlide = 6;
}

// first time load? show slide 1
ShowSlide1();

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