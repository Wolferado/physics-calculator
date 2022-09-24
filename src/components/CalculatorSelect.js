export default function CalculatorSelect(props) {
    let selectOptions = props.options.map((opt) => <option key={opt} name={opt}>{opt}</option>);

    return(
        <>
        <td>
            <label htmlFor={props.labelId}>{props.labelName}</label>
        </td>
        <td>
            <select name={props.labelId} defaultValue={props.default} id={props.labelId} onChange={props.handleChange}>
                {selectOptions}
            </select>
        </td>
        </>
    )
    /*return(
        <>
            <label htmlFor={props.labelId}>{props.labelName}</label>
            <select name={props.labelId} defaultValue={props.default} id={props.labelId} onChange={props.handleChange}>
                {selectOptions}
            </select>
        </>
    )*/
}