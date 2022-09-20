export const averageFormula = (measures, amount, averageValue) => {
    let sum = 0;

    for(let i = 0; i < measures.length; i++) {
        sum += measures[i];
    }

    return("\\(m_{vid}= \\frac{1}{"+amount+"} \\sum_{i=1}^{"+amount+"}\\ m_i =\\frac{"+parseFloat(sum.toFixed(4))+"}{"+amount+"} = "+averageValue+" \\)");
}
export const squaredErrorFormula = (measures, amount, averageValue, squaredError) => {
    let error = 0;
    let result;

    for(let i = 0; i < measures.length; i++) {
        result = measures[i] - averageValue;
        error += Math.pow(result, 2);
    }

    return("\\(s_m = \\sqrt{\\frac{\\sum_{i=1}^{"+amount+"}(m_i - m_{vid})^2}{"+amount+"("+amount+"-1)}}= \\sqrt\\frac{"+error.toFixed(4)+"}{"+(amount * (amount - 1))+"} = "+squaredError+"\\)");
}

export const randomErrorFormula = (stjudentCoef, stjudentCoefficients, amount, squaredError, randomError) => {
    return("\\(△m_s = s_m * t_Β(n) = "+squaredError+" * "+stjudentCoefficients[stjudentCoef][amount - 1]+" = "+randomError+" \\)");
}

export const systematicErrorFormula = (measurementMin, maxCoefValue, systematicError) => {
    return("\\(△m_𝛿 = \\frac{𝛿_s}{3}t_Β(\\infty) = \\frac{"+measurementMin+"}{3} * "+maxCoefValue+" = "+systematicError+"\\)");
}

export const absoluteErrorFormula = (randomError, systematicError, absoluteError) => {
    if(randomError / systematicError >= 3)
        return("\\(△m_s >> △m_𝛿 => △m = △m_s = "+absoluteError+"\\)");
    else if(systematicError / randomError >= 3)
        return("\\(△m_𝛿 >> △m_s => △m = △m_𝛿 = "+absoluteError+"\\)");
    else
        return("\\(△m = \\sqrt{△m_s^2 + △m_𝛿^2} = \\sqrt{"+randomError+"^2 + "+systematicError+"^2}\\ = "+absoluteError+"\\)"); 
}

export const relativeErrorFormula = (averageValue, absoluteError, relativeError) => {
    return("\\(ε_m = \\frac{△m}{m_{vid}} * 100 = \\frac{"+absoluteError+"}{"+averageValue+"} = "+relativeError+" \\)");
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