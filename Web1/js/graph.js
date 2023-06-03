
var canvasGraph = document.getElementById('graph');
var ctx = canvasGraph.getContext('2d');

const canvasGraphWidth = canvasGraph.clientWidth;
const canvasGraphHeight = canvasGraph.clientHeight;
const xAxis = canvasGraphWidth / 2;
const yAxis = canvasGraphHeight / 2;
const xNameAxis = canvasGraphWidth / 6;
const yNameAxis = canvasGraphHeight / 6;
const offsetAxis = 5;
ctx.beginPath();
ctx.fillStyle = '#000000';
ctx.strokeStyle = '#000000';
ctx.moveTo(xAxis, 0);
ctx.lineTo(xAxis, canvasGraphHeight);
ctx.moveTo(0, yAxis);
ctx.lineTo(canvasGraphWidth, yAxis);
ctx.stroke();
ctx.closePath();

let labels = ["R", "R/2", " ", "-R/2", "-R"];
ctx.font = '15px Arial';
ctx.fillText("y", xAxis + offsetAxis, offsetAxis * 2);
ctx.moveTo(xAxis - offsetAxis / 2, offsetAxis);
ctx.lineTo(xAxis, 0);
ctx.moveTo(xAxis + offsetAxis / 2, offsetAxis);
ctx.lineTo(xAxis, 0);
ctx.stroke();
for (let i = 0; i < labels.length; i++) {
    ctx.moveTo(xAxis - offsetAxis / 2, yNameAxis + yNameAxis * i);
    ctx.lineTo(xAxis + offsetAxis / 2, yNameAxis + yNameAxis * i);
    ctx.stroke();
    ctx.fillText(labels[i], xAxis + offsetAxis, yNameAxis + yNameAxis * i + offsetAxis);
}
ctx.fillText("x", canvasGraphWidth - offsetAxis * 2, yAxis + 20);
ctx.moveTo(canvasGraphWidth - offsetAxis, yAxis - offsetAxis / 2);
ctx.lineTo(canvasGraphWidth, yAxis);
ctx.moveTo(canvasGraphWidth - offsetAxis, yAxis + offsetAxis / 2);
ctx.lineTo(canvasGraphWidth, yAxis);
ctx.stroke();
for (let i = 0; i < labels.length; i++) {
    ctx.moveTo(xNameAxis + xNameAxis * i, yAxis - offsetAxis / 2);
    ctx.lineTo(xNameAxis + xNameAxis * i, yAxis + offsetAxis / 2);
    ctx.stroke();
    ctx.fillText(labels[labels.length - i - 1], xNameAxis + xNameAxis * i - offsetAxis, yAxis + 20);
}
ctx.fillStyle = "#e4746f";
ctx.globalAlpha = 0.7;
ctx.fillRect(xAxis, yAxis, xNameAxis * 2,  yNameAxis);
ctx.fillStyle = "#e4746f";  
ctx.beginPath();
ctx.moveTo(xAxis, yAxis);
ctx.lineTo(xAxis, yAxis - yNameAxis);
ctx.lineTo(xAxis - xNameAxis, yAxis);
ctx.fill();
ctx.closePath();
ctx.beginPath();
ctx.moveTo(xAxis, yAxis);
ctx.fillStyle = "#e4746f";
ctx.arc(xAxis, yAxis, xAxis - 2 * xNameAxis, Math.PI * 0.5, Math.PI );
ctx.fill();
ctx.closePath();