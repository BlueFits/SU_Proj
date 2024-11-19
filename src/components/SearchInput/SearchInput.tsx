import React, { useState, useRef, useEffect } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import IconButton from '@mui/material/IconButton';
import { animated, useSpring } from '@react-spring/web'
import { navigate } from "gatsby"
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import categories from '../../data/categories';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { setCategory } from '../../services/modules/programs/programs.slice';
import { simGetReq } from '../../services/modules/uiStates/uiStates.slice';
import FilterSubMenu from './components/FitlerSubMenu';


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
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string>("");
    const nagivationRef = useRef<string | null>(null);
    const programSlice = useSelector((state: RootState) => state.programsReducer);
    const programs = useSelector((state: RootState) => state.programsReducer);


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

    const handleNavigation = () => {
        if (window && window.gtag) {
            window.gtag("event", "search click", {
                page_path: window.location.pathname,
                input_value: nagivationRef.current,
                category_type: programs.category,
            })
        }
        dispatch(simGetReq());
        //@ts-expect-error
        navigate(`/search?avg=${Number(nagivationRef.current) > 100 ? "100" : nagivationRef.current}`);
    }

    return (
        <div className='w-full justify-center flex items-center flex-col'>
            {enableText &&
                <animated.div style={props}>
                    <Typography variant="h3">SelectU</Typography>
                    <Typography margin={"10px 0 50px 0"} className="text-[grey]" variant="body1">Find university and college programs based on your grades</Typography>
                </animated.div>
            }
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
                        submit();
                    }}
                >
                    <IconButton sx={{ marginRight: 1 }} type='submit'>
                        <SearchRoundedIcon />
                    </IconButton>
                    <input
                        onChange={(e) => {
                            const newValue = e.target.value;
                            if (/^\d*$/.test(newValue)) setSearch(newValue);
                        }}
                        value={search}
                        name='avg'
                        className='bg-transparent outline-none border-none w-full'
                        type="text"
                        placeholder='Enter your average'
                    />
                </form>
                <div className='hidden md:block'>
                    <TextField
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'grey', // Default border color
                                },
                                color: "grey"
                            },
                        }}
                        value={programSlice.category}
                        onChange={(e) => {
                            dispatch(simGetReq());
                            dispatch(setCategory(e.target.value))
                        }}
                        select
                        label="Category"
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
                </div>

                {/* For mobile */}
                <div className='md:hidden'>
                    <FilterSubMenu />
                </div>
                <div className="h-[10px]" />
            </animated.div>

            {/* removed */}
            {/* {enableText &&
                <animated.div style={props}>
                    <div className='h-[15px]' />
                    <Typography variant="caption" className="text-[grey]">
                        Find the Right Program for Your Grades!
                    </Typography>
                </animated.div>
            } */}
        </div >
    );
};

export default SearchInput;