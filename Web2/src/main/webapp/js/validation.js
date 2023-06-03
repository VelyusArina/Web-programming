
function validateX() {
    let x = document.getElementById("x_field").value.replace(",", ".")
    if (x === undefined) {
        alert("Введите координату X!")
        return null
    }
    if (!isNumeric(x)) {
        alert("X не является числом!")
        return null
    }
    if (!((x > -3) && (x < 3))) {
        alert("X должен попадать в промежуток (-3, 3)!")
        return null
    }
    return x
}

function validateY() {
    let y = document.getElementById("y_field").value.replace(",", ".");
    if (y === undefined) {
        alert("Введите координату Y!")
        return null
    }
    if (!isNumeric(y)) {
        alert("Y не является числом!")
        return null
    }
    if (!((y > -5) && (y < 5))) {
        alert("Y должен попадать в промежуток (-5, 5)!")
        return null
    }
    return y
}

function validateR() {
    let r = document.querySelector("input.r_field:checked")

    if (r === null) {
        alert("Выберите R.");
        console.log("check r");
        return false;
    }
    return r.value.replace(",", ".");

}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function validateForm() {
    let x = validateX(), y = validateY(), r = validateR()

    if (x != null && y != null && r != null)
        return {x: x, y: y, r: r}
    else return null
}

function sendCheckRequest(form, key) {
    $.get("app", {
        'x': form.x,
        'y': form.y,
        'r': form.r,
        'key': key
    }).done(function (data) {
        if (data === "failure") {
            alert("Некорректные данные")
            return false
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
        let hits = document.getElementsByClassName("hit-col")
        if (hits[1].innerHTML === "YES") {
            drawPoint(form.x, form.y, form.r, "#0d0ff3")
        } else {
            drawPoint(form.x, form.y, form.r, "#c50a0a")
        }
        return true
    })
}

function submit() {
    let form = validateForm()

    if (form == null) return

    reDrawCanvas()
    sendCheckRequest(form, "button")
}

function clearTable() {
    document.getElementById("x_field").value = ""
    document.getElementById("y_field").value = ""

    $(".r_field").each(function () {
      $(this).prop("checked", false)
    });

    $.get("app", {
        "clear": true
    }).done(function (data) {
        document.getElementById("output").innerHTML = data;
    })
    reDrawCanvas()
}