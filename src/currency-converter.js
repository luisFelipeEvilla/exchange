import { saveResult, printHistory, loadHistory } from "./history-table.js";
import { API_URL, API_KEY } from "./config.js";
import { formatCurrency } from "./utils.js";

const ERRORBORDER = "border-red-500";

const $amountInput = document.getElementsByName("amount")[0];
const $fromSelect = document.getElementsByName("from")[0];
const $toSelect = document.getElementsByName("to")[0];
const $spinner = document.getElementById("exchange-spinner");
const $resultsSection = document.getElementById("results-section");

const $convertButton = document.getElementById("convert");

$convertButton.addEventListener("click", async (e) => {
    e.preventDefault(); 
    
    if (!checkForm()) return;

    const amount = $amountInput.value;
    const from = $fromSelect.value;
    const to = $toSelect.value;

    $convertButton.disabled = true;
    $spinner.classList.remove("hidden");

    const result = await apiRequest(from, to, amount);

    $convertButton.disabled = false;
    $spinner.classList.add("hidden");

    printResults(result);
    saveResult(result);
})

const printResults = (result) => {
    const $result = document.getElementById("result");
    const $fromRate = document.getElementById("from-rate");
    const $toRate = document.getElementById("to-rate");

    $resultsSection.classList.remove("hidden");

    const amount = formatCurrency(result.query.amount);
    const resultAmount = formatCurrency(result.result);

    $result.textContent = `${amount} ${result.query.from} = ${resultAmount} ${result.query.to}`;
    $fromRate.textContent = `1 ${result.query.from} = ${result.info.rate} ${result.query.to}`;
    $toRate.textContent = `1 ${result.query.to} = ${1 / result.info.rate} ${result.query.from}`;
}

const apiRequest = async (from, to, amount) => {
    const url = `${API_URL}convert?from=${from}&to=${to}&amount=${amount}`;
    const headers = new Headers();
    headers.append("apiKey", API_KEY);

    const requestOption = {
        method: "GET",
        headers: headers,
        redirect: "follow"
    };

    try {
        const request = await fetch(url, requestOption); 
        const result = await request.json();
        
        return result;
    } catch (error) {
        alert("Ocurrio un error realizando la transacción");
        console.error(error);

        $convertButton.disabled = false;
        $spinner.classList.add("hidden");
    }
}

const checkForm = () => {
    const amount = $amountInput.value;

    // Check if amount is empty
    if (amount === "" || amount === "0") {
        showAmountError("Amount is required and must be greater than 0");

        return false;
    }

    // Check if amount is a number
    if (isNaN(amount)) {
        showAmountError("Amount must be a number");

        return false;
    }
   
    return true;
}

const removeErrors = () => {
    $amountInput.addEventListener("input", () => $amountInput.classList.remove(ERRORBORDER));
}

const showAmountError = (mensaje) => {
    $amountInput.classList.add(ERRORBORDER);
    alert(mensaje);
}

removeErrors();