import React from 'react'
import { Card, Form, Button, InputNumber, DatePicker, Col, Row} from 'antd';
import PublicLayout from '../../layouts/PublicLayout'
import dayjs from 'dayjs';
import CityList from './components/CityList';

const Home = () => {
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    const cities = Form.useWatch('cities', form);
    console.log("cities home", cities);


    return (
        <PublicLayout>
            <Card>

                <Form
                    name="dynamic_form_item"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    layout='vertical'
                    form={form}
                    initialValues={{
                        passengers: 1,
                        date: dayjs(),
                        
                    }}
                >
                    <Row gutter={80}>
                        <Col span={12}>
                            <CityList form={form} />
                        </Col>
                        <Col span={12}>
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

                    <Row>
                        <Col span={12}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>

            </Card>
        </PublicLayout>
    )
}

export default Home