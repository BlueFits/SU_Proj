import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '@mui/material/Button';
import { useRef } from 'react';

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
    // padding: theme.spacing(0, 1),
    // this height is taken from the calculated height of the search input container div
    height: "100px",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

interface IFilterDrawer {
    open: boolean;
    handleDrawerClose: () => void;
    children: any;
}

const FilterDrawer: React.FC<IFilterDrawer> = ({ open, handleDrawerClose, children }) => {
    const anchorRef = useRef(null); // Reference to the div
    const theme = useTheme();
    // const [open, setOpen] = React.useState(true);

    return (
        <Box
            height="100vh"
            ref={anchorRef}
            sx={{ display: 'flex', position: "relative" }}
        >
            <CssBaseline />
            <Drawer
                sx={{
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
                {/* <div className='pl-5'> */}
                <DrawerHeader>
                    <div className='w-full h-[76px] flex justify-start items-center px-[8px]'>
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
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary={"asd"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                {/* <Divider /> */}
                {/* </div> */}
            </Drawer>
            <Main open={open}>
                {/* <DrawerHeader /> */}
                {children}
            </Main>
        </Box>
    );
}

export default FilterDrawer;