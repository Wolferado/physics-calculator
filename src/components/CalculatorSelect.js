// React Component to select an option from a list

import CalculatorTooltip from "./CalculatorTooltip";

export default function CalculatorSelect(props) {
    let selectOptions = props.options.map((opt) => <option key={opt} name={opt}>{opt}</option>);

    if(props.tooltipText) {
        return(
            <>
            <td>
                <label htmlFor={props.labelId}>{props.labelName}<CalculatorTooltip text={props.tooltipText} /></label>
            </td>
            <td>
                <select name={props.labelId} defaultValue={props.default} id={props.labelId} onChange={props.handleChange}>
                    {selectOptions}
                </select>
            </td>
            </>
        )
    }
    else {
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
    }
}