let x, y, r;
let errorMessage = "";
const maxLength = 5;
var yes = "YES";
var no = "NO";


function isNumber(input) {
    return !isNaN(parseFloat(input)) && isFinite(input);
}

function addToErrorMessage(errorDesc) {
    errorMessage += (errorDesc + "\n");
}

function hasProperLength(input) {
    return input.length <= maxLength;
}

function validateX() {
    const selector = document.getElementById("x-select");
    const selectedValue = selector.value;
    if (selectedValue === "") {
        addToErrorMessage("Нужно выбрать X");
        return false;
    }
    x = selectedValue;
    return true;
}

function validateY() {
    y = document.querySelector("input[id=y-text]").value.replace(",", ".");
    if (y === undefined) {
        addToErrorMessage("Поле Y не заполнено");
        return false;
    }
    if (!isNumber(y)) {
        addToErrorMessage("Y должен быть числом от -3 до 3!");
        return false;
    }
    if (!hasProperLength(y)) {
        addToErrorMessage(`Длина числа должна быть не более ${maxLength} символов`);
        return false;
    }
    if (!((y > -3) && (y < 3))) {
        addToErrorMessage("Нарушена область допустимых значений Y (-3; 3)");
        return false;
    }
    return true;
}

function validateR() {
    const selector = document.getElementById("r-select");
    const selectedValue = selector.value;
    if (selectedValue === "") {
        addToErrorMessage("Нужно выбрать R");
        return false;
    }
    r = selectedValue;
    return true;
}

function submit() {
    if (validateX() & validateY() & validateR()) {
        $.post("php/main.php", { 
            'x': x,
            'y': y,
            'r' : r,
            'timezone': new Date().getTimezoneOffset()
        }).done(function(PHP_RESPONSE) { 
            let result = JSON.parse(PHP_RESPONSE); 
                if (!result.isValid) {
                    addToErrorMessage("Запрос недействителен. Попробуйте обновить страницу");
                    return;
                }
                let newRow = result.isBlueAreaHit ? '<tr class="hit-yes">' : '<tr class="hit-no">';
                newRow += '<td>' + result.x + '</td>';
                newRow += '<td>' + result.y + '</td>';
                newRow += '<td>' + result.r + '</td>';
                newRow += '<td>' + result.userTime + '</td>';
                newRow += '<td>' + result.execTime + '</td>';
                newRow += '<td>' + (result.isBlueAreaHit ? yes  : no ) + '</td>';
                // $('#result-table tr:first').after(newRow);
                $('#result-table').append(newRow);
                let key = localStorage.length+1;
                localStorage.setItem(key.toString(),newRow)
                
        }).fail(function (error) {
            addToErrorMessage(error);
        });
    }

    if (!(errorMessage === "")) {
        alert(errorMessage);
        errorMessage = "";
    }
    return false;
} 
function clearTable() {
    localStorage.clear();
    $("#result-table tr:not(.row)").remove(); 
}

for (let i = 1; i <= localStorage.length; i++){
    $('#result-table').append(localStorage.getItem(i.toString()));
}

$("#submitButton").on("click", submit);
$("#clearButton").on("click", clearTable)