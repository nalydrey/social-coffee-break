import React, {useEffect, useMemo, useState} from 'react'
import { ChevronLeftIcon, ChevronRightIcon  } from '@heroicons/react/24/solid'

interface SippleSlider {
    children: React.ReactNode | React.ReactNode[]
    dur?: 0 | 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000
}

export const SimpleSlider = ({
    children,
    dur = 300
}: SippleSlider) => {


    const [length, setLength] = useState<number>(1)
    const [imgNumber, setImgNumber] = useState<number>(0)
    const isArray = (Array.isArray(children));
    const [durarion, setDuration] = useState<number | string>(0)
    // const length = isArray && children.length || 0

    console.log('imgNumber ', imgNumber);
    


    useEffect(()=>{
        isArray &&
        setLength(children.length)
        const timer = setTimeout(()=>{setDuration(dur)}, dur)
        return () => {clearTimeout(timer)}
    },[])


    const changeImage = (number: number) => {
        console.log(number, length);
        
        if(isArray){
            if(number > 0){
              return  setImgNumber(-(length-1))
            }
            if(number < -(length-1)){
              return  setImgNumber(0)
            }
            setImgNumber(number)
        }

    }
    
    console.log(children);
    

    
  return (
      <div className=' relative border pt-[55%] overflow-hidden rounded-xl shadow-light'>
        <ul className={`absolute top-0 h-full flex duration-${durarion}`} 
            style={{width: length*100+'%',  left: imgNumber*100+'%' }}
        >
           {Array.isArray(children) &&
                children.map(child => <li className='w-full'>{child}</li>)
           }
        </ul>

        {  (length>1) &&
            <>
                <button className='absolute left-2 top-[50%] -translate-y-1/2 bg-sky-400/30 rounded-full p-1 duration-300 cursor-pointer hover:bg-sky-800/70'
                    onClick={()=>{changeImage(imgNumber+1)}}
                >
                    <ChevronLeftIcon className='w-7 '/>
                </button>
                <button className='absolute right-2 top-[50%] -translate-y-1/2 bg-sky-400/30 rounded-full p-1 duration-300 cursor-pointer hover:bg-sky-800/70'
                    onClick={()=>{changeImage(imgNumber-1)}}
                >
                    <ChevronRightIcon className='w-7 '/>
                </button>
            </>
        }
    </div>
  )
}
