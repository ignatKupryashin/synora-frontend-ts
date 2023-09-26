import React, {ReactNode} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import styles from "./AppSelect.module.scss"

export interface AppSelectProps<T> {
    id?: string,
    label?: string,
    value: T;
    options: AppSelectOption<T>[];
    onChange: ((event: SelectChangeEvent<any>, child: ReactNode) => void) | undefined;
    placeholder?: string,
    width?: string;
}

export interface AppSelectOption<T> {
    value: T,
    label: string
}

const AppSelect = (props: AppSelectProps<any>) => {

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            {props.label &&
            <InputLabel>
                {props.label}
            </InputLabel>
            }
        <Select
            labelId={props.id}
            id={props.id}
            value={props.value}
            label={props.label}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className={styles.AppSelect}
            sx={{
                borderRadius: '16px',
                width: props.width || '300px'
            }}

        >
            {props.options.map((element) => (
                <MenuItem key={element.label} value={element.value}>{element.label}</MenuItem>
                ))}
        </Select>
        </FormControl>
    );
// };


}

export default AppSelect;