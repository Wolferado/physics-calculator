// React Component that serves as a tooltip for all input fields (user-friendly)

export default function CalculatorTooltip(props) {
    return (
        <>
            <span className="tooltip">
            <span class="material-icons">help_outline</span>
                <div className="tooltip-text">
                    {props.text}
                </div>
            </span>
        </>
    );
}