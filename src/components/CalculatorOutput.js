import formulas from '../formulas';

function CalculatorOutput(props) {
    return(
        <div className='output-formulas-container'>
            <p>
                Vidējā aritmētiskā kļūda: {formulas.AverageFormula(props)} <br/>
                Vidējā kvadrātiskā kļūda: {formulas.SquaredErrorFormula(props)} <br/>
                Mērījuma absolūta kļūda (gadījuma kļūda): {formulas.randomErrorFormula(props)} <br/>
                Mērījuma absolūte kļūda (sistemātiskā kļūda): {formulas.systematicErrorFormula(props)} <br/>
                Mērījuma galīgā absolūta kļūda: {formulas.relativeErrorFormula(props)} <br/>
                Relatīva kļūda: {formulas.relativeErrorFormula(props)} <br/>
            </p>
        </div>
    )
}

export default CalculatorOutput;