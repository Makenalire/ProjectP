"use client"

import {useEffect, useRef} from "react";
import styles from "./styles/pullstyle.module.css"

export default function PullAnimation({ rolls }) {
    const canvasRef = useRef();
    const loaded = useRef(false);
    const roll = rolls.length;
    let ctx, w, h, meteors = [];

    class Meteor {
        constructor(color, size) {
            if (roll === 1) {
                this.x = Math.random() * w / 2;
            } else {
                this.x = Math.random() * w - 300;
            }
            this.y = 0;
            this.size = Math.random() * 2 + size
            this.speed = (Math.random() + 5);
            this.color = color;
        }

        draw() {
            ctx.save();
            ctx.strokeStyle = this.color + "1A";
            ctx.lineCap = "round";
            ctx.shadowColor = this.color + "FF";
            ctx.shadowBlur= 10;
            for (let i = 0; i < 10; i++) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineWidth = this.size;
                ctx.lineTo(this.x - 20 * (i + 1), this.y - 20 * (i + 1));
                ctx.stroke();

                ctx.closePath();
            }
            ctx.restore();
        }
        update() {
            if (this.y >= h + 1000) {
                return true;
            }
            this.x += this.speed;
            this.y += this.speed;
            return false;
        }

    }

    function resizeReset() {
        w = canvasRef.current.width = window.innerWidth;
        h = canvasRef.current.height = window.innerHeight;
    }

    function drawScene() {
        let finish;
        meteors.map((meteor) => {
            finish = meteor.update();
            meteor.draw();
        });

        if (!finish) {
            return true;
        }
    }

    function animationLoop() {
        ctx.clearRect(0, 0, w, h);
        if (drawScene()) {
            requestAnimationFrame(animationLoop);
        } else {
            ctx.clearRect(0, 0, w, h);
        }

    }

    function init() {
        console.log(canvasRef.current);
        ctx = canvasRef.current.getContext("2d");
        resizeReset();
        rolls.map((value) => {
            meteors.push(new Meteor(value.color, value.size));
        });
        animationLoop();
    }

    useEffect(() => {
        window.addEventListener('resize', resizeReset);
        return () => window.removeEventListener('resize', resizeReset);
    }, [resizeReset]);

    useEffect(() => {
        if (!loaded.current) {
            loaded.current = true;
            init();
        }
    }, [])

    return (
        <canvas id="pullCanvas" ref={canvasRef} className={styles.container}></canvas>
    );
}