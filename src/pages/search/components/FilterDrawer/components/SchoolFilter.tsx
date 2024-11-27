import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import provinces from '../../../../../data/provinces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../services/store';
import { setCategory, setLocation, setOverallRankingSort } from '../../../../../services/modules/programs/programs.slice';
import { simGetReq } from '../../../../../services/modules/uiStates/uiStates.slice';
import FormLabel from '@mui/material/FormLabel';
import Select, { MultiValue } from 'react-select';
import categories from "../../../../../data/categories";
import { useTheme } from '@mui/material/styles';



const Item: React.FC<{ value: string }> = ({ value }) => {
    const locations = useSelector((state: RootState) => state.programsReducer).selectedLocation;
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(simGetReq());
        if (event.target.checked) {
            console.log(value, event.target.checked);
            dispatch(setLocation([...locations, value]));
        } else {
            console.log(value, event.target.checked, "removing");
            dispatch(setLocation(locations.filter((val) => val !== value)));
        }
    };


    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={locations.some((val) => val === value)}
                    onChange={handleChange}
                />
            }
            label={value}
        />
    );
}

const SchoolFilter = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const programs = useSelector((state: RootState) => state.programsReducer);
    const isDarkMode = theme.palette.mode === 'dark';

    const handleChangeSelect = (selected: MultiValue<{
        value: string;
        label: string;
    }>) => {
        dispatch(simGetReq());
        dispatch(setCategory(selected.map(multiValue => multiValue.value)))
    };

    const overallRankingToggleHandler = () => {
        dispatch(simGetReq());
        dispatch(setOverallRankingSort(!programs.overallRankingSort));
    };

    return (
        <div className="px-[8px] py-[6px] w-full">
            <FormGroup>
                <FormLabel sx={{ marginBottom: 1 }} id="demo-radio-buttons-group-label">Sort by</FormLabel>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={programs.overallRankingSort}
                            onChange={overallRankingToggleHandler}
                        />
                    }
                    label={"Overall ranking"}
                />
                {/* 
                <FormLabel sx={{ marginBottom: 1, marginTop: 2 }} id="demo-radio-buttons-group-label">Universities</FormLabel>
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
                    onChange={handleChangeSelect}
                    options={categories.map(value => {
                        return { value, label: value };
                    })}
                    value={programs.category.map((val) => {
                        return { value: val, label: val }
                    })}
                />

                <FormLabel sx={{ marginBottom: 1, marginTop: 2 }} id="demo-radio-buttons-group-label">Colleges</FormLabel>
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
                    onChange={handleChangeSelect}
                    options={categories.map(value => {
                        return { value, label: value };
                    })}
                    value={programs.category.map((val) => {
                        return { value: val, label: val }
                    })}
                /> */}
            </FormGroup>

        </div>
    );
};

export default SchoolFilter;