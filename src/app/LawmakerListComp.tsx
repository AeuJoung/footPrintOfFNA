"use client"

import { MouseEvent, DragEvent, useRef, useState, useEffect } from "react";
import { Lawmaker } from "@/app/objecttype";
import styles from "./lawmakerListComp.module.css"


interface Props {
    lawmakerList : Lawmaker[][];
}

export default function LawmakerListComp({lawmakerList} : Props) {
    const listClickEvent = (e : MouseEvent<HTMLElement>) => {
        console.log("Dddddd");
    }

    const listDragStartEvent = (e : DragEvent<HTMLDivElement>, code : string) => {
        console.log("드래그 시작");

        e.dataTransfer.setData("code", code);
    }

    const returnLawmakerList = (lawmakerInfo : Lawmaker) => {
        return <>
            <div key={lawmakerInfo.code} className={styles.lawmakerList} onClick={listClickEvent} draggable onDragStart={(e)=>listDragStartEvent(e, lawmakerInfo.code)}>
                <div className={styles.list_img}>
                    <img src={lawmakerInfo.img} alt="" />
                </div>
                <div className={styles.list_infoWrapper}>
                    <div className={styles.list_partySimbol} style={{ backgroundColor : lawmakerInfo.party.color}}></div>
                    <div className={styles.list_name}>{lawmakerInfo.name}</div>
                    <div className={styles.list_stCommit}>{lawmakerInfo.stCommit}</div>
                    <div className={styles.list_recentSession}>{lawmakerInfo.session[lawmakerInfo.session.length-1]}선</div>
                </div>                          
            </div>
        </>

    }

    const returnLawmakerSessionList = () =>{
        if (lawmakerList.length==0) return <></>;
        let returnList = [];
        for (let i=22 ; i>=18 ; i--) {
            if (lawmakerList[i].length>0) {
                returnList.push(
                <section key={i} className={styles.lawmakerList_Session}> {/* 21대 의원, 22대 의원 섹션*/}
                    <div className={styles.sessionTitle}>{i}대 국회 <span className={styles.sessionInfo}>12명 (남 : 6, 여 : 7)</span></div>
                    <section className={styles.lawmakerListWrapper}>
                        {lawmakerList[i].map((v)=>{
                            return returnLawmakerList(v);
                        })}
                    </section>
                </section>
                );
            }
        }

        return returnList;
    }

    return (
        <section className={styles.LawmakerListSection}>
                
            {returnLawmakerSessionList()}
       
        </section>
    )
}