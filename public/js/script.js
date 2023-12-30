// Function to perform BMI calculation on the server
function calculateBMI() {
    // Client-side validation
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;

    if (isNaN(height) || isNaN(weight) || isNaN(age)) {
        alert('Please enter valid numeric values for height, weight, and age.');
        return;
    }

    // Make an AJAX request to the server for BMI calculation
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/bmicalculator', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const result = JSON.parse(xhr.responseText);
            displayResult(result);
        } else {
            alert('Error calculating BMI. Please try again.');
        }
    };

    // Send data to the server
    xhr.send(JSON.stringify({ height, weight, age, gender }));
}

// Function to display the BMI result on the page
function displayResult(result) {
    const resultContainer = document.getElementById('resultContainer');

    // Update the result container with the calculated BMI and interpretation
    resultContainer.innerHTML = `
        <p><strong>BMI:</strong> ${result.bmi.toFixed(2)}</p>
        <p><strong>Interpretation:</strong> ${result.interpretation}</p>
    `;
}

// Add event listener for unit change (imperial or metric)
document.getElementById('unit').addEventListener('change', function () {
    // You can add additional logic here if needed when the unit is changed
});

// Add any additional event listeners or logic as needed
