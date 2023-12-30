const express = require('express');
const router = express.Router();

// BMI Calculation Logic
const calculateBMI = (height, weight, age, gender) => {
    // Convert height to meters
    const heightInMeters = height / 100; // Assuming height is in centimeters

    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);

    // Interpretation based on WHO categories
    let interpretation = '';
    if (bmi < 18.5) {
        interpretation = 'Underweight';
    } else if (bmi < 24.9) {
        interpretation = 'Normal weight';
    } else if (bmi < 29.9) {
        interpretation = 'Overweight';
    } else {
        interpretation = 'Obese';
    }

    return { bmi, interpretation };
};

// Route for serving the home page
router.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname + '/../' });
});

// Route for handling BMI calculator requests
router.route('/bmicalculator')
    .get((req, res) => {
        res.sendFile('views/index.html', { root: __dirname + '/../' });
    })
    .post((req, res) => {
        const { height, weight, age, gender } = req.body;
        
        // Validate input (ensure numeric values)
        if (isNaN(height) || isNaN(weight)) {
            return res.status(400).json({ error: 'Invalid input. Height and weight must be numeric.' });
        }

        // Calculate BMI
        const bmiResult = calculateBMI(height, weight, age, gender);
        res.json(bmiResult);
    });

module.exports = router;
