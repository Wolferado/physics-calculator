import '../styles/Calculator.css';
import {useState} from 'react';
import CalculatorInput from './CalculatorInput';
import CalculatorSelect from './CalculatorSelect';

const stjudentCoefficients = {
  0.70: [1.96, 1.39, 1.25, 1.19, 1.16, 1.13, 1.12, 1.11, 1.10, 1.09, 1.09, 1.08, 1.08, 1.08, 1.07, 1.07, 1.07, 1.07, 1.06, 1.06, 1.06, 1.06, 1.06, 1.06, 1.04],
  0.95: [12.71, 4.30, 3.18, 2.78, 2.57, 2.45, 2.36, 2.31, 2.26, 2.23, 2.20, 2.18, 2.16, 2.15, 2.13, 2.12, 2.11, 2.10, 2.09, 2.09, 2.08, 2.07, 2.07, 2.06, 1.96],
  0.99: [63.66, 9.92, 5.84, 4.60, 4.03, 3.71, 3.50, 3.36, 3.25, 3.17, 3.11, 3.05, 3.01, 2.98, 2.95, 2.92, 2.90, 2.88, 2.86, 2.84, 2.83, 2.82, 2.81, 2.80, 2.58]
};

const measuresAmounts = Array.from({length: 24}, (_, i) => i + 2);
measuresAmounts.push("Inf");

function Calculator() {
  const [stjudentCoef, setStjudentCoef] = useState(0.70);
  const [measuresAmount, setMeasuresAmount] = useState(2); 
  const [measurementMin, setMeasurementMin] = useState(0);
  const [measuresAverageValue, setMeasuresAverageValue] = useState(0);
  const [squaredError, setSquaredError] = useState(0);

  let measuresInputs = [Array.from({length: measuresAmount}, (_, i) => i + 1).map((measure) => <CalculatorInput index={measure} handleChange={e => getAverageValueFromMeasures()}/>)];

  const getAverageValueFromMeasures = () => {
    let averageValue = 0;
    let inputs = document.querySelectorAll(".Calculator > input");

    for(let i = 0; i < inputs.length; i++) {
      if(isNaN(parseFloat(inputs[i].value)))
        averageValue += 0;
      else
        averageValue += parseFloat(inputs[i].value);
    }

    setMeasuresAverageValue(averageValue / measuresAmount);
  }

  const getSquaredError = (averageValue, amountOfValues) => {
    let error = 0;
    let inputs = document.querySelectorAll(".Calculator > input");

    for(let i = 0; i < inputs.length; i++) {
      if(isNaN(parseFloat(inputs[i].value)))
        error += Math.pow(0 - averageValue, 2);
      else {
        let result = parseFloat(inputs[i].value) - averageValue;
        error += Math.pow(result, 2);
      }
    }

    setSquaredError(Math.sqrt(error / (amountOfValues * (amountOfValues - 1))));
  }

  const makeMathOperations = () => {
    getAverageValueFromMeasures();
    getSquaredError(measuresAverageValue, measuresAmount);
    console.log("Avg: " + measuresAverageValue);
    console.log("Sqrt Error: " + squaredError);
    console.log("Gad. Error: " + (squaredError * stjudentCoefficients[stjudentCoef][measuresAmount - 1]));
    console.log("Sist. Error: " + (measurementMin / 3 * stjudentCoefficients[stjudentCoef][24]));
  }

  return (
    <div className="Calculator">
      <div>
        <CalculatorSelect labelId='stjudent-coef' labelName='Stjudenta koeficients' options={Object.keys(stjudentCoefficients)} handleChange={e => setStjudentCoef(e.target.value)}/>
        <CalculatorSelect labelId='measures-amount' labelName='Mērījumu skaits' options={measuresAmounts} handleChange={e => setMeasuresAmount(e.target.value)}/>
        <CalculatorInput labelName='measurement-min-value' labelValue='Mērinstrumenta mazākā iedaļas vērtība' handleChange={e => setMeasurementMin(e.target.value)} />
      </div>
      {measuresInputs}
      <button type='submit' onClick={makeMathOperations}>Click me</button>
    </div>
  );
}

/*
  TODO:
  ### 
  1. Get average value from all inputs. ---- DONE
  2. Get squared error (kvadratiska kluda). ---- DONE
  3. Get "Merijuma absoluta kluda (gadijuma)" (squared error * stjudent coef) --- DONE
  4. Get "Merijuma absoluta kluda (sistematiska)" --- DONE

  BUGS:
  - Values don't change, when changing measures amount.
*/

export default Calculator;