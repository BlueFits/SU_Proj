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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { setGrade } from '../../../../../services/modules/users/users.slice';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function GradeSlider() {
    const dispatch = useDispatch();
    const programs = useSelector((state: RootState) => state.programsReducer);
    const user = useSelector((state: RootState) => state.userReducer);
    // const [value, setValue] = React.useState(Number(user.grade));

    React.useEffect(() => {
        const userInputAvg = location ? new URLSearchParams(location.search).get("avg") : null;
        dispatch(setGrade(Number(userInputAvg)));
    }, []);

    const changeGrade = (avg?: string) => {
        if (window && window.gtag) {
            window.gtag("event", "search click", {
                input_value: user.grade,
                category_type: programs.category,
            })
        }
        dispatch(simGetReq());
        //@ts-ignore
        navigate(`/search?avg=${avg || user.grade}`);
    }

    const handleMouseUp = (event: React.SyntheticEvent | Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => {
        changeGrade();
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        dispatch(setGrade(newValue as number));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setGrade(event.target.value === '' ? 50 : Number(event.target.value)));
        if (Number(event.target.value) >= 50) {
            changeGrade(event.target.value);
        }
    };

    const handleBlur = () => {
        if ((user.grade || 0) <= 50) {
            dispatch(setGrade(50));
        } else if ((user.grade || 0) > 100) {
            dispatch(setGrade(100));
        }
    };

    return (
        <Box>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs>
                    <Slider
                        min={50}
                        max={100}
                        value={user.grade || 50}
                        onChange={handleSliderChange}
                        onChangeCommitted={handleMouseUp}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={user.grade}
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
            <FormControl sx={{ marginTop: 2 }}>
                <FormLabel sx={{ marginBottom: 1 }} id="demo-radio-buttons-group-label">Sort by</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio />} label="Ascending" />
                    <FormControlLabel value="male" control={<Radio />} label="Descending" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}