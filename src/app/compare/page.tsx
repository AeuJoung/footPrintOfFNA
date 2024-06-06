'use client'

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image"
import SearchBox from "../_component/SearchBox";
import { faker } from "@faker-js/faker";
import styles from "@/app/compare/page.module.css";
import GraphComp from "@/app/_graph/graphComp";


export default function Page() {
    const searchParams = useSearchParams();
    

    useEffect(()=>{
        

    }, []);

    return (<>
        <SearchBox alwaysMenuFixed={false} />
        <div style={{ position:"absolute", zIndex : -5, top:0, left:0, width:'50%', height:'100%', background : 'linear-gradient(0deg, #ffffff, #4CB699)'}}></div>
        <div style={{ position:"absolute", zIndex : -5, top:0, right:0, width:'50%', height:'100%', background : 'linear-gradient(0deg, #ffffff, #5B9BC7)'}}></div>
        <div className={styles.vslabel}>VS</div>

        <section className={styles.mainContainer}>
            <section className={styles.cardSection}>
                <section className={styles.lawmakerSection}>
                    <div className={styles.imageContainer}>
                        <Image src={faker.image.avatar()} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill style={ {objectFit : 'cover' } } alt="의원 사진"/>
                    </div>
                    <div className={styles.downArea}>
                        <h2 className={styles.lawmakerName}>윤재옥 (尹在玉)</h2>
                        <div className={styles.partyName}>국민의 힘</div>
                        <div className={styles.committee}>
                            <div>기획재정위원회</div>
                            <div>법사위원회</div>
                            <div>기획재정위원회</div>
                            <div>법사위원회</div>
                            <div>기획재정위원회</div>
                            <div>법사위원회</div>
                        </div>
                        <div className={styles.termInfo}>
                            <h2><span>4</span>선</h2>
                            <div className={styles.termList}>
                            <div><span>제 NN대</span> 2020.05.30 ~ 2020.05.30</div>
                                <div><span>제 NN대</span> 2020.05.30 ~ 2020.05.30</div>
                                <div><span>제 NN대</span> 2020.05.30 ~ 2020.05.30</div>
                                <div><span>제 NN대</span> 2020.05.30 ~ 2020.05.30</div>

                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.lawmakerSection}>
                    <div className={styles.imageContainer}>
                        <Image src={faker.image.avatar()} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill style={ {objectFit : 'cover' } } alt="의원 사진"/>
                    </div>
                    <div className={styles.downArea}>
                        <h2 className={styles.lawmakerName}>윤재옥 (尹在玉)</h2>
                        <div className={styles.partyName}>국민의 힘</div>
                        <div className={styles.committee}>
                            <div>기획재정위원회</div>
                            <div>법사위원회</div>
                        </div>
                        <div className={styles.termInfo}>
                            <h2><span>4</span>선</h2>
                            <div className={styles.termList}>
                                <div><span>제 NN대</span> 2020.05.30 ~ 2020.05.30</div>
                                <div><span>제 NN대</span> 2020.05.30 ~ 2020.05.30</div>
                                <div><span>제 NN대</span> 2020.05.30 ~ 2020.05.30</div>
                                <div><span>제 NN대</span> 2020.05.30 ~ 2020.05.30</div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className={styles.overviewSection}>
                <article className={styles.graphArea}>
                    <h3 className={styles.graphTitle}>상임위/본회의<br />출석률</h3>
                    <GraphComp graphData={[
                        {name : '상임위원회', totalValue : 182, value : 170, symbol : '%', color : '#FFB5B5'},
                        {name : '본회의', totalValue : 200, value : 180, symbol : '%', color : '#5A9CFF'}, 
                        {totalValue : 182, value : 130, symbol : '%', color : '#FFB5B5'},
                        {totalValue : 200, value : 123, symbol : '%', color : '#5A9CFF'} 
                        ]} position="bottom" type="vs" />
                </article>
                <article className={styles.graphArea}>
                    <h3 className={styles.graphTitle}>안건<br />상정률/가결률</h3>
                    <GraphComp graphData={[
                        {name : '대표발의 안건 상정률', totalValue : 100, value : 68.2, symbol : '%', color : '#FFB5B5', 
                            subGraph : {
                                name : '대표발의 안건 가결률', value : 30, color : '#AA2B2B'
                                }}, 
                        {name : '공동제안 안건 상정률', totalValue : 100, value : 75.66, symbol : '%', color : '#5A9CFF', 
                            subGraph : {
                                name : '대표발의 안건 가결률', value : 40,  color : '#1C59B6'
                                }}, 
                        {totalValue : 100, value : 68.2, symbol : '%', color : '#FFB5B5', 
                            subGraph : {
                                value : 30, color : '#AA2B2B'
                                }}, 
                        {totalValue : 100, value : 75.66, symbol : '%', color : '#5A9CFF', 
                            subGraph : {
                                value : 40,  color : '#1C59B6'
                                }}, 
                        ]} position="bottom" type="vs" />
                </article>
            </section>
        </section>
    </>)
}