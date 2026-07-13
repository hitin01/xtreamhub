const monthlyInvestmentInput  = document.getElementById("monthlyInvestment");
const expectedReturnInput  = document.getElementById("expectedReturn");
const investmentYearsInput = document.getElementById("investmentYears");

const calculateBtn = document.getElementById("calculateBtn");

const sipResult = document.getElementById("sipResult");
const sipSummary = document.getElementById("sipSummary");

const investmentResult =
document.getElementById("investmentResult");

const returnRateResult =
document.getElementById("returnRateResult");

const yearsResult =
document.getElementById("yearsResult");

const estimatedReturnsResult =
document.getElementById("estimatedReturnsResult");

const maturityValueResult =
document.getElementById("maturityValueResult");

const analyticsSip = document.getElementById("analyticsSip");
const returnsSummary = document.getElementById("returnsSummary");
const maturitySummary = document.getElementById("maturitySummary");

let loanChart;


calculateBtn.addEventListener("click", function () {
    const monthlyInvestment = parseFloat(monthlyInvestmentInput.value);

    const expectedReturn = parseFloat(expectedReturnInput.value);

    const investmentYears = parseFloat(investmentYearsInput.value);

    if (!monthlyInvestment || !expectedReturn || !investmentYears) {
        alert("Please fill all the fields");
        return;
    }

    if (monthlyInvestment <= 0 || expectedReturn <= 0 || investmentYears <= 0) {
        alert("Values must be greater than 0");
        return;
    }


    // Monthly return rate

    const monthlyRate =
    expectedReturn / 12 / 100;

    // Total months

    const totalMonths =
    investmentYears * 12;

    // SIP Maturity Formula

    const maturityValue =
    monthlyInvestment *
    (
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
        / monthlyRate
    )
    *
    (1 + monthlyRate);

    // Total Investment

    const totalInvestment =
    monthlyInvestment * totalMonths;

    // Estimated Returns

    const estimatedReturns =
    maturityValue - totalInvestment;
        // Main Result

        sipResult.textContent =
    "₹" + maturityValue.toFixed(2);

    sipSummary.textContent =
    "₹" + maturityValue.toFixed(2);

    investmentResult.textContent =
    "₹" + totalInvestment.toLocaleString();

    returnRateResult.textContent =
    expectedReturn + "%";

    yearsResult.textContent =
    investmentYears + " Years";

    estimatedReturnsResult.textContent =
    "₹" + estimatedReturns.toFixed(2);

    maturityValueResult.textContent =
    "₹" + maturityValue.toFixed(2);

        // Analytics

        analyticsSip.textContent ="₹" + maturityValue.toFixed(2);

        returnsSummary.textContent ="₹" + estimatedReturns.toFixed(2);

        maturitySummary.textContent ="₹" + maturityValue.toFixed(2);
        // Chart

        createChart(
            totalInvestment,
            estimatedReturns
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
                "Investment",
                "Returns"
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
