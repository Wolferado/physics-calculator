export default function CalculatorInput(props) {

    if(props.index) {
        const labelName = 'measure-' + props.index;
    
        return(
            <>
                <label htmlFor={labelName}>{props.index}. mērījums</label>
                <input type='number' name={labelName} onChange={props.handleChange} onBlur={props.handleChange} placeholder='Ievadiet vērtību šeit'/>
            </>
        )
    }
    else {
        return(
            <>
                <label htmlFor={props.labelName}>{props.labelValue}</label>
                <input type='number' name={props.labelName} defaultValue={0.001} onChange={props.handleChange} placeholder='Ievadiet vērtību šeit'/>
            </>
        )
    }
}