// Place url in a constant variable
const url = "http://127.0.0.1:5000/api/v1.0/yearandprice"

// Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data);
});

// Initialize the dashboard at start up
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get year of house sold the drop-down selector
    d3.json(url).then((data) => {

        // Set a variable for the year
        let dateSold = data.DATE_SOLD;

        // Add data to dropdown menu
        dateSold.forEach((DATE_SOLD) =>{

            // Log the value of id for each iteration of the loop
            console.log(DATE_SOLD);

            dropdownMenu.append("option")
            .text(DATE_SOLD)
            .property("value",DATE_SOLD)
        });

        // Set the first data from the list
        let data_one = dateSold[0];

        // Log the value of first data
        console.log(data_one);

        // Bulid the initial plots
        buildYeardata(data_one);
        bulidBarChart(data_one);
        bulidLineChart(data_one);
    });
};

// Define a function that updates the data and plots based on the selected option
function optionChanged(selectedOption) {
    // Build the plots with the updated data
    buildYeardata(selectedOption);
    bulidBarChart(selectedOption);
    bulidLineChart(selectedOption);
  };
  
  // Define a function that builds the plot for year data
  function buildYeardata(selectedOption) {
    // Select the metadata panel to clear it
    let metadataPanel = d3.select("#sample-metadata");
  
    // Use `d3.json` to fetch the year data for the selected option
    d3.json(url).then((data) => {
      let yearData = data.filter(d => d.DATE_SOLD === selectedOption)[0];
  
      // Use `.html("") to clear any existing metadata
      metadataPanel.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      Object.entries(yearData).forEach(([key, value]) => {
        metadataPanel.append("p").text(`${key}: ${value}`);
      });
    });
  };
  
  // Define a function that builds the bar chart
  function bulidBarChart(selectedOption) {
    // Use `d3.json` to fetch the price data for the selected option
    d3.json(url).then((data) => {
      let priceData = data.filter(d => d.DATE_SOLD === selectedOption);
  
      // Create an array of prices
      let prices = priceData.map(d => d.PRICE);
  
      // Create the trace for the bar chart
      let trace = {
        x: prices,
        type: "histogram",
        marker: {
          color: "blue"
        }
      };
  
      // Create the data array for the plot
    
  
      // Define the plot layout
      let layout = {
        title: "Housing Prices",
        xaxis: {
          title: "Price"
        },
        yaxis: {
          title: "Frequency"
        }
      };
  
      // Plot the chart to the "bar" div
      Plotly.newPlot("bar", [trace], layout);
    });
  };
  
  // Define a function that builds the line chart
  function bulidLineChart(selectedOption) {
    // Use `d3.json` to fetch the land area and price data for the selected option
    d3.json(url).then((data) => {
      let yearData = data.filter(d => d.DATE_SOLD === selectedOption);
  
      // Create arrays for the land area and prices
      let landArea = yearData.map(d => d.LAND_AREA);
      let prices = yearData.map(d => d.PRICE);
  
      // Create the trace for the line chart
      let trace = {
        x: landArea,
        y: prices,
        mode: "lines+markers",
        marker: {
          color: "red",
          size: 8
        },
        line: {
          color: "green",
          width: 2

        }}
     
      // Create the data array for the plot
   
  
    // Define the plot layout
    let layout = {
      title: "Housing Prices vs. Land Area",
      xaxis: {
        title: "Land Area (sqft)"
      },
      yaxis: {
        title: "Price"
      }
    };

    // Plot the chart to the "line" div
    Plotly.newPlot("line", [trace], layout);
 });

   
    }
  
      