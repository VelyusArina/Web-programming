function showDateTime() {
    let date = new Date();
    let dateElement = String(date).split(" ").slice(0, 5);
    if(dateElement[5] < 100)
        dateElement[5] = "0" + dateElement[5];

    document.querySelector("#clock").innerText = dateElement.join(" ");
}
document.addEventListener('DOMContentLoaded', () => {
    showDateTime();
});

setInterval(showDateTime, 5000);