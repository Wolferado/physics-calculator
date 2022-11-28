// React Component to output solved formulas with

export default function CalculatorOutput(props) {
    return(
        <div className='output-formulas-container'>
            <p className="mathjax-formulas">
                
            </p>
        </div>
    )
}

// Formulas that had to be used
/**
                Vidējā aritmētiskā kļūda: {averageFormula(props)} <br/>
                Vidējā kvadrātiskā kļūda: {squaredErrorFormula(props)} <br/>
                Mērījuma absolūta kļūda (gadījuma kļūda): {randomErrorFormula(props)} <br/>
                Mērījuma absolūte kļūda (sistemātiskā kļūda): {systematicErrorFormula(props)} <br/>
                Mērījuma galīgā absolūta kļūda: {absoluteErrorFormula(props)} <br/>
                Relatīva kļūda: {relativeErrorFormula(props)} <br/>
 */