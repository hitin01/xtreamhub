const originalAmount = document.getElementById("originalAmount");
const gstRate = document.getElementById("gstRate");
const calculateBtn = document.getElementById("calculateBtn");

const finalAmount = document.getElementById("finalAmount");
const finalSummary = document.getElementById("finalSummary");

const originalAmountResult = document.getElementById("originalAmountResult");
const gstRateResult = document.getElementById("gstRateResult");
const gstAmountResult = document.getElementById("gstAmountResult");
const finalAmountResult = document.getElementById("finalAmountResult");

const analyticsAmount = document.getElementById("analyticsAmount");
const analyticsGST = document.getElementById("analyticsGST");
const analyticsFinal = document.getElementById("analyticsFinal");

function formatCurrency(amount) {
    return "₹" + amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
calculateBtn.addEventListener("click", calculateGST);
function calculateGST() {

    const amount = parseFloat(originalAmount.value);
    const rate = parseFloat(gstRate.value);

    if (isNaN(amount) || isNaN(rate) || amount <= 0 || rate < 0) {
        alert("Please enter valid values.");
        return;
    }

}