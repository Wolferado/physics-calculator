function CalculatorInput(props) {
    const labelName = 'Measure №' + props.index;
    
    return(
        <>
            <label htmlFor={labelName}>{props.index}. mērījums</label>
            <input type='number' name={props.index} placeholder='Ievadiet vērtību šeit'/>
        </>
    )
}

export default CalculatorInput;