"use client"

import {useSelector} from "react-redux";

export default function HighScore() {
    const highScore = useSelector((state) => state.scoreCount.highScore);

    return (
        <h3>
            {highScore > 0? "Highest Score : " + highScore : null}
        </h3>
    );
}