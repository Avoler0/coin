import './coinGraph.css'
import React, { useEffect } from 'react';
import * as d3 from "d3";
import { upbit_candle_minute, upbit_candle_days } from '../../types/upbit';
import { Container } from '@mui/material';
import { isNegative } from '../../hook/const';
// type props = {
//   chartData:any
//   width:number
//   height:number
// }

function mouseInside(a,i){
  console.log(a,i)
}
function CoinGraph({chartData}){
  const containRef = React.useRef(null);
  const svgRef = React.useRef(null);
  useEffect(()=>{
    const width = svgRef.current.parentElement.clientWidth;
    const height = svgRef.current.parentElement.clientHeight;

    const margin = {
      top:20,
      right:55,
      bottom:30,
      left:60
    }
    const xRange = [20,width - margin.right];
    const yRange = [height - margin.bottom, margin.top];
    const xPadding = 0.2;
    const xFormat = "%m월 %-d";
    const yFormat = "~f";
    const colors = ["#398bff", "#e41a1c"]
    let title;
    let xDomain;

    const X = d3.map(chartData,(data) => data.timestamp);
    const Yo = d3.map(chartData, (data) => data.opening_price)
    const Yc = d3.map(chartData, (data) => data.trade_price)
    const Yh = d3.map(chartData, (data) => data.high_price)
    const Yl = d3.map(chartData, (data) => data.low_price)

    const weeks = (start, stop, stride) => d3.utcMonday.range(start, stop, 27);

    const yDomain = [d3.min(Yl), d3.max(Yh)];
    const xTicks = weeks(d3.min(X), d3.max(X), 1);

    const xScale = d3.scaleBand(X,xRange).padding(xPadding)
    const yScale = d3.scaleLinear(yDomain,yRange);
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.utcFormat(xFormat)).tickValues(xTicks);
    const yAxis = d3.axisRight(yScale).ticks(height / 45).tickSize(width-margin.right);

    const svg = d3.select(svgRef.current);
    
    console.log("RR", yScale )

    svg.selectAll("g").remove()

    svg
      .attr("viewBox",[0,0,width,height])
      .attr("style","max-width: 100%; height: auto; height: intrinsic; ")

    svg.append("g")
      .attr("className","yAxis")
      .attr("transform", `translate(0,0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("stroke-opacity", 0.2)
          .attr("x2", width + margin.left - margin.right));

    const g = svg.append("g")
        .attr("className","chart")
        .attr("stroke", "currentColor")
        .attr("stroke-linecap", "round")
      .selectAll("g")
      .data(chartData)
      .join("g")
        .attr("transform", (a,i) => `translate(${xScale(X[i])},0)`)
        
  // svg.append("g")
  //     .attr("transform", `translate(0,${height - margin.bottom})`)
  //     .call(xAxis)
  //     .call(g => g.select(".domain").remove());

  
      // .call(g => g.append("text")
      //     .attr("x", -margin.left)
      //     .attr("y", 10)
      //     .attr("fill", "currentColor")
      //     .attr("text-anchor", "start")
      //     .text("1234"));
        
    
    g.append("line")
      .attr("y1", (a,i) => yScale(Yl[i]))
      .attr("y2", (a,i) => yScale(Yh[i]))
      .attr("stroke", (a,i) => colors[isNegative(Math.sign(Yo[i] - Yc[i]))]);
    
    g.append("line")
      // .attr("className", (a,i) => `open:${Yo[i]} close:${Yc[i]} ${new Date(X[i])}`)
      .attr("y1", (a,i) => yScale(Yo[i]))
      .attr("y2", (a,i) => yScale(Yc[i])+1)
      .attr("stroke-width", xScale.bandwidth())
      .attr("stroke-linecap","butt")
      .attr("stroke", (a,i) => colors[isNegative(Math.sign(Yo[i] - Yc[i]))]);
      

      console.log(xScale(X[1]),yScale(Yo[1]),yScale(Yc[1]+1))

  },[chartData])
  
  return (
    <Container maxWidth="lg" className='graph-wrap' useRef={containRef}>
      <svg ref={svgRef} >
          {/* const candle_x = (width / (chartData.length + 1)) + (i * 20); */}
            {/* <>
              <g
                transform='translate(273)'
              >
                <line
                  y1={100}
                  y2={200}
                  stroke-width="6.85"
                  stroke={'#e41a1c'}
                />
              </g>
            </> */}
      </svg>
      {/* <div className='option'>
      </div>*/}
    </Container>
  )
}

export default CoinGraph;

