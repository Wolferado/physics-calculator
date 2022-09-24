export default function CalculatorInput(props) {
    if(props.index) {
        const labelName = 'measure-' + props.index;
    
        return(
            <>
                <label htmlFor={labelName}>{props.index}. mērījums</label>
                <input type='number' name={labelName} onChange={props.handleChange} onBlur={props.handleChange} onKeyDown={preventArrowsAction} placeholder='Ievadiet vērtību šeit...'/>
            </>
        )
    }
    else if(props.checkbox) {
        return(
            <>
                <label htmlFor={props.labelName}>{props.labelValue}</label>
                <input type='checkbox' name={props.labelName} onKeyDown={preventArrowsAction} onChange={props.handleChange}/>
            </>
        )
    }
    else {
        return(
            <>
                <label htmlFor={props.labelName}>{props.labelValue}</label>
                <input type='number' name={props.labelName} defaultValue={0.001} onKeyDown={preventArrowsAction} onChange={props.handleChange} placeholder='Ievadiet vērtību šeit...'/>
            </>
        )
    }
}

const preventArrowsAction = (e) => {
    if(e.which === 38 || e.which === 40)
        e.preventDefault();
}