/* Author(s) = Yao Li (mgzjys@gmail.com)
 * Date: 2020 March
 */
var timearry = new Array(
  "2020-01-21",
  "2020-01-22",
  "2020-01-23",
  "2020-01-24",
  "2020-01-25",
  "2020-01-26",
  "2020-01-27",
  "2020-01-28",
  "2020-01-29",
  "2020-01-30",
  "2020-01-31",
  "2020-02-01",
  "2020-02-02",
  "2020-02-03",
  "2020-02-04",
  "2020-02-05",
  "2020-02-06",
  "2020-02-07",
  "2020-02-08",
  "2020-02-09",
  "2020-02-10",
  "2020-02-11",
  "2020-02-12",
  "2020-02-13",
  "2020-02-14",
  "2020-02-15",
  "2020-02-16",
  "2020-02-17",
  "2020-02-18",
  "2020-02-19",
  "2020-02-20",
  "2020-02-21",
  "2020-02-22",
  "2020-02-23",
  "2020-02-24",
  "2020-02-25",
  "2020-02-26",
  "2020-02-27",
  "2020-02-28",
  "2020-02-29",
  "2020-03-01",
  "2020-03-02",
  "2020-03-03",
  "2020-03-04",
  "2020-03-05",
  "2020-03-06",
  "2020-03-07",
  "2020-03-08",
  "2020-03-09",
  "2020-03-10",
  "2020-03-11",
  "2020-03-12",
  "2020-03-13",
  "2020-03-14",
  "2020-03-15",
  "2020-03-16",
  "2020-03-17",
  "2020-03-18",
  "2020-03-19",
  "2020-03-20",
  "2020-03-21",
  "2020-03-22"
);
//var zoomSettings = {
//  duration: 1000,
//  ease: d3.easeCubicOut,
//  zoomLevel: 5
//};

//0321:735 0322: 691
var jsonOutside;
var active;
var unassigned = 691;

function click(d) {
  var x, y, k;
  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 15;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  jsonOutside.selectAll("path")
    .classed(".active", centered && function(d) {
      return d === centered;
    });
  d3 = d3versionV3;
  jsonOutside.transition()
    .duration(960)
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
    .style("stroke-width", 0.3 / k + "px");

  statesjson.selectAll("path")
    .classed(".active", centered && function(d) {
      return d === centered;
    });
  d3 = d3versionV3;
  statesjson.transition()
    .duration(960)
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
    .style("stroke-width", 2 / k + "px");



}



function addComas(n) {
  var formatValue = d3.format("0,000");
  return formatValue(n)
    .replace(".", ",")
    .replace(".", ",");
}


//const zoom = d3.zoom()
//  .scaleExtent([1, 8])
//  .on('zoom', zoomed);

//function zoomed() {
//  g
//    .selectAll('path') // To prevent stroke width from scaling
//    .attr('transform', d3.event.transform);
//}

//var colores = d3.schemeReds[5]

var colores = ["#ececec", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"]


function getColor(d) {
  console.log(d);
  return d > 300 ?
    colores[4] :
    d > 100 ?
    colores[3] :
    d > 50 ?
    colores[2] :
    d > 0 ?
    colores[1] :
    colores[0];
}
d3 = d3versionV3;
var div = d3
  .select("#wrapper")
  .append("div")
  .attr("class", "tooltip")
  .attr("opacity", 0);

var wmap = 900;
var hmap = 500;
var centered;
var projection = d3versionGeo.geoAlbersUsa()
  .scale(1000)
  .translate([480, 240]);

var projection1 = d3versionGeo.geoAlbersUsa()
  .scale(1000)
  .translate([480, 240]);
var path = d3.geo.path().projection(projection);
var path1 = d3.geo.path().projection(projection1);

var map1 = d3.select("#mapa1").append("svg")
  .attr("width", wmap)
  .attr("height", hmap);

map1.append("rect")
  .attr("class", "background")
  .attr("width", wmap)
  .attr("height", hmap);





var map = d3.select("#mapa").append("svg")
  .attr("width", wmap)
  .attr("height", hmap);

map.append("rect")
  .attr("class", "background")
  .attr("width", wmap)
  .attr("height", hmap);



//var projectionCan = d3.geo
//  .mercator()
//  .translate([810, 1350])
//  .scale(2500);
//var pathCan = d3.geo.path().projection(projectionCan);
//var mapCan = d3
//  .select("#canarias")
//  .append("svg")
//  .attr("width", wCan)
//  .attr("height", hCan);
d3.select("#maptitle").html("US Covid-19 County Timeline");

d3.select("#mapsubtitle").html("(one-click to zoom in; double-click to zoom out)");

d3.select("#creditinfor").html("Created by GISers from CGIS, UMD");

d3.select("#datainfor").html("Data updated time: 2020-03-22 10:00AM EST");

d3.select("#contributions").html("Contribution: Visualization by Yao Li. Data collection by Junchuan Fan, Hai Lan, Yao Li, Jeff Sauer, Zhiyue Xia,Guiming Zhu from CGIS, University of Maryland, College Park.");

d3.select("#datasource").html("Data source: 1Point3Acres");





d3.select("#year").html(timearry[timearry.length - 1].substring(0, 4));
//d3.select("#monthday").html(timearry[timearry.length - 1].substring(5));
d3.select("#monthday").html(timearry[timearry.length - 1]);
var height = 330,
  width = 1180,
  trans = 60;
var aux = timearry.length - 1;
var width_slider = 1200;
var height_slider = 50;
d3.json("../data/states.json", function(states_json) {
  d3.csv("../data/Data_0322.csv", function(data) {
    d3.json("../data/Data_geo.json", function(json) {
      /* ------SLIDER----- */
      var svg = d3
        .select("#slider")
        .attr("class", "chart")
        .append("svg")
        .attr("width", width_slider)
        .attr("height", height_slider);
      var yeardomain = [0, timearry.length - 1];
      var axisyears = [
        //        parseFloat(timearry[0].substring(6)),
        //        parseFloat(timearry[timearry.length - 1].substring(6))
        1, timearry.length
      ];

      var pointerdata = [{
          x: 0,
          y: 0
        },
        {
          x: 0,
          y: 25
        },
        {
          x: 25,
          y: 25
        },
        {
          x: 25,
          y: 0
        }
      ];
      var scale = d3.scale
        .linear()
        .domain(yeardomain)
        .rangeRound([0, width]);
      var x = d3.svg
        .axis()
        .scale(scale)
        .orient("top")
        .tickFormat(function(d) {
          return d;
        })
        .tickSize(0)
        .tickValues(axisyears);
      svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 7 + ",0)")
        .call(x);
      var drag = d3.behavior
        .drag()
        .origin(function() {
          return {
            x: d3.select(this).attr("x"),
            y: d3.select(this).attr("y")
          };
        })
        .on("dragstart", dragstart)
        .on("drag", dragmove)
        .on("dragend", dragend);

      svg
        .append("g")
        .append("rect")
        .attr("class", "slideraxis")
        .attr("width", width_slider)
        .attr("height", 6)
        .attr("x", 0)
        .attr("y", 16);
      var cursor = svg
        .append("g")
        .attr("class", "move")
        .append("svg")
        .attr("x", 1180)
        .attr("y", 7)
        .attr("width", 12)
        .attr("height", 60);

      cursor.call(drag);
      var drawline = d3.svg
        .line()
        .x(function(d) {
          return d.x;
        })
        .y(function(d) {
          return d.y;
        })
        .interpolate("linear");

      //---------------------------
      cursor
        .append("path")
        .attr("class", "cursor")
        .attr("transform", "translate(" + 7 + ",0)")
        .attr("d", drawline(pointerdata));
      cursor.on("mouseover", function() {
        d3.select(".move").style("cursor", "hand");
      });

      function dragmove() {
        var x = Math.max(0, Math.min(width, d3.event.x));
        d3.select(this).attr("x", x);
        var z = parseInt(scale.invert(x));
        aux = z;
        drawMap(z);
      }

      function dragstart() {
        d3.select(".cursor").style("fill", "#D9886C");
      }

      function dragend() {
        d3.select(".cursor").style("fill", "");
      }
      for (var i = 0; i < data.length; i++) {
        var codeState = data[i].ID;
        var dataValue = parseFloat(data[i][timearry[timearry.length - 1]]);
        //    console.log(dataValue);
        for (var j = 0; j < json.features.length; j++) {
          var jsonState = json.features[j].properties.ID;
          if (codeState == jsonState) {
            json.features[j].properties.value = dataValue;
            break;
          }
        }
      }


      var cont = map
        .selectAll("#mapa path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("class", "path")
        .attr("d", path)
        .style("fill", function(d) {
          return getColor(d.properties.value);
        })
        .attr("fill-opacity", "0.75")
        .attr("stroke", "#A9A9A9")
        .attr("stroke-width", 0.3)
        .attr("stroke-opacity", "1")
        .on("click", click)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout);


      var states = map1
        .selectAll("#mapa1 path")
        .data(states_json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill-opacity", "0")
        .style("fill", "none")
        .attr("stroke", "#000000")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", "1")
        .on("click", click);

  //    states.data(states_json.features)
  //      .enter().append('text')
  //      .text(function(d) {
  //        return d.properties.STUSPS;
  //      })
  //      .attr("x", function(d) {
  //        console.log(projection([d.properties.INTPTLAT, d.properties.INTPTLON])[0])

  //        return  projection([d.properties.INTPTLAT, d.properties.INTPTLON])[0];
  //      })
  //      .attr("y", function(d) {
  //        return  projection([d.properties.INTPTLAT, d.properties.INTPTLON])[1];
  //      })
  //      .style("fill", "#000000")
  //      .style("font-size", "100px");






      jsonOutside = cont; // pass json to a global so tableRowClicked has access


      statesjson = states;

      function mouseover(d) {
        d3.select(this)
          .attr("stroke-width", "1.5px")
          .attr("fill-opacity", "1");
        div.style("opacity", 0.9);
        div.html(
          "<b>" +
          d.properties.NAME + ", " + d.properties.StateAbbri +
          "</b></br>Positve cases: <b>" +
          addComas(data[d.properties.ID][timearry[aux]]) +
          "</b></br>FIPS: " +
          d.properties.fip
        );
      }

      function mouseout(d) {
        d3.select(this)
          .attr("stroke-width", "0.3")
          .attr("fill-opacity", "0.6");
        div.style("opacity", 0);
      }

      function mousemove(d) {
        div.style({
          left: function() {
            if (d3.event.pageX > 780) {
              return d3.event.pageX - 180 + "px";
            } else {
              return d3.event.pageX + 23 + "px";
            }
          },
          top: d3.event.pageY - 20 + "px"
        });
      }
      //maxSum(data, aux);
      function drawMap(index) {
        //      d3.select("#monthday").html(timearry[index].substring(5));
        d3.select("#monthday").html(timearry[index]);
        d3.select("#year").html(timearry[index].substring(0, 4));

        cont.style("fill", function(d) {
          for (var i = 0; i < data.length; i++) {
            var codeState = data[i].ID;
            var dataValue = data[i][timearry[index]];
            json.features[i].properties.value = dataValue;

          }
          var value = d.properties.value;
          if (value) {
            return getColor(value);
          } else {
            return "#ccc";
          }
        });
        maxSum(data, index);
      }
      maxSum(data, aux);
      //  clicked(data);

      function maxSum(d, index) {
        d3.select("#posicountynum").html("");
        d3.select("#maxcountynum").html("");
        d3.select("#totalcasenumber").html("");
        var datos = [];
        var county = [];
        for (var i = 0; i < data.length; i++) {
          datos.push(parseFloat(d[i][timearry[index]]));
          county.push(d[i].NAME);
        }
        var max_sum = d3.extent(datos);
        //  console.log(max_sum);
        var countyMax;
        var countyPoNum;
        var tatalcaseNum = 0;
        var posicounty = 0;
        var seriouscounty = 0;
        for (var j = 0; j < data.length; j++) {
          if (parseFloat(datos[j]) > 0) {
            posicounty = posicounty + 1;
          }
          if (parseFloat(datos[j]) > 100) {
            seriouscounty = seriouscounty + 1;
          }
          if (max_sum[1] == parseFloat(datos[j])) {
            countyMax = county[j];
          }
          tatalcaseNum = tatalcaseNum + parseFloat(datos[j]);
        }
        max_sum[0] = posicounty;
        countyMax = seriouscounty;
        if (index == timearry.length - 1) {
          tatalcaseNum = tatalcaseNum + unassigned
        }


        countyPoNum = ['  counties in the US have positive cases as of the date of the map.'];
        var nombretotalcasenumber = d3
          .select("#totalcasenumber")
          .html(addComas(tatalcaseNum));
        var nombrecountyMax = d3
          .select("#maxcountynum")
          .html(
            //  addComas(max_sum[1]) +
            "<br>" +
            "<span id='county'>" +
            countyMax + "  counties in the US have more than 100 positive cases as of the date of the map." +
            "</span>"
          );
        var nombrecountyPoNum = d3
          .select("#posicountynum")
          .html(
            //    addComas(max_sum[0]) +
            "<br>" +
            "<span id='county'>" + max_sum[0] +
            countyPoNum +
            "</span"
          );
      };
    });
  });
});

d3.select("#wrapper").on("touchstart", function() {
  div
    //    .transition()
    //    .duration(100)
    .on("click", click)
    .style("opacity", 0);
});
