// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Get references to the links
    const linkViz1 = document.getElementById('link-viz1');
    const content = document.getElementById('content');

    linkViz1.addEventListener('click', function() {
        content.innerHTML = `
            <h2>Visualization 1: Interactive Line Chart and Bar Chart</h2>
            <label for="currency1">Select Currency Pair 1:</label>
            <select id="currency1">
                <option value="EGP">EGP</option>
                <option value="SCR">SCR</option>
                <option value="NOK">NOK</option>
                <option value="SZL">SZL</option>
                <option value="MYR">MYR</option>
            </select>
            <label for="currency2">Select Currency Pair 2:</label>
            <select id="currency2">
                <option value="EGP">EGP</option>
                <option value="SCR">SCR</option>
                <option value="NOK">NOK</option>
                <option value="SZL">SZL</option>
                <option value="MYR">MYR</option>
            </select>
            <button id="updateChart">Update Chart</button>
            <div id="viz1"></div>
            <div id="barChart"></div>
        `;

        document.getElementById('updateChart').addEventListener('click', updateCharts);

        function updateCharts() {
            const currency1 = document.getElementById('currency1').value;
            const currency2 = document.getElementById('currency2').value;

            d3.csv("prepared_data.csv").then(data => {
                // Filter data for the selected currencies
                const filteredData1 = data.filter(d => d.currency === currency1);
                const filteredData2 = data.filter(d => d.currency === currency2);

                // Prepare data for the charts
                const chartData = filteredData1.map((d, i) => ({
                    date: new Date(d.Date),
                    value1: +d.Forex_Close,
                    value2: filteredData2[i] ? +filteredData2[i].Forex_Close : 0
                }));

                drawLineChart(chartData);
                drawBarChart(chartData);
            });
        }

        // Initial chart draw
        updateCharts();
    });
});
