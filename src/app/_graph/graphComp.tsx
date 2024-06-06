"use client"

import styles from '@/app/_graph/graphComp.module.css'
import { GraphType } from '@/app/objecttype';
import GraphCategoryComp from './graphCategoryComp';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';


/* graph타입 샘플
const graphData : GraphType[] = [
{name : '대표발의 안건 상정률', totalValue : 100, value : 68.2, symbol : '%', color : '#FFB5B5', subGraph : {
    name : '대표발의 안건 가결률', totalValue : 100, value : 30, color : '#AA2B2B'
    }}, 
{name : '공동제안 안건 상정률', totalValue : 100, value : 75.66, symbol : '%', color : '#5A9CFF', subGraph : {
    name : '대표발의 안건 가결률', totalValue : 100, value : 40,  color : '#1C59B6'
    }}, 
];
*/

interface Props {
    graphData : GraphType[];
    position : string; //범례 위치. (left, bottom만 구현되어있음.)
    type? : string; //'vs' 받으면 vs모드로.
}

export default function GraphComp({graphData, position, type} : Props) {
    const stickHeight = 350;
    const [graphLegendPos, setGraphLegendPos] = useState<string>(position); //화면 폭 좁아졌을 때 그래프 범례 위치 변경
    const [animation, setAnimation] = useState<boolean>(false);
    const graphContainer = useRef<HTMLElement>(null);
    const widthHandler = useRef<EventListener>();
    const heightHandler = useRef<EventListener>();

    const centerIdxOfGraphStick = graphData.length/2-1;

    useEffect(()=>{
        if (window.innerWidth<=810) { //너비가 810이하이면 범례 위치 일제히 bottom으로.
            if (graphLegendPos=='left') setGraphLegendPos('bottom');
        } 
    }, []);

    useEffect(()=>{
        widthHandler.current = function() {
            if (window.innerWidth<=810) { //너비가 810이하이면 범례 위치 일제히 bottom으로.
                if (graphLegendPos=='left') setGraphLegendPos('bottom');
            } else { //이상이면 다시 원래 값으로.
                if (graphLegendPos!='left') setGraphLegendPos(position);
            } 
        }
        window.addEventListener('resize', widthHandler.current);

        return ()=>{
            if (widthHandler.current) window.removeEventListener('resize', widthHandler.current);
        }
    });

    useEffect(()=>{
        let relativePos = Number(graphContainer.current?.getBoundingClientRect().top);
        let scrollPos = window.scrollY;
        let absolutePos = relativePos+scrollPos;
        heightHandler.current = function() {
            if (absolutePos) {
                if (absolutePos<=window.scrollY+window.innerHeight) {
                    if (!animation) {
                        //애니매이션 만들던 중. 스크롤 범위에 해당 그래프 있으면 
                        //animation 스테이트를 true로 변경 후 style 적용하려고 했음.
                    }
                }
            }
        }
        window.addEventListener('scroll', heightHandler.current)
        return ()=>{
            if (heightHandler.current) window.removeEventListener('scroll', heightHandler.current);
        }
    });


    if (graphData) {
        return (<>
            <section className={styles.graphContainer} ref={graphContainer}>
                {graphLegendPos=='left' && <GraphCategoryComp graphData={graphData} position='left'/>}
                <section className={styles.graphSection}>
                    <section className={styles.graphWrapper}>
                        {graphData.map((v, i)=>{
                            let graphStick = <div className={clsx(styles.graphStick, type=='vs' && i==centerIdxOfGraphStick && styles.centerStick)} key={i} style={{backgroundColor : v.color, height : v.value*stickHeight/v.totalValue}}>
                                    <div className={styles.totalValueTag}>총 {v.totalValue}건</div>
                                    <div className={styles.valueTag}>{(v.value/v.totalValue*100).toFixed(2)}{v.symbol}<span>({v.value}건)</span></div>
                                </div>;
                            
                            if (v.subGraph) {
                                graphStick = <div className={clsx(styles.graphStick, type=='vs' && i==centerIdxOfGraphStick && styles.centerStick)} key={i} style={{backgroundColor : v.color, height : v.value*stickHeight/v.totalValue}}>
                                    <div className={styles.totalValueTag}>총 {v.totalValue}건</div>
                                    
                                    {/*메인 그래프*/}
                                    <div className={styles.valueTag}>
                                        {(v.value/v.totalValue*100).toFixed(2)}{v.symbol}
                                        <span>({v.value}건)</span>
                                    </div>
                                    
                                    {/*아래 서브그래프 */}
                                    <div className={styles.subGraphStick} style={{backgroundColor : v.subGraph.color, height : v.subGraph.value*stickHeight/v.totalValue}}>
                                        <div className={styles.valueTag}>
                                            {(v.subGraph.value/v.totalValue*100).toFixed(2)}{v.symbol}
                                            <span>({v.subGraph.value}건)</span>
                                        </div>
                                    </div>
                                </div>
                            }
    
                            return graphStick;
                        })}
                    </section>
                </section>
            </section>
            {graphLegendPos=='bottom' && <GraphCategoryComp graphData={graphData} position='bottom'/>}
        </>)
    } else {
        return <></>
    }


}