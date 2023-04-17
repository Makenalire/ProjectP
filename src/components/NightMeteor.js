"use client"

import './styles/nightMeteor.css'
import {useEffect, useRef} from "react";

export default function NightMeteor() {
    const canvasRef = useRef();
    const loaded = useRef(false);
    let ctx, w, h, moon, stars = [], meteors = [];

    class Moon {
        constructor() {
            this.x = 0;
            this.y = 0;
            this.size = 100;
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.shadowColor = "#FEF790B3"
            ctx.shadowBlur = 70;
            ctx.fillStyle = "#FEF790FF"
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }

    class Star {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() + 0.5;
            this.blinkChance = 0.005
            this.alpha = 1;
            this.alphaChange = 0;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.fill();
            ctx.closePath();
        }
        update() {
            if (this.alphaChange === 0 && Math.random() < this.blinkChance) {
                this.alphaChange = -1;
            } else if (this.alphaChange !== 0) {
                this.alpha += this.alphaChange * 0.05;
                if (this.alpha <= 0) {
                    this.alphaChange = 1;
                }
                else if (this.alpha >= 1) {
                    this.alphaChange = 0;
                }
            }
        }
    }

    class Meteor {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * w - 300;
            this.y = -100;
            this.size = Math.random() * 2 + 0.5
            this.speed = (Math.random() + 0.5) * 2;
        }
        draw() {
            ctx.save();
            ctx.strokeStyle = "#FFFFFF1A";
            ctx.lineCap = "round";
            ctx.shadowColor = "#FFFFFFFF";
            ctx.shadowBlur= 10;
            for (let i = 0; i < 10; i++) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineWidth = this.size;
                ctx.lineTo(this.x - 10 * (i + 1), this.y - 10 * (i + 1));
                ctx.stroke();
                ctx.closePath();
            }
            ctx.restore();
        }
        update() {
            this.x += this.speed;
            this.y += this.speed;
            if (this.y >= h + 100) {
                this.reset();
            }
        }
    }

    function resizeReset() {
        w = canvasRef.current.width = window.innerWidth;
        h = canvasRef.current.height = window.innerHeight;
    }

    function drawScene() {
        moon.draw();
        stars.map((star) => {
            star.update();
            star.draw();
        });
        meteors.map((meteor) => {
            meteor.update();
            meteor.draw();
        });
    }

    function animationLoop() {
        ctx.clearRect(0, 0, w, h);
        drawScene();
        requestAnimationFrame(animationLoop);
    }

    function init() {
        console.log(canvasRef.current);
        ctx = canvasRef.current.getContext("2d");
        resizeReset();
        moon = new Moon();
        for (let i = 0; i < w * h * 0.0001; i++) {
            stars.push(new Star());
        }
        for (let j = 0; j < 2; j++) {
            meteors.push(new Meteor());
        }
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
        <canvas id="bgCanvas" ref={canvasRef}></canvas>
    );
}