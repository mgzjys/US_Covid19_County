/* Author(s) = Yao Li (mgzjys@gmail.com)
 * Date: 2020 March
 */
d3 = d3versionV3;

var selectID;
var jsonOutside;
var active;
var unassigned =  0;/////
var scalefactor = 100000;
var height = 330,
width = 1180,
trans = 60;

var height = 330,
width = 1180,
trans = 60;



var xxx=0
function readFile(file)
{
    var f = new XMLHttpRequest();
    f.open("GET", file, false);
    f.onreadystatechange = function ()
    {
        if(f.readyState === 4)
        {
            if(f.status === 200 || f.status == 0)
            {
              unassigned= parseInt(f.responseText);
              //  alert(res); //to see if contents are read
            }
        }
    }
    f.send(null);
}

readFile('../data/unassgin.txt')

//console.log(unassigned)






function addComas(n) {
  var formatValue = d3.format("0,000");
  return formatValue(n)
    .replace(".", ",")
    .replace(".", ",");
}



var colores = ["#D3D3D3", "#fff7bc", "#feb24c", "#fc4e2a", "#bd0026"]


function getColor(d) {
  // console.log('get color');
  return d > 8000 ?
    colores[4] :
    d > 4000 ?
    colores[3] :
    d > 1000 ?
    colores[2] :
    d > 0 ?
    colores[1] :
    colores[0];
}

var div = d3
  .select("#wrapper")
  .append("div")
  .attr("class", "tooltip")
  .attr("opacity", 0);

var wmap = 900;
var hmap = 500;
var centered;
var projection = d3versionGeo.geoAlbersUsa()
  .scale(900)
  .translate([480, 240]);

var projection1 = d3versionGeo.geoAlbersUsa()
  .scale(900)
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

var playButton = d3.select("#play-button");
var queryButton =d3.select("#query-button");
var moving = false;
var autoplaystep = 0;


var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var dateTime = date+' ';


d3.select("#maptitle").html("US Covid-19 County Timeline");

d3.select("#mapsubtitle").html("(one-click on map to zoom in; click the blue polygon to zoom out)");

d3.select("#creditinfor").html("Created by GISers from CGIS, UMD");

d3.select("#datainfor").html("Data updated time: "+ dateTime+ " (Dataset from CSSEGISandData)");

d3.select("#contributions").html("Contribution: Visualization by Yao Li and Zheng Liu. Data collection by Junchuan Fan, Hai Lan, Yao Li, Jeff Sauer, Zhiyue Xia,Guiming Zhu from CGIS, University of Maryland, College Park.");

d3.select("#datasource").html("Data source: CSSEGISandData");

d3.select("#legendname").html("Positive cases per 100,000 county population");

d3.select("#buttondescription").html("Click to see a recent 14-day dynamic view");

d3.select("#div.final").html("Click to see a recent 14-day dynamic view");






d3.csv("../data/zip_county.csv",function(zipcounty){
  var zip2fips = {};
  for (var i = 0; i < zipcounty.length; i++)
  {
    zip2fips[zipcounty[i].zip] = zipcounty[i].fip;
  }

d3.csv("../data/total_ad.csv", function(data_total_ad) {
  d3.json("../data/states.json", function(states_json) {
    d3.csv("../data/Data_cases.csv", function(data_cases) {
      d3.json("../data/Data_geo.json", function(json) {
        timearry = d3.keys(data_total_ad[0]).slice(22, );
        var aux = timearry.length - 1;
        var width_slider = 1200;
        var height_slider = 50;
        d3.select("#year").html(timearry[timearry.length - 1].substring(0, 4));
        //d3.select("#monthday").html(timearry[timearry.length - 1].substring(5));
        d3.select("#monthday").html(timearry[timearry.length - 1]);
        var data = data_total_ad

        playButton
          .on("click", function() {
            autoplaystep = 0;
            var button = d3.select(this);
            if (moving) {
              moving = false;
              d3.select(this)
                .style("background", "url('../img/PL.png')")
                .style("border-width", 0);

            } else {
              moving = true;
              d3.select(this)
                .style("background", "url('../img/PA.png')")
                .style("background-color", "#FFFFFF")
                .style("border-width", 0);
              autoplay(timearry.length - 14);

            }
      //      resetbutton();
          var timeset =  setTimeout(resetbutton, 1000 * 27);
          })



        function resetbutton() {
          playButton
            .style("background", "url('../img/PL.png')")
            .style("background-color", "#FFFFFF")
            .style("border-width", 0);
        }





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
          .attr("height", 5)
          .attr("x", 0)
          .attr("y", 16);
        var cursor = svg
          .append("g")
          .attr("class", "move")
          .append("svg")
          .attr("x", 1180)
          .attr("y", 7)
          .attr("width", 15)
          .attr("height", 20);

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



        function autoplay(counter) {
          if (moving) {
            if (counter < timearry.length - 1) {
              setTimeout(function() {
                counter++;
                autoplaystep = autoplaystep + parseFloat(width_slider) / parseFloat(axisyears[counter]);

                var x = Math.max(0, Math.min(width, parseFloat(autoplaystep)));

                var z = counter;

      //          console.log(z);
                aux = z;


                autoplaystep = 10

                d3.select("cursor")
                  //                .attr("class", "cursor")
                  .attr("class", "cursor")
                  .data(autoplaystep)
                  .attr("x", function(d) {
                    return d;
                  }) // accessor sets cx to the data point's x
                  .attr("y", 7) // accessor sets cy to 100 - the data point's y
                  .attr("transform", "translate(" + 12 + ",0)")
                  .attr("d", drawline(pointerdata));
                drawMap(z);

                autoplay(counter);
              }, 300);
            }
          }

        }





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


        var cont = map
          .selectAll("#mapa path")
          .data(json.features)
          .enter()
          .append("path")
          .attr("class", "path")
          .attr("d", path)
          .attr("id",function(d){
            return "GEOID"+d.properties.GEOID;
          })
          .style("fill", function(d) {
            return getColor(d.properties.value);
          })
          .attr("fill-opacity", "0.75")
          .attr("stroke", "#000000") //A9A9A9
          .attr("stroke-width", 0.15)
          .attr("stroke-opacity", "0.5")
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
          .attr("stroke", "#000000") //#0000FF
          .attr("stroke-width", 3)
          .attr("stroke-opacity", "1")
          .on("click", click);



        jsonOutside = cont; // pass json to a global so tableRowClicked has access

        queryButton
          .on('click', function(){
            zipcode = document.getElementById('zip').value;
            geoid = zip2fips[zipcode]


            console.log(geoid);
            var evt = new MouseEvent("click");
            if(geoid){
              d3.select('#GEOID'+geoid)
              .style("fill", "#000FF")
              .node().dispatchEvent(evt);

            }
            else{
              console.log('Zipcode not found!')
            }
          });
        statesjson = states;

        function click(d) {
          var x, y, k;

          if (d && centered !== d) {
            d3.select(this)
            .style('fill','#0000FF');
            if(selectID){
            //  console.log('OldSelectID'+selectID);
              d3.select('#'+selectID).style("fill", function(d) {
                return getColor(d.properties.value);
              });

            }
            selectID = d3.select(this).attr('id');
        //    console.log('NewSelectID'+selectID);
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 12;
            centered = d;
          } else {
            d3.select(this).style("fill", function(d) {
              return getColor(d.properties.value);
            });
            console.log('OldSelectID'+selectID);
            selectID = null;
            console.log('NewSelectID'+selectID);
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

            .style("stroke-width", 0.15 / k + "px");

          statesjson.selectAll("path")
            .classed(".active", centered && function(d) {
              return d === centered;
            });
          d3 = d3versionV3;

          statesjson.transition()
            .duration(960)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            .style("stroke-width", 3 / k + "px");



        }
        function mouseover(d) {

          d3.select(this)
            .attr("stroke-width", "1.5px")
            .attr("fill-opacity", "1");
          div.style("opacity", 0.9);

          var raw_cases = data_cases[d.properties.ID][timearry[aux]]
          var adjust_cases =0;

          if (parseFloat(data[d.properties.ID][timearry[aux]]*scalefactor) <=0)
          {
            adjust_cases = "No data"
          }
          else
          {
            adjust_cases = parseFloat(data[d.properties.ID][timearry[aux]]*scalefactor).toFixed(2)// FIXME: :

          }

          if (parseFloat(data_cases[d.properties.ID][timearry[aux]])<=0)
          {
            raw_cases = "No data"
          }


          div.html(
            "<b>" +
            d.properties.NAME + ", " + d.properties.StateName +
            "</b></br>Positive cases (per 100k): <b>" +
            adjust_cases +
            "</b></br>Raw counts:  <b>" +
            raw_cases
          );
        }

        function mouseout(d) {
          d3.select(this)
            .attr("stroke-width", "0.3")
            .attr("fill-opacity", "0.75");
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
              json.features[i].properties.value = parseFloat(dataValue) * scalefactor;

            }
            var value = d.properties.value;
            if (value) {
              return getColor(parseFloat(value));
            } else {
              return colores[0];
            }
          });
          maxSum(data_cases, index);
          console.log('drawMap call');
        }
        drawMap(timearry.length - 1);
        maxSum(data_cases, aux);
        //  clicked(data);
        function maxSum(d, index) {
          d3.select("#posicountynum").html("");
          d3.select("#maxcountynum").html("");
          d3.select("#totalcasenumber").html("");
          var datos = [];
      //    var data_adjust = [];
          var county = [];
          for (var i = 0; i < data_cases.length; i++) {
            datos.push(parseFloat(d[i][timearry[index]]));
      //      data_adjust.push(parseFloat(data[i][timearry[index]]));
            county.push(d[i].NAME);
          }
      //    console.log(data_adjust);
          var max_sum = d3.extent(datos);
          //  console.log(max_sum);
          var countyMax;
          var countyPoNum;
          var tatalcaseNum = 0;
          var posicounty = 0;
          var seriouscounty = 0;
          for (var j = 0; j < data_cases.length; j++) {
            if (parseFloat(datos[j]) > 0) {
              posicounty = posicounty + 1;
            }
            if (parseFloat(data[j][timearry[index]]*scalefactor) > 3500) {
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




          countyPoNum = ['  counties in the US have positive cases.'];
          var nombretotalcasenumber = d3
            .select("#totalcasenumber")
            .html(addComas(tatalcaseNum));
          var nombrecountyMax = d3
            .select("#maxcountynum")
            .html(
              //  addComas(max_sum[1]) +
              "<br>" +
              "<span id='county'>" +
              countyMax + "  counties in the US have more than 3500 positive cases per 100,000 county population." +
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
});
});

d3.select("#wrapper").on("touchstart", function() {
  div
    //    .transition()
    //    .duration(100)
    // .on("click", click)
    .style("opacity", 0);
});
