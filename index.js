
let width = 300,
    height = 300;
let svgRoot = d3.select("body").append("svg")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("width", width).attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr('id', 'pie-chart')

let svg = svgRoot.append("g")

    .append("g");

let pieChartGroup = svg
    .append("g")
    .attr('class', 'pie-chart')
    .attr('transform', "translate(" + width/2 + "," + height / 2 + ")");

let data = [10, 13];

let pie = d3.pie();

let outerRadius = width / 2;
let innerRadius = 96.7;

let arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

let arcs = pieChartGroup.selectAll('.arc')
    .data(pie(data));

arcs.enter()
    .append('path')
    .attr('d', arc)
    .style("fill", function (d, index) {
        if (index === 0) {return('#00C4CB')}
        else {return('#42d342')}
    });
pieChartGroup.append("circle").attr("cx",-35).attr("cy",-10).attr("r", 6).style("fill", '#42d342');
pieChartGroup.append("circle").attr("cx",-35).attr("cy",10).attr("r", 6).style("fill", '#00C4CB');
pieChartGroup.append("text").attr("x", -20).attr("y", -10).text("Rankings").style("font-size", "15px").style('fill', "#F3F7FA").attr("alignment-baseline","middle");
pieChartGroup.append("text").attr("x", -20).attr("y", 10).text("Other").style("font-size", "15px").style('fill', "#F3F7FA").attr("alignment-baseline","middle");



function download () {
    const svg_element = d3.select('#pie-chart').node();
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svg_element);

    if (!svgString.startsWith("<?xml")) {
        svgString = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgString;
    }

    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = 'pie-chart.svg'; // Customize the filename

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);


}

d3.select('#pieload').on('click', download);