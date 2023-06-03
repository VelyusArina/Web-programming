const canvas = document.getElementById("canvas")

function drawCanvas() {
    let labels
    let r = document.querySelector("input.r_field:checked")
    if (r === null || !isNumeric(r.value) || !((r.value >= 1) && (r.value <= 3))) {
        labels = ["R", "R/2", "", "-R/2", "-R"]
    } else {
        r = r.value
        labels = [r.toString(), (r / 2).toString(), "", (-r / 2).toString(), (-r).toString()]
    }

    const ctx = canvas.getContext("2d")
    const canvasWidth = canvas.clientWidth
    const canvasHeight = canvas.clientHeight
    const xAxis = canvasWidth / 2
    const yAxis = canvasHeight / 2
    const xNameAxis = canvasWidth / 6
    const yNameAxis = canvasHeight / 6

    const offsetAxis = 5

    ctx.beginPath()
    ctx.fillStyle = "#000"
    ctx.strokeStyle = "#000"
    ctx.moveTo(xAxis, 0)
    ctx.lineTo(xAxis, canvasHeight)
    ctx.moveTo(0, yAxis);
    ctx.lineTo(canvasWidth, yAxis)
    ctx.stroke();
    ctx.closePath();

    ctx.font = "15px Arial"
    ctx.fillText("y", xAxis + offsetAxis, offsetAxis * 2)
    ctx.moveTo(xAxis - offsetAxis / 2, offsetAxis)
    ctx.lineTo(xAxis, 0);
    ctx.moveTo(xAxis + offsetAxis / 2, offsetAxis);
    ctx.lineTo(xAxis, 0);
    ctx.stroke();
    for (let i = 0; i < labels.length; i++) {
        ctx.moveTo(xAxis - offsetAxis / 2, yNameAxis + yNameAxis * i)
        ctx.lineTo(xAxis + offsetAxis / 2, yNameAxis + yNameAxis * i)
        ctx.stroke()
        ctx.fillText(labels[i], xAxis + offsetAxis, yNameAxis + yNameAxis * i)
    }

    ctx.fillText("x", canvasWidth - offsetAxis * 2, yAxis + 20)
    ctx.moveTo(canvasWidth - offsetAxis, yAxis - offsetAxis / 2);
    ctx.lineTo(canvasWidth, yAxis);
    ctx.moveTo(canvasWidth - offsetAxis, yAxis + offsetAxis / 2);
    ctx.lineTo(canvasWidth, yAxis);
    ctx.stroke();
    for (let i = 0; i < labels.length; i++) {
        ctx.moveTo(xNameAxis + xNameAxis * i, yAxis - offsetAxis / 2);
        ctx.lineTo(xNameAxis + xNameAxis * i, yAxis + offsetAxis / 2);
        ctx.stroke();
        ctx.fillText(labels[labels.length - i - 1], xNameAxis + xNameAxis * i - offsetAxis, yAxis + 20);
    }

    ctx.fillStyle = "#4d63c3b9"
    ctx.globalAlpha = 0.4
    ctx.fillRect(xAxis, yAxis, 2 * xNameAxis, -2 * yNameAxis)

    ctx.beginPath();
    ctx.moveTo(xAxis, yAxis);
    ctx.lineTo(xAxis, yAxis + 2 * yNameAxis);
    ctx.lineTo(xAxis + xNameAxis, yAxis);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(xAxis, yAxis);
    ctx.arc(xAxis, yAxis, xAxis - xNameAxis , Math.PI / 2, Math.PI);
    ctx.fill();
    ctx.closePath();

    let hits = document.getElementsByClassName("hit-col")
    for (let i = 1; i < hits.length; i++)
        if (parseFloat(hits[i].parentElement.getElementsByTagName('td').item(2).innerHTML.replace(',', '.')) === parseFloat(r.replace(',', '.'))) {
            if (hits[i].innerHTML === "YES") {

                drawPoint(hits[i].parentElement.getElementsByTagName('td').item(0).innerHTML.toString(),
                    hits[i].parentElement.getElementsByTagName('td').item(1).innerHTML.toString(), r, "#0d0ff3")
            } else {
                drawPoint(hits[i].parentElement.getElementsByTagName('td').item(0).innerHTML.toString(),
                    hits[i].parentElement.getElementsByTagName('td').item(1).innerHTML.toString(), r, "#c50a0a")
            }
        }
}

function reDrawCanvas() {
    canvas.getContext("2d").clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    drawCanvas()
}


canvas.addEventListener('click', (event) => {
    let rValue = document.querySelector("input.r_field:checked")
    if (!rValue) {
        alert("Радиус не задан!")
        return
    }
    rValue = rValue.value
    let xFormCanvas = (event.offsetX - 150) / 100 * rValue
    let yFromCanvas = (-event.offsetY + 150) / 100 * rValue;

    $.get("app", {
        'x': Math.floor(xFormCanvas * 100) / 100,
        'y': Math.floor(yFromCanvas * 100) / 100,
        'r': rValue,
        'key': 'not_button'
    }).done(function (data) {
        if (data === "failure") {
            alert("Неправильный R")
            return
        }
        data = JSON.parse(data);
        let newRow = `
           <tr class="row ${data["hit"] === "true"? "blue": "red"}">
                <td>${data["x"]}</td>
                <td>${data["y"]}</td>
                <td>${data["r"]}</td>
                <td>${data["cur_time"]}</td>
                <td>${data["exe_time"]}</td>
                <td class="hit-col">${data["hit"] === "true"? "YES": "NO"}</td>
            </tr>`
        $(newRow).insertAfter('#tableHeader')
        if (data["hit"] === "true") {
            drawPoint(xFormCanvas, yFromCanvas, rValue, "#0D0FF3FF")
        } else {
            drawPoint(xFormCanvas, yFromCanvas, rValue, "#c50a0a")
        }
    })
})

function validateRadius(value) {
    let rValue = value.replace(',', '.')
    return isNumeric(rValue) && rValue >= 1 && rValue <= 3
}

function drawPoint(xPosition, yPosition, radius, color) {
    let xPos = xPosition.toString().replace(',', '.')
    let yPos = yPosition.toString().replace(',', '.')
    console.log(yPos)
    yPosition = 150 - 100 * yPos / parseFloat(radius)
    xPosition = 150 + 100 * xPos / parseFloat(radius)
    const ctx = canvas.getContext("2d")
    ctx.beginPath()
    ctx.moveTo(xPosition, yPosition)
    ctx.fillStyle = color
    ctx.globalAlpha = 1
    ctx.arc(xPosition, yPosition, 2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
}

document.querySelectorAll("input.r_field").forEach(function (e){
    e.addEventListener("click", function (){
        document.querySelectorAll("input.r_field:checked").forEach(function (e){
            e.checked = false;
        })
        e.checked = true;
        reDrawCanvas();
    })
})

