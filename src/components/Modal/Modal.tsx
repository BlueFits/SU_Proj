import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const BasicModal: React.FC<{ handleClose: () => void, open: boolean }> = ({ handleClose, open }) => {

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Feature is still under construction
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default BasicModal;