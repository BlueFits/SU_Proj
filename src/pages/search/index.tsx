import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { useSpring, animated } from '@react-spring/web';
import SearchInput from "../../components/SearchInput/SearchInput";
import { Typography } from "@mui/material";
import ProgramList from "./components/ProgramList";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { fade, fadeAndSlide } from "../../anims/CustomAnims";

const LabelList: React.FC<{ title: string }> = ({ title }) => (
    <span className={`p-5 w-[300px]`}><Typography>{title}</Typography></span>
);

const IndexPage: React.FC<PageProps> = ({ location }) => {
    const programs = useSelector((state: RootState) => state.programsReducer)
    const fadeSpring = useSpring(fade);
    const fadeAndSlideSpring = useSpring(fadeAndSlide);
    const params = new URLSearchParams(location.search);
    const userInputAvg = params.get("avg");


    React.useEffect(() => {
        console.log(programs.list.length);
    });

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
                                <Typography marginTop={2} variant="h4">{userInputAvg}%</Typography>
                            </span>
                        }
                    </div>
                </animated.div>


                {/* <div>
                <Typography>Popular</Typography>

                <ul>
                    <li>
                        <Typography>Computer Science - Advanced Entry</Typography>
                        <Typography>Ontario Tech University</Typography>

                        <div>
                            <Typography>Grade: 70 - 100</Typography>
                            <Typography>Length: 2 Year(s)</Typography>
                        </div>
                    </li>
                </ul>
            </div> */}

                {Number(userInputAvg) < 50 ?
                    <Typography>There are currently no avaialble programs for you that we could find...</Typography> :
                    <div className="w-full">
                        <animated.span style={fadeSpring}>
                            <Typography sx={{ marginBottom: "2rem" }} variant="h5">Programs For You</Typography>
                        </animated.span>
                        <animated.ul style={fadeAndSlideSpring}>
                            <div className="hidden md:flex justify-between mb-4">
                                <LabelList title="Name" />
                                <LabelList title="School" />
                                <LabelList title="Length" />
                                <LabelList title="Tuition" />
                                <LabelList title="Grade" />
                            </div>
                            {programs && programs.list.map((program, i) => {
                                const grade = Number(program.entranceGrade[0] + program.entranceGrade[1]);
                                if (grade <= Number(userInputAvg) && programs.category !== "Any" && program.programName.includes(programs.category)) return <ProgramList key={`tempIDForList:${i}`} program={program} />
                                if (grade <= Number(userInputAvg) && programs.category === "Any") return <ProgramList key={`tempIDForList:${i}`} program={program} />
                            })}
                        </animated.ul>
                    </div>
                }

            </div>
        </div>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Search Page</title>