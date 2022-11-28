// React Component to receive an input that isn't a measure

import CalculatorTooltip from "./CalculatorTooltip";

export default function CalculatorTableInput(props) {

    if(props.tooltipText) {
        if(props.checkbox) {
            return(
                <>
                    <td><label htmlFor={props.labelName}>{props.labelValue} <CalculatorTooltip text={props.tooltipText} /></label></td>
                    <td><input type='checkbox' name={props.labelName} onKeyDown={preventArrowsAction} onChange={props.handleChange}/></td>
                </>
            )
        }
        else {
            return(
                <>
                    <td><label htmlFor={props.labelName}>{props.labelValue} <CalculatorTooltip text={props.tooltipText} /></label></td>
                    <td><input type='number' name={props.labelName} defaultValue={props.defaultValue} onKeyDown={preventArrowsAction} onChange={props.handleChange} placeholder='Ievadiet vērtību šeit...'/></td>
                </>
            )
        }
    }
    else {
        if(props.checkbox) {
            return(
                <>
                    <td><label htmlFor={props.labelName}>{props.labelValue}</label></td>
                    <td><input type='checkbox' name={props.labelName} onKeyDown={preventArrowsAction} onChange={props.handleChange}/></td>
                </>
            )
        }
        else {
            return(
                <>
                    <td><label htmlFor={props.labelName}>{props.labelValue}</label></td>
                    <td><input type='number' name={props.labelName} defaultValue={props.defaultValue} onKeyDown={preventArrowsAction} onChange={props.handleChange} placeholder='Ievadiet vērtību šeit...'/></td>
                </>
            )
        }
    }
}

const preventArrowsAction = (e) => {
    if(e.which === 38 || e.which === 40)
        e.preventDefault();
}