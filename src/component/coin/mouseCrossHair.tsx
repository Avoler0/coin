import React, { useEffect } from "react";

type props = {
  mouseCoods:{x:number,y:number},
  overData:any
  chartOption:any
}


function CrossHair({mouseCoods,overData,chartOption}:props){
  const {width,height} = chartOption;
  
  if(mouseCoods.x === 0) return <></>;

  return (
    <>
      <line
        x1={0}
        y1={mouseCoods.y}
        x2={width - 55}
        y2={mouseCoods.y}
        stroke="#fff"
        strokeOpacity="70%"
        strokeDasharray="3"
      />
      <line
        x1={mouseCoods.x}
        y1={0}
        x2={mouseCoods.x}
        y2={height}
        stroke="#fff"
        strokeOpacity="70%"
        strokeDasharray="3"
      />
      {/* <text
        x="900"
        y={mouseCoods.y + 10}
        >{overData.opening_price}</text>
      <text
        x={mouseCoods.x }
        y={450}
        stroke="#fff"
        >{`${dd}`}</text> */}
    </>
  )
}

export default CrossHair;