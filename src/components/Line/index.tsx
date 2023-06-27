
import React from 'react';
import CircleIcon from '../../assets/images/icon-circle.svg';
import PinIcon from '../../assets/images/icon-pin.svg';
import InfoBubble from '../../assets/images/info-bubble.svg';

import './styles.scss'

export type LineItem = {
    id: string;
    name: string;
    info: string;
}

interface ILineProps {
    items: LineItem[];
    itemHeight?: number;
    showLinesOnly?: boolean;
}

const Line: React.FC<ILineProps> = ({ items, itemHeight, showLinesOnly }) => {

    return (<div className="line-component" style={{marginTop: itemHeight ? itemHeight / 2 + 3 : 40 }}>
        {items.map((item, index) => {
            const indicatorIcon = index > 0 && index === items.length - 1 ? {icon: PinIcon, altText: 'pin-icon'} : {icon: CircleIcon, altText: 'circle-icon'};
            return (
                <div className="line-item" key={item.id} style={{height: itemHeight ?? 83}}>
                    <img className='icon' src={indicatorIcon.icon} alt={indicatorIcon.altText} />
                    <div className='line' />
                    {!showLinesOnly && item.name && <div className="name">{item.name}</div> }
                    {!showLinesOnly && item.info && <div className="info"><img src={InfoBubble} alt='info-bubble' /><span>{item.info}</span></div> }
                </div>)
        })}
    </div>);
};

export default Line;