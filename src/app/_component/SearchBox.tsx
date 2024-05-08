"use client"

import clsx from "clsx";
import styles from "./searchBox.module.css";
import { MouseEvent, useState } from "react";
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

    const filterData = {
        filterList_session : ['ALL', '21대', '20대', '19대', '18대'],
        filterList_party : ['ALL', '더불어민주당', '국민의힘', '녹색정의당'],
        filterList_gender : ['ALL', '남성', '여성'],
        filterList_term : ['ALL', '1회', '2회', '3회', '4회 이상']
    }


    const searchEvent = (e : MouseEvent<HTMLElement>) => {
        alert("Ddd");
    }

    const openFilterEvent = (e : MouseEvent<HTMLElement>) => {
        e.preventDefault();
        
        setIsFilterOpend(!isFilterOpened);
    }

    const listClick = (listName : string, targetList : string) =>{
        console.log(listName);
        if (Object.keys(filterResult).includes(listName)) {
            let newResult = {... filterResult};
            newResult[listName as keyof filterType]=targetList;
            setfilterResult(newResult);
        } else {
            console.log('필터 목록에 없는 값입니다.')
        }
    }

    console.log(filterResult);

    return (
        <section className={styles.searchSection}>
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
                <div className={styles.filterListWrapper}>
                    <label className={styles.filterListName}>회기</label>
                    <ul className={styles.filterListUl}>{filterData.filterList_session.map(
                        (v, i)=>{
                        return <li className={clsx(styles.filterList, filterResult[Object.keys(filterData)[0] as keyof filterType]==v && styles.clicked)} key={i} onClick={()=>listClick(Object.keys(filterData)[0], v)}>{v}</li>
                    })}</ul>
                </div>
                <div className={styles.filterListWrapper}>
                    <label className={styles.filterListName}>정당</label>
                    <select className={styles.filterListSelect}>{filterData.filterList_party.map((v, i)=><option className={styles.filterOption} key={i} value={v}>{v}</option>)}</select>
                </div>
                <div className={styles.filterListWrapper}>
                    <label className={styles.filterListName}>성별</label>
                    <ul className={styles.filterListUl}>{filterData.filterList_gender.map((v, i)=><li className={styles.filterList} key={i}>{v}</li>)}</ul>
                </div>
                <div className={styles.filterListWrapper}>
                    <label className={styles.filterListName}>다선</label>
                    <ul className={styles.filterListUl}>{filterData.filterList_term.map((v, i)=><li className={styles.filterList} key={i}>{v}</li>)}</ul>
                </div>
            </div>
        </section>
    );
}