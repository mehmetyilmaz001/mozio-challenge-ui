import React from 'react'
import { Form, Button, InputNumber, DatePicker, Col, Row } from 'antd';
import PublicLayout from '../../layouts/PublicLayout'
import dayjs from 'dayjs';
import CityList from './components/CityList';
import AppCard from '../../components/AppCard';
import history from '../../history';

const Home = () => {
    const [submittable, setSubmittable] = React.useState(false);
    const [form] = Form.useForm();
    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    const onFinish = (values: any) => {
        const cities = values.cities.join(',');
        const date = values.date.format('DD/MM/YYYY');
        history.push(`/result?cities=${cities}&passengers=${values.passengers}&date=${date}`);
    };

    return (
        <PublicLayout>
            <AppCard>
                <Form
                    name="dynamic_form_item"
                    onFinish={onFinish}
                    layout='vertical'
                    form={form}
                    initialValues={{
                        passengers: 1,
                        date: dayjs(),

                    }}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    <Row gutter={50}>
                        <Col span={18}>
                            <CityList form={form} />
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="passengers"
                                label="Passengers"
                            >
                                <InputNumber min={1} max={99} />
                            </Form.Item>
                            <Form.Item
                                name="date"
                                label="DatePicker"
                            >
                                <DatePicker disabledDate={current => current && current < dayjs().endOf('day')} format="DD/MM/YYYY" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button type="primary" htmlType="submit" style={{ alignSelf: 'center', marginTop: 34 }} disabled={!submittable}>
                        Submit
                    </Button>

                </Form>

            </AppCard>
        </PublicLayout>
    )
}

export default Home