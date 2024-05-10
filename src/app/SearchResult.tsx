"use client"

import Image from "next/image";
import styles from "./searchResult.module.css";
import { faker} from "@faker-js/faker";
import ArrowSVG from "/public/asset/updownArrow.svg";


export default function SearchResult() {

    //가짜 데이터 생성용 함수
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
            recentSession : faker.number.int()%5+18,
        }
    }
    const fakeLawmaker = faker.helpers.multiple(makeFakeLawmaker, {
        count : 5,
    });
    //    


    return (
        <section className={styles.searchReaultSection}>
            <section className={styles.selectLawmakerSection}>
                <p className={styles.selectLawmakerInfoText}>비교할 의원님 끌어오기 (2명)</p>
                <section className={styles.selectLawmakerContainer}>
                    <div className={styles.selectLawmakerBox}  >
                        <div className={styles.deco}></div><div className={styles.deco}></div>
                    </div>
                    <div className={styles.selectLawmakerBox}>
                        <div className={styles.deco}></div><div className={styles.deco}></div>
                    </div>
                    <button className={styles.analyzeButton}>
                        <ArrowSVG className={styles.analyzeButtonImg} /><span className={styles.analyzeButtonText}>분석하기</span>
                    </button>
                </section>
            </section>
            <section className={styles.LawmakerListSection}>
                <section className={styles.lawmakerList_Session}> {/* 21대 의원, 22대 의원 섹션*/}
                    <div className={styles.sessionTitle}>21대 국회 <span>12명 (남 : 6, 여 : 7)</span></div>
                    <section className={styles.lawmakerListWrapper}>
                        <div className={styles.lawmakerList}>
                            <div className={styles.list_img}>
                                <img src={faker.image.avatar()} alt="" />
                            </div>
                            <div className={styles.list_infoWrapper}>
                                
                                <div className={styles.list_partySimbol}></div>
                                <div className={styles.list_name}>강기윤</div>
                                <div className={styles.list_stCommit}>교통</div>
                                <div className={styles.list_recentSession}>5선</div>
                                
                            </div>                          
                        </div>
                        <div className={styles.lawmakerList}>
                            <div className={styles.list_img}>
                                <img src={faker.image.avatar()} alt="" />
                            </div>
                            <div className={styles.list_infoWrapper}>
                                <div className={styles.list_partySimbol}></div>
                                <div className={styles.list_name}>강기윤</div>
                                <div className={styles.list_stCommit}>교통</div>
                                <div className={styles.list_recentSession}>5선</div>
                            </div>                           
                        </div>
                        <div className={styles.lawmakerList}>
                            <div className={styles.list_img}>
                                <img src={faker.image.avatar()} alt="" />
                            </div>
                            <div className={styles.list_infoWrapper}>
                                <div className={styles.list_partySimbol}></div>
                                <div className={styles.list_name}>강기윤</div>
                                <div className={styles.list_stCommit}>교통</div>
                                <div className={styles.list_recentSession}>5선</div>
                            </div>                           
                        </div>
                        <div className={styles.lawmakerList}>
                            <div className={styles.list_img}>
                                <img src={faker.image.avatar()} alt="" />
                            </div>
                            <div className={styles.list_infoWrapper}>
                                <div className={styles.list_partySimbol}></div>
                                <div className={styles.list_name}>강기윤</div>
                                <div className={styles.list_stCommit}>교통</div>
                                <div className={styles.list_recentSession}>5선</div>
                            </div>                           
                        </div>
                        <div className={styles.lawmakerList}>
                            <div className={styles.list_img}>
                                <img src={faker.image.avatar()} alt="" />
                            </div>
                            <div className={styles.list_infoWrapper}>
                                <div className={styles.list_partySimbol}></div>
                                <div className={styles.list_name}>강기윤</div>
                                <div className={styles.list_stCommit}>교통</div>
                                <div className={styles.list_recentSession}>5선</div>
                            </div>                           
                        </div>
                        <div className={styles.lawmakerList}>
                            <div className={styles.list_img}>
                                <img src={faker.image.avatar()} alt="" />
                            </div>
                            <div className={styles.list_infoWrapper}>
                                <div className={styles.list_partySimbol}></div>
                                <div className={styles.list_name}>강기윤</div>
                                <div className={styles.list_stCommit}>교통</div>
                                <div className={styles.list_recentSession}>5선</div>
                            </div>                           
                        </div>
                    </section>
                </section>
            </section>
        </section>
    )
}