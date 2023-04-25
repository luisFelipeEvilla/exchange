const API_URL = 'https://api.apilayer.com/fixer/';
const API_KEY = "WV7b63y60rEQWkdkrfzg67vR606IiEsn";

const $amountInput = document.getElementsByName("amount")[0];
const $fromSelect = document.getElementsByName("from")[0];
const $toSelect = document.getElementsByName("to")[0];

const $convertButton = document.getElementById("convert");

$convertButton.addEventListener("click", async (e) => {
    e.preventDefault(); 
    
    const amount = $amountInput.value;
    const from = $fromSelect.value;
    const to = $toSelect.value;

    const result = await apiRequest(from, to, amount);

    console.log(result);
})


const apiRequest = async (from, to, amount) => {
    const url = `${API_URL}convert?access_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`;
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
    }

}