import React, { ReactNode, useState } from "react";
import ListItem from '@mui/material/ListItem';
import { Button } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../services/store";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import useMediaQuery from '@mui/material/useMediaQuery';


interface ListFilerDropDown {
    title: string;
    children: ReactNode;
    toolTip?: ReactNode | null;
}

const ListFilterDropdown: React.FC<ListFilerDropDown> = ({ title, children, toolTip }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isToolTipOpen, setIsToolTipOpen] = useState(false);
    const matches = useMediaQuery('(min-width:600px)');

    const user = useSelector((state: RootState) => state.userReducer);
    const programs = useSelector((state: RootState) => state.programsReducer);

    const handleClose = () => {
        setIsToolTipOpen(false);
    };

    const handleOpen = () => {
        setIsToolTipOpen(!isToolTipOpen);
    };

    const filterInteraction = () => {
        if (window && window.gtag) {
            window.gtag("event", `filter interact ${title}`, {
                grade: user.grade,
                program_category: programs.category,
            })
        }
    }

    return (
        <div onClick={filterInteraction} className="pt-[10px]">
            <ListItem disablePadding>
                <div className="w-full">
                    <div className="px-[8px] py-[6px] flex justify-between items-center">
                        <Button
                            onClick={() => setIsOpen(!isOpen)}
                            sx={{
                                textTransform: "none",
                                '&:hover': {
                                    backgroundColor: 'inherit', // Keep the same background color
                                    boxShadow: 'none',         // Remove any box shadow
                                },
                                transition: 'none',          // Disable any transition animation
                            }}
                            variant="text"
                            startIcon={!isOpen ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
                            color='inherit'
                        >
                            {title}
                        </Button>

                        {toolTip &&
                            <Tooltip
                                open={isToolTipOpen}
                                title={toolTip}
                                placement={matches ? "right" : "bottom"}
                            >
                                <IconButton
                                    onClick={handleOpen}
                                    onBlur={handleClose}
                                    color="info"
                                    aria-label="delete"
                                >
                                    <InfoIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    </div>
                    {isOpen &&
                        <div className="px-[8px] py-[6px] w-full">
                            {children}
                        </div>
                    }
                </div>
            </ListItem>
            <Divider sx={{ marginTop: "10px" }} />
        </div>
    );
};

export default ListFilterDropdown;