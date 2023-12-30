const express = require('express');
const router = express.Router();


const calculateBMI = (height, weight, age, gender) => {
    const heightInMeters = height / 100; //height is in centimeters

    
    const bmi = weight / (heightInMeters * heightInMeters);

    
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


router.get('/', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname + '/../' });
});


router.route('/bmicalculator')
    .get((req, res) => {
        res.sendFile('views/index.html', { root: __dirname + '/../' });
    })
    .post((req, res) => {
        const { height, weight, age, gender } = req.body;
        
        // input validation
        if (isNaN(height) || isNaN(weight)) {
            return res.status(400).json({ error: 'Invalid input. Height and weight must be numeric.' });
        }

        
        const bmiResult = calculateBMI(height, weight, age, gender);
        res.json(bmiResult);
    });

module.exports = router;
