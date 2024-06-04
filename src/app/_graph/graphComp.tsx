import styles from '@/app/_graph/graphComp.module.css'

export default function GraphComp() {
    const maxValue = 120;
    const graphData = [{name : '범주1', value : 48, color : '#000000', subGraph : {
        name : '범주1-1', value : 30, color : '#d5d5d5'
    }}, {name : '범주2', value : 56}, {name : '범주3', value : 80}];
    console.log();

    return (<>
        <section className={styles.graphContainer}>
            <section className={styles.categorySection}>
                <div className={styles.categoryWrapper}></div>
            </section>
            <section className={styles.graphSection}>
                <section className={styles.graphWrapper}>
                    <div className={styles.graphStick}>
                        <div className={styles.subGraphStick}></div>
                    </div>
                    <div className={styles.graphStick}></div>
                    <div className={styles.graphStick}></div>
                    <div className={styles.graphStick}></div>
                </section>
            </section>
        </section>
    </>)
}