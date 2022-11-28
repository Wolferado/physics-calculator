// React Component used to receive measures to calculate

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
}

const preventArrowsAction = (e) => {
    if(e.which === 38 || e.which === 40)
        e.preventDefault();
}