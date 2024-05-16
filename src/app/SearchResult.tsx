"use client"

import { MouseEvent, DragEvent, useRef, useState, useEffect } from "react";
import { Lawmaker } from "@/app/objecttype";
import styles from "./searchResult.module.css";
import { faker} from "@faker-js/faker";
import ArrowSVG from "/public/asset/updownArrow.svg";
import useFixed from "@/app/_userhook/useFixed";
import LawmakerListComp from "./LawmakerListComp";

const makeFakeLawmaker = () =>{ 
    return {
        code : faker.string.uuid().substring(0, 4),
        name : faker.internet.userName().substring(0, 4),
        img : faker.image.avatar(),
        party : { 
            name : faker.company.name().substring(0, 4),
            color : faker.color.rgb(),
        },
        stCommit : faker.commerce.productName().substring(0, 4),
        session : [faker.number.int()%5+18],
    }
}

export default function SearchResult() {
    const selectBoxComp = useRef<HTMLElement>(null);
    const menueFixed = useFixed({searchBoxComp : selectBoxComp, tag : styles.moved, top : 80});
    const [ lawmakerList, setLawmakerList ] = useState<Lawmaker[][]>([]);
    const [selectLawmaker, setSelectLawmaker] = useState<Lawmaker[]>([]);

    useEffect(()=>{
        const fakeLawmaker = faker.helpers.multiple(makeFakeLawmaker, {
            count : 5,
        });

        let newLawmakerList = new Array(25).fill(0).map((v,i)=>new Array(0));
        fakeLawmaker.map((v)=>{
            v.session.map((sess)=>{
                newLawmakerList[sess].push(v);
            })
            
        })
        setLawmakerList(newLawmakerList);
    }, [])


    const listDragEnterEvent = (e : DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log("드래그 도착");
    }

    const listDragOverEvent = (e : DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const listDropEvent = (e : DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        let code = e.dataTransfer.getData('code');
        let newselectLawmaker = [...selectLawmaker];
        //let findHer = lawmakerList.find((lawmaker)=>{
        //    if (lawmaker.code==code) return lawmaker});
        //if (findHer) newselectLawmaker.push(findHer);
        //setSelectLawmaker(newselectLawmaker);
    }

    const returnSelecTag = () => {
        if (selectLawmaker.length==0) {
            return (
                [<div key={1} className={styles.selectLawmakerBox} onDragEnter={listDragEnterEvent} onDragOver={listDragOverEvent} onDrop={listDropEvent} >
                    <div className={styles.deco}></div><div className={styles.deco}></div>
                </div>,
                <div key={2} className={styles.selectLawmakerBox} onDragEnter={listDragEnterEvent} onDragOver={listDragOverEvent} onDrop={listDropEvent} >
                    <div className={styles.deco}></div><div className={styles.deco}></div>
                </div>]
            )
        }
    }

    return (
        <section className={styles.searchReaultSection}>
            <section className={styles.selectLawmakerContainer} ref={selectBoxComp}>
                <section className={styles.selectLawmakerSection}>
                    <p className={styles.selectLawmakerInfoText}>비교할 의원님 끌어오기 (2명)</p>
                    <section className={styles.selectLawmakerWrapper}>
                        {returnSelecTag()}
                        <button className={styles.analyzeButton}>
                            <ArrowSVG className={styles.analyzeButtonImg} /><span className={styles.analyzeButtonText}>분석하기</span>
                        </button>
                    </section>
                </section>
            </section>
            <LawmakerListComp lawmakerList={lawmakerList} />

        </section>
    )
}