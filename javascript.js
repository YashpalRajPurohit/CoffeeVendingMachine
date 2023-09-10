function showMenu() {
    hideAllDivs();
    document.getElementById("menuDiv").style.display = "block";
}

function showCupSize() {
    hideAllDivs();
    document.getElementById("cupSizeDiv").style.display = "block";
}

function showUnits() {
    hideAllDivs();
    document.getElementById("unitsDiv").style.display = "block";
}

function showPay() {
    hideAllDivs();
    document.getElementById("payDiv").style.display = "block";
}

function hideAllDivs() {
    var divs = document.querySelectorAll("#rightDiv > div");
    divs.forEach(function (div) {
        div.style.display = "none";
    });
}

var selectedCoffee = "";
var selectedCoffeePrice = 0;
function selectCoffee(coffee, price) {
    selectedCoffee = coffee;
    selectedCoffeePrice = price;
    document.getElementById("selectedCoffee").innerHTML = "Selected Coffee:  " + coffee;
}

var selectedCupSize = 0;
var x_value = 0;
function selectCupSize(size, xvalue) {
    x_value = xvalue;
    selectedCupSize = size;
    document.getElementById("selectedCupSize").innerHTML = "Selected Cup Size:  " + size;
}

function calculatePrice() {
    var unitInput = document.getElementById("unitInput").value;
    var totalPrice = selectedCoffeePrice * x_value * unitInput;
    setTimeout(function () {
        document.getElementById("totalPrice").innerHTML = "Total Price: " + totalPrice.toFixed(2) + " ₹";
    }, 1500);
    var progressBar = document.getElementById("progressBar");
    progressBar.value = 0;
    var progress = 0;
    var interval = setInterval(function () {
        progress += 1;
        progressBar.value = progress;
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 15);
}

var currencies = {
    5: 0,
    10: 0,
    20: 0,
    100: 0,
    200: 0,
    500: 0
};

function toggleCurrencyInput(value) {
    var currencyInput = document.getElementById("currencyInput_" + value);

    if (!currencyInput) {
        currencyInput = document.createElement("input");
        currencyInput.id = "currencyInput_" + value;
        currencyInput.type = "number";
        currencyInput.value = currencies[value];
        currencyInput.addEventListener("change", function () {
            currencies[value] = parseFloat(currencyInput.value);
        });
        var button = document.querySelector("button[data-value='" + value + "']");
        button.appendChild(currencyInput);
    }
}

function calculateChange() {
    var totalCurrencies = 0;
    for (var currency in currencies) {
        totalCurrencies += currencies[currency] * parseFloat(currency);
    }

    var unitInput = document.getElementById("unitInput").value;
    var totalPrice = selectedCoffeePrice * x_value * unitInput;
    var change = totalCurrencies - totalPrice;

    return change;
}

function proceed() {
    var change = calculateChange();
    if (change < 0) {
        alert("Insufficient amount, add more.");
        showPay();
    } else {
        hideAllDivs();
        document.getElementById("proceedDiv").style.display = "block";
        document.getElementById("change").innerHTML = "Change: " + change.toFixed(2) + " ₹";
        document.getElementById("thankYou").style.display = "block";
    }
}