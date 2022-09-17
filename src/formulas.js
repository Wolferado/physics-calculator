const averageFormula = (amountOfMeasures, measures, averageValue) => {
    return("\(m_{vid}= \frac{1}{"+ {amountOfMeasures} +"} \sum_{i=1}^{" + {amountOfMeasures} + "}\ m_i= \frac{"+ {measures} +"}{"+{amountOfMeasures}+"} = "+{averageValue}+" \) <br>")
}
const squaredErrorFormula = (amount, measuresAmount, averageValue, squaredValue) => {
    return("\(s_m = \sqrt{\frac{sum_{i=1}^{"+{amount}+"}(m_i - m_{vid})^2}{"+{measuresAmount}+"("+{measuresAmount}+"-1)}}= \sqrt\frac{measure - avg sum}{"+{measuresAmount}*({measuresAmount}-1)+"} = sqr\) <br>");
}

const randomErrorFormula = () => {
    return("\(△m_s = s_m * t_Β(n) = sqr * coef = rand \) <br>");
}

const systematicErrorFormula = () => {
    return("\(△m_𝛿 = \frac{𝛿_s}{3}t_Β(\infty) = \frac{min measurement}{3} * max for inf coef = syst\)");
}

const absoluteErrorFormula = () => {
    return("\(△m = \sqrt{△m_s^2 + △m_𝛿^2}\) <br> \(△m_s >> △m_𝛿 => △m = △m_s = abs\) <br>")
}

const relativeErrorFormula = () => {
    return("\(ε_m = \frac{△m}{m_{vid}} * 100 = \frac{abs}{avg} = rel \)");
}

/*
\(m_{vid}= \frac{1}{5} \sum_{i=1}^{amount}\ m_i= \frac{measures}{5} = avg \) <br>
\(s_m = \sqrt{\frac{sum_{i=1}^{amount}(m_i - m_{vid})^2}{measures(measures-1)}}= \sqrt\frac{measure - avg sum}{numbers multiply} = sqr\) <br>
\(△m_s = s_m * t_Β(n) = sqr * coef = rand \) <br>
\(△m_𝛿 = \frac{𝛿_s}{3}t_Β(\infty) = \frac{min measurement}{3} * max for inf coef = syst\)
\(△m = \sqrt{△m_s^2 + △m_𝛿^2}\) <br>
\(△m_s >> △m_𝛿 => △m = △m_s = abs\) <br>
\(ε_m = \frac{△m}{m_{vid}} * 100 = \frac{abs}{avg} = rel \)
*/

const formulas = {averageFormula, squaredErrorFormula, randomErrorFormula, systematicErrorFormula, absoluteErrorFormula, relativeErrorFormula};
export default formulas;