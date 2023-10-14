// Initialize the page
function init() 
  {
    // Get data from the URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => 
    {
        const dropdown = d3.select("#selDataset");
        data.names.forEach(id => 
        {
            dropdown.append("option").text(id).property("value", id);
        });
  
        updateVisualizations(data.names[0], data);
        console.log("Data: ", data)
    });
  }
  
  function updateVisualizations(selectedID, data) 
  {
    let sampleData = data.samples.find(sample => sample.id === selectedID);
    createBarChart(sampleData);
  
    createBubbleChart(sampleData);
  
    displayMetadata(selectedID, data);
    console.log("Metadata: ", sampleData)
  }
  
  // Create the bar chart
  function createBarChart(sampleData) 
  {
    const top10 = sampleData.sample_values.slice(0, 10).reverse();
    const labels = sampleData.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
    const hoverText = sampleData.otu_labels.slice(0, 10).reverse();
  

    console.log(top10)
    console.log(labels)
    console.log(hoverText)
  
    let trace = 
    {
        x: top10,
        y: labels,
        text: hoverText,
        type: "bar",
        orientation: "h"
    };
  
    let data = [trace];
    console.log(trace)
  
    let layout = 
    {
        title: ("Top 10 OTU IDs"),
        xaxis: { title: "Sample Values" }
    };
  
    Plotly.newPlot("bar", data, layout);
  }

  //Create the bubble chart
  function createBubbleChart(sampleData) 
  {
    let trace = 
    {
        x: sampleData.otu_ids,
        y: sampleData.sample_values,
        text: sampleData.otu_labels,
        mode: "markers",
        marker: 
        {
            size: sampleData.sample_values,
            color: sampleData.otu_ids,
            colorscale: "Viridis"
        }
    };
  
    let data = [trace];
  
    let layout = 
    {
        title: "Bubble Chart for OTU IDs",
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" }
    };
  
    Plotly.newPlot("bubble", data, layout);
  }
  
  function displayMetadata(selectedID, data) 
  {
    const metadata = data.metadata.find(item => item.id.toString() === selectedID);
  
    const metadataDiv = d3.select("#sample-metadata");
    metadataDiv.html("");
  
    Object.entries(metadata).forEach(([key, value]) => 
    {
        metadataDiv.append("p").text(`${key}: ${value}`);
    });
  }
  
  function optionChanged(selectedID) 
  {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => 
    {
        updateVisualizations(selectedID, data);
        console.log("Selcted ID:", selectedID)
        console.log("OTU DATA: ", data.otu_ids)
    });
  }
    
  
  init();
  
  d3.select("#selDataset").on("change", function () 
  {
    const selectedID = d3.select(this).property("value");
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => 
    {
        updateVisualizations(selectedID, data);
    });
  });