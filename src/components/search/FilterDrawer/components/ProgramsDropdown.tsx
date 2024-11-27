import React from "react";
import Select, { MultiValue } from 'react-select';
import categories from "../../../../data/categories";
import { useDispatch, useSelector } from "react-redux";
import { simGetReq } from "../../../../services/modules/uiStates/uiStates.slice";
import { setCategory } from "../../../../services/modules/programs/programs.slice";
import { RootState } from "../../../../services/store";
import { useTheme } from '@mui/material/styles';

const ProgramsDropdown = () => {
    const dispatch = useDispatch();
    const programs = useSelector((state: RootState) => state.programsReducer);
    const theme = useTheme();

    const isDarkMode = theme.palette.mode === 'dark';

    const handleChange = (selected: MultiValue<{
        value: string;
        label: string;
    }>) => {
        dispatch(simGetReq());
        dispatch(setCategory(selected.map(multiValue => multiValue.value)))
    };

    return (
        <Select
            isMulti
            name="programs"
            styles={{
                input: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    border: "none",
                    padding: 0,
                    color: isDarkMode ? "#fff" : "auto",
                }),
                dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    border: "none",
                }),
                container: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    border: "none",
                }),
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    border: isDarkMode ? "#1px solid #fff" : "auto",
                }),
                menu: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: theme.palette.primary.contrastText,
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: theme.palette.primary.contrastText,
                    ":hover": {
                        backgroundColor: theme.palette.primary.main,
                        color: "#fff"
                    }
                }),
                multiValue: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: isDarkMode ? theme.palette.primary.main : "#f1f1f1",
                }),

            }}
            className="w-full"
            onChange={handleChange}
            options={categories.map(value => {
                return { value, label: value };
            })}
            value={programs.category.map((val) => {
                return { value: val, label: val }
            })}
        />
    );
}

export default ProgramsDropdown;