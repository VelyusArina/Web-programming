import React, {useEffect, useRef} from "react";
import {
    backgroungFigColor,
    cursorColor,
    dotsColor, dotsColorHit,
    figColor,
    lineColor,
    RMax,
    textColor
} from "./CanvasStyleConfiguration.js";
import styles from "./MyCanvas.module.css";

export const MyCanvas = ({props, points, R, addPoint}) => {
    const [graphSize, setGraphSize] = React.useState(300);
    const bodyCanvasRef = useRef(null);

    const initGraph = (ctx, graph) => {
        renderCanvasComponent(ctx);
        setMouseActions(ctx, graph);
    }

    useEffect(() => {
        const graph = bodyCanvasRef.current;
        const ctx = graph.getContext("2d");
        if (window.innerWidth >= 1105) {
            setGraphSize(600);
        } else if (window.innerWidth >= 804) {
            setGraphSize(400);
        } else {
            setGraphSize(300);
        }
        graph.width = graphSize;
        graph.height = graphSize;

        initGraph(ctx, graph);
    });


    const renderCanvasComponent = (ctx) => {
        ctx.clearRect(0, 0, graphSize, graphSize);
        ctx.fillStyle = backgroungFigColor;
        ctx.fillRect(0, 0, graphSize, graphSize);
        ctx.fillStyle = figColor;
        ctx.strokeStyle = lineColor;
        const arrowBoxSize = graphSize / 40;

        drawFigures(ctx, R);

        // Ox
        ctx.beginPath();
        ctx.moveTo(0, graphSize / 2);
        ctx.lineTo(graphSize, graphSize / 2);
        ctx.lineTo(graphSize - arrowBoxSize, graphSize / 2 - arrowBoxSize / 2);
        ctx.moveTo(graphSize, graphSize / 2);
        ctx.lineTo(graphSize - arrowBoxSize, graphSize / 2 + arrowBoxSize / 2);
        ctx.stroke();
        ctx.closePath();
        //Oy
        ctx.beginPath();
        ctx.moveTo(graphSize / 2, graphSize);
        ctx.lineTo(graphSize / 2, 0);
        ctx.lineTo(graphSize / 2 - arrowBoxSize / 2, arrowBoxSize);
        ctx.moveTo(graphSize / 2, 0);
        ctx.lineTo(graphSize / 2 + arrowBoxSize / 2, arrowBoxSize);
        ctx.stroke();
        ctx.closePath();
        // R - Ox
        ctx.beginPath();
        ctx.moveTo(graphSize / 2 + graphSize * 4 / 10, graphSize / 2 + arrowBoxSize / 2);
        ctx.lineTo(graphSize / 2 + graphSize * 4 / 10, graphSize / 2 - arrowBoxSize / 2);
        ctx.stroke();
        ctx.closePath();
        // R/2 - Ox
        ctx.beginPath();
        ctx.moveTo(graphSize / 2 + graphSize * 2 / 10, graphSize / 2 + arrowBoxSize / 2);
        ctx.lineTo(graphSize / 2 + graphSize * 2 / 10, graphSize / 2 - arrowBoxSize / 2);
        ctx.stroke();
        ctx.closePath();
        // -R/2 - Ox
        ctx.beginPath();
        ctx.moveTo(graphSize / 2 - graphSize * 2 / 10, graphSize / 2 + arrowBoxSize / 2);
        ctx.lineTo(graphSize / 2 - graphSize * 2 / 10, graphSize / 2 - arrowBoxSize / 2);
        ctx.stroke();
        ctx.closePath();
        // -R - Ox
        ctx.beginPath();
        ctx.moveTo(graphSize / 2 - graphSize * 4 / 10, graphSize / 2 + arrowBoxSize / 2);
        ctx.lineTo(graphSize / 2 - graphSize * 4 / 10, graphSize / 2 - arrowBoxSize / 2);
        ctx.stroke();
        ctx.closePath();
        // R - Oy
        ctx.beginPath();
        ctx.moveTo(graphSize / 2 - arrowBoxSize / 2, graphSize / 2 - graphSize * 4 / 10);
        ctx.lineTo(graphSize / 2 + arrowBoxSize / 2, graphSize / 2 - graphSize * 4 / 10);
        ctx.stroke();
        ctx.closePath();
        // R/2 - Oy
        ctx.beginPath();
        ctx.moveTo(graphSize / 2 - arrowBoxSize / 2, graphSize / 2 - graphSize * 2 / 10);
        ctx.lineTo(graphSize / 2 + arrowBoxSize / 2, graphSize / 2 - graphSize * 2 / 10);
        ctx.stroke();
        ctx.closePath();
        // -R/2 - Oy
        ctx.beginPath();
        ctx.moveTo(graphSize / 2 - arrowBoxSize / 2, graphSize / 2 + graphSize * 2 / 10);
        ctx.lineTo(graphSize / 2 + arrowBoxSize / 2, graphSize / 2 + graphSize * 2 / 10);
        ctx.stroke();
        ctx.closePath();
        // -R - Oy
        ctx.beginPath();
        ctx.moveTo(graphSize / 2 - arrowBoxSize / 2, graphSize / 2 + graphSize * 4 / 10);
        ctx.lineTo(graphSize / 2 + arrowBoxSize / 2, graphSize / 2 + graphSize * 4 / 10);
        ctx.stroke();
        ctx.closePath();

        // labels
        ctx.beginPath();
        ctx.fillStyle = textColor;
        ctx.font = "bold 10pt sans-serif";
        ctx.fillText("X", graphSize - arrowBoxSize, graphSize / 2 - arrowBoxSize);
        ctx.fillText("Y", graphSize / 2 + arrowBoxSize, arrowBoxSize);
        ctx.fillText("" + RMax, graphSize / 2 + graphSize * 4 / 10 - arrowBoxSize / 2, graphSize / 2 - arrowBoxSize);
        ctx.fillText("" + RMax / 2, graphSize / 2 + graphSize * 2 / 10 - arrowBoxSize / 2, graphSize / 2 - arrowBoxSize);
        ctx.fillText("-" + RMax / 2, graphSize / 2 - graphSize * 2 / 10 - arrowBoxSize / 2, graphSize / 2 - arrowBoxSize);
        ctx.fillText("-" + RMax, graphSize / 2 - graphSize * 4 / 10 - arrowBoxSize / 2, graphSize / 2 - arrowBoxSize);
        ctx.fillText("-" + RMax, graphSize / 2 + arrowBoxSize, graphSize / 2 + graphSize * 4 / 10);
        ctx.fillText("-" + RMax / 2, graphSize / 2 + arrowBoxSize, graphSize / 2 + graphSize * 2 / 10);
        ctx.fillText("" + RMax / 2, graphSize / 2 + arrowBoxSize, graphSize / 2 - graphSize * 2 / 10);
        ctx.fillText("" + RMax, graphSize / 2 + arrowBoxSize, graphSize / 2 - graphSize * 4 / 10);
        ctx.closePath();

        drawPoints(ctx);
    }

    const setMouseActions = (ctx, graph) => {
        graph.onmousemove = (e) => {
            renderCanvasComponent(ctx);
            ctx.fillStyle = cursorColor;
            ctx.beginPath();
            ctx.arc(e.offsetX, e.offsetY, graphSize / 200, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }

        graph.onclick = (e) => {
            const x = (e.offsetX - graphSize / 2) / graphSize / 4 * 10 * RMax;
            const y = (-e.offsetY + graphSize / 2) / graphSize / 4 * 10 * RMax
            addPoint(R, x.toFixed(5), y.toFixed(5));
            renderCanvasComponent(ctx);
        }

        graph.onmouseleave = () => {
            renderCanvasComponent(ctx);
        };
    }

    const drawFigures = (ctx, R) => {
        ctx.translate(graphSize / 2, graphSize / 2);
        drawRectangle(ctx, -R, 0, 0, R)
        drawTriangle(ctx, 0, -R / 2, R, 0)
        drawCircle(ctx, -R / 2, 3);
        ctx.translate(-graphSize / 2, -graphSize / 2);
    }

    const drawRectangle = (ctx, x1, y1, x2, y2) => {
        ctx.fillStyle = figColor;

        // (x1,y1) - begin, (x2,y2) - sizes
        if (x1 > x2)
            [x1, x2] = [x2, x1];
        if (y1 > y2)
            [y1, y2] = [y2, y1];

        [x2, y2] = [Math.abs(x1 - x2), Math.abs(y1 - y2)];

        ctx.fillRect(x1 * graphSize * 4 / 10 / RMax, -y1 * graphSize * 4 / 10 / RMax, x2 * graphSize * 4 / 10 / RMax, -y2 * graphSize * 4 / 10 / RMax);

    }

    const drawCircle = (ctx, radius, part) => {
        if (radius < 0) {
            // смена четверти на противоположную
            part = (part + 1) % 4 + 1;
            radius = -radius;
        }
        part = Math.round(part + 3) % 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.fillStyle = figColor;
        ctx.arc(0, 0, radius * graphSize * 4 / 10 / RMax, Math.PI * (part - 1) / 2, Math.PI * (part) / 2)
        ctx.fill();
        ctx.closePath();
    }

    const drawTriangle = (ctx, x1, y1, x2, y2) => {
        ctx.beginPath();
        ctx.fillStyle = figColor;
        ctx.moveTo(0, 0);
        ctx.lineTo(x1 * graphSize * 4 / 10 / RMax, -y1 * graphSize * 4 / 10 / RMax);
        ctx.lineTo(x2 * graphSize * 4 / 10 / RMax, -y2 * graphSize * 4 / 10 / RMax);
        ctx.lineTo(0, 0);
        ctx.fill();
        ctx.closePath();
    }

    const drawPoints = (ctx) => {
        ctx.translate(graphSize / 2, graphSize / 2);
        points.forEach((point) => {
            const x = (point.x * graphSize * 4 / 10 / RMax);
            const y = (-point.y * graphSize * 4 / 10 / RMax);
            ctx.beginPath();
            if (point.r !== R) {
                ctx.fillStyle = 'rgba(155, 155, 155, 0.6)';
            } else
            if (point.hit) {
                ctx.fillStyle = dotsColorHit;
            } else {
                ctx.fillStyle = dotsColor;
            }
            ctx.arc(x, y, graphSize / 150, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        });
        ctx.translate(-graphSize / 2, -graphSize / 2);
    }

    return (
        <div className={styles.my_canvas__wrapper}>
            <canvas className={styles.my_canvas} ref={bodyCanvasRef} {...props}/>
        </div>
    );
}
