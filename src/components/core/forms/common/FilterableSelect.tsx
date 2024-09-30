import { FuseOptionsWithKeys } from '@/@types/common';
import { Select } from 'antd';
import Fuse from 'fuse.js';
import React, { useState } from 'react';


interface FilterableSelectProps<U extends object> {
    className?: string;
    placeholder?: string;
    dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
    keyExtractor: (item: U) => string | number;
    labelExtractor: (item: U) => React.ReactNode;
    valueExtractor: (item: U) => string | number;
    value?: string | number;
    onChange?: (value: string | number) => void;
    disabled?: boolean;
    optionRenderer?: (item: U) => React.ReactNode;
    dropdownOptionRenderer?: (item: U) => React.ReactNode;
    dropdownClassName?: string;
    options: U[];
    fuseOptions?: FuseOptionsWithKeys<U>;
    searchEnabled?: boolean;
    suffixIcon?: React.ReactNode;
}

const FilterableSelect = <U extends object,>(props: FilterableSelectProps<U>) => {
    const {
        className,
        placeholder,
        dropdownOptionRenderer,
        keyExtractor,
        labelExtractor,
        valueExtractor,
        value,
        onChange,
        disabled,
        optionRenderer,
        fuseOptions,
        options,
        suffixIcon,
        searchEnabled = true,
    } = props;
    const [searchValue, setSearchValue] = useState<string>('');

    const fuse = new Fuse(options || [], fuseOptions);
    const filteredOptions = searchValue && searchEnabled
        ? fuse.search(searchValue).map(result => result.item)
        : options;

    const selectOptions = filteredOptions.map((item) => ({
        value: valueExtractor(item),
        label: optionRenderer ? optionRenderer(item) : labelExtractor(item),
        key: keyExtractor(item),
    }));

    const handleSearch = (input: string) => {
        setSearchValue(input);
    };

    const dropdownRenderer = () => (
        <div>
            {filteredOptions.map((option) => (
                <div key={keyExtractor(option)} className={props.dropdownClassName} onClick={() => onChange?.(valueExtractor(option))}>
                    {dropdownOptionRenderer ? dropdownOptionRenderer(option) : labelExtractor(option)}
                </div>
            ))}
        </div>
    );
    return (
        <Select
            disabled={disabled}
            value={value}
            className={className}
            placeholder={placeholder}
            onChange={onChange}
            showSearch={searchEnabled}
            onSearch={searchEnabled ? handleSearch : undefined}
            options={selectOptions}
            dropdownRender={dropdownOptionRenderer? dropdownRenderer : undefined}
            filterOption={false}
            suffixIcon={suffixIcon}
        />
    );
};

export default FilterableSelect;
