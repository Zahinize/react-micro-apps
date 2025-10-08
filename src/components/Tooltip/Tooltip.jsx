import { Children, cloneElement } from 'react';
import './tooltip.css';

export default function Tooltip({ text = "", placement = "top", children }) {
    const childCount = Children.count(children);
    if (childCount !== 1) {
        throw new Error(`<Tooltip> expects exactly one child, but got ${childCount}`);
    }

    const child = Children.only(children);
    return cloneElement(child, {
        className: `${child.props.className || ''} tip`,
        "data-text": text,
        "data-placement": placement
    });
}
