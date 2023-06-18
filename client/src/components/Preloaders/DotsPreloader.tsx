import React from 'react'
import './DotsPreloader.css'

interface DotsPreloaderProps {
    className: string
}

export const DotsPreloader = ({className}: DotsPreloaderProps) => {
  return (
    <div className={`${className} w-32 h-32 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}>
        <div className="f_circleG" id="frotateG_01"></div>
        <div className="f_circleG" id="frotateG_02"></div>
        <div className="f_circleG" id="frotateG_03"></div>
        <div className="f_circleG" id="frotateG_04"></div>
        <div className="f_circleG" id="frotateG_05"></div>
        <div className="f_circleG" id="frotateG_06"></div>
        <div className="f_circleG" id="frotateG_07"></div>
        <div className="f_circleG" id="frotateG_08"></div>
    </div>
  )
}
