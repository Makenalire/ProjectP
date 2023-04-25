export default function createQuestion() {
  let question = createNumberList();
  while (question === undefined || question[3] === 0) {
    question = createNumberList();
  }
  return question;
}

// Return a list of 4 integers that can be calculated by any operators and get the result of 24
function createNumberList() {
  let total = 24;
  let randNum = getRandomInteger(1, 9);
  const question = [1];

  try {
    question.length = 0;
    for (var i = 1; i < 4; i++) {
      var nextNum = createNumber(total, i);
      total = nextNum[1];

      question.push(nextNum[0]);
    }
  } catch (err) {
    return;
  }
  question.push(Math.abs(total));
  return question;
}

// Return an random integer between min and max (both included)
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a new random number and operator.
// Return the number, how much value of the remaining argument left and the operator.
function createNumber(remaining, times) {
  let operators = ["+", "-", "*", "/"];
  let operator;
  let operand;
  let a = getRandomInteger(1, 9);
  let increment = 1;
  const getFactors = (number) =>
    [...Array(number + 1).keys()].filter((i) => number % i === 0);
  while (true) {
    operand = remaining;
    operator = operators[getRandomInteger(0, operators.length - 1)];

    if (increment > 10) {
      a = 9;
      const factors = getFactors(operand);
      if (operand - a <= 10 && operand - a != 0) {
        operator = "+";
      } else if (factors.length > 2) {
        operator = "*";
        let i = 0;
        do {
          a = factors[Math.floor(factors.length / 2) - i];
          i++;
        } while (a > 9);

        if (operand / a > 9) {
          return;
        }
      } else {
        return;
      }
      if (increment > 11) {
        return;
      }
    }

    if (times == 2 && operand >= 32) {
      operator = "*";
      const factors = getFactors(operand);
      let i = 0;
      do {
        a = factors[Math.floor(factors.length / 2) - i];
        i++;
      } while (a > 9);
    } else if (times == 3 && increment == 3) {
      operators = ["+", "-", "*"];
    }

    switch (operator) {
      case "+":
        operand -= a;
        break;
      case "-":
        operand += a;
        break;
      case "*":
        if (operand % a == 0) {
          operand /= a;
          break;
        } else continue;
      case "/":
        operand *= a;
        break;
    }

    // Try to make the list's last number have a value of less than 10.
    if (times == 3 && Math.abs(operand) >= 10 && operand != 0) {
      a = getRandomInteger(increment, 9);
      increment++;
      continue;
    }
    return [a, operand, operator];
  }
}
