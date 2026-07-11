const loanAmountInput = document.getElementById("loanAmount");
const interestRateInput = document.getElementById("interestRate");
const loanYearsInput = document.getElementById("loanYears");


const emiResult = document.getElementById("emiResult");
const emiSummary = document.getElementById("emiSummary");
const calculateBtn = document.getElementById("calculateBtn");



calculateBtn.addEventListener("click", function () {
    
    const loanAmount = parseFloat(loanAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value);
    const loanYears = parseFloat(loanYearsInput.value);
    
    if (!loanAmount || !interestRate || !loanYears){
        alert("Please fill all the fields");
        return;
    }
    if (loanAmount <= 0){
        alert("Loan amount must be greater than 0.")
        return;
    }
    if (interestRate <= 0){
        alert("Interest rate is must be greater than 0.")
        return;
    }
    if (loanYears <=0 ){
        alert("Loan tenure must be grater than 0.")
        return;
    }
    console.log(loanAmount);
    console.log(interestRate);
    console.log(loanYears);

// creating variables
const monthlyInterestRate = interestRate / 12 / 100;
const numberOfMonths = loanYears * 12;
// Formula
const emi = (
    loanAmount * monthlyInterestRate * Math.pow(
        1 + monthlyInterestRate, numberOfMonths
    )
)
/
(
    Math.pow(
        1 + monthlyInterestRate,
        numberOfMonths
    )
    -1
);
emiResult.textContent = "₹ " + emi.toFixed(2);
emiSummary.textContent = "₹ " + emi.toFixed(2);
//Details
loanAmountResult.textContent =
"₹" + loanAmount.toLocaleString();

interestRateResult.textContent =
interestRate + "%";

loanYearsResult.textContent =
loanYears + " Years";

const totalPayment =
emi * numberOfMonths;

const totalInterest =
totalPayment - loanAmount;

totalPaymentResult.textContent =
"₹" + totalPayment.toFixed(2);

totalInterestResult.textContent =
"₹" + totalInterest.toFixed(2); 
    
});
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function(question){

    question.addEventListener("click", function(){

        const answer = this.nextElementSibling;

        if(answer.style.display === "block"){

            answer.style.display = "none";

            this.querySelector("span").textContent = "+";

        }

        else{

            answer.style.display = "block";

            this.querySelector("span").textContent = "−";

        }

    });

});
