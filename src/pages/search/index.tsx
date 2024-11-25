import * as React from "react"
import type { PageProps } from "gatsby"
import { useSpring, animated } from '@react-spring/web';
import SearchInput from "../../components/SearchInput/SearchInput";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { fade } from "../../anims/CustomAnims";
import { useRef, useState } from "react";
import { SEO } from "../../components/seo";
import FilterDrawer from "./components/FilterDrawer/FilterDrawer";
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TableComponent from "./components/TableComponent";

const IndexPage: React.FC<PageProps> = ({ location }) => {
    const programs = useSelector((state: RootState) => state.programsReducer)
    const uiStates = useSelector((state: RootState) => state.uiStatesReducer);
    const fadeSpring = useSpring(fade);
    const params = new URLSearchParams(location.search);
    const userInputAvg = params.get("avg");
    const [isPopOverOpen, setIsPopOverOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const buttonRef = useRef(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsPopOverOpen(true);
    };

    const filterButtonHandler = () => {
        if (window && window.gtag) {
            window.gtag("event", "search click", {
                grade: userInputAvg,
                category_type: programs.category,
            })
        }
        setIsFilterOpen(true);
    };

    const data = programs.list.filter((program) => {
        const grade = Number(program.entranceGrade[0] + program.entranceGrade[1]);
        const userAvg = Number(userInputAvg);

        if (grade > userAvg || !grade) return false;

        const isCategoryMatch =
            programs.category.length === 0 ||
            programs.category.some(str => program.programName.includes(str));

        const isLocationMatch =
            programs.selectedLocation.length === 0 ||
            programs.selectedLocation.some(location => program.location.includes(location));

        return isLocationMatch && isCategoryMatch;
    });

    return (
        <FilterDrawer
            open={isFilterOpen}
            handleDrawerClose={() => setIsFilterOpen(false)}
        >
            <div className="flex items-start flex-col md:px-5 pb-10 h-full">
                {/* <div className="w-full max-w-[1400px]"> */}
                <div className="w-full flex flex-col h-full">
                    <animated.div style={fadeSpring} className="w-full flex-[0]">
                        <div className={`flex justify-start items-end h-[100px]`}>
                            <div className="flex justify-start items-center w-full">
                                {!isFilterOpen &&
                                    <IconButton onClick={filterButtonHandler}>
                                        <FilterAltIcon />
                                    </IconButton>
                                }

                                <div className="ml-3 flex justify-center w-full md:w-[50%]">
                                    <SearchInput location={location} disableAnim />
                                </div>
                            </div>
                        </div>

                        {/* <div className="hidden md:block w-full my-12">
                            {!userInputAvg ?
                                <span>
                                    <Typography variant="body1">Here are some programs for you to explore</Typography>
                                </span>
                                :
                                <span>
                                    <Typography variant="body1">With an average of</Typography>
                                    <div className={`transition-all ${uiStates.isResultsLoading && "opacity-0"} `}>
                                        <Typography marginTop={2} variant="h4">{userInputAvg}%</Typography>
                                    </div>
                                </span>
                            }
                        </div> */}
                    </animated.div>

                    {Number(userInputAvg) < 50 ?
                        <Typography marginTop={5}>There are currently no available programs for you that we could find please try again...</Typography> :
                        <div className={`w-full flex flex-col h-full`}>
                            <animated.div style={fadeSpring} className={"flex justify-between items-center mb-5 md:mt-12 md:mb-7"}>
                                {/* <div className="md:hidden flex justify-center items-end">
                                    <Typography variant="h6">Programs for</Typography>
                                    <div className={`transition-all ${uiStates.isResultsLoading && "opacity-0"}`}>
                                        <Typography variant="h5" marginLeft={1}>{userInputAvg}%</Typography>
                                    </div>
                                </div> */}
                                <div className="hidden md:block">
                                    <Typography variant="h5">Available Programs</Typography>
                                </div>
                            </animated.div>
                            <div className={`w-full h-[90vh] border-[1px] mb-5`}>
                                <TableComponent
                                    userInfo={{
                                        grade: userInputAvg || "",
                                        category: programs.category.join(","),
                                        location: programs.selectedLocation.join(","),
                                    }}
                                    programs={data}
                                    isFetching={uiStates.isResultsLoading}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </FilterDrawer >
    )
}

export default IndexPage

export const Head = () => (
    <SEO title="Programs based on your grade | SelectU" />
)