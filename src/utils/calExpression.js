export default function result(expression) {
  return new calExpression().calculateExpression(
    expression.match(/[\d]+|[\+\-\*\/\(\)]/g)
  );
}
class calExpression {
  constructor() {
    this.tokens;
    this.sum;
  }

  calculateExpression(expression) {
    //console.log("Expression:" + expression);
    let forwardIndex;
    let i = 1;

    this.tokens = this.calParenthesis(expression);
    this.tokens = this.calNegative(this.tokens);
    this.sum = parseInt(this.tokens[0]);

    while (i < this.tokens.length) {
      forwardIndex = this.tokens[i + 2];

      if (this.tokens[i] === "+") {
        if (forwardIndex === "*" || forwardIndex === "/") {
          i = this.calFirst(i, this.tokens[i]);
        } else {
          this.sum += parseInt(this.tokens[i + 1]);
        }
      } else if (this.tokens[i] === "-") {
        if (forwardIndex === "*" || forwardIndex === "/") {
          i = this.calFirst(i, this.tokens[i]);
        } else {
          this.sum -= parseInt(this.tokens[i + 1]);
        }
      } else if (this.tokens[i] === "*") {
        this.sum *= parseInt(this.tokens[i + 1]);
      } else if (this.tokens[i] === "/") {
        this.sum /= parseInt(this.tokens[i + 1]);
      }

      i += 2;
    }
    //console.log("Sum" + this.sum);
    return this.sum;
  }

  calFirst(index, operator) {
    let i = index + 2;
    let total = parseInt(this.tokens[i - 1]);

    while (i < this.tokens.length) {
      if (this.tokens[i] === "*") {
        total *= parseInt(this.tokens[i + 1]);
      } else if (this.tokens[i] === "/") {
        total /= parseInt(this.tokens[i + 1]);
      }
      let forwardIndex = this.tokens[i + 2];
      if (forwardIndex === "+" || (forwardIndex === "-") === undefined) {
        break;
      } else {
        i += 2;
      }
    }
    if (operator === "+") {
      this.sum += total;
    } else {
      this.sum -= total;
    }

    return i;
  }

  calParenthesis(exp) {
    let expression = exp;
    let parenthesis;
    let newExpression;
    let firstIndex;
    let lastIndex;
    let trigger = false;
    let backParenIndex;
    do {
      parenthesis = 0;
      newExpression = [];
      backParenIndex = 0;
      //console.log("Expression before splice" + expression);
      for (let i = 0; i < expression.length; i++) {
        if (expression[i] === "(") {
          if (expression[i + 1] === ")") {
            return [];
          }
          if (parenthesis === 0) {
            trigger = true;
            firstIndex = i;
          }
          parenthesis += 1;
          //console.log("expression[i] : " + i + " Parenthesis Count " + parenthesis)
        } else if (expression[i] === ")") {
          parenthesis -= 1;
          //console.log("expression[i] : " + i + " Parenthesis Count " + parenthesis)
          if (parenthesis === 0) {
            trigger = false;
            lastIndex = i;
            break;
          }
        }

        if (trigger) {
          // if (expression[i] === ")") {
          //   if (backParenIndex >= 1) {
          //     newExpression.push(expression[i]);
          //   }
          //   backParenIndex++;
          // } else if (expression[i] !== ")") {
          //   newExpression.push(expression[i]);
          // }
          //console.log("asdadas " + i + "  last  " + lastIndex);
          if (i !== firstIndex) {
            newExpression.push(expression[i]);
            //console.log("newExp " + newExpression);
          }
        }
      }
      if (parenthesis !== 0) {
        return [];
      }
      if (newExpression.length !== 0) {
        let newValue = new calExpression().calculateExpression(newExpression);
        //console.log("New Expression:" + newExpression);
        //console.log("Splice First:" + firstIndex + " Last " + lastIndex);
        //console.log("Splicey1" + expression);
        expression.splice(firstIndex, lastIndex - firstIndex + 1);
        //console.log("Splicey2" + expression);
        expression.splice(firstIndex, 0, newValue + "");
        if (isNumberic(+expression[firstIndex + 1])) {
          expression.splice(firstIndex + 1, 0, "*");
          //console.log(expression);
        }
        if (isNumberic(+expression[firstIndex - 1])) {
          expression.splice(firstIndex, 0, "*");
          //console.log(expression);
        } 
      }
      console.log("Expression after splice" +expression);
    } while (
      (expression.includes("(") || expression.includes(")")) &&
      parenthesis === 0
    );

    return expression;
  }

  calNegative(exp) {
    let expression = exp;
    let minusCount = 0;
    let firstMinusIndex;
    let lastMinusIndex;
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === "-") {
        if (minusCount === 0) {
          firstMinusIndex = i
        }
        minusCount++;
      }
      else {
        if (minusCount !== 0) {
          lastMinusIndex = i - 1
          expression.splice(firstMinusIndex, lastMinusIndex - firstMinusIndex + 1);
          if (firstMinusIndex === 0) {
            expression[i - minusCount] = minusCount % 2 === 0? expression[i - minusCount]: -expression[i - minusCount] + "";
          } else {
            expression.splice(firstMinusIndex, 0, minusCount % 2 === 0? "+": "-");
          }
          i -= minusCount - 1;
          minusCount = 0;
        }
      }
    }
    return expression;
  }

}

function isNumberic(value) {
  return !isNaN(value - parseFloat(value));
}