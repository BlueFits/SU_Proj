import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { setCategory, setLocation } from '../../services/modules/programs/programs.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 1000,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
};

const canadianProvinces: string[] = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Québec",
    "Saskatchewan"
];

const FilterModal: React.FC<{ handleClose: () => void, open: boolean }> = ({ handleClose, open }) => {
    const dispatch = useDispatch();
    const programs = useSelector((state: RootState) => state.programsReducer);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'grey', // Default border color
                                },
                                color: "grey"
                            },
                        }}
                        value={programs.selectedLocation}
                        onChange={(e) => {
                            if (window && window.gtag) {
                                window.gtag("event", "location filter click", {
                                    page_path: window.location.pathname,
                                    location_value: e.target.value,
                                })
                            }
                            dispatch(setLocation(e.target.value));
                            handleClose();
                        }}
                        select
                        label="Province"
                        defaultValue={"All"}
                        slotProps={{
                            select: {
                                native: true,
                            },
                        }}
                    >
                        {["All", ...canadianProvinces].map((option) => (
                            <option
                                key={option}
                                value={option}
                            >
                                {option}
                            </option>
                        ))}
                    </TextField>
                </Box>
            </Modal>
        </div>
    );
}

export default FilterModal;