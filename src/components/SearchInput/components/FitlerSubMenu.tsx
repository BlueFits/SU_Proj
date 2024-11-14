import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterListIcon from '@mui/icons-material/FilterList';
import categories from '../../../data/categories';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../../services/modules/programs/programs.slice';
import { RootState } from '../../../services/store';
import { simGetReq } from '../../../services/modules/uiStates/uiStates.slice';

const ITEM_HEIGHT = 48;

export default function FilterSubMenu() {
    const dispatch = useDispatch();
    const programs = useSelector((state: RootState) => state.programsReducer);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (value: string = "Any") => {
        dispatch(simGetReq());
        dispatch(setCategory(value));
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <FilterListIcon />
            </IconButton>
            <Menu
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose(programs.category)}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 6,
                            // width: '20ch',
                        },
                    },
                }}
            >
                {["Any", ...categories].map((category) => (
                    <MenuItem key={category} selected={programs.category === category} onClick={() => handleClose(category)}>
                        {category}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}