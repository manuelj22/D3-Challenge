let SvgWidth = 960;
let SvgHeight = 500;

let Svg = d3.select("body")
    .append("svg")
    .attr("width", SvgWidth)
    .attr("height", SvgHeight)

let Margin = {
    Top: 60,
    Tight: 60,
    Bottom: 60,
    Left: 60
}

let ChartWidth = SvgWidth - Margin.Right - Margin.Left;
let ChartHeight = SvgHeight - Margin.Top - Margin.Bottom;
let ChartGroup = Svg.append("g")
    .attr("transform", `translate(${Margin.Left},${Margin.Top})`)



d3.csv("Assets/Data/data_data.csv").then(function (Data) {

    console.log(Data)
    Data.forEach(d => console.log("smokes", typeof (d.smokes)))

    Data.forEach(function (d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    });
    Data.forEach(d => console.log("poverty", d.poverty))
    console.log(([d3.max(data, d => d.poverty)]))
    console.log(([d3.min(data, d => d.poverty)]))

    let yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.healthcare), d3.max(Data, d => d.healthcare)])
        .range([chartHeight, 0]);

    let xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.poverty), d3.max(Data, d => d.poverty)])
        .range([0, ChartWidth]);

    let BottomAxis = d3.axisBottom(xLinearScale);
    let LeftAxis = d3.axisLeft(yLinearScale);

    ChartGroup.append("g")
        .classed("axis", true)
        .call(LeftAxis)

    ChartGroup.append("g")
        .classed("axis", true)
        .attr("transform", `translate(0,${ChartHeight})`)
        .call(BottomAxis)


    let CirclesGroup = ChartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .text(d => d.abbr)
        .attr("r", "8")
        .attr("fill", "cornflowerblue")
        .attr("stroke-width", "1")
        .attr("stroke", "black");



    Data.forEach(function (d) {
        ChartGroup.append("g")
        .append("text")
        .text(d.abbr)
        .attr("transform", `translate(${xLinearScale(d.poverty)-7},${yLinearScale(d.healthcare)+3})`)
        .attr("style","color: cornsilk; font-size: 9px ")
    })

    ChartGroup.append("g")
        .append("text")
        .attr("y", 1)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90) translate(-250,-50)")
        .text("Lacks Healthcare (%)");

    ChartGroup.append("g")
        .append("text")
        .attr("x", 1)
        .attr("dx", "1em")
        .attr("transform", `translate(370,${ChartWidth / 2})`)
        .text("In Poverty (%)");

})