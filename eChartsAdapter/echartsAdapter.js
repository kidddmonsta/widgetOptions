function formatData(jsonUrl) {
    return $.getJSON(jsonUrl).then(function (data) {
        let legendDataNames = [];
        let series = [];
        let xAxis = [];

        data.forEach(function (dataVal, index) {
            let formattedData = [];
            dataVal.series.forEach(function (val, key) {
                //console.log(val);
                formattedData[key] = val.value;
                if (dataVal.timeInterval == "day") {
                    xAxis[key] = moment(val.x).format("YYYY-MM-DD");
                }
                if (dataVal.timeInterval == "month") {
                    xAxis[key] = moment(val.x).format("YYYY-MM");
                }
                if (dataVal.timeInterval == "year") {
                    xAxis[key] = moment(val.x).format("YYYY");
                }
                if (xAxis[key] == 'Invalid date') {
                    xAxis[key] = val.x;
                }
                //console.log(xAxis);
            });
            //console.log(dataVal.timeInterval);
            legendDataNames[index] = dataVal.title_rus;
            series[index] = {
                name: dataVal.title_rus,
                data: formattedData,
                type: 'line',
                symbol: settings.seriesSymbol,
                symbolSize: settings.seriesSymbolSize,
                //areaStyle: {},
                lineStyle: {
                    //color: settings.seriesLineStyleColor,
                    type: settings.seriesLineStyleType
                }
            };

        });
        var returnData = {
            legendDataNames: legendDataNames,
            series: series,
            xAxis: xAxis
        };
        console.log(returnData);
        return returnData;
    });
}
