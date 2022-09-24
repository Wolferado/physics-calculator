export default function CalculatorTableInput(props) {

    if(props.index) {
        const labelName = 'measure-' + props.index;
    
        return(
            <>
                <td><label htmlFor={labelName}>{props.index}. mērījums</label></td>
                <td><input type='number' name={labelName} onChange={props.handleChange} onBlur={props.handleChange} onKeyDown={preventArrowsAction} placeholder='Ievadiet vērtību šeit...'/></td>
            </>
        )
    }
    else if(props.checkbox) {
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

const preventArrowsAction = (e) => {
    if(e.which === 38 || e.which === 40)
        e.preventDefault();
}