import { API_KEY, API_URL } from "./config.js";

const $currencySelector = document.getElementById("base-currency-selector");

export const getRates = async (base) => {
    const url = `${API_URL}latest?base=${base}`;

    const headers = new Headers();
    headers.append("apiKey", API_KEY);

    const requestOption = {
        method: "GET",
        headers: headers,
    };

    const request = await fetch(url, requestOption);

    const result = await request.json();

    return result.rates;
}

export const printRates = (rates, base) => {
    const $ratesTable = document.getElementById("rates");

    $ratesTable.innerHTML = "";

    Object.keys(rates).forEach(currency => {
        const changeRate = rates[currency];

        const $tr = document.createElement("tr");
        const $currency = document.createElement("td");
        const $rate = document.createElement("td");
        const $change = document.createElement("td");

        $currency.textContent = currency;
        $rate.textContent =  rates[currency];
        $change.textContent = `1 ${base} = ${changeRate} ${currency}`;

        parseInt(changeRate) < 1 ? $rate.classList.add("text-red-500") : $rate.classList.add("text-green-500");

        $tr.appendChild($currency);
        $tr.appendChild($rate);
        $tr.appendChild($change);

        $ratesTable.appendChild($tr);
    });
}

$currencySelector.addEventListener("change", async (e) => {
    if (e.target.value === '') {
        alert("Choose a currency");

        return;
    }
    const base = e.target.value;

    const rates = await getRates(base);

    printRates(rates, base);
});