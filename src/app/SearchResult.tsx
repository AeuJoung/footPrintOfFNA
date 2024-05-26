"use client"

import { MouseEvent, DragEvent, useRef, useState, useEffect, ReactNode } from "react";
import { Lawmaker, SelectBoxLawmaker, NumOfGenderBySess } from "@/app/objecttype";
import Image from "next/image";
import styles from "./searchResult.module.css";
import { fa, faker, tr} from "@faker-js/faker";
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

export default function SearchResult() {
    const selectBoxComp = useRef<HTMLElement>(null);
    const menueFixed = useFixed({searchBoxComp : selectBoxComp, tag : styles.moved, top : 80});
    const [ lawmakerList, setLawmakerList ] = useState<Lawmaker[][]>([]);
    const [selectLawmaker, setSelectLawmaker] = useState<SelectBoxLawmaker[]>([]);
    const [gender, setGender] = useState<NumOfGenderBySess[]>([]);

    useEffect(()=>{
        const fakeLawmaker = faker.helpers.multiple(makeFakeLawmaker, {
            count : 2000,
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
        setSelectLawmaker([{ code : '', imgSrc : ''}, { code : '', imgSrc : ''}])
    }, [])


    const listDragEnterEvent = (e : DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log("드래그 도착");
    }

    const listDragOverEvent = (e : DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const listDropEvent = (e : DragEvent<HTMLDivElement>, slot : number) => {
        e.preventDefault();

        let code = e.dataTransfer.getData('code');
        let imgSrc = e.dataTransfer.getData('imgSrc');
        let sess = e.dataTransfer.getData('sess');
        let newselectLawmaker = [...selectLawmaker];
        newselectLawmaker.find((v, idx)=>{
            if (v.code==code) {
                newselectLawmaker[idx]={code : '', imgSrc : ''};
                return true;
            } 
        })

        newselectLawmaker[slot] = {code : code, imgSrc : imgSrc};

        let newlawmakerList = [...lawmakerList]; 
        newlawmakerList.forEach((lawmakers)=>{ //전체 리스트 돌면서 검색. 비효율적인듯...
            lawmakers.forEach((lawmaker)=> {
                lawmaker.userCheck=false;
                if (lawmaker.code==newselectLawmaker[0].code || lawmaker.code==newselectLawmaker[1].code) {
                    lawmaker.userCheck=true;
                }
            });
        });
        
        setLawmakerList(newlawmakerList);
        setSelectLawmaker(newselectLawmaker);
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
                return (
                    <div key={idx} className={clsx(styles.selectLawmakerBox, styles.addImg)} onDragEnter={listDragEnterEvent} onDragOver={listDragOverEvent} onDrop={(e)=>listDropEvent(e, idx)} >
                        <Image src={v.imgSrc} layout="fill" objectFit="cover" alt="의원 사진"></Image>
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
                        <button className={styles.analyzeButton}>
                            <ArrowSVG className={styles.analyzeButtonImg} /><span className={styles.analyzeButtonText}>분석하기</span>
                        </button>
                    </section>
                </section>
            </section>
            <LawmakerListComp lawmakerList={lawmakerList} genderList={gender} />

        </section>
    )
}