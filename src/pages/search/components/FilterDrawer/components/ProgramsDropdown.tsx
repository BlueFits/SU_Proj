import React from "react";
import Select, { MultiValue } from 'react-select';
import categories from "../../../../../data/categories";
import { useDispatch, useSelector } from "react-redux";
import { simGetReq } from "../../../../../services/modules/uiStates/uiStates.slice";
import { setCategory } from "../../../../../services/modules/programs/programs.slice";
import { RootState } from "../../../../../services/store";

const ProgramsDropdown = () => {
    const dispatch = useDispatch();
    const programs = useSelector((state: RootState) => state.programsReducer);

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