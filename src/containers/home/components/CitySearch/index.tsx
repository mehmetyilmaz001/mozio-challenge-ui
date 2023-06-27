import { SelectProps } from 'antd';
import DebounceSelect from '../../../../components/DebounceSelect';
import { DefaultOptionType, LabeledValue } from 'antd/es/select';
import useFetchCities from './useFetchCities';
import MinusIcon from '../../../../assets/images/icon-remove.svg';
import CircleIcon from '../../../../assets/images/icon-circle.svg';
import PinIcon from '../../../../assets/images/icon-pin.svg';

import './styles.scss';

export interface DebounceSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
    fetchOptions: (search: string) => Promise<ValueType[]>;
    debounceTimeout?: number;
}


interface ICitySearchProps {
    value?: LabeledValue | LabeledValue[];
    onChange?: (value: LabeledValue | LabeledValue[] | undefined, option: DefaultOptionType | DefaultOptionType[]) => void;
    onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    index: number;
    remove: (index: number) => void;
    name: number;
    fieldsLen: number;
}

const CitySearch: React.FC<ICitySearchProps> = ({ value, onChange, onInputKeyDown, remove, index, name, fieldsLen }) => {
    const fetchCityList = useFetchCities();

    return (
        <div className='city-search'>
            {index > 0 && index === fieldsLen - 1 ? (<img src={PinIcon} alt='icon-pin' />) : (<img src={CircleIcon} alt="icon-circle" />)}

            <DebounceSelect
                value={value}
                fetchOptions={fetchCityList}
                onChange={onChange}
                onInputKeyDown={onInputKeyDown}
                style={{ width: '100%' }}
                allowClear
            />
            {index > 1 ? (
                <button
                    className="dynamic-delete-button"
                    onClick={() => remove(name)}
                ><img src={MinusIcon} alt="icon-minus" /></button>
            ) : null}
        </div>

    );
}

export default CitySearch;