import React from 'react';

import './styles.scss';

interface IProps {
    children: React.ReactNode;
}

const PublicLayout = (props: IProps) => {
    return (
        <div className='public-layout'>
            {props.children}
        </div>
    )
}

export default PublicLayout;
