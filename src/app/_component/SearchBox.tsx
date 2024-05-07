"use client"

import styles from "./searchBox.module.css";
import { MouseEvent } from "react";
import SearchBT from "/public/asset/SearchBT.svg"

export default function SearchBox() {

    const searchEvent = (e : MouseEvent<HTMLElement>) => {
        alert("Ddd");
    }

    return (
        <section className={styles.searchSection}>
            <div className={styles.searchBoxWrapper}>
                <input className={styles.searchBox} type="search" placeholder="의원 검색"></input>
                <div className={styles.searchButtonWrapper}>
                    <SearchBT className={styles.searchButtonImg}></SearchBT>
                    <button className={styles.searchButton} onClick={searchEvent} ></button>
                </div>
            </div>
            <div className={styles.filterOpenBT}></div>
            <div className={styles.filterSelectBox}></div>
        </section>
    );
}