import './tooltip.css';

export default function Tooltip({ text = "", placement = "top", children }) {
    return (
        <span data-text={text} data-placement={placement} className="tip">
            {children}
        </span>
    )
}