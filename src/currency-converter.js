import { saveResult, printHistory, loadHistory } from "./history.js";
import { API_URL, API_KEY } from "./config.js";

const $amountInput = document.getElementsByName("amount")[0];
const $fromSelect = document.getElementsByName("from")[0];
const $toSelect = document.getElementsByName("to")[0];

loadHistory();

const $convertButton = document.getElementById("convert");

$convertButton.addEventListener("click", async (e) => {
    e.preventDefault(); 
    
    const amount = $amountInput.value;
    const from = $fromSelect.value;
    const to = $toSelect.value;

    const result = await apiRequest(from, to, amount);
    printResults(result);
    saveResult(result);
})

const printResults = (result) => {
    const $resultsSection = document.getElementById("results-section");
    const $result = document.getElementById("result");
    const $fromRate = document.getElementById("from-rate");
    const $toRate = document.getElementById("to-rate");

    $resultsSection.classList.remove("hidden");

    $result.textContent = `${result.query.amount} ${result.query.from} = ${result.result} ${result.query.to}`;
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
        console.log(error)
        alert("Ocurrio un error realizando la transacción ");
        console.error(error);
    }

}