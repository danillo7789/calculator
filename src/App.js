import Screen from './components/Screen/Screen';
import AllButtons from './components/AllButtons/AllButtons';
import Button from './components/Button/Button';
import Layout from './components/Layout/Layout';
import { useState } from 'react';


const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");


const App = () => {

  const buttonValues = [
    ['AC', 'DEL', '+-', '÷'],
    [7, 8, 9, '×'],
    [4, 5, 6, '+'],
    [1, 2, 3, '-'],
    [0, '.', '=']
  ];

  const [calc, setCalc] = useState({
    num: 0,    // calc.num is what is displayed on the screen
    res: 0,    //the  calculated value
    sign: ''   // the arithmetic operators
  })

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        //so there wont be zero before any number
        num: calc.num === 0 && value === 0 ? '0'
          : removeSpaces(calc.num) % 1 === 0 ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),

      })
    }
  }

  const decimalClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      //if there's no display that includes '.', then add d decimal value
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
    })
  }

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num)) * -1 : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res)) * -1 : 0,
      sign: "",
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {

    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
            ? a - b
            : sign === "×"
              ? a * b
              : a / b;

      setCalc({
        ...calc,
        res:
        // response should be the calcution; math
          toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign)
          ),
        sign: "",
        num: 0
      });
    }
  };

  const deleteClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num.slice(0, -1)
    })
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      num: 0,
      res: 0,
      sign: ''
    })
  }



  return (
    <Layout>
      <Screen value={calc.num ? calc.num : calc.res} />
      <AllButtons>
        {
          buttonValues.flat().map((btn, i) => { //flat method creates a new array, adds the sub array up to a specified depth(1) default is 1
            return (
              <Button classname={btn === '=' ? 'equals' : btn === 'AC' ? 'cancel' : ''}
                value={btn}
                key={i}
                onClick={
                  btn === 'AC' ? resetClickHandler
                    : btn === '+-' ? invertClickHandler
                      : btn === 'DEL' ? deleteClickHandler
                        : btn === '=' ? equalsClickHandler
                          : btn === '÷' || btn === '×' || btn === '+' || btn === '-' ? signClickHandler
                            : btn === '.' ? decimalClickHandler
                              : numClickHandler
                } />
            )
          })
        };
      </AllButtons>
    </Layout>
  );
  
}

export default App;
