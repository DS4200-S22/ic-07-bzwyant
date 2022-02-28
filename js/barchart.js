/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
// chooses the svg with the id hard coded bar
// add an svg to the div with that id
// sets the width attribute
// sets the height atribute
// sets the viewbox to be from (0,0) to the width and height
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// sets the max Y to be the largest bar
let maxY1 = d3.max(data1, function(d) { return d.score; });

// scales the y axis by a linear scale and sets the domain to be the y max
// and the range to be the top and bottom margins
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// scales the x axis by the number of elements in the list and adds padding
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 


// adds a grouping element to svg1 for the y scale and changes transform
// and the font size
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// same thing as for the y axis but for the x axis except it also changes the 
// tick format
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// sets the tooltop to be the element with the id hard coded bar
// appends the tooltop to the hardcoded bar div
// changes the attripute id to be tooltop1
// sets the opacity to 0 so you cannot see it
// sets the class to tooltip
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// adds a mouseover function event
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// adds a mouse event for the tooltip
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// makes the mouseLeave event to make the tooltip not visible
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// selects and sets all attributes for the bar class
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);


// Part 11
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/barchart.csv").then((data) => {
  console.log(data)
  
  let maxY2 = d3.max(data, function(d) { return d.score; });

  let yScale2 = d3.scaleLinear()
                  .domain([0,maxY2])
                  .range([height-margin.bottom,margin.top]); 

  let xScale2 = d3.scaleBand()
                  .domain(d3.range(data.length))
                  .range([margin.left, width - margin.right])
                  .padding(0.1); 

  svg2.append("g")
      .attr("transform", `translate(${margin.left}, 0)`) 
      .call(d3.axisLeft(yScale2)) 
      .attr("font-size", '20px'); 

  svg2.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(xScale2) 
              .tickFormat(i => data[i].name))  
      .attr("font-size", '20px'); 

  const tooltip2 = d3.select("#hard-coded-bar") 
                    .append("div") 
                    .attr('id', "tooltip2") 
                    .style("opacity", 0) 
                    .attr("class", "tooltip"); 

  const mouseover2 = function(event, d) {
    tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
            .style("opacity", 1);  
  }

  const mousemove2 = function(event, d) {
    tooltip2.style("left", (event.pageX)+"px") 
            .style("top", (event.pageY + yTooltipOffset) +"px"); 
  }

  const mouseleave2 = function(event, d) { 
    tooltip2.style("opacity", 0); 
  }

  svg2.selectAll(".bar") 
    .data(data) 
    .enter()  
    .append("rect") 
      .attr("class", "bar") 
      .attr("x", (d,i) => xScale2(i)) 
      .attr("y", (d) => yScale2(d.score)) 
      .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
      .attr("width", xScale2.bandwidth()) 
      .on("mouseover", mouseover2) 
      .on("mousemove", mousemove2)
      .on("mouseleave", mouseleave2);
});