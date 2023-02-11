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
      }
      //console.log("Expression after splice" +expression);
    } while (
      (expression.includes("(") || expression.includes(")")) &&
      parenthesis === 0
    );

    return expression;
  }
}