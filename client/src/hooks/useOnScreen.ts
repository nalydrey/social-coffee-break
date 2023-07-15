import { useState, useEffect } from "react"

type useOnScreenParams = (
    elem: HTMLElement | null, 
    rootElem?: HTMLElement | null,
    threshold?: number
    ) => boolean
    

export const useOnScreen: useOnScreenParams = (elem, rootElem, threshold = 0) => {

    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect(()=> {
        const elemObserver = new IntersectionObserver(([entry], observer) => {
            if(entry.isIntersecting){
                setIsVisible(true)
                observer.unobserve(entry.target)
            }
        },
        {
            root: rootElem,
            threshold
        }
        )

        elem && elemObserver.observe(elem)
        
        return () => {
            elem &&
            elemObserver.unobserve(elem)
        }

    },[elem])


    return isVisible
}

