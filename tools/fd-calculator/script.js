const depositAmountInput = document.getElementById("depositAmount");
const interestRateInput = document.getElementById("fdInterestRate");
const fdYearsInput = document.getElementById("fdYears");

const calculateBtn = document.getElementById("calculateBtn");

const fdResult = document.getElementById("fdResult");
const fdSummary = document.getElementById("fdSummary");

const depositAmountResult = document.getElementById("depositAmountResult");
const fdInterestRateResult = document.getElementById("fdInterestRateResult");
const fdYearsResult = document.getElementById("fdYearsResult");
const interestEarnedResult = document.getElementById("interestEarnedResult");
const maturityAmountResult = document.getElementById("maturityAmountResult");

const analyticsDeposit = document.getElementById("analyticsDeposit");
const interestSummary = document.getElementById("interestSummary");
const maturitySummary = document.getElementById("maturitySummary");

let fdChart;

// Currency Formatter
function formatCurrency(amount) {
    return "₹" + amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

calculateBtn.addEventListener("click", function () {

    const depositAmount = parseFloat(depositAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value);
    const fdYears = parseFloat(fdYearsInput.value);

    if (isNaN(depositAmount) || isNaN(interestRate) || isNaN(fdYears)) {
        alert("Please fill all the fields.");
        return;
    }

    if (depositAmount <= 0 || interestRate <= 0 || fdYears <= 0) {
        alert("Values must be greater than 0.");
        return;
    }

    // Annual Compound Interest
    const rate = interestRate / 100;

    const maturityAmount =
        depositAmount * Math.pow((1 + rate), fdYears);

    const interestEarned =
        maturityAmount - depositAmount;

    // Main Result
    fdResult.textContent = formatCurrency(maturityAmount);
    fdSummary.textContent = formatCurrency(maturityAmount);

    // Summary
    depositAmountResult.textContent = formatCurrency(depositAmount);
    fdInterestRateResult.textContent = interestRate + "%";
    fdYearsResult.textContent = fdYears + " Years";
    interestEarnedResult.textContent = formatCurrency(interestEarned);
    maturityAmountResult.textContent = formatCurrency(maturityAmount);

    // Analytics
    analyticsDeposit.textContent = formatCurrency(depositAmount);
    interestSummary.textContent = formatCurrency(interestEarned);
    maturitySummary.textContent = formatCurrency(maturityAmount);

    // Chart
    createChart(depositAmount, interestEarned);
});

function createChart(deposit, interest) {

    const ctx = document.getElementById("fdChart");

    if (fdChart) {
        fdChart.destroy();
    }

    fdChart = new Chart(ctx, {

        type: "pie",

        data: {
            labels: ["Deposit", "Interest"],
            datasets: [{
                data: [deposit, interest],
                backgroundColor: [
                    "#2563EB",
                    "#22C55E"
                ],
                borderColor: "#ffffff",
                borderWidth: 2
            }]
        },

        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }

    });

}

// FAQ

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;
        const symbol = question.querySelector("span");

        if (answer.style.display === "block") {

            answer.style.display = "none";
            symbol.textContent = "+";

        } else {

            answer.style.display = "block";
            symbol.textContent = "−";

        }

    });

});