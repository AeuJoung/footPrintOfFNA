"use client"

import { MouseEvent, DragEvent, useRef, useState, useEffect, ReactNode } from "react";
import { Lawmaker, NumOfGenderBySess } from "@/app/objecttype";
import Image from "next/image";
import styles from "./searchResult.module.css";
import { faker } from "@faker-js/faker";
import ArrowSVG from "/public/asset/updownArrow.svg";
import useFixed from "@/app/_userhook/useFixed";
import LawmakerListComp from "./LawmakerListComp";
import clsx from "clsx";


const makeFakeLawmaker = () =>{ 
    let randNum = [faker.number.int()%5+18];
    return {
        code : faker.string.uuid().substring(0, 4),
        name : faker.internet.userName().substring(0, 4),
        gender : faker.person.gender(),
        img : faker.image.avatar(),
        party : { 
            name : faker.company.name().substring(0, 4),
            color : faker.color.rgb(),
        },
        stCommit : faker.commerce.productName().substring(0, 4),
        session : randNum,
        curSession : randNum[0],

        userCheck : false, //선택 박스에 선택되었는지.
    }
}

const makeNullLawmaker = () : Lawmaker=> {
    return {
        code : '', //의원 코드
        name : '', 
        gender : '',
        img : '',
        party : {  //정당 정보
            name : '',
            color : '',
        },
        stCommit : '', //상임위
        session : [0], //국회 회기 리스트
        curSession : 0, //현재 회기
    
        userCheck : false
    }
}

export default function SearchResult() {
    const selectBoxComp = useRef<HTMLElement>(null);
    const menueFixed = useFixed({searchBoxComp : selectBoxComp, tag : styles.moved, top : 80});
    const [ lawmakerList, setLawmakerList ] = useState<Lawmaker[][]>([]);
    const [selectLawmaker, setSelectLawmaker] = useState<Lawmaker[]>([]);
    const [gender, setGender] = useState<NumOfGenderBySess[]>([]);

    useEffect(()=>{
        const fakeLawmaker = faker.helpers.multiple(makeFakeLawmaker, {
            count : 200,
        });

        let newLawmakerList = new Array(25).fill(0).map((v,i)=>new Array(0));
        let newGender = new Array(25).fill(0).map((v,i)=>{ return {male : 0, female : 0}});
        fakeLawmaker.map((v)=>{
            v.session.map((sess)=>{
                newLawmakerList[sess].push(v);
                if (v.gender=='male') newGender[sess].male++;
                else newGender[sess].female++;
            })
        })
        setLawmakerList(newLawmakerList);
        setGender(newGender);
        setSelectLawmaker([makeNullLawmaker(), makeNullLawmaker()])
    }, [])


    const listDragEnterEvent = (e : DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        //console.log("드래그 도착");
    }

    const listDragOverEvent = (e : DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const listDropEvent = (e : DragEvent<HTMLDivElement>, slot : number) => {
        e.preventDefault();

        let code = e.dataTransfer.getData('code');
        let sess = Number(e.dataTransfer.getData('sess'));
        let findLawmaker = lawmakerList[sess].find((v, idx)=> {
            if (v.code==code) return true;
        });


        let newselectLawmaker = [...selectLawmaker];
        newselectLawmaker.find((v, idx)=>{
            if (v.code==findLawmaker?.code) {
                newselectLawmaker[idx]=makeNullLawmaker();
                return true;
            } 
        })

        if (findLawmaker) {
            findLawmaker.userCheck=true;
            newselectLawmaker[slot].userCheck=false;
            newselectLawmaker[slot] = findLawmaker;
        } 

        let newlawmakerList = [...lawmakerList]; 
        
        setLawmakerList(newlawmakerList);
        setSelectLawmaker(newselectLawmaker);
    }

    const analyzeLawmaker = (e : MouseEvent<HTMLElement>) => {
        console.log(selectLawmaker);
    }
   
    const returnSelecTag = () : ReactNode[] => {
        let selectBox = selectLawmaker.map((v, idx)=> {
            if (v.code=="") {
                return (
                    <div key={idx} className={styles.selectLawmakerBox} onDragEnter={listDragEnterEvent} onDragOver={listDragOverEvent} onDrop={(e)=>listDropEvent(e, idx)} >
                        <div className={styles.deco}></div><div className={styles.deco}></div>
                    </div>
                );
            } else {
                console.log(v.img);
                return (
                    <div key={idx} className={clsx(styles.selectLawmakerBox, styles.addImg)} onDragEnter={listDragEnterEvent} onDragOver={listDragOverEvent} onDrop={(e)=>listDropEvent(e, idx)} >                        
                        <Image src={v.img} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill={true} style={{ objectFit : "cover"}} alt="의원 사진"></Image>
                    </div>
                )
            }
        })

        return selectBox;
    }

    return (
        <section className={styles.searchReaultSection}>
            <section className={styles.selectLawmakerContainer} ref={selectBoxComp}>
                <section className={styles.selectLawmakerSection}>
                    <p className={styles.selectLawmakerInfoText}>비교할 의원님 끌어오기 (2명)</p>
                    <section className={styles.selectLawmakerWrapper}>
                        {returnSelecTag()}
                        <button className={styles.analyzeButton} onClick={analyzeLawmaker}>
                            <ArrowSVG className={styles.analyzeButtonImg} /><span className={styles.analyzeButtonText}>분석하기</span>
                        </button>
                    </section>
                </section>
            </section>
            <LawmakerListComp lawmakerList={lawmakerList} genderList={gender} />

        </section>
    )
}