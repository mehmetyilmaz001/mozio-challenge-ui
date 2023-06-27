import { SelectProps } from 'antd';
import DebounceSelect from '../DebounceSelect';
import { DefaultOptionType, LabeledValue } from 'antd/es/select';
import useFetchCities from './useFetchCities';

export interface DebounceSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
    fetchOptions: (search: string) => Promise<ValueType[]>;
    debounceTimeout?: number;
}




interface ICitySearchProps {
    value?: LabeledValue | LabeledValue[];
    onChange?: (value: LabeledValue | LabeledValue[] | undefined, option: DefaultOptionType | DefaultOptionType[]) => void;
    onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CitySearch: React.FC<ICitySearchProps> = ({ value, onChange, onInputKeyDown }) => {

    const fetchCityList = useFetchCities();
    
    return (
        <DebounceSelect
            value={value}
            fetchOptions={fetchCityList}
            onChange={onChange}
            onInputKeyDown={onInputKeyDown}
            style={{ width: '100%' }}
            allowClear
        />

    );
}

export default CitySearch;