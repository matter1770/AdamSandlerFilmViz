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


function drawGoodWordCloud(data){
    
      var chart = anychart.tagCloud(data);
    
      chart.title('Positively Received Movie Reviews')
      chart.mode("sprial");
      chart.angles([0])

      chart.container("goodMovie");
      chart.draw();
}


function drawBadWordCloud(data){
    
    var chart = anychart.tagCloud(data);
  
    chart.title('Negatively Received Movie Reviews')
    chart.mode("sprial");
    chart.angles([0])

    chart.container("badMovie");
    chart.draw();
}



fetchJSONFile("/data/sandlerGoodWords.json",drawGoodWordCloud)
fetchJSONFile("/data/sandlerBadWords.json",drawBadWordCloud)