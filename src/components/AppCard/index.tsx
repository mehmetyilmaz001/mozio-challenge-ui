import { Card } from "antd"

import './styles.scss';

interface IProps {
    children: React.ReactNode;
}

const AppCard = ({ children }: IProps) => {
    return (
        <Card className='app-card' style={{ padding: 40 }}>
            {children}
        </Card>
    )
}

export default AppCard;