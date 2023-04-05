// Place url in a constant variable
const url = "http://127.0.0.1:5000/api/v1.0/yearandprice"

// Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data);
});

function optionChanged(value) {
  // This function will be called when the user selects an option
  // You can add your code here to update the plots based on the selected option
  console.log("Selected option: " + value);
  buildBarChart(value);
  buildLineChart(value);
};

// Initialize the dashboard at start up
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get year of house sold the drop-down selector
    d3.json(url).then((data) => {

        // Set a variable for the year
        let dateSold = [...new Set(data.map(d => d.SUBURB))];

        // Add data to dropdown menu
        dateSold.forEach((SUBURB) =>{

            // Log the value of id for each iteration of the loop
            console.log(SUBURB);

            dropdownMenu.append("option")
            .text(SUBURB)
            .property("value",SUBURB)
        });

        // Set the first data from the list
        let data_one = dateSold[0];

        // Log the value of first data
        console.log(data_one);

        // Bulid the initial plots
        buildBarChart(data_one);
        buildLineChart(data_one);
    });
};

// Use D3 to select the dropdown menu
let dropdownMenu = d3.select("#selDataset");

// Use D3 to get the year of house sold from the data
d3.json(url).then((data) => {
  let dateSold = data.map(d => d.SUBURB);

  // Add the options to the dropdown menu
  dropdownMenu.selectAll("option")
  .data(dateSold)
  .enter()
  .append("option")
  .text(d => d)
  .attr("value", d => d);
});

// Use D3 to create bar chart
function buildBarChart(year) {
  d3.json(url).then((data) => {
    let filteredData = data.filter(d => d.SUBURB === year);
    let landArea = filteredData.map(d => d.LAND_AREA);
    let price = filteredData.map(d => d.PRICE);

    let trace = {
      x: landArea,
      y: price,
      type: "bar",
      marker:{
        color: "blue"
      }
    };
    let layout = {
      title: "Housing Price vs. Land Area",
      xaixs: {
        title: "Land Area"
      },
      yaxis: {
        title: "Price"
      }
    };

    Plotly.newPlot("bar",[trace],layout);
  });
};

// Use D3 to create line chart
function buildLineChart(year) {
  d3.json(url).then((data) => {
    let filteredData = data.filter(d => d.SUBURB === year);
    let dateSold = filteredData.map(d => d.DATE_SOLD);
    let price = filteredData.map(d => d.PRICE);

    let trace = {
      x: dateSold,
      y: price,
      type: "scatter",
      mode: "lines+markers",
      line: {
        color: "red"
      }
    };

    let layout = {
      title: "Housing Price Over Time",
      xaxis: {
        title: "Year of House Sold"
      },
      yaxis:{
        title: "Price"
      }
    };

    Plotly.newPlot("line", [trace], layout);
  });
};