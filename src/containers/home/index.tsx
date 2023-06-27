import React from 'react'
import { Form, Button, InputNumber, DatePicker, Col, Row } from 'antd';
import PublicLayout from '../../layouts/PublicLayout'
import dayjs from 'dayjs';
import CityList from './components/CityList';
import AppCard from '../../components/AppCard';
import history from '../../history';
import { UI_DATE_FORMAT } from '../../contants';

const Home = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const [submittable, setSubmittable] = React.useState(false);
    const [form] = Form.useForm();
    // Watch all values
    const values = Form.useWatch([], form);

    const citiesQuery = urlParams.get('cities');
    const passengersQuery = urlParams.get('passengers');
    const dateQuery = urlParams.get('date');

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
                        passengers: passengersQuery ?? 1,
                        date: dateQuery ? dayjs(dateQuery, UI_DATE_FORMAT) : dayjs(),
                        cities: citiesQuery ? citiesQuery.split(',') : ['', ''],

                    }}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    <Row gutter={40} >
                        <Col xl={18} xs={24} md={24}>
                            <CityList form={form} />
                        </Col>
                        <Col xl={6} xs={24} md={24}>
                            <Row>
                                <Col lg={24} xs={12}>
                                    <Form.Item
                                        name="passengers"
                                        label="Passengers"
                                        required
                                    >
                                        <InputNumber min={1} max={99} />
                                    </Form.Item>
                                </Col>
                                <Col lg={24} xs={12}>
                                    <Form.Item
                                        name="date"
                                        label="DatePicker"
                                        required
                                    >
                                        <DatePicker disabledDate={current => current && current < dayjs().endOf('day')} format={UI_DATE_FORMAT} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row justify={{
                        xs: 'center',
                        sm: 'center',
                        lg: 'center'
                    }}>
                        <Col lg={6} xs={24}>
                            <Button type="primary" htmlType="submit" style={{ alignSelf: 'center', marginTop: 34, width: '100%' }} disabled={!submittable}>
                                Submit
                            </Button>
                        </Col>
                    </Row>

                </Form>

            </AppCard>
        </PublicLayout>
    )
}

export default Home