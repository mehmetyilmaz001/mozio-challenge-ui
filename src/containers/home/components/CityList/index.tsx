import React, { useEffect, useState } from 'react';
import { Button, Form, FormInstance, FormItemProps } from 'antd';
import CitySearch from '../../../../components/CitySearch';
import { ERROR_MESSAGES } from '../../../../contants';
import CircleIcon from '../../../../assets/images/icon-circle.svg';
import PinIcon from '../../../../assets/images/icon-pin.svg';
import RemoveIcon from '../../../../assets/images/icon-remove.svg';
import { MinusCircleOutlined } from '@ant-design/icons';

interface CityRowProps {
    form: FormInstance<any>;
}

const initialStateValues = { index: -1, errMsg: '' };


const CityList = ({ form }: CityRowProps) => {


    const [customValidationParams, setCustomValidationParams] = useState(initialStateValues);
    const cities = Form.useWatch('cities', form);

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


    // useEffect(() => {
    //     if (customValidationParams.errMsg === ERROR_MESSAGES.CITY_ORIGIN_REQUIRED) {
    //        console.log("originCity", cities);
    //         if (cities[0]) {
    //             setCustomValidationParams(initialStateValues);
    //         }

    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [cities]);


    // useEffect(() => {
    //     console.log("cityListSemih", form.getFieldValue("cities"));
    // }, [form.getFieldValue("cities")]);

    console.log("Cities", cities);

    return (
        <Form.List
            name="cities"
            initialValue={['']}
        >
            {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field, index) => (
                        <Form.Item
                            label={index === 0 ? 'City of origin' : 'City of destination'}
                            required={false}
                            {...field}
                            {...(customValidationParams.index === index ? cityInputErrorProps : {})}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                                {
                                    validator: async (_, city) => validationRule(_, city, index)
                                },
                            ]}
                            
                        >

                            {/* {index > 0 && index === fields.length - 1 ? (<img src={PinIcon} alt='icon-pin' />) : (<img src={CircleIcon} alt="icon-circle" />)} */}
                            <CitySearch onInputKeyDown={() => customValidationRule(index)}
                              
                            />
                            {/* {fields.length > 1 && index > 0 ? (
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(field.name)}
                                />
                            ) : null} */}
                        </Form.Item>
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
        </Form.List>
    );
}

export default CityList;