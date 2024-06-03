'use client'

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image"
import SearchBox from "../_component/SearchBox";
import { faker } from "@faker-js/faker";
import styles from "@/app/compare/page.module.css";


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
                        </div>
                        <div className={styles.termInfo}>
                            <h2><span>4</span>선</h2>
                            <div className={styles.termList}>
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
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className={styles.overviewSection}>

            </section>
        </section>
    </>)
}