import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import ListFilterDropdown from './components/ListFilterDropdown';
import ProgramsDropdown from './components/ProgramsDropdown';
import { useDispatch } from 'react-redux';
import { setCategory, setLocation } from '../../../services/modules/programs/programs.slice';
import { simGetReq } from '../../../services/modules/uiStates/uiStates.slice';
import LocationDropdown from './components/LocationDropdown';
import GradeSlider from './components/GradeSlider';
import SchoolFilter from './components/SchoolFilter';
import { Typography } from '@mui/material';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'end',
    height: "100px",
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

interface IFilterDrawer {
    open: boolean;
    handleDrawerClose: () => void;
    children: any;
}

const FilterDrawer: React.FC<IFilterDrawer> = ({ open, handleDrawerClose, children }) => {
    const dispatch = useDispatch();
    const anchorRef = useRef(null);

    const [isProgramFilterOpen, setIsProgramFilterOpen] = useState(false);
    const [isLocationFilterOpen, setIsLocationFilterOpen] = useState(false);

    const programFilterChangeHandler = () => {
        if (isProgramFilterOpen) {
            dispatch(simGetReq());
            dispatch(setCategory([]));
        }
        setIsProgramFilterOpen(!isProgramFilterOpen);
    }

    const locationFilerChangeHandler = () => {
        if (isProgramFilterOpen) {
            dispatch(simGetReq());
            dispatch(setLocation([]));
        }
        setIsLocationFilterOpen(!isLocationFilterOpen);
    }

    return (
        <Box
            height="100vh"
            ref={anchorRef}
            sx={{ display: 'flex', position: "relative" }}
        >
            <CssBaseline />
            <Drawer
                sx={{
                    marginRight: open ? 3 : 0,
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        position: 'absolute', // Important to position it relative to the div
                    },
                    '& .MuiPaper-root': {
                        border: 'none', // Disables the border
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
                container={anchorRef.current} // Pass the div reference
            >
                <DrawerHeader>
                    <div className={`w-full h-[76px] flex justify-start items-center`}>
                        <Button
                            sx={{ textTransform: "none" }}
                            variant="text"
                            startIcon={<FilterAltIcon />}
                            onClick={handleDrawerClose}
                            color='inherit'
                        >
                            Hide filters
                        </Button>
                    </div>
                </DrawerHeader>
                <Divider />
                <List disablePadding>
                    <ListFilterDropdown
                        title='Minimum grade'
                        toolTip={
                            <React.Fragment>
                                <Typography variant='caption'>
                                    Grade for Entrance Previous Year (%)
                                </Typography>
                                <br />
                                <Typography variant='caption'>
                                    This is a guideline to help you explore potential programs.
                                    Please review the specific course requirements for the program you're interested in.
                                </Typography>
                            </React.Fragment>
                        }
                    >
                        <GradeSlider />
                    </ListFilterDropdown>
                    <ListFilterDropdown title='Programs'>
                        <ProgramsDropdown />
                    </ListFilterDropdown>
                    <ListFilterDropdown title='Schools'>
                        <SchoolFilter />
                    </ListFilterDropdown>
                    <ListFilterDropdown title='Location'>
                        <LocationDropdown />
                    </ListFilterDropdown>
                </List>
            </Drawer>
            <Main open={open}>
                {children}
            </Main>
        </Box>
    );
}

export default FilterDrawer;