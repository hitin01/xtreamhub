const loanAmountInput = document.getElementById("loanAmount");
const interestRateInput = document.getElementById("interestRate");
const loanYearsInput = document.getElementById("loanYears");

const calculateBtn = document.getElementById("calculateBtn");

const emiResult = document.getElementById("emiResult");
const emiSummary = document.getElementById("emiSummary");

const loanAmountResult = document.getElementById("loanAmountResult");
const interestRateResult = document.getElementById("interestRateResult");
const loanYearsResult = document.getElementById("loanYearsResult");
const totalInterestResult = document.getElementById("totalInterestResult");
const totalPaymentResult = document.getElementById("totalPaymentResult");

const analyticsEmi = document.getElementById("analyticsEmi");
const interestSummary = document.getElementById("interestSummary");
const paymentSummary = document.getElementById("paymentSummary");

let loanChart;

calculateBtn.addEventListener("click", function () {

    const loanAmount = parseFloat(loanAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value);
    const loanYears = parseFloat(loanYearsInput.value);

    if (!loanAmount || !interestRate || !loanYears) {
        alert("Please fill all the fields");
        return;
    }

    if (loanAmount <= 0 || interestRate <= 0 || loanYears <= 0) {
        alert("Values must be greater than 0");
        return;
    }

    const monthlyInterestRate = interestRate / 12 / 100;

    const numberOfMonths = loanYears * 12;

    const emi =
        (
            loanAmount *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfMonths)
        )
        /
        (
            Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1
        );

    const totalPayment = emi * numberOfMonths;

    const totalInterest = totalPayment - loanAmount;

    // Main Result

    emiResult.textContent = "₹ " + emi.toFixed(2);
    emiSummary.textContent = "₹ " + emi.toFixed(2);

    // Details

    loanAmountResult.textContent =
        "₹" + loanAmount.toLocaleString();

    interestRateResult.textContent =
        interestRate + "%";

    loanYearsResult.textContent =
        loanYears + " Years";

    totalInterestResult.textContent =
        "₹" + totalInterest.toFixed(2);

    totalPaymentResult.textContent =
        "₹" + totalPayment.toFixed(2);

    // Analytics

    analyticsEmi.textContent =
        "₹" + emi.toFixed(2);

    interestSummary.textContent =
        "₹" + totalInterest.toFixed(2);

    paymentSummary.textContent =
        "₹" + totalPayment.toFixed(2);

    // Chart

    createChart(
        loanAmount,
        totalInterest
    );

});
function createChart(principal, interest) {

    const ctx = document.getElementById("loanChart");

    if (loanChart) {
        loanChart.destroy();
    }

    loanChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: [
                "Principal",
                "Interest"
            ],

            datasets: [{
                data: [
                    principal,
                    interest
                ],
                backgroundColor: [
                    "#2563EB",
                    "#F59E0B"
                ],
                borderWidth: 2,
                borderColor: "#ffffff"
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
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function(question){

    question.addEventListener("click", function(){

        const answer = this.nextElementSibling;

        if(answer.style.display === "block"){

            answer.style.display = "none";

            this.querySelector("span").textContent = "+";

        }else{

            answer.style.display = "block";

            this.querySelector("span").textContent = "−";

        }

    });

});
