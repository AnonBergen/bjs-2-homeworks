"use strict"

function solveEquation(a, b, c) {

	const discriminant = b ** 2 - 4 * a * c;

	if (discriminant < 0) {
		return [];
	}

	if (discriminant === 0) {
		const root = -b / (2 * a);
		return [root];
	}

	const sqrtDiscriminant = Math.sqrt(discriminant);
	const root1 = (-b + sqrtDiscriminant) / (2 * a);
	const root2 = (-b - sqrtDiscriminant) / (2 * a);

	return [root1, root2];
}

console.log(solveEquation(1, -3, 2)); // [2, 1] - два корня
console.log(solveEquation(1, -2, 1)); // [1] - один корень
console.log(solveEquation(1, 2, 5)); // [] - нет корней


function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  const monthlyPercent = percent / 100 / 12;
  
  const loanBody = amount - contribution;
  
  const monthlyPayment = loanBody * (monthlyPercent + monthlyPercent / (((1 + monthlyPercent) ** countMonths) - 1));
  
  const totalAmount = monthlyPayment * countMonths;
  
  return Number(totalAmount.toFixed(2));
}

console.log(calculateTotalMortgage(10, 0, 50000, 12));  // 52749.53
console.log(calculateTotalMortgage(10, 1000, 50000, 12)); // 52149.59
console.log(calculateTotalMortgage(10, 0, 20000, 24));   // 22149.42

