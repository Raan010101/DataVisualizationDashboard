// d3-charts.js

function drawLineChart(data) {
    d3.select("#viz1").selectAll("*").remove(); // Clear previous chart

    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#viz1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.date; }))
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return Math.max(d.value1, d.value2); })])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.value1); }));

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.value2); }));

    svg.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.value1); })
        .attr("r", 5)
        .attr("fill", "#69b3a2");

    svg.selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.value2); })
        .attr("r", 5)
        .attr("fill", "#ff0000");
}

function drawBarChart(data) {
    d3.select("#barChart").selectAll("*").remove(); // Clear previous chart

    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#barChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function(d) { return d.date; }))
        .padding(0.2);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b")));

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return Math.max(d.value1, d.value2); })])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("bars1")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.date); })
        .attr("y", function(d) { return y(d.value1); })
        .attr("width", x.bandwidth() / 2)
        .attr("height", function(d) { return height - y(d.value1); })
        .attr("fill", "#69b3a2");

    svg.selectAll("bars2")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.date) + x.bandwidth() / 2; })
        .attr("y", function(d) { return y(d.value2); })
        .attr("width", x.bandwidth() / 2)
        .attr("height", function(d) { return height - y(d.value2); })
        .attr("fill", "#ff0000");
}
