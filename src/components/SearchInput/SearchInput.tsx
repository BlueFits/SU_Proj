import React from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import IconButton from '@mui/material/IconButton';

const SearchInput = () => {
    return (
        <div className='p-[10px] rounded-[15px] bg-[#F8F8F8] flex justify-start items-center border-[none] w-4/5'>
            <IconButton>
                <SearchRoundedIcon />
            </IconButton>
            <input className='bg-[#F8F8F8] outline-none border-[none]' type="text" placeholder='Enter your average' />
        </div>
    );
};

export default SearchInput;