import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { useSpring, animated } from '@react-spring/web';
import SearchInput from "../../components/SearchInput/SearchInput";
import { Typography } from "@mui/material";
import ProgramList from "./components/ProgramList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { fade, fadeAndSlide } from "../../anims/CustomAnims";
import Button from '@mui/material/Button';
import { useRef, useState } from "react";
import FilterModal from "../../components/FilterModal/FilterModal";
import EditLocationIcon from '@mui/icons-material/EditLocation';
import CircularProgress from '@mui/material/CircularProgress';
import { EmptyComponent } from "../../components/EmptyData/EmptyData";
import { SEO } from "../../components/seo";


const LabelList: React.FC<{ title: string }> = ({ title }) => (
    <span className={`p-5 w-[300px]`}><Typography>{title}</Typography></span>
);

const IndexPage: React.FC<PageProps> = ({ location }) => {
    const dispatch = useDispatch();
    const programs = useSelector((state: RootState) => state.programsReducer)
    const uiStates = useSelector((state: RootState) => state.uiStatesReducer);
    const fadeSpring = useSpring(fade);
    const fadeAndSlideSpring = useSpring(fadeAndSlide);
    const params = new URLSearchParams(location.search);
    const userInputAvg = params.get("avg");
    const [isPopOverOpen, setIsPopOverOpen] = useState(false);
    const buttonRef = useRef(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsPopOverOpen(true);
    };

    const data = programs.list.filter((program) => {
        const grade = Number(program.entranceGrade[0] + program.entranceGrade[1]);
        if (programs.selectedLocation === "All") {
            if (grade <= Number(userInputAvg) && programs.category !== "Any" && program.programName.includes(programs.category)) return program
            if (grade <= Number(userInputAvg) && programs.category === "Any") return program;
        } else if (program.location.includes(programs.selectedLocation)) {
            if (grade <= Number(userInputAvg) && programs.category !== "Any" && program.programName.includes(programs.category)) return program
            if (grade <= Number(userInputAvg) && programs.category === "Any") return program;
        }
    }).map((program, i) => <ProgramList key={`tempIDForList:${i}`} program={program} inputValue={userInputAvg || "n/a"} />);

    return (
        <div className="flex items-center flex-col px-10 py-10">
            <div className="w-full max-w-[1400px]">
                <animated.div style={fadeSpring} className="w-full">
                    <div className="w-full flex justify-center">
                        <SearchInput disableAnim />
                    </div>

                    <div className="w-full my-12">
                        {!userInputAvg ?
                            <span>
                                <Typography variant="body1">Here are some programs for you to explore</Typography>
                            </span>
                            :
                            <span>
                                <Typography variant="body1">With an average of</Typography>
                                <div className={`transition-all ${uiStates.isResultsLoading && "opacity-0"}`}>
                                    <Typography marginTop={2} variant="h4">{userInputAvg}%</Typography>
                                </div>
                            </span>
                        }
                    </div>
                </animated.div>

                {Number(userInputAvg) < 50 ?
                    <Typography>There are currently no avaialble programs for you that we could find...</Typography> :
                    <div className={`w-full`}>
                        <animated.span style={fadeSpring} className={"flex justify-between items-center mb-5"}>
                            <Typography variant="h5">Programs For You</Typography>
                            <div>
                                <Button
                                    ref={buttonRef}
                                    variant="outlined"
                                    color="inherit"
                                    sx={{ backgroundColor: "#F3F5F7", borderRadius: 15, border: "none", padding: "10px 20px" }}
                                    startIcon={<EditLocationIcon />}
                                    onClick={handleClick}
                                >
                                    Location
                                </Button>
                                <FilterModal
                                    open={isPopOverOpen}
                                    handleClose={() => setIsPopOverOpen(false)}
                                />
                            </div>
                        </animated.span>
                        <div className={`w-full flex justify-center items-center p-20 ${!uiStates.isResultsLoading && "hidden"}`}>
                            <CircularProgress />
                        </div>
                        <animated.ul style={fadeAndSlideSpring}>
                            <div className={`transition-all ${uiStates.isResultsLoading && "opacity-0"}`}>
                                <div className={uiStates.isResultsLoading ? "hidden" : ""}>
                                    {programs && (data.length > 0 ?
                                        <div>
                                            <div className="hidden md:flex justify-between mb-4">
                                                <LabelList title="Name" />
                                                <LabelList title="School" />
                                                <LabelList title="Length" />
                                                <LabelList title="Tuition" />
                                                <LabelList title="Location" />
                                                <LabelList title="Grade" />
                                            </div>
                                            {data}
                                        </div>
                                        :
                                        <div className="flex justify-center items-center py-10">
                                            <EmptyComponent />
                                        </div>)
                                    }
                                </div>
                            </div>
                        </animated.ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default IndexPage

export const Head = () => (
    <SEO title="Programs based on your grade | SelectU" />
)