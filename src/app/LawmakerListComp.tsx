"use client"

import { MouseEvent, DragEvent, useRef, useState, useEffect } from "react";
import { Lawmaker, NumOfGenderBySess } from "@/app/objecttype";
import styles from "./lawmakerListComp.module.css"
import clsx from "clsx";


interface Props {
    lawmakerList : Lawmaker[][];
    genderList : NumOfGenderBySess[];
}

export default function LawmakerListComp({lawmakerList, genderList} : Props) {
    console.log(lawmakerList);

    const listClickEvent = (e : MouseEvent<HTMLElement>) => {
        console.log("Dddddd");
    }

    const listDragStartEvent = (e : DragEvent<HTMLDivElement>, lawmaker : Lawmaker) => {
        e.dataTransfer.setData("imgSrc", lawmaker.img);
        e.dataTransfer.setData("code", lawmaker.code);    
        e.dataTransfer.setData("sess", lawmaker.curSession.toString());
    }

    const returnLawmakerList = (lawmakerInfo : Lawmaker) => {
        return (
            <div key={lawmakerInfo.code} className={clsx(styles.lawmakerList, lawmakerInfo.userCheck && styles.useChecked)} onClick={listClickEvent} draggable onDragStart={(e)=>listDragStartEvent(e, lawmakerInfo)}>
                <div className={styles.list_img}>
                    <img src={lawmakerInfo.img} alt="" />
                </div>
                <div className={styles.list_infoWrapper}>
                    <div className={styles.list_partySimbol} style={{ backgroundColor : lawmakerInfo.party.color}}></div>
                    <div className={styles.list_name}>{lawmakerInfo.name}</div>
                    <div className={styles.list_stCommit}>{lawmakerInfo.stCommit}</div>
                    <div className={styles.list_recentSession}>{lawmakerInfo.curSession}선</div>
                </div>                          
            </div>
        )
    }

    const returnLawmakerSessionList = () =>{
        if (lawmakerList.length==0) return <></>;
        let returnList = [];
        for (let i=22 ; i>=18 ; i--) {
            if (lawmakerList[i].length>0) {
                returnList.push(
                <section key={i} className={styles.lawmakerList_Session}> {/* 21대 의원, 22대 의원 섹션*/}
                    <div className={styles.sessionTitle}>{i}대 국회 <span className={styles.sessionInfo}>{lawmakerList[i].length}명 (남 : {genderList[i].male}, 여 : {genderList[i].female})</span></div>
                    <section className={styles.lawmakerListWrapper}>
                        {lawmakerList[i].map((v, idx)=>{
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