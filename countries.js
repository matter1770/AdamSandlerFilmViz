var usToggle = false;
var ukToggle = false;

function toggleUS(){
    if (usToggle){
        usToggle = false;
        if(ukToggle){
            fetchJSONFile("/data/noUKGEAU.json",setPolygonSeries)
        }else{
            fetchJSONFile("/realStats.json",setPolygonSeries)
        }
    }else{
        usToggle = true;
        if(ukToggle){
            fetchJSONFile("/data/noUKGEAUUS.json",setPolygonSeries)
        }else{
            fetchJSONFile("/data/noUS.json",setPolygonSeries)
        }
    }

}

function toggleUK(){
    if (ukToggle){
        ukToggle = false;
        if(usToggle){
            fetchJSONFile("/data/noUS.json",setPolygonSeries)
        }else{
            fetchJSONFile("/data/realStats.json",setPolygonSeries)
        }
    }else{
        ukToggle = true;
        if(usToggle){
            fetchJSONFile("/data/noUKGEAUUS.json",setPolygonSeries)
        }else{
            fetchJSONFile("/data/noUKGEAU.json",setPolygonSeries)
        }
    }

}


am4core.useTheme(am4themes_animated);

var chart = am4core.create("chartdiv", am4maps.MapChart);

chart.geodata = am4geodata_worldLow;

chart.projection = new am4maps.projections.Miller();

var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

polygonSeries.heatRules.push({
  property: "fill",
  target: polygonSeries.mapPolygons.template,
  min: chart.colors.getIndex(1).brighten(1),
  max: chart.colors.getIndex(1).brighten(-0.3)
});

polygonSeries.useGeodata = true;

function fetchJSONFile(filePath,callbackFunc) {
    console.debug("Fetching file:", filePath);
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200 || httpRequest.status === 0) {
                console.info("Loaded file:", filePath);
                var data = JSON.parse(httpRequest.responseText);
                console.debug("Data parsed into valid JSON!");
                console.debug(data)
                if(callbackFunc) callbackFunc(data);
            } else {
                console.error("Error while fetching file", filePath, 
                    "with error:", httpRequest.statusText);
            }
        }
    };
    httpRequest.open('GET', filePath);
    httpRequest.send();
}


function setPolygonSeries(data){
    polygonSeries.data=data;
}

fetchJSONFile("/data/realStats.json",setPolygonSeries)


let title = chart.titles.create();
title.text = "Average Gross Earnings Across Sandler Starring Movies";
title.fontSize = 25;
title.marginBottom = 30;

let heatLegend = chart.createChild(am4maps.HeatLegend);
heatLegend.series = polygonSeries;
heatLegend.align = "right";
heatLegend.valign = "bottom";
heatLegend.width = am4core.percent(20);
heatLegend.marginRight = am4core.percent(4);
heatLegend.minValue = 18003;
heatLegend.maxValue = 2820810096;

var minRange = heatLegend.valueAxis.axisRanges.create();
minRange.value = heatLegend.minValue;
minRange.label.text = heatLegend.minValue;
var maxRange = heatLegend.valueAxis.axisRanges.create();
maxRange.value = heatLegend.maxValue;
maxRange.label.text = heatLegend.maxValue;

heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function(labelText) {
  return "";
});

var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}: {value}";
polygonTemplate.nonScalingStroke = true;
polygonTemplate.strokeWidth = 0.5;

var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#3c5bdc");