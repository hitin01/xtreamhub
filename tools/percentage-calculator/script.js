const percentageInput = document.getElementById("percentage");
const numberInput = document.getElementById("number");
const calculateBtn = document.getElementById("calculateBtn");

// Result Elements
const result = document.getElementById("result");
const resultSummary = document.getElementById("resultSummary");

const percentageResult = document.getElementById("percentageResult");
const numberResult = document.getElementById("numberResult");
const calculatedValueResult = document.getElementById("calculatedValueResult");

// Analytics
const analyticsPercentage = document.getElementById("analyticsPercentage");
const analyticsNumber = document.getElementById("analyticsNumber");
const analyticsResult = document.getElementById("analyticsResult");

// Chart
const ctx = document.getElementById("percentageChart");

let chart = new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Calculated Value", "Remaining"],
        datasets: [{
            data: [0, 100],
            backgroundColor: [
                "#3B82F6",
                "#E5E7EB"
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        cutout: "70%",
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }
});

calculateBtn.addEventListener("click", calculatePercentage);

function calculatePercentage() {

    const percentage = parseFloat(percentageInput.value);
    const number = parseFloat(numberInput.value);

    if (isNaN(percentage) || isNaN(number)) {
        alert("Please enter valid values.");
        return;
    }

    const value = (percentage / 100) * number;
    const displayValue = Number.isInteger(value)
    ? value
    : value.toFixed(2);

    // Result
    result.textContent = displayValue;

    resultSummary.textContent =
        `${percentage}% of ${number} = ${displayValue}`;

    percentageResult.textContent = percentage + "%";
    numberResult.textContent = number;
    calculatedValueResult.textContent = displayValue;

    analyticsPercentage.textContent = percentage + "%";
    analyticsNumber.textContent = number;
    analyticsResult.textContent = displayValue;
    // Chart
    chart.data.datasets[0].data = [
        percentage,
        100 - percentage
    ];

    chart.update();
    percentageInput.value = "";
    numberInput.value = "";
    percentageInput.focus();
}