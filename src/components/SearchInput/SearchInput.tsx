import React from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import IconButton from '@mui/material/IconButton';
import { animated, useSpring } from '@react-spring/web'


const SearchInput = () => {

    const [props, api] = useSpring(() => ({
            from: { 
                opacity: 1,
            },
        }),
    )

    const searchKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            api.start({
                to: {
                  opacity: 0,
                },
              })
        }
    }
    
    return (
        <animated.div style={props} className='p-[10px] rounded-[15px] bg-[#F8F8F8] flex justify-start items-center border-[none] w-full'>
            <IconButton>
                <SearchRoundedIcon />
            </IconButton>
            <input 
                onKeyDown={searchKeyDownHandler} 
                className='bg-[#F8F8F8] outline-none border-[none]' 
                type="text" 
                placeholder='Enter your average' 
            />
        </animated.div>
    );
};

export default SearchInput;