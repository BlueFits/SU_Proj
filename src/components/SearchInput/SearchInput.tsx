import React, { useState, useRef, useEffect } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import IconButton from '@mui/material/IconButton';
import { animated, useSpring } from '@react-spring/web'
import { navigate } from "gatsby"
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import categories from '../../data/categories';


interface ISearchInput {
    disableAnim?: boolean;
    enableText?: boolean;
}

const defaultPropVal: ISearchInput = {
    disableAnim: false,
    enableText: true,
};

const animStyles = `
            md:max-w-[1000px] 
            md:shadow-md
            md:bg-[#fafafa]
            transition-all
            md:hover:bg-[#F8F8F8] 
            md:hover:shadow-none
            md:bg-[#FFF] 
`;

const SearchInput: React.FC<ISearchInput> = ({
    disableAnim,
    enableText,
} = defaultPropVal) => {
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState("Any");
    const nagivationRef = useRef<string | null>(null);

    const [props, api] = useSpring(() => ({
        from: {
            opacity: 1,
        },
        onRest: () => handleNavigation(),
    }))

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

    const handleNavigation = () => navigate(`/search?avg=${nagivationRef.current}`);

    return (
        <div className='w-full justify-center flex items-center flex-col'>
            <animated.div style={props} className={`
                p-[10px] 
                rounded-[15px] 
                bg-[#F8F8F8] 
                flex 
                justify-start 
                items-center 
                border-[none] 
                w-full 
                ${!disableAnim && animStyles}
            `}>
                <form
                    action='/search'
                    method='get'
                    className='w-full flex justify-center items-center'
                    onSubmit={async (e) => {
                        e.preventDefault();
                        console.log("submitting");
                        submit();
                    }}
                >
                    <IconButton sx={{ marginRight: 1 }} type='submit'>
                        <SearchRoundedIcon />
                    </IconButton>
                    <input
                        onChange={(e) => {
                            const newValue = e.target.value;
                            // Allow only digits by filtering the input
                            if (/^\d*$/.test(newValue)) {
                                setSearch(newValue);
                            }
                        }}
                        value={search}
                        name='avg'
                        className='bg-transparent outline-none border-none w-full'
                        type="text"
                        placeholder='Enter your average'
                    />
                </form>
                <TextField
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'grey', // Default border color
                            },
                            color: "grey"
                        },
                    }}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    select
                    label="Category"
                    defaultValue="Any"
                    slotProps={{
                        select: {
                            native: true,
                        },
                    }}
                >
                    {["Any", ...categories].map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </TextField>
                <div className="h-[10px]" />
            </animated.div>
            {enableText &&
                <animated.div style={props}>
                    <div className='h-[15px]' />
                    <Typography variant="caption" className="text-[grey]">
                        Don’t let your grades define your future—let them guide you to the right program
                    </Typography>
                </animated.div>
            }
        </div >
    );
};

export default SearchInput;