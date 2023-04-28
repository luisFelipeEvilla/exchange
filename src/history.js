const $historyTable = document.querySelector('#history-table');
const $clearHistoryButton = document.querySelector('#clear-history');

$clearHistoryButton.addEventListener('click', () => {
    localStorage.removeItem('results');
    $historyTable.innerHTML = '';
});



export const saveResult = (data) => {
    const result = {
        from: data.query.from,
        to: data.query.to,
        amount: data.query.amount,
        result: data.result,
        info: {
            timestamp: data.info.timestamp,
            rate: data.info.rate
        }
    }

    const results = JSON.parse(localStorage.getItem("results")) || [];
    results.push(result);

    localStorage.setItem("results", JSON.stringify(results));
    loadHistory();
}

export const loadHistory = () => {
    const results = JSON.parse(localStorage.getItem("results")) || [];
    printHistory(results);
}

export const printHistory = (results) => {
    $historyTable.innerHTML = '';

    results.forEach(result => {
        const $tr = document.createElement('tr');
        const $from = document.createElement('td');
        const $to = document.createElement('td');
        const $amount = document.createElement('td');
        const $result = document.createElement('td');
        const $timestamp = document.createElement('td');
        const $rate = document.createElement('td');

        $from.textContent = result.from;
        $to.textContent = result.to;
        $amount.textContent = result.amount;
        $result.textContent = result.result;
        $timestamp.textContent = new Date(result.info.timestamp * 1000).toLocaleString();
        $rate.textContent = result.info.rate;

        $tr.appendChild($timestamp);
        $tr.appendChild($from);
        $tr.appendChild($to);
        $tr.appendChild($rate);
        $tr.appendChild($amount);
        $tr.appendChild($result);
    

        $historyTable.appendChild($tr);
    });
};
