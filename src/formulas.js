const averageFormula = (props) => {
    let sum = 0;

    for(let i = 0; i < props.measures.length; i++) {
        sum += props.measures[i];
    }

    return("\\(m_{vid}= \\frac{1}{"+props.amount+"} \\sum_{i=1}^{"+props.amount+"}\\ m_i= \\frac{"+parseFloat(sum)+"}{"+props.amount+"} = "+props.averageValue+" \\)");
}
const squaredErrorFormula = (props) => {
    let sum = 0;

    for(let i = 0; i < props.measures.length; i++) {
        sum += (props.measures[i] - props.averageValue);
    }

    return("\\(s_m = \\sqrt{\\frac{sum_{i=1}^{"+props.amount+"}(m_i - m_{vid})^2}{"+props.amount+"("+props.amount+"-1)}}= \\sqrt\\frac{"+sum+"}{"+(props.amount * (props.amount - 1))+"} = "+props.squaredError+"\\)");
}

const randomErrorFormula = (props) => {
    return("\\(△m_s = s_m * t_Β(n) = "+props.squaredError+" * "+props.stjudentCoef+" = "+props.randomError+" \\)");
}

const systematicErrorFormula = (props) => {
    return("\\(△m_𝛿 = \\frac{𝛿_s}{3}t_Β(\\infty) = \\frac{"+props.measurementMin+"}{3} * "+props.maxCoefValue+" = "+props.systematicError+"\\)");
}

const absoluteErrorFormula = (props) => {
    return("\\(△m = \\sqrt{△m_s^2 + △m_𝛿^2}\\) vai \\(△m_s >> △m_𝛿 => △m = △m_s = "+props.absoluteError+"\\)")
}

const relativeErrorFormula = (props) => {
    return("\\(ε_m = \\frac{△m}{m_{vid}} * 100 = \\frac{"+props.absoluteError+"}{"+props.averageValue+"} = "+props.relativeError+" \\)");
}

/*
\\(m_{vid}= \\frac{1}{5} \\sum_{i=1}^{amount}\\ m_i= \\frac{measures}{5} = avg \\) <br>
\\(s_m = \\sqrt{\\frac{sum_{i=1}^{amount}(m_i - m_{vid})^2}{measures(measures-1)}}= \\sqrt\\frac{measure - avg sum}{numbers multiply} = sqr\\) <br>
\\(△m_s = s_m * t_Β(n) = sqr * coef = rand \\) <br>
\\(△m_𝛿 = \\frac{𝛿_s}{3}t_Β(\\infty) = \\frac{min measurement}{3} * max for inf coef = syst\\)
\\(△m = \\sqrt{△m_s^2 + △m_𝛿^2}\\) <br>
\\(△m_s >> △m_𝛿 => △m = △m_s = abs\\) <br>
\\(ε_m = \\frac{△m}{m_{vid}} * 100 = \\frac{abs}{avg} = rel \\)
*/

const formulas = {averageFormula, squaredErrorFormula, randomErrorFormula, systematicErrorFormula, absoluteErrorFormula, relativeErrorFormula};

export default formulas;