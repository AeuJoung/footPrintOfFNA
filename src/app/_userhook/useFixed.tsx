"use client"

import {  RefObject, useEffect, useRef } from "react";

interface Props {
    searchBoxComp : RefObject<HTMLElement>;
    type : boolean;
    tag : string;
    top? : number;
}

export default function useFixed({searchBoxComp, type, tag, top} : Props) {
    const handler = useRef<EventListener | null>();

    useEffect(()=>{
        handler.current = null;
        if (type) {
            let relativePos = Number(searchBoxComp.current?.getBoundingClientRect().top)-(top?top:0);
            let scrollPos = window.scrollY;
            let absolutePos = relativePos+scrollPos;
            handler.current = () =>{
                if (searchBoxComp.current?.classList.contains(tag)) {
                    if (scrollY<=absolutePos) searchBoxComp.current?.classList.remove(tag);
                } else {
                    if (scrollY>absolutePos) searchBoxComp.current?.classList.add(tag);
                }
            }
            window.addEventListener('scroll', handler.current);
        }
        return ()=>{
            if (handler.current) window.removeEventListener('scroll', handler.current);
        }
    });

    return null;
}