import '../styles/Calculator.css';
import {useState} from 'react';
import CalculatorInput from './CalculatorInput';
import CalculatorTableInput from './CalculatorTableInput';
import CalculatorSelect from './CalculatorSelect';
import CalculatorOutput from './CalculatorOutput';
import {averageFormula, squaredErrorFormula, randomErrorFormula, systematicErrorFormula, absoluteErrorFormula, relativeErrorFormula} from '../formulas';

// Main app
function Calculator() {
  // Variables to hold necessary values
  const [stjudentCoef, setStjudentCoef] = useState(0.95);
  const [chosenAmountOfMeasures, setchosenAmountOfMeasures] = useState(5); 
  const [measurementMin, setMeasurementMin] = useState(0.001);
  const [isInstrumentAnalog, setIsInstrumentAnalog] = useState(false);
  const [isPrecisionClass, setIsPrecisionClass] = useState(false);
  const [precisionClass, setPrecisionClass] = useState(0.5);
  const [measurementVolume, setMeasurementVolume] = useState(150);
  const [measures, setMeasures] = useState([]);

  let measuresAverageValue = 0;
  let squaredError = 0;
  let randomError = 0;
  let systematicError = 0;
  let absoluteError = 0;
  let relativeError = 0;
  
  // Functions to get necessary values and make operations with them
  const getInputValues = () => {
    let inputs = document.querySelectorAll(".Calculator #measures-inputs input");
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
    let result;

    for(let i = 0; i < measures.length; i++) {
      sum += measures[i];
    }

    result = sum / chosenAmountOfMeasures;

    return(result.toFixed(4));
  }

  const getSquaredError = () => {
    let error = 0;
    let result;

    for(let i = 0; i < measures.length; i++) {
      let result = measures[i] - measuresAverageValue;
      error += Math.pow(result, 2);
    }

    result = Math.sqrt(error / (chosenAmountOfMeasures * (chosenAmountOfMeasures - 1)));

    return(result.toFixed(4));
  }

  const getRandomError = () => {
    let result = squaredError * stjudentCoefficients[stjudentCoef][chosenAmountOfMeasures - 2];

    return(result.toFixed(4));
  }

  const getSystematicError = () => {
    let result;

    if(isInstrumentAnalog && !isPrecisionClass) 
      result = measurementMin / 2 / 3 * stjudentCoefficients[stjudentCoef][24];
    else if (isPrecisionClass)
      result = (precisionClass / 100 * measurementVolume) / 3 * stjudentCoefficients[stjudentCoef][24];
    else
      result = measurementMin / 3 * stjudentCoefficients[stjudentCoef][24];

    return(result.toFixed(4));
  }

  const getAbsoluteError = () => {
    let error = 0;

    if(randomError / systematicError >= 3)
      error = randomError;
    else if(systematicError / randomError >= 3)
      error = systematicError;
    else
      error = Math.sqrt(Math.pow(randomError, 2) + Math.pow(systematicError, 2));

    let result = parseFloat(error);

    return(result.toFixed(4));
  }

  const getRelativeError = () => {
    let result = absoluteError / measuresAverageValue * 100;

    return(result.toFixed(4));
  }

  // Function to output necessary answers and formulas among them
  const outputFormulas = () => {
    measuresAverageValue = getAverageValueFromMeasures();
    squaredError = getSquaredError();
    randomError = getRandomError();
    systematicError = getSystematicError();
    absoluteError = getAbsoluteError();
    relativeError = getRelativeError();

    // Getting MathJax script from loaded index window
    const MathJax = window.MathJax;

    // Showing up output window and displaying formulas
    document.querySelector(".output-formulas-container").style.display = "flex";
    document.querySelector(".output-formulas-container p").innerHTML = 
    "Vidējā aritmētiskā kļūda: <br />" + averageFormula(measures, chosenAmountOfMeasures, measuresAverageValue) +"<br />"+ 
    "Vidējā kvadrātiskā kļūda: <br />" + squaredErrorFormula(measures, chosenAmountOfMeasures, measuresAverageValue, squaredError) + "<br />" +
    "Mērījuma absolūta kļūda (gadījuma kļūda): <br />" + randomErrorFormula(stjudentCoef, stjudentCoefficients, chosenAmountOfMeasures, squaredError, randomError) + "<br />" +
    "Mērījuma absolūte kļūda (sistemātiskā kļūda): <br />" + systematicErrorFormula(measurementMin, stjudentCoefficients[stjudentCoef][24], systematicError, isInstrumentAnalog, isPrecisionClass, precisionClass, measurementVolume) + "<br />" +
    "Mērījuma galīgā absolūta kļūda: <br />" + absoluteErrorFormula(randomError, systematicError, absoluteError) + "<br />" +
    "Relatīva kļūda: <br />" + relativeErrorFormula(measuresAverageValue, absoluteError, relativeError);

    // Each time call MathJax function to make formulas display properly
    MathJax.typeset();
  }
  
  // All Stjudent Coefficients (found at https://estudijas.rtu.lv/pluginfile.php/708652/mod_resource/content/0/Stjudenta_koeficienti.pdf)
  const stjudentCoefficients = {
    0.70: [1.96, 1.39, 1.25, 1.19, 1.16, 1.13, 1.12, 1.11, 1.10, 1.09, 1.09, 1.08, 1.08, 1.08, 1.07, 1.07, 1.07, 1.07, 1.06, 1.06, 1.06, 1.06, 1.06, 1.06, 1.04],
    0.95: [12.71, 4.30, 3.18, 2.78, 2.57, 2.45, 2.36, 2.31, 2.26, 2.23, 2.20, 2.18, 2.16, 2.15, 2.13, 2.12, 2.11, 2.10, 2.09, 2.09, 2.08, 2.07, 2.07, 2.06, 1.96],
    0.99: [63.66, 9.92, 5.84, 4.60, 4.03, 3.71, 3.50, 3.36, 3.25, 3.17, 3.11, 3.05, 3.01, 2.98, 2.95, 2.92, 2.90, 2.88, 2.86, 2.84, 2.83, 2.82, 2.81, 2.80, 2.58]
  };
  
  // Amount of measures, that will be placed inside select element (populating the choices)
  const amountOfMeasures = Array.from({length: 24}, (_, i) => i + 2);
  
  // Measures' inputs (creating needed amount of inputs based on the amount of needed measures)
  let measuresInputs = [Array.from({length: chosenAmountOfMeasures}, (_, i) => i + 1).map((measure) => <CalculatorInput key={measure} index={measure} handleChange={getInputValues} />)];

  // Variable to store inputs for precision class and selected measurement volume.
  let precisionAndVolumeInputs;

  // If precision class is needed, display necessary inputs.
  if(isPrecisionClass) {
    precisionAndVolumeInputs = <>
      <tr><CalculatorTableInput labelName='precision-class-value' labelValue='Mērinstrumenta precizitātes klase' defaultValue={0.5} handleChange={e => setPrecisionClass(e.target.value)} /></tr>
      <tr><CalculatorTableInput labelName='measurement-volume' labelValue='Mērinsturmenta mērapjoms' defaultValue={150} handleChange={e => setMeasurementVolume(e.target.value)} /></tr>
    </>;
  }
  else
    precisionAndVolumeInputs = <></>;

  return (
    <div className="Calculator">
      <h1>Kļūdu kalkulators fizikai</h1>
      <h2>Uzstadījumi</h2>
      <table id='settings-table'>
        <tbody>
          <tr><CalculatorSelect labelId='stjudent-coef' labelName='Stjudenta koeficients' default={0.95} options={Object.keys(stjudentCoefficients)} handleChange={e => setStjudentCoef(e.target.value)}/></tr>
          <tr><CalculatorSelect labelId='measures-amount' labelName='Mērījumu skaits' default={5} options={amountOfMeasures} handleChange={e => setchosenAmountOfMeasures(e.target.value)}/></tr>
          <tr><CalculatorTableInput labelName='measurement-min-value' labelValue='Mērinstrumenta mazākā iedaļas vērtība' defaultValue={0.001} handleChange={e => setMeasurementMin(e.target.value)} /></tr>
          <tr><CalculatorTableInput labelName='checkbox-is-instrument-analog' checkbox={true} labelValue='Vai mērinstruments ir analogs?' handleChange={e => setIsInstrumentAnalog(e.target.checked)} /></tr>
          <tr><CalculatorTableInput labelName='checkbox-is-precision-class' checkbox={true} labelValue='Vai mērinstrumentam ir precizitātes klase?' handleChange={e => setIsPrecisionClass(e.target.checked)} /></tr>
          {precisionAndVolumeInputs}
        </tbody>
      </table>
      <h2>Mērījumi</h2>
      <div id='measures-inputs'>
        {measuresInputs}
      </div>
      <button onClick={outputFormulas}>Aprēķināt</button>
      <CalculatorOutput />
    </div>
  );
}

export default Calculator;