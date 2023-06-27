import { Card } from "antd"

interface IProps {
    children: React.ReactNode;
}

const AppCard = ({ children }: IProps) => {
    return (
        <Card className='home-card' style={{ minWidth: 726, padding: 40 }}>
            {children}
        </Card>
    )
}

export default AppCard;