
function calculateBMI() {
    // validation
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;

    if (isNaN(height) || isNaN(weight) || isNaN(age)) {
        alert('Please enter valid numeric values for height, weight, and age.');
        return;
    }

    // AJAX request for BMI calculation
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

    // sending data to the server
    xhr.send(JSON.stringify({ height, weight, age, gender }));
}


function displayResult(result) {
    const resultContainer = document.getElementById('resultContainer');

    
    resultContainer.innerHTML = `
        <p><strong>BMI:</strong> ${result.bmi.toFixed(2)}</p>
        <p><strong>Interpretation:</strong> ${result.interpretation}</p>
    `;
}


document.getElementById('unit').addEventListener('change', function () {
    // You can add additional logic here if needed when the unit is changed
});


