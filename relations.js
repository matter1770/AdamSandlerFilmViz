
am4core.useTheme(am4themes_animated);

    
var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
    
var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
networkSeries.dataFields.linkWith = "linkWith";
networkSeries.dataFields.name = "name";
networkSeries.dataFields.id = "name";
networkSeries.dataFields.value = "value";
networkSeries.dataFields.children = "children";
    
networkSeries.nodes.template.label.text = "{name}"
networkSeries.fontSize = 8;
networkSeries.linkWithStrength = 0;
    
var nodeTemplate = networkSeries.nodes.template;
nodeTemplate.tooltipText = "{name}";
nodeTemplate.fillOpacity = 1;
nodeTemplate.label.hideOversized = true;
nodeTemplate.label.truncate = true;
    
var linkTemplate = networkSeries.links.template;
linkTemplate.strokeWidth = 1;
var linkHoverState = linkTemplate.states.create("hover");
linkHoverState.properties.strokeOpacity = 1;
linkHoverState.properties.strokeWidth = 2;
    
nodeTemplate.events.on("over", function (event) {
    var dataItem = event.target.dataItem;
    dataItem.childLinks.each(function (link) {
        link.isHover = true;
    })
})
    
nodeTemplate.events.on("out", function (event) {
    var dataItem = event.target.dataItem;
    dataItem.childLinks.each(function (link) {
        link.isHover = false;
    })
})
let title = chart.titles.create();
title.text = "(Inverse Sandler Starred Movie Ratio * Average Film Rating) From IMDB";
title.fontSize = 25;
title.marginBottom = 30;

networkSeries.data = [  
       {  
          "name":"Adam Sandler",
          "value":52.3780487804878
         },
      {  
         "name":"Steve Buscemi",
         "value":140.1428571428571,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"Rob Schneider",
         "value":90.84285714285707,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"David Spade",
         "value":143.2818181818181,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"Blake Clark",
         "value":81.76,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"Allen Covert",
         "value":15.668965517241384,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"Peter Dante",
         "value":17.733333333333334,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"Tim Herlihy",
         "value":8.908695652173913,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"Kevin James",
         "value":77.97000000000006,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"Jonathan Loughran",
         "value":12.61034482758621,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"Dan Patrick",
         "value":31.392307692307707,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"Jared Sandler",
         "value":13.658333333333331,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"Robert Smigel",
         "value":62.82857142857143,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"Nick Swardson",
         "value":57.56153846153846,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"Jackie Sandler",
         "value":11.842105263157896,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
      {  
         "name":"Sadie Sandler",
         "value":6.058823529411765,
         "linkWith":[  
            "Adam Sandler"
         ]
      },
];
    
    