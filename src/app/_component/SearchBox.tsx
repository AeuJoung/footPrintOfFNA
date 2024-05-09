"use client"

import clsx from "clsx";
import styles from "./searchBox.module.css";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import SearchBT from "/public/asset/SearchBT.svg"
import ArrowSVG from "/public/asset/updownArrow.svg";


interface filterType {
    filterList_session : string,
    filterList_party : string,
    filterList_gender : string,
    filterList_term : string
}

const filterDefault = { 
    filterList_session : 'ALL',
    filterList_party : 'ALL',
    filterList_gender : 'ALL',
    filterList_term : 'ALL'
}

export default function SearchBox() {
    const [isFilterOpened, setIsFilterOpend] = useState<boolean>(false);
    const [filterResult, setfilterResult] = useState<filterType>(filterDefault); //서버에 넘겨줄 값
    const searchBoxComp = useRef<HTMLElement>(null);


    useEffect(()=>{
        const handler = () =>{

        }
        window.addEventListener('scroll', handler);
        return ()=>{
            window.removeEventListener('scroll', handler);
        }
    })

    const filterData = {
        filterList_session : {
            name : '회기',
            mode : 0, //0 : 항목 선택형
            list : ['ALL', '21대', '20대', '19대', '18대']
        },

        filterList_party : {
            name : '정당',
            mode : 1, ////1 : select 형
            list : ['ALL', '더불어민주당', '국민의힘', '녹색정의당']
        },
        filterList_gender : {
            name : '성별',
            mode : 0,
            list : ['ALL', '남성', '여성']
        },
        filterList_term : {
            name : '다선',
            mode : 0,
            list : ['ALL', '1회', '2회', '3회', '4회 이상']
        }
    }

    const searchEvent = (e : MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log(filterResult);
    }

    const openFilterEvent = (e : MouseEvent<HTMLElement>) => {
        e.preventDefault();
        
        setIsFilterOpend(!isFilterOpened);
    }

    const listClick = (e : MouseEvent<HTMLElement> | ChangeEvent<HTMLSelectElement>, listName : string, targetList : string) =>{
        e.preventDefault();
        if (Object.keys(filterResult).includes(listName)) {
            let newResult = {... filterResult};
            newResult[listName as keyof filterType]=targetList;
            setfilterResult(newResult);
        } else {
            console.log('필터 목록에 없는 값입니다.')
        }
    }

    const makeFilter = (code : string, index : number) => { //필터 박스 내부 구현
        let filterObj = filterData[code as keyof filterType];
        let mode = filterObj.mode;

        switch(mode) {
            case 0 : {
                return (
                    <div className={styles.filterListWrapper} key={index}>
                        <label className={styles.filterListName}>{filterObj.name}</label>
                        <ul className={styles.filterListUl}>{filterObj.list.map(
                            (v, i)=>{
                            return <li className={clsx(styles.filterList, filterResult[code as keyof filterType]==v && styles.clicked)} key={i} onClick={(e)=>listClick(e, code, v)}>{v}</li>
                        })}</ul>
                    </div>
                )
            }
            case 1 : {
                return (
                    <div className={styles.filterListWrapper} key={index}>
                        <label className={styles.filterListName}>{filterObj.name}</label>
                        <select className={styles.filterListSelect} onChange={(e)=>listClick(e, code, e.target.value)}>{filterObj.list.map((v, i)=><option className={styles.filterOption} key={i} value={v}>{v}</option>)}</select>
                    </div>
                )
            }
            default : return <></>
        }
    }
    
    return (
        <section className={styles.searchSectionWrapper}>
            <section className={styles.searchSection} ref={searchBoxComp}>
                <div className={styles.searchBoxWrapper}>
                    <input className={styles.searchBox} type="search" placeholder="의원 검색"></input>
                    <div className={styles.searchButtonWrapper}>
                        <SearchBT className={styles.searchButtonImg}></SearchBT>
                        <button className={styles.searchButton} onClick={searchEvent} ></button>
                    </div>
                    <div className={styles.filterOpenBTWrapper}>
                        <button className={styles.filterOpenBT} onClick={openFilterEvent}>
                            <ArrowSVG className={clsx(styles.filterOpenBTImg, isFilterOpened&&styles.opened)} />검색 필터
                        </button>
                    </div>
                </div>
                <div className={clsx(styles.filterSelectBox, isFilterOpened&&styles.opened)}>
                    {Object.keys(filterData).map((code, index)=>makeFilter(code, index))}
                </div>
            </section>
        </section>

    );
}