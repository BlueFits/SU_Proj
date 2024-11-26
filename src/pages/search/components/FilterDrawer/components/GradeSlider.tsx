import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { useDispatch, useSelector } from 'react-redux';
import { simGetReq } from '../../../../../services/modules/uiStates/uiStates.slice';
import { navigate } from "gatsby"
import { RootState } from '../../../../../services/store';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function GradeSlider() {
    const dispatch = useDispatch();
    const programs = useSelector((state: RootState) => state.programsReducer);
    const [value, setValue] = React.useState(50);

    const changeGrade = (avg?: string) => {
        if (window && window.gtag) {
            window.gtag("event", "search click", {
                input_value: value,
                category_type: programs.category,
            })
        }
        dispatch(simGetReq());
        //@ts-expect-error
        navigate(`/search?avg=${avg || value}`);
    }

    const handleMouseUp = (event: React.SyntheticEvent | Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => {
        console.log('Slider value committed:', value);
        changeGrade();
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 50 : Number(event.target.value));
        if (Number(event.target.value) >= 50) {
            console.log(event.target.value);
            changeGrade(event.target.value);
        }
    };

    const handleBlur = () => {
        if (value < 50) {
            setValue(50);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <Box>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs>
                    <Slider
                        min={50}
                        max={100}
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        onChangeCommitted={handleMouseUp}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min: 50,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}