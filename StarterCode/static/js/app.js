// Test Subject ID drop down
var json_data;
var dropdown = d3.select("#selDataset")
d3.json("./samples.json").then(function (data) {
    json_data = data
    json_data.names.forEach(element => {
        dropdown.append("option").text(element)
    });
})


function init() {
    d3.json("./samples.json").then(function (data) {
        json_data = data

    // Set up side panel
    var input = 940;
    var metadata = json_data.metadata.filter(element => element.id == input)[0];
    var samples = json_data.samples.filter(element => element.id == input)[0];

    var panelData = d3.select("#sample-metadata");
    panelData.html("");
    Object.entries(metadata).forEach(([key, value]) => {
        panelData.append("p").text(`${key}: ${value}`)
    });

    // set up variables to use as x and y axis 
    var otuIds = samples.otu_ids;
    var otuLabels = samples.otu_labels;
    var sampleValues = samples.sample_values;
    var formatBubble = {
        margin: { t: 0 },
        xaxis: { title: "OTU ID" },
        hovermode: "closest",
    };

    // plot bubble chart
    var dataBubble = [{
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            color: otuIds,
            size: sampleValues,
        }
    }]
    Plotly.newPlot("bubble", dataBubble, formatBubble);
    
    // plot bar graph
    var bar_data =[
        {
          y: otuIds.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
          x: sampleValues.slice(0,10).reverse(),
          text: otuLabels.slice(0,10).reverse(),
          type:"bar",
          orientation:"h"
        }
    ];
    
    var barGraph = {
        title: "Top OTUs Found ",
        margin: { t: 30, l: 150 }
    };
    Plotly.newPlot("bar", bar_data, barGraph);
    });
}

//change in drop down
function optionChanged(input) {
    var metadata = json_data.metadata.filter(element => element.id == input)[0]
    var samples = json_data.samples.filter(element => element.id == input)[0]

    var panelData = d3.select("#sample-metadata");
    panelData.html("");
    Object.entries(metadata).forEach(([key, value]) => {
        panelData.append("p").text(`${key}: ${value}`)
    });

    //set up variables to use as x and y axis 
    var otuIds = samples.otu_ids;
    var otuLabels = samples.otu_labels;
    var sampleValues = samples.sample_values;
    var formatBubble = {
        margin: { t: 0 },
        xaxis: { title: "OTU ID" },
        hovermode: "closest",
    };

    //plot the bar graph
    var bar_data =[
        {
          y: otuIds.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
          x: sampleValues.slice(0,10).reverse(),
          text: otuLabels.slice(0,10).reverse(),
          type:"bar",
          orientation:"h"
        }
    ]
    var barGraph = {
        title: "Top OTUs Found ",
        margin: { t: 30, l: 150 }
    };
    Plotly.newPlot("bar", bar_data, barGraph);

    // plot bubble chart
    var dataBubble = [{
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            color: otuIds,
            size: sampleValues,
        }
    }]
    Plotly.newPlot("bubble", dataBubble, formatBubble); 
    
}
init()