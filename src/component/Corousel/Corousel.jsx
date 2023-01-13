import React, { useEffect, useState } from 'react'
import "./corousel.css"
import right from"../image/right.png"
import left from"../image/left.png"
import crest_hallow from"../image/crest_hallow.png"
import crest_solid from"../image/crest_solid.png"
// import{useSwipeable} from "react-useSwipeable";
export const Corousel = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}> {children} </div>
  );
};

export const Carousel = ({ children }) => {
  const [activeIndex, SetActiveIndex] = useState(0);
  const [paused,setpaused]=useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children)-1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    SetActiveIndex(newIndex);
  };
  useEffect(()=>{
    const interval = setInterval(()=>{
      if(!paused)
      {
        updateIndex(activeIndex+1);
      }
      
    },100000);
  })
  // const handlers =useSwipeable({
  //   onSwiedLeft:()=> updateIndex(activeIndex+1),
  //   onSwipedRight:()=> updateIndex(activeIndex-1)
  // });
  return (
    <div className="carousel"
    onMouseEnter={()=>setpaused(true)}
    onMouseLeave={()=>setpaused(false)}
    >
      <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {React.Children.map(children, (child,index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        <button style={{display:"none"}} id="prev" onClick={() => {
          updateIndex(activeIndex - 1);
        }}>
        </button>
        <label htmlFor="prev">
          <img src={left}/>
        </label>
        {
            React.Children.map(children, (child, index) => {
              return (
              <>
               <button id="point" style={{display:"none"}} 
              className={`${index=== activeIndex?"active":""}`}
                onClick={() => {
                  updateIndex(index);
                }}
              >
                
              </button>
              <label htmlFor="point"><img src={`${index=== activeIndex?crest_solid:crest_hallow}`}alt="" /></label>
              </>
              );
            })
          }
        <button
          style={{display:"none"}} id="next"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}></button>
          <label htmlFor="next">
          <img src={right}/>
          </label>
      </div>
    </div>
  );
};