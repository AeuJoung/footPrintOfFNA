import styles from "./drawGraph.module.css"

export default function DrawGraph() {
    return (
        <svg width="200" height="200" viewBox="0 0 42 42" className={styles.donut}>
        <circle className={styles.donutHole} cx="21" cy="21" r="15.91549430918954" />
        <circle className={styles.donutRing} cx="21" cy="21" r="15.91549430918954" />
  
        {/* 파란색 세그먼트 */}
        <circle
          className={`${styles.donutSegment} ${styles.blueSegment}`}
          cx="21"
          cy="21"
          r="15.91549430918954"
          strokeDasharray="25 75"
          strokeDashoffset="25"
        />
  
        {/* 노란색 세그먼트 */}
        <circle
          className={`${styles.donutSegment} ${styles.yellowSegment}`}
          cx="21"
          cy="21"
          r="15.91549430918954"
          strokeDasharray="35 65"
          strokeDashoffset="0"
        />
  
        {/* 빨간색 세그먼트 */}
        <circle
          className={`${styles.donutSegment} ${styles.redSegment}`}
          cx="21"
          cy="21"
          r="15.91549430918954"
          strokeDasharray="15 85"
          strokeDashoffset="35"
        />
      </svg>
    )
}