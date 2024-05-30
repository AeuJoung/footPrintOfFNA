'use client'

import Image from "next/image";
import SearchBox from "../_component/SearchBox";

import styles from "./page.module.css";
import Link from "next/link";
import clsx from "clsx";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { LawmakerDetail } from "../objecttype";

const makeFakeLawmaker = () =>{ 
    let randNum = [faker.number.int()%5+18, faker.number.int()%5+18];
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

        //디테일
        electedRegion : faker.company.name().substring(0, 4),   // 당선지역
        englishName : faker.company.name().substring(0, 4),     // 영어이름
        birthDate : faker.date.birthdate(),       // 출생일
        phoneNumber : faker.phone.number(),     // 전화번호
        email : faker.internet.email(),           // 이메일
        term : randNum,            // 임기  (=session)
        mainCareer : faker.person.bio(),      // 주요약력
        committee : [faker.commerce.productName().substring(0, 4), faker.commerce.productName().substring(0, 4)],       
        // 소속 상임위 (=stCommit (stCommit은 배열이 아니라 단일))
    }
}

export default function Detail(/*{lawmakerData} : Lawmaker*/) { //실제 사용 시에는 프롭스로 유저 정보 받아서 활용 
    const [lawmakerData, setLawmakerData] = useState<LawmakerDetail>();

    useEffect(()=>{
        setLawmakerData(makeFakeLawmaker());
    }, []);

    return (<>
        <SearchBox alwaysMenuFixed={false} />
        <section className={styles.lawmakerDetailSection}>
            <section className={styles.cardSection}>
                <section className={styles.voteRateContainer}>
                    <div>당선 투표율</div>
                    <div className={styles.voteRageBox}>
                        <div className={styles.voteRateGraph}>
                            <div className={styles.voteInfo}>63% <span>VS</span> 37%</div>
                        </div>
                    </div>
                </section>
                <section className={styles.lawmakerCardContainer}>
                    <article className={styles.imageArea}>
                        <div className={styles.imageContainer}>
                            <Image src={lawmakerData?.img || ''} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill style={ {objectFit : 'cover' } } alt="의원 사진"/>
                        </div>
                        <div className={styles.snsButtonContainer}>
                            <Link href={'/'} className={clsx(styles.snsButton,styles.twitter)}><div></div></Link>
                            <Link href={'/'} className={clsx(styles.snsButton,styles.facebookButton)}><div></div></Link>
                            <Link href={'/'} className={clsx(styles.snsButton,styles.ownPage)}><div></div></Link>
                        </div>
                    </article>
                    <article className={styles.rightAreaContainer}>
                        <article className={styles.upperArea}>
                            <div className={styles.nameLine}>{lawmakerData?.name}<span>{lawmakerData?.englishName}</span></div>
                            <div>{lawmakerData?.party.name} / {lawmakerData?.electedRegion} / {lawmakerData?.birthDate.toISOString().split('T')[0]}</div>
                            <div>{lawmakerData?.phoneNumber} / {lawmakerData?.email}</div>
                        </article>
                        <article className={styles.downArea}> 
                            <div>{lawmakerData?.term.length}선 국회의원 / {lawmakerData?.committee.join(' / ')}</div>
                            <div>{lawmakerData?.term.map((v, i)=> {
                                return <p key={i}><span>제 {v}대</span></p>
                            })}</div>
                        </article>
                    </article>
                </section>
            </section>
            <section className={styles.summarizeSection}>

            </section>
            <section className={styles.overviewSection}>

            </section>
        </section>
    </>);
}