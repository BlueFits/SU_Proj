import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { useSpring, animated } from '@react-spring/web';
import SearchInput from "../../components/SearchInput/SearchInput";
import { Typography } from "@mui/material";
import ProgramList from "./components/ProgramList";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

const IndexPage: React.FC<PageProps> = ({ location }) => {
    const programs = useSelector((state: RootState) => state.programsReducer)
    const params = new URLSearchParams(location.search);
    const userInputAvg = params.get("avg");

    const fade = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 }
    });

    const fadeAndSlide = useSpring({
        from: { opacity: 0, transform: 'translateY(100px)' }, // Start hidden & below the viewport
        to: { opacity: 1, transform: 'translateY(0)' }     // Slide into view
    });

    return (
        <div className="flex items-center flex-col px-10 py-10">
            <animated.div style={fade} className="w-full">
                <div className="w-full flex justify-center">
                    <SearchInput disableAnim />
                </div>

                <div className="w-full my-10">
                    { !userInputAvg ? 
                        <span>
                            <Typography variant="body1">Here are some programs for you to explore</Typography>
                        </span>
                    :
                        <span>
                            <Typography variant="body1">With an average of</Typography>
                            <Typography variant="h4">{userInputAvg}%</Typography>
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

            <div className="w-full">
                <animated.span style={fade}>
                    <Typography sx={{ marginBottom: "1.25rem" }} variant="h5">Programs For You</Typography>
                </animated.span>
                <animated.ul style={fadeAndSlide}>
                    {programs && programs.list.map((program, i) => {
                        const grade = Number(program.entranceGrade[0] + program.entranceGrade[1]);
                        if (grade <= Number(userInputAvg)) return <ProgramList key={`tempIDForList:${i}`} program={program} />
                    })}
                </animated.ul>
            </div>
        </div>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Search Page</title>