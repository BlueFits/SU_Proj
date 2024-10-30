import React, { useState, useRef, useEffect } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { animated, useSpring } from '@react-spring/web'
import { navigate } from "gatsby"

interface ISearchInput {
    disableAnim?: boolean;
}

const defaultPropVal: ISearchInput = {
    disableAnim: false,
};

const SearchInput: React.FC<ISearchInput> = ({ 
    disableAnim 
} = defaultPropVal) => {
    const [search, setSearch] = useState<string>("");
    const nagivationRef = useRef<string | null>(null);

    const [props, api] = useSpring(() => ({
        from: { 
            opacity: 1,
        },
        // onRest: () => handleNavigation(),
    }),
)

    useEffect(() => {
        nagivationRef.current = search;
    }, [search]);


    const submit = () => {
        if (disableAnim) {
            handleNavigation();
        } else {
            api.start({
                to: {
                  opacity: 0,
                },
              })
        }
    }

    const handleNavigation = () => navigate(`/search?avgTest=${nagivationRef.current}`);
    
    return (
        <animated.div style={props} className='p-[10px] rounded-[15px] bg-[#F8F8F8] flex justify-start items-center border-[none] w-full'>
            {/* <IconButton onClick={submit}>
                <SearchRoundedIcon />
            </IconButton> */}
            <form 
                action='/search'
                method='get'
                className='w-full flex justify-center items-center'
                onSubmit={(e) => {
                    // e.preventDefault();
                    console.log("submitting");
                    if (!disableAnim) {
                        api.start({
                            to: {
                              opacity: 0,
                            },
                          })
                    }
                    return true;
                    // submit();
                }}
            >
                {/* <IconButton type='submit'> */}
                <div className='m-2'>
                    <SearchRoundedIcon />
                </div>

                {/* </IconButton> */}
                <input 
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    name='avg'
                    className='bg-[#F8F8F8] outline-none border-none w-full' 
                    type="text" 
                    placeholder='Enter your average' 
                />
            </form>
        </animated.div>
    );
};

export default SearchInput;