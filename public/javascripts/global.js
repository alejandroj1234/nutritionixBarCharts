// ============================================================
// DOM Ready 
// ============================================================
$(document).ready(function() {

    // Populate the charts and table on initial page load
    populateChartCalories();
    populateChartProtein();
    populateChartFat();
    populateChartCarbs();
    populateTable();

    // Add value to charts on button click
    $('#btnAddChartValue').on('click', addChartValue);

    // Delete value from charts on link click
    $('#foodList table tbody').on('click', 'td a.linkDeleteIngredient', deleteBar);
});


// ============================================================
// populate chart functions
// ============================================================

// Fill calorie chart with data when loaded 
function populateChartCalories() {

    $.getJSON( '/nutritionix/nutritionixChart', function( data ) {

        var margin = {top: 20, right: 20, bottom: 30, left: 60},
            width = 500 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            //.ticks(10, "%");

        var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("float", "right")
            .style("padding-right", "300")
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function(d) { return d.xAxis; }));
        y.domain([0, d3.max(data, function(d) { return parseInt(d.yAxisCalories); })]);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Calories");

        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.xAxis); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.yAxisCalories); })
            .attr("height", function(d) { return height - y(d.yAxisCalories); })
    });
};


// Fill protein chart with data when loaded 
function populateChartProtein() {

    $.getJSON( '/nutritionix/nutritionixChart', function( data ) {

        var margin = {top: 20, right: 20, bottom: 30, left: 60},
            width = 500 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            //.ticks(10, "%");

        var svg = d3.select("#chartProtein").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function(d) { return d.xAxis; }));
        y.domain([0, d3.max(data, function(d) { return parseInt(d.yAxisProtein); })]);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Protein");

        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.xAxis); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.yAxisProtein); })
            .attr("height", function(d) { return height - y(d.yAxisProtein); })
    });
};


// Fill Fat chart with data when loaded 
function populateChartFat() {

    $.getJSON( '/nutritionix/nutritionixChart', function( data ) {
        
        var margin = {top: 20, right: 20, bottom: 30, left: 60},
            width = 500 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            //.ticks(10, "%");

        var svg = d3.select("#chartFat").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("float", "right")
            .style("padding-right", "300")
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function(d) { return d.xAxis; }));
        y.domain([0, d3.max(data, function(d) { return parseInt(d.yAxisFat); })]);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Fat");

        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.xAxis); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.yAxisFat); })
            .attr("height", function(d) { return height - y(d.yAxisFat); })
    });
};


// Fill Carbs chart with data when loaded 
function populateChartCarbs() {

    $.getJSON( '/nutritionix/nutritionixChart', function( data ) {

        var margin = {top: 20, right: 20, bottom: 30, left: 60},
            width = 500 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            //.ticks(10, "%");

        var svg = d3.select("#chartCarbs").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function(d) { return d.xAxis; }));
        y.domain([0, d3.max(data, function(d) { return parseInt(d.yAxisCarbs); })]);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Carbs");

        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.xAxis); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.yAxisCarbs); })
            .attr("height", function(d) { return height - y(d.yAxisCarbs); })
    });
};


// ============================================================
// Add Value to Chart Function
// ============================================================

function addChartValue(event) {
    event.preventDefault();    
    
    // Fill array with chart data 
    var addChartDataArray = {
        'yAxis': $('#addChartValue fieldset input#inputChartYAxis').val()
    }
    
    // Use AJAX to post the object to our addChartValue service
    $.ajax({
        type: 'POST',
        data: addChartDataArray,
        url: '/nutritionix/addChartValue',
        dataType: 'JSON'
    }).done(function( response ) {
        // Check for successful (blank) response
        if (response.msg === '') {

            // Clear the form inputs
            $('#addChartValue fieldset input').val('');

            // Remove the old SVG and populate the graphs and tables with the newly added value
            document.getElementById('chart').firstChild.remove();
            document.getElementById('chartProtein').firstChild.remove();
            document.getElementById('chartFat').firstChild.remove();
            document.getElementById('chartCarbs').firstChild.remove();
            populateChartCalories();
            populateChartProtein();
            populateChartFat();
            populateChartCarbs();
            populateTable();

        }
        else {

            // If something goes wrong, alert the error message that our service returned
            console.log('now')
            alert('Error: ' + response.msg);

        }
    });
}


// ============================================================
// Delete Value From Chart Function
// ============================================================

function deleteBar(event) {

    event.preventDefault();

    $.ajax({
        type: 'DELETE',
        url: '/nutritionix/deleteBar/' + $(this).attr('rel')
    }).done(function( response ) {

        // Check for a successful (blank) response
        if (response.msg === '') {
        }
        else {
            console.log('now')
            alert('Error: ' + response.msg);
        }

        // Remove the old SVG and populate the graphs and tables with the newly added value
        document.getElementById('chart').firstChild.remove();
        document.getElementById('chartProtein').firstChild.remove();
        document.getElementById('chartFat').firstChild.remove();
        document.getElementById('chartCarbs').firstChild.remove();
        populateChartCalories ();
        populateChartProtein();
        populateChartFat();
        populateChartCarbs();
        populateTable();

    });
}


// ============================================================
// Delete Value From Chart Function
// ============================================================

function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/nutritionix/nutritionixChart', function( data ) {
        
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            console.log(data)
            tableContent += '<tr>';
            tableContent += '<td>' + this.xAxis + '</td>';
            tableContent += '<td>' + this.yAxisCalories + '</td>';
            tableContent += '<td>' + this.yAxisProtein + '</td>';
            tableContent += '<td>' + this.yAxisFat + '</td>';
            tableContent += '<td>' + this.yAxisCarbs + '</td>';
            tableContent += '<td><a href="#" class="linkDeleteIngredient" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#foodList table tbody').html(tableContent);
    });
};