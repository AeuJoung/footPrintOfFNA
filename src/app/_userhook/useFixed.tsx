"use client"

import { RefObject, useEffect } from "react";


interface Props {
    searchBoxComp : RefObject<HTMLElement>;
    tag : string;
    top? : number;
}

export default function useFixed({searchBoxComp, tag, top} : Props) {
    useEffect(()=>{
        let relativePos = Number(searchBoxComp.current?.getBoundingClientRect().top)-(top?top:0);
        let scrollPos = window.scrollY;
        let absolutePos = relativePos+scrollPos;
        const handler = () =>{
            if (searchBoxComp.current?.classList.contains(tag)) {
                if (scrollY<=absolutePos) searchBoxComp.current?.classList.remove(tag);
            } else {
                if (scrollY>absolutePos) searchBoxComp.current?.classList.add(tag);
            }
        }
        window.addEventListener('scroll', handler);
        return ()=>{
            window.removeEventListener('scroll', handler);
        }
    });

    return null;
}