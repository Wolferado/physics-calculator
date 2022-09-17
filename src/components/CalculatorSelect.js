function CalculatorSelect(props) {
    let selectOptions = props.options.map((opt) => <option name={opt}>{opt}</option>);

    return(
        <>
            <label htmlFor={props.labelId}>{props.labelValue}</label>
            <select name={props.labelId} id={props.labelId} onChange={props.handleChange}>
                {selectOptions}
            </select>
        </>
    )
}

export default CalculatorSelect;