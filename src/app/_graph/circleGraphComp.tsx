import styles from "@/app/_graph/circleGraphComp.module.css";
import { RefObject, useEffect, useRef } from "react";


interface CTXInfo {
    ctx : CanvasRenderingContext2D,
    clientX? : number, //그래픽 컨텍스트, css 크기 비율 계산한 마우스 위치
    clientY? : number
}

export default function CircleGraphComp() {
    const canvusRef = useRef<HTMLCanvasElement>(null);
    let radians : number[] | null = [];
    let graphFocus = false;

    const data = {
        labels: ['A', 'B', 'C', 'D'],
        values: [30, 10, 20, 40],
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#000000'],
        hoverColors : ['#fff', '#fff', '#fff', '#fff'],
        round : 150
    };

    useEffect(()=>{
        let canvas = canvusRef.current;
        let handler = function(e : MouseEvent) {
            let rectCanvas = canvas?.getBoundingClientRect();
            let mouseX, mouseY, clientX, clientY;
            if (rectCanvas && canvas) {
                mouseX = e.clientX - rectCanvas.left - rectCanvas.width/2; //캔버스 중앙을 기준점으로 하도록 계산해줌
                mouseY = e.clientY - rectCanvas.top - rectCanvas.height/2;
                clientX = mouseX * (canvas.width / rectCanvas.width);
                clientY = mouseY * (canvas.height / rectCanvas.height);
            }
            let ctx = canvas?.getContext('2d');
            if (clientX && clientY && ctx) reDrawGraph({ctx : ctx, clientX : clientX, clientY : clientY});
        }
        if (canvas) canvas.addEventListener('mousemove', handler);
        return ()=>{
            if (canvas) canvas.removeEventListener('mousemove', handler);
        }
    })
    
    useEffect(()=>{
        let ctx = canvusRef.current?.getContext('2d');
        if(ctx) {
            drawGraph(ctx);
        }
    });

    let drawGraph = (ctx : CanvasRenderingContext2D) => {
        const total = data.values.reduce((a, b) => a + b, 0);
        let startAngle = 0;

        data.values.forEach((value, index) => {
            const sliceAngle = 2 * Math.PI * value / total;
            const endAngle = startAngle + sliceAngle;
            
            
            ctx.beginPath();
            ctx.moveTo(200, 200); // Center of the canvas
            ctx.arc(200, 200, data.round, startAngle, endAngle, false);
            ctx.closePath();
            ctx.fillStyle = data.colors[index];
            ctx.fill();

            // Draw labels
            const midAngle = startAngle + sliceAngle / 2;
            const labelX = 200 + 170 * Math.cos(midAngle);
            const labelY = 200 + 170 * Math.sin(midAngle);
            ctx.fillStyle = 'black';
            ctx.font = '16px Arial';
            ctx.fillText(data.labels[index], labelX, labelY);
            
            startAngle += sliceAngle;
            radians.push(startAngle);
        });
    }

    let reDrawGraph = (ctxInfo : CTXInfo) => {
        let ctx = ctxInfo.ctx;

        let clientX, clientY;
        if (ctxInfo.clientX && ctxInfo.clientY) {
            clientX = ctxInfo.clientX;
            clientY = ctxInfo.clientY;

            if (Math.sqrt(clientX*clientX+clientY*clientY)<=data.round) {
                graphFocus=true;
                let total = data.values.reduce((a, b) => a + b, 0);
                let startAngle = 0;

                let clientPosAngle = Math.atan2(clientY, clientX);
                clientPosAngle = clientPosAngle<0 ? clientPosAngle+2*Math.PI : clientPosAngle;  
                //라디안 각도 구한 후 음수 나오는 1, 2사분면 +로 조정해줌.              
    
                data.values.forEach((value, index) => {
                    const sliceAngle = 2 * Math.PI * value / total;
                    const endAngle = startAngle + sliceAngle;
                    
                    let onCursor = false;
                    if (startAngle<=clientPosAngle && clientPosAngle<endAngle) onCursor = true;
                    
                    ctx.beginPath();
                    ctx.moveTo(200, 200); // Center of the canvas
                    ctx.arc(200, 200, 150, startAngle, endAngle, false);
                    ctx.closePath();
                    ctx.fillStyle = onCursor ? data.hoverColors[index] : data.colors[index];
                    ctx.fill();

                    
    
                    // Draw labels
                    const midAngle = startAngle + sliceAngle / 2;
                    const labelX = 200 + 170 * Math.cos(midAngle);
                    const labelY = 200 + 170 * Math.sin(midAngle);
                    ctx.fillStyle = 'black';
                    ctx.font = '16px Arial';
                    ctx.fillText(data.labels[index], labelX, labelY);
                    
                    startAngle += sliceAngle;
                });
            } else if (graphFocus) {
                drawGraph(ctx);
            }
        }
    }

    return (
        <section className={styles.graphContainer}>
            <canvas className={styles.graphCanvus} ref={canvusRef} width={400} height={400}></canvas>
        </section>
    );
}