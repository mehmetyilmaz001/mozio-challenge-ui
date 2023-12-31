import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, FormInstance, FormItemProps } from 'antd';
import CitySearch from '../CitySearch';
import { ERROR_MESSAGES } from '../../../../contants';
import Line from '../../../../components/Line';
import PlusIcon from '../../../../assets/images/icon-plus.svg';
import RemoveIcon from '../../../../assets/images/icon-remove.svg';

import './styles.scss';


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

    const validationRule = useCallback((_: any, city: string, index: number) => {
        if (!city) {
            return Promise.reject(new Error(ERROR_MESSAGES.CITY_REQUIRED));
        }

        if (index > 0) {
            const prevCity = form.getFieldValue("cities")[index - 1];
            if (prevCity === city) {
                return Promise.reject(new Error(ERROR_MESSAGES.CITY_DUPLICATE));
            }
        }

        return Promise.resolve();
    }, [form]);

    const customValidationRule = useCallback((index: number) => {
        const originCity = form.getFieldValue("cities")[0];
        if (index > 0) {
            if (!originCity) {
                setCustomValidationParams({ index: index > 1 ? index : 0, errMsg: ERROR_MESSAGES.CITY_ORIGIN_REQUIRED });
            }
        }
    }, [form]);

    useEffect(() => {
        if (cities && cities.length > 1) {
            if (cities[0]) {
                setCustomValidationParams(initialStateValues);
            }
        }
    }, [cities]);

    const lineItems = cities ? cities.map((city: string, index: number) => {
        return {
            id: index,
            name: city,
            info: ''
        }
    }) : [];

    return (
        <div className='city-list-container'>
            <div className='list-line-row'>
                <Line items={lineItems} showLinesOnly />
                <div className='city-list'>
                    <Form.List
                        name="cities"
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <div className='form-item-wrapper' key={field.name}>
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
                                            style={{ width: '100%' }}

                                        >
                                            <CitySearch onInputKeyDown={() => customValidationRule(index)} onFail={() => {
                                                setCustomValidationParams({ index, errMsg: ERROR_MESSAGES.CITY_NOT_FOUND });
                                            }} />

                                        </Form.Item>
                                        {index > 0 ? <button onClick={() => remove(field.name)}><img src={RemoveIcon} alt='remove-icon' /></button> : <div style={{width: 26}} />}
                                    </div>
                                ))}

                                <div style={{ display: 'flex', position: 'relative' }}>
                                    <img src={PlusIcon} alt='plus-icon' style={{ position: 'absolute', left: -53, top: 8 }} />
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        <Button
                                            type="text"
                                            onClick={() => add()}
                                            style={{ padding: 0, color: '#7786D2' }}
                                        >

                                            Add Destination
                                        </Button>
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </div>
                            </>
                        )}
                    </Form.List>
                </div>
            </div>
        </div>
    );
}

export default CityList;