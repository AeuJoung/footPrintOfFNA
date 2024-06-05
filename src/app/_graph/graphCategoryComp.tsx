import styles from '@/app/_graph/graphCategoryComp.module.css'
import { GraphType } from '@/app/objecttype';
import clsx from 'clsx';

interface Props {
    graphData : GraphType[];
    position : string;
}

interface Pos {
    'left' : string;
    'bottom' : string;
}

export default function GraphCategoryComp({graphData, position} : Props) {
    const pos : Pos = {'left' : styles.left, 'bottom' : styles.bottom};
    return(
        <section className={clsx(styles.categorySection, pos[position as keyof Pos])}>
            <div className={styles.categoryWrapper}>
                <ul className={styles.categoryWrapperUl}>
                {graphData.map((v, i)=>{
                    let lists = [
                        <li className={styles.categoryList} key={[v.name, i].join()}>
                            <div className={styles.categoryValueColor} style={{backgroundColor : v.color}}></div>
                            <p className={styles.categoryValueName}>{v.name}</p>
                        </li>
                    ];
                    if (v.subGraph) {
                        if (v.subGraph.name) lists.push(
                            <li className={styles.categoryList} key={[v.subGraph.name, i].join()}>
                                <div className={styles.categoryValueColor} style={{backgroundColor : v.subGraph.color}}></div>
                                <p className={styles.categoryValueName}>{v.subGraph.name}</p>
                            </li>
                        )
                    }
                    return lists;
                })}
                </ul>
            </div>
        </section>
    )
}