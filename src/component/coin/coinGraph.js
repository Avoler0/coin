import './coinGraph.css'
import React, { useEffect } from 'react';
import * as d3 from "d3";
import { isNegative } from '../../hook/const';
// type props = {
//   chartData:any
//   width:number
//   height:number
// }
import CrossHair from './mouseCrossHair';


function CoinGraph({chartData,setOverData}){
  const data = [...chartData].reverse();
  const svgRef = React.useRef(null);
  const [mouseCoods,setMouseCoords] = React.useState({x:0,y:0});
  const [size,setSize] = React.useState({width:0,height:0});
  const margin = {
    top:20,
    right:65,
    bottom:30,
    left:30
  }
  
  useEffect(()=>{
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    setSize({width,height})
    const xRange = [margin.left,width - margin.right];
    const yRange = [height - margin.bottom, margin.top];
    const xPadding = 0.1;
    const xFormat = "%m-%d";
    // coinOption === 'minute' ? "%I:%M" : 
    const yAxisTickMargin = 25;
    const xAxisDomainMargin = 40;
    const colors = ["#e41a1c", "#398bff"]

    const X = d3.map(data,(d) => d.timestamp);
    const Yo = d3.map(data, (d) => d.opening_price)
    const Yc = d3.map(data, (d) => d.trade_price)
    const Yh = d3.map(data, (d) => d.high_price)
    const Yl = d3.map(data, (d) => d.low_price)

    const yDomain = [d3.min(Yl)*0.95, d3.max(Yh)*1.05];
    const xScale = d3.scaleBand(X,xRange).padding(xPadding);

    const yScale = d3.scaleLinear(yDomain,yRange);
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat(xFormat));
    const yAxis = d3.axisRight(yScale).ticks(height / 100,"~s").tickSize(width-margin.right+yAxisTickMargin);

    const svg = d3.select(svgRef.current);
  
    svg.selectAll("g").remove()

    svg.append("g")
      .attr("class","yAxis")
      .attr("transform", `translate(0,0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("stroke-opacity", 0.2)
          .attr("x2", width - margin.left - margin.right));

    svg.append("g")
      .attr("class","xAxis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .call(g => g.select(".domain").remove());
    
    const g = svg.append("g")
        .attr("class","chart")
        .attr("stroke", "currentColor")
        .attr("stroke-linecap", "round")
      .selectAll("g")
      .data(data)
      .join("g")
        .on("mouseover",(d,i)=> setOverData(i))
        .attr("transform", (a,i) => `translate(${xScale(X[i])+20},0)`)

    g.append("line")
      .attr("y1", (a,i) => yScale(Yl[i]))
      .attr("y2", (a,i) => yScale(Yh[i]))
      .attr("stroke", (a,i) => colors[isNegative(Math.sign(Yo[i] - Yc[i]))]);
    
    g.append("line")
      .attr("y1", (a,i) => yScale(Yo[i]))
      .attr("y2", (a,i) => yScale(Yc[i])+1)
      .attr("stroke-width", xScale.bandwidth())
      .attr("stroke-linecap","butt")
      .attr("stroke", (a,i) => colors[isNegative(Math.sign(Yo[i] - Yc[i]))]);

  },[data])
  function mosueMoveInside(e:React.MouseEvent){
  setMouseCoords({
    x:
      e.nativeEvent.offsetX,
    y:
      e.nativeEvent.y -
      Math.round(e.currentTarget.getBoundingClientRect().top)
  })
}

function mouseLeave(){
  setMouseCoords({
    x: 0,
    y: 0
  });
};
  return (
      <svg ref={svgRef} 
        width="100%" height="100%"
        onMouseMove={mosueMoveInside} onMouseLeave={mouseLeave}
      >
        
        <CrossHair mouseCoods={mouseCoods} chartOption={size} />
      </svg>
  );
}

export default CoinGraph;

