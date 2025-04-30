document.getElementById('bmi-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const heightInMeters = data.height / 100;
    const bmi = data.weight / (heightInMeters * heightInMeters);

    const bmiCategory = calculateBMICategory(bmi);

    document.getElementById('bmi-value').textContent = `Your BMI: ${bmi.toFixed(2)}`;
    document.getElementById('bmi-category').textContent = `BMI Category: ${bmiCategory}`;
    document.getElementById('tips').textContent = getNutritionTips(bmiCategory);
});

function calculateBMICategory(bmi) {
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 25) {
        return 'Normal';
    } else if (bmi > 30) {
        return 'Overweight';
    } else {
        return '';
    }
}