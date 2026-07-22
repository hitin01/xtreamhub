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
    const gstAmount = (amount * rate) / 100;
    const totalAmount = amount + gstAmount;

    finalAmount.textContent = formatCurrency(totalAmount);
    finalSummary.textContent = formatCurrency(totalAmount);

    originalAmountResult.textContent = formatCurrency(amount);
    gstRateResult.textContent = rate + "%";
    gstAmountResult.textContent = formatCurrency(gstAmount);
    finalAmountResult.textContent = formatCurrency(totalAmount);

    analyticsAmount.textContent = formatCurrency(amount);
    analyticsGST.textContent = formatCurrency(gstAmount);
    analyticsFinal.textContent = formatCurrency(totalAmount);

    updateChart(amount, gstAmount);
}

let gstChart;

function updateChart(amount, gstAmount) {

    if (gstChart) {
        gstChart.destroy();
    }

    const ctx = document.getElementById("gstChart").getContext("2d");

    gstChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Original Amount", "GST Amount"],
            datasets: [{
                data: [amount, gstAmount]
            }]
        }
    });
}

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {

        const faqItem = question.parentElement;
        const answer = faqItem.querySelector(".faq-answer");
        const icon = question.querySelector("span");

        // Close all other FAQs
        document.querySelectorAll(".faq-item").forEach((item) => {
            if (item !== faqItem) {
                item.querySelector(".faq-answer").style.maxHeight = null;
                item.querySelector(".faq-question span").textContent = "+";
            }
        });

        // Toggle current FAQ
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.textContent = "+";
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.textContent = "−";
        }
    });
});