import '../styles/Calculator.css';
import {useState} from 'react';
import CalculatorInput from './CalculatorInput';
import CalculatorSelect from './CalculatorSelect';
import CalculatorOutput from './CalculatorOutput';
import {averageFormula, squaredErrorFormula, randomErrorFormula, systematicErrorFormula, absoluteErrorFormula, relativeErrorFormula} from '../formulas';

const stjudentCoefficients = {
  0.70: [1.96, 1.39, 1.25, 1.19, 1.16, 1.13, 1.12, 1.11, 1.10, 1.09, 1.09, 1.08, 1.08, 1.08, 1.07, 1.07, 1.07, 1.07, 1.06, 1.06, 1.06, 1.06, 1.06, 1.06, 1.04],
  0.95: [12.71, 4.30, 3.18, 2.78, 2.57, 2.45, 2.36, 2.31, 2.26, 2.23, 2.20, 2.18, 2.16, 2.15, 2.13, 2.12, 2.11, 2.10, 2.09, 2.09, 2.08, 2.07, 2.07, 2.06, 1.96],
  0.99: [63.66, 9.92, 5.84, 4.60, 4.03, 3.71, 3.50, 3.36, 3.25, 3.17, 3.11, 3.05, 3.01, 2.98, 2.95, 2.92, 2.90, 2.88, 2.86, 2.84, 2.83, 2.82, 2.81, 2.80, 2.58]
};

const measuresAmounts = Array.from({length: 24}, (_, i) => i + 2);
measuresAmounts.push("Inf");

function Calculator() {
  const [stjudentCoef, setStjudentCoef] = useState(0.95);
  const [measuresAmount, setMeasuresAmount] = useState(5); 
  const [measurementMin, setMeasurementMin] = useState(0.001);
  const [measures, setMeasures] = useState([]);

  const [measuresAverageValue, setMeasuresAverageValue] = useState(0);
  const [squaredError, setSquaredError] = useState(0);
  const [randomError, setRandomError] = useState(0);
  const [systematicError, setSystematicError] = useState(0);
  const [absoluteError, setAbsoluteError] = useState(0);
  const [relativeError, setRelativeError] = useState(0);

  const getInputValues = () => {
    let inputs = document.querySelectorAll(".Calculator > input");
    let arr = [];

    for(let i = 0; i < inputs.length; i++) {
      if(isNaN(parseFloat(inputs[i].value)))
        arr.push(0);
      else
        arr.push(parseFloat(inputs[i].value));
    }

    setMeasures(arr);
  }

  const getAverageValueFromMeasures = () => {
    let sum = 0;

    for(let i = 0; i < measures.length; i++) {
      sum += parseFloat(measures[i]);
    }

    setMeasuresAverageValue(parseFloat(sum / measuresAmount));
  }

  const getSquaredError = () => {
    let error = 0;

    for(let i = 0; i < measures.length; i++) {
      let result = parseFloat(measures[i]) - measuresAverageValue;
      error += Math.pow(result, 2);
    }

    setSquaredError(parseFloat(Math.sqrt(error / (measuresAmount * (measuresAmount - 1)))));
  }

  const getRandomError = () => {
    setRandomError(parseFloat(squaredError * stjudentCoefficients[stjudentCoef][measuresAmount - 1]));
  }

  const getSystematicError = () => {
    setSystematicError(parseFloat(measurementMin / 3 * stjudentCoefficients[stjudentCoef][24]));
  }

  const getAbsoluteError = () => {
    let error = 0;

    if(randomError / systematicError >= 3)
      error = randomError;
    else if(systematicError / randomError >= 3)
      error = systematicError;
    else
      error = Math.sqrt(Math.pow(randomError, 2) + Math.pow(systematicError, 2));

    setAbsoluteError(parseFloat(error));
  }

  const getRelativeError = () => {
    setRelativeError(parseFloat(absoluteError / measuresAverageValue * 100));
  }

  const makeMathOperations = () => {
    getAverageValueFromMeasures();
    getSquaredError();
    getRandomError();
    getSystematicError();
    getAbsoluteError();
    getRelativeError();

    document.querySelector(".output-formulas-container").style.display = "flex";
    document.querySelector(".output-formulas-container p").textContent = 
    "Vidējā aritmētiskā kļūda: " + averageFormula(measures, measuresAmount, measuresAverageValue) +"\n"+ 
    "Vidējā kvadrātiskā kļūda: " + squaredErrorFormula(measures, measuresAmount, measuresAverageValue, squaredError) + "\n" +
    "Mērījuma absolūta kļūda (gadījuma kļūda): " + randomErrorFormula(stjudentCoef, squaredError, randomError) + "\n" +
    "Mērījuma absolūte kļūda (sistemātiskā kļūda): " + systematicErrorFormula(measurementMin, stjudentCoefficients[stjudentCoef][24], systematicError) + "\n" +
    "Mērījuma galīgā absolūta kļūda: " + absoluteErrorFormula(absoluteError) + "\n" +
    "Relatīva kļūda: " + relativeErrorFormula(measuresAverageValue, absoluteError, relativeError);

    // NOTE: Right numbers, left only to display in output window
    console.log(measuresAverageValue, squaredError, randomError, systematicError, absoluteError, relativeError);
  }
  
  let measuresInputs = [Array.from({length: measuresAmount}, (_, i) => i + 1).map((measure) => <CalculatorInput key={measure} index={measure} handleChange={getInputValues}/>)];

  return (
    <div className="Calculator">
      <div>
        <CalculatorSelect labelId='stjudent-coef' labelName='Stjudenta koeficients' default={0.95} options={Object.keys(stjudentCoefficients)} handleChange={e => setStjudentCoef(e.target.value)}/>
        <CalculatorSelect labelId='measures-amount' labelName='Mērījumu skaits' default={5} options={measuresAmounts} handleChange={e => setMeasuresAmount(e.target.value)}/>
        <CalculatorInput labelName='measurement-min-value' labelValue='Mērinstrumenta mazākā iedaļas vērtība' handleChange={e => setMeasurementMin(e.target.value)} />
      </div>
      {measuresInputs}
      <button onClick={makeMathOperations}>Aprēķināt</button>
      <CalculatorOutput />
    </div>
  );
}

/*
  BUGS:
  - Values don't change, when changing measures amount.
*/

export default Calculator;