import './coinGraph.css'
import React, { useEffect } from 'react';
import * as d3 from "d3";
import { isNegative } from '../../hook/const';
// type props = {
//   chartData:any
//   width:number
//   height:number
// }


function CoinGraph({chartData,setOverData,svgRef,chartOption}){
    const {width,height,margin} = chartOption;
    const xRange = [margin.left,width - margin.right];
    const yRange = [height - margin.bottom, margin.top];
    const xPadding = 0.2;
    const xFormat = "%b %d";
    const yFormat = "~f";
    const colors = ["#e41a1c", "#398bff"]

    const X = d3.map(chartData,(data) => data.timestamp);
    const Yo = d3.map(chartData, (data) => data.opening_price)
    const Yc = d3.map(chartData, (data) => data.trade_price)
    const Yh = d3.map(chartData, (data) => data.high_price)
    const Yl = d3.map(chartData, (data) => data.low_price)

    const weeks = (start, stop, stride) => d3.utcMonday.range(start, stop, 27);

    const yDomain = [d3.min(Yl)*0.95, d3.max(Yh)*1.05];
    const xTicks = weeks(d3.min(X), d3.max(X), 1);
    const xScale = d3.scaleBand(X,xRange).padding(xPadding);
    // const xScale = d3.scaleLinear().domain([d3.min(X), d3.max(X)]).range([0,width])
    const yScale = d3.scaleLinear(yDomain,yRange);
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%y-%m-%d"));
    const yAxis = d3.axisRight(yScale).ticks(height / 45).tickSize(width-margin.right);

    const svg = d3.select(svgRef.current);


    svg.selectAll("g").remove()

    svg.append("g")
      .attr("className","yAxis")
      .attr("transform", `translate(0,0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("stroke-opacity", 0.2)
          .attr("x2", width + margin.left - margin.right));

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .call(g => g.select(".domain").remove());

    const g = svg.append("g")
        .attr("className","chart")
        .attr("stroke", "currentColor")
        .attr("stroke-linecap", "round")
      .selectAll("g")
      .data(chartData)
      .join("g")
        .on("mouseover",(d,i)=> setOverData(i))
        .attr("transform", (a,i) => `translate(${xScale(X[i])},0)`)



    g.append("line")
      .attr("y1", (a,i) => yScale(Yl[i]))
      .attr("y2", (a,i) => yScale(Yh[i]))
      .attr("stroke", (a,i) => colors[isNegative(Math.sign(Yo[i] - Yc[i]))]);
    
    g.append("line")
      .attr("y1", (a,i) => yScale(Yo[i]))
      .attr("y2", (a,i) => yScale(Yc[i])+1)
      .attr("stroke-width", 68)
      .attr("stroke-linecap","butt")
      .attr("stroke", (a,i) => colors[isNegative(Math.sign(Yo[i] - Yc[i]))]);

  return <></>;
}

export default CoinGraph;

