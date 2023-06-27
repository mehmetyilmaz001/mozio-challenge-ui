import React, { useEffect, useState } from 'react';
import { Button, Form, FormInstance, FormItemProps } from 'antd';
import CitySearch from '../CitySearch';
import { ERROR_MESSAGES } from '../../../../contants';


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
        const originCity = form.getFieldValue("cities")[0];
        if (index > 0) {
            if (!originCity) {
                setCustomValidationParams({ index: index > 1 ? index : 0, errMsg: ERROR_MESSAGES.CITY_ORIGIN_REQUIRED });
            }
        }
    }

    useEffect(() => {
        if (cities && cities.length > 1) {
            if (cities[0]) {
                setCustomValidationParams(initialStateValues);
            }
        }
    }, [cities]);

    return (
        <Form.List
            name="cities"
            initialValue={['', '']}
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

                            <CitySearch onInputKeyDown={() => customValidationRule(index)}
                                name={field.name}
                                index={index}
                                remove={remove}
                                fieldsLen={fields.length}
                            />

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