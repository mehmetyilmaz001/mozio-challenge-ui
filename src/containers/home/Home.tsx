import React from 'react'
import { Card, Form, Button, FormItemProps, InputNumber, DatePicker, Col, Row} from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import PublicLayout from '../../layouts/PublicLayout'
import CitySearch from '../../components/CitySearch';
import dayjs from 'dayjs';
import CircleIcon from '../../assets/images/icon-circle.svg';
import PinIcon from '../../assets/images/icon-pin.svg';
import CityRow from './components/CityList';
import CityList from './components/CityList';

const ERROR_MESSAGES = {
    CITY_REQUIRED: 'Please select a city',
    CITY_ORIGIN_REQUIRED: 'You must choose the city of origin',
    CITY_DUPLICATE: 'The city of origin and destination cannot be the same'
}

const Home = () => {
    const [form] = Form.useForm();
    const [customValidationParams, setCustomValidationParams] = React.useState({
        index: -1,
        errMsg: ''
    });
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    const cityInputErrorProps: Pick<FormItemProps, 'validateStatus' | 'help'> = {
        help: customValidationParams.errMsg,
        validateStatus: "error",
    };

    const validationRule = (_: any, city: string, index: number) => {
        if (!city) {
            return Promise.reject(new Error(ERROR_MESSAGES.CITY_REQUIRED));
        }

        if (index > 0) {
            const prevCity = form.getFieldValue("cities")[index - 1];
            if (prevCity === city) {
                return Promise.reject(new Error(ERROR_MESSAGES.CITY_DUPLICATE));
            }
        }
    }

    const customValidationRule = (index: number) => {
        if (index > 0) {
            const originCity = form.getFieldValue("cities")[0];
            if (!originCity) {
                setCustomValidationParams({ index: index > 1 ? index : 0, errMsg: ERROR_MESSAGES.CITY_ORIGIN_REQUIRED });
            }
        }
    }

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
                        passengers: 1
                        
                    }}
                >
                    <Row gutter={80}>
                        <Col span={12}>
                            {/* <Form.List
                                name="cities"
                                initialValue={['']}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                label={index === 0 ? 'City of origin' : 'City of destination'}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    {...(customValidationParams.index === index ? cityInputErrorProps : {})}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            validator: async (_, city) => validationRule(_, city, index)
                                                        },
                                                    ]}
                                                >
                                                    {index > 0 && index === fields.length - 1 ? (<img src={PinIcon} alt='icon-pin' />) : (<img src={CircleIcon} alt="icon-circle" />)}
                                                    <CitySearch onInputKeyDown={() => customValidationRule(index)}
                                                    />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                            // <CityRow key={field.key} field={field} fieldLen={fields.length} form={form} index={index} remove={remove} cities={form.getFieldValue("cities")}/>
                                        ))}


                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                style={{ width: '60%' }}
                                            >
                                                Add Destination
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List> */}
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
                                <DatePicker disabledDate={current => current && current < dayjs().endOf('day')} />
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