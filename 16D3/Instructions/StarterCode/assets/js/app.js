// @TODO: YOUR CODE HERE!
//Defining SVG area dimensions
var width = parseInt(d3.select(`#scatter`).style("width"));
var height = width - width/4;

//Defining the chart's margins as an object
var margin = 20;

// space for placing words
var labelArea = 110;

//padding for the text at the bottom and left of the chart
var paddingBot = 40;
//var paddingTop = 40;
var paddingLeft = 40;
//var paddingRight = 40;

//Selecting the  body, appending SVG area to it, and defining its attributes
var svg = d3.select("#scatter").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart")
  //  .attr("class", "iframecontainer");

//Bottom Axis (x-axis) label
svg.append('g')
    .attr("class", "xtext");

//referencing xtext
var xtext = d3.select(".xtext");

var bottomtextX = (width -labelArea)/2 + labelArea;
var bottomtextY = (height - margin - paddingBot);

//giving xtext a transform property

function xtextRefresh() {
    xtext.attr("transform", "translate(" +
            bottomtextX + ", " + bottomtextY + ")");
}

xtextRefresh();

//We use xtext to append the names to the x axis
// In poverty(%)
xtext
    .append("text")
    .attr("y", -26)
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .attr("class", "aText active x")
    .text("In Poverty (%)");

//Age (Median)
xtext
    .append("text")
    .attr("y", 0)
    .attr("data-name", "age")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("Age(Median)");

//Household Income (Median)
xtext
    .append("text")
    .attr("y", 26)
    .attr("data-name", "income")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("Household Income(Median)");

// Left Axis
var lefttextX = margin + paddingLeft;
var lefttextY = (height + labelArea)/2 - labelArea;

// Adding the labels for the y axis
svg.append("g"). attr("class", "ytext");

//referencing ytext
var ytext = d3.select(".ytext");

// giving ytext a transofrm property

function ytextRefresh() {
    ytext.attr( "transform",
                "translate(" + lefttextX + "," + lefttextY + ")rotate(-90)"
);
}

ytextRefresh();

// We use ytext to append the name for the y axis
//healthcare
ytext
    .append("text")
    .attr("y", -26)
    .attr("data-name", "healthcare")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("Lacks Healthcare (%)");

// Smokers
ytext
    .append("text")
    .attr("y", 0)
    .attr("data-name", "smokes")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Smokes");

//Obese
ytext
    .append("text")
    .attr("y", 26)
    .attr("data-name", "obesity")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Obese (%)");

//Loading data from data.csv file
d3.csv("assets/data/data.csv").then(function(pData) {
    console.log(pData);

    //log a list of poverty and healthcare fields
    var povertydata = pData.map(data => data.poverty);
    var healthcaredata = pData.map(data => data.healthcare);
    var smokesdata = pData.map(data => data.smokes);
    var obesedata = pData.map(data => data.obesity);
    var agedata = pData.map(data => data.age);
    var incomedata = pData.map(data => data.income);

    console.log("poverty_data", povertydata);
    console.log("healthcare_data", healthcaredata);
    console.log("smokes_data", smokesdata);
    console.log("obesity_data", obesedata);
    console.log("Age_data", agedata);
    console.log("Income_data", incomedata);

    var d;

    //Converting the poverty and healthcare data into int from string format
    pData.forEach(d => {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
        d.smokes = +d.smokes;
        d.obesity = +d.obesity;
        d.age = +d.age;
        d.income = +d.income;
        console.log(d.poverty);
        console.log(d.healthcare);
        console.log(d.smokes);
        console.log(d.obesity);
        console.log(d.age);
        console.log(d.income);


    }); 

    //declaring the variables
    var xMin;
    var xMax;
    var yMin;
    var yMax;

    function xMinMax() {
            xMin = d3.min(pData, function(d) {
                return parseFloat(d.poverty) * 0.90;
            });
            xMax = d3.max(pData, function(d) {
            return parseFloat(d.poverty) * 1.10;
            });
        }

    function yMinMax() {
        yMin = d3.min(pData, function(d) {
            return parseFloat(d.healthcare) * 0.90;
        });
        yMax = d3.max(pData, function(d) {
        return parseFloat(d.healthcare) * 1.10;
        });

    }
    
    
    // domain for the axis
    xMinMax();
    yMinMax();
       
    
    // //Defining the x and y axis
     var xLinearScale = d3.scaleLinear()
       .domain([xMin, xMax])
       .range([margin + labelArea, width - margin]);
        

    var yLinearScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height-labelArea, margin])
       
    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale).ticks(10);
    var leftAxis = d3.axisLeft( yLinearScale ).ticks(10);
    
    var xValue = height-margin-labelArea;
        // set x to the bottom of the chart
    svg.append("g")
    .call(bottomAxis)
    .attr("class", "axis")
    .attr('transform', 'translate(0,' + (height - labelArea + 4) + ')');
    
    
    var yValue = margin + labelArea;
    // set y to the y axis
    // This syntax allows us to call the axis function
    // and pass in the selector without breaking the chaining
    svg.append("g")
    .call(leftAxis)
    .attr("class", "yAxis")
    //.attr('transform', 'translate((margin + labelArea,',  0 );
    .attr("transform", `translate(125, 0 )`);
    
      
    //Creating toolTip functionality
    var tool_tip = d3.tip()
                   .attr("class", "d3-tip")
                   .html(function(d) {return ["State:" + " " + d.state + " ", " " +
                                            "Poverty:" + " " + d.poverty + "%" + " ",  " " +
                                            "Healthcare:" + " " + d.healthcare + "%" + " "];});
                svg.call(tool_tip);


    // Append Data to chartGroup
    svg.selectAll(".circle")
        .data(pData)
        .enter()
        .append("circle")
        .classed("circle", true)
        .attr("r", 8)
        .attr("cx", function(pData) {return xLinearScale(pData.poverty)})
        .attr("cy", function(pData) { return yLinearScale(pData.healthcare)})
        .style("fill", "blue")
        .style("stroke", "black")
        .on (`mouseover`, tool_tip.show)
        .on(`mouseout`, tool_tip.hide);

    });
        
       
            
