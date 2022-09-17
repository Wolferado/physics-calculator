import formulas from '../formulas';

function CalculatorOutput(props) {
    return(
        <div className='output-formulas-container'>
            {formulas.averageFormula(props.amountOfMeasures, props.measures, props.averageValue)};
        </div>
    )
}

export default CalculatorOutput;