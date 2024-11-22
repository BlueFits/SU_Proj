import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import provinces from '../../../../../data/provinces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../services/store';
import { setLocation } from '../../../../../services/modules/programs/programs.slice';
import { simGetReq } from '../../../../../services/modules/uiStates/uiStates.slice';

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

    return <FormControlLabel control={<Checkbox checked={locations.some((val) => val === value)} onChange={handleChange} />} label={value} />
}

const LocationDropdown = () => {
    return (
        <div className="px-[8px] py-[6px] w-full">
            <FormGroup>
                {provinces.map((value) => {
                    return <Item value={value} />
                })}
            </FormGroup>
        </div>
    );
};

export default LocationDropdown;