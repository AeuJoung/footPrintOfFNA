import styles from "@/app/_graph/circleGraphComp.module.css";
import { RefObject, useEffect, useRef } from "react";
import DrawGraph from "./drawGraph";

export default function CircleGraphComp() {

    return (
        <section className={styles.graphContainer}>
            <DrawGraph />
        </section>
    );
}