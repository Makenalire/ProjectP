

export default function result(expression) {
  new calExpression().calParenthesis(["2", "+", "(", "3", "+", "5", ")", "+", "5"]);
  //new calExpression().calParenthesis(["3", "+", "5"]);
  return new calExpression().calculateExpression(expression.match(/[\d]+|[\+\-\*\/\(\)]/g));
}
class calExpression {

  constructor() {
    this.tokens;
    this.sum;
  }

  calculateExpression(expression) {
    
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
      if (forwardIndex === "+" || forwardIndex === "-" === undefined) {
        break;
      } 
      else {
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
  //
  calParenthesis(exp) {
  //   let newStr = "";
  //   let i = index
  //   for (i ; i < this.tokens.length ; i++) {
  //     if (this.tokens[i] !== ")") {
  //       newStr += this.tokens[i];
  //     }
  //     else if (this.tokens[i] === ")") {
  //       newStr += ")";
  //       break;
  //     }
  //   }
  //   if (newStr === "") {return NaN;} 
  //   else
  //   {return [new calExpression().calculateExpression(newStr)[0], i];}
  let expression = exp;
    let parenthesis = 0;
    let newExpression = [];
    let firstIndex;
    let lastIndex;
    let trigger = false;
    for (let token of expression) {
      if (trigger) {
        if (token !== ")") {
          newExpression.push(token);
        }
      }
      if (token === "(") {
        if (parenthesis === 0) {
          trigger = true;
          firstIndex = expression.indexOf(token);
        }
        parenthesis += 1;
      }
      else if (token === ")") {
        parenthesis -= 1;
        if (parenthesis === 0) {
          trigger = false;
          lastIndex = expression.indexOf(token);
        }
      }
    }
     if (newExpression.length !== 0) {
      let newValue = new calExpression().calculateExpression(newExpression);
      expression.splice(firstIndex, lastIndex - firstIndex + 1);
      expression.splice(firstIndex, 0, newValue + "")
     }
     return expression;
  }
}
