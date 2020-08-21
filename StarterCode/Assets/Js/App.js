
let svgWidth = 960;
let svgHeight = 500;

let margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;


let svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


let chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("assets/data/data_data.csv").then(function (statedata) {


  // if (error) return console.warn(error)

  statedata.forEach(data => {
    data.poverty = +data.poverty;
    data.smokes = +data.smokes;
  });



  let xScale = d3.scaleLinear()
    .domain([8, d3.max(statedata, data => data.poverty)])
    .range([0, width]);

  let yLinearScale = d3.scaleLinear()
    .domain([4, d3.max(statedata, data => data.smokes)])
    .range([height, 0]);



  let bottomAxis = d3.axisBottom(xScale);
  let leftAxis = d3.axisLeft(yLinearScale);



  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);



  chartGroup.append("g")
    .call(leftAxis);


  let circlesGroup = chartGroup.selectAll("circle")
    .data(statedata)
    .enter()
    .append("circle")
    .attr("cx", data => xScale(data.poverty))
    .attr("cy", data => yLinearScale(data.smokes))
    .attr("r", 15)
    .attr("class", function (data) {
      return "stateCircle " + data.abbr;
    })
    .attr("fill", "purple")
    .attr("opacity", ".8")


  let textGroup = chartGroup.selectAll('text')
    .exit()
    .data(statedata)
    .enter()
    .append('text')
    .text(data => data.abbr)
    .attr('x', data => xScale(data.poverty))
    .attr('y', data => yLinearScale(data.smokes))
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '12px')
    .attr('fill', '#fff');

  chartGroup.append("text")
    .attr("transform", `translate(${width / 3}, ${height + margin.top + 20})`)
    .text("Percentage of Population in Poverty");


  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 1.2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Percentage of Population that Smokes");

  let toolTip = d3.tip()
    .attr('class', 'tooltip')
    .offset([80, -60])
    .html(function(data) {
      return (`Poverty: ${data.poverty} <br> Smokes ${data.smokes}`);
    });

  chartGroup.call(toolTip);

  circlesGroup.on("mouseover", function (data) {
    toolTip.show(data, this);
  })

    .on("mouseout", function (data, index) {
      toolTip.hide(data);
    });



  
});


