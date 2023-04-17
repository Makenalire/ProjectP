"use client"

import styles from "./gacha.module.css";
import NightMeteor from "@/components/NightMeteor";
import PullAnimation from "@/components/PullAnimation";
import {useRef, useState} from "react";
import gachaRate from "@/utils/gachaRate";

export default function Gacha () {
    const [pulled, setPulled] = useState(false);
    const itemsRef = useRef([]);

    const pull = (rolls) => {
        setPulled(true);
        if (rolls === 1) {
            itemsRef.current = gachaRate(1);
            setTimeout(() => {
                setPulled(false);
            }, 1500);
        } else {
            itemsRef.current = gachaRate(10);
            setTimeout(() => {
                setPulled(false);
            }, 3300);
        }
    }

    return (
    <main className={styles.container}>
        {pulled?
            null :
            <div className={styles.bgGacha}>
                {itemsRef.current.map((value, index) => {
                    return (<p key={index}>{value.pull}</p>);
                }) }
                <button onClick={() => pull(1)}>1 roll</button>
                <button onClick={() => pull(10)}>10 rolls</button>
            </div>
        }

        <NightMeteor></NightMeteor>


        {pulled? <PullAnimation rolls={itemsRef.current}></PullAnimation> : null}

    </main>
    );
}