const riskForm = document.getElementById('risk-form');
const resultDiv = document.getElementById('result');

riskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const age = parseInt(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const cholesterol = parseInt(document.getElementById('cholesterol').value);
  const bloodPressure = parseInt(document.getElementById('blood-pressure').value);
  const smokingStatus = document.getElementById('smoking-status').value;

  const riskScore = calculateRiskScore(age, gender, cholesterol, bloodPressure, smokingStatus);

  resultDiv.innerHTML = `Your risk score is: ${riskScore}`;

  if (riskScore < 10) {
    resultDiv.innerHTML += `<p>You are at low risk for heart disease.</p>`;
  } else if (riskScore < 20) {
    resultDiv.innerHTML += `<p>You are at moderate risk for heart disease.</p>`;
  } else {
    resultDiv.innerHTML += `<p>You are at high risk for heart disease.</p>`;
  }
});

function calculateRiskScore(age, gender, cholesterol, bloodPressure, smokingStatus) {
  let riskScore = 0;

  // Age
  if (age >= 45) {
    riskScore += 5;
  }

  // Gender
  if (gender === 'male') {
    riskScore += 5;
  }

  // Cholesterol
  if (cholesterol >= 200) {
    riskScore += 10;
  }

  // Blood Pressure
  if (bloodPressure >= 140) {
    riskScore += 10;
  }

  // Smoking Status
  if (smokingStatus === 'smoker') {
    riskScore += 10;
  }

  return riskScore;
}