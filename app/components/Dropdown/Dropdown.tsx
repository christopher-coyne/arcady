import Select from 'react-select';
import styles from './Dropdown.module.css';
import React, {Dispatch, SetStateAction} from 'react';
import {ActionMeta} from 'react-select';

type DropdownProps = {
  options: {value: string; label: string}[];
  handleChange: (selectedOption: {value: string}) => void;
};

export const Dropdown = ({options, handleChange}: any) => {
  return (
    <div className={styles.container}>
      <label id="reactSelectLabel">Sort By</label>
      <Select
        aria-labelledby="reactSelectLabel"
        options={options}
        onChange={handleChange}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'transparent',
            border: 'none',
            width: '200px',
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            cursor: 'pointer',
            backgroundColor: state.isSelected
              ? 'blue'
              : state.isFocused
              ? 'lightgray'
              : 'white',
            color: state.isSelected ? 'white' : 'black',
          }),
          singleValue: (provided) => ({
            ...provided,
            color: 'white',
          }),
        }}
      />
    </div>
  );
};
