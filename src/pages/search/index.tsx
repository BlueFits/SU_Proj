import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { useSpring, animated } from '@react-spring/web';
import SearchInput from "../../components/SearchInput/SearchInput";
import { Typography } from "@mui/material";
import ProgramList from "./components/ProgramList";




const IndexPage: React.FC<PageProps> = ({ location }) => {


    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        console.log("!!!", params.get("asd"));
    });

    const fadeAndSlide = useSpring({
        from: { opacity: 0, transform: 'translateY(50px)' }, // Start hidden & below the viewport
        to: { opacity: 1, transform: 'translateY(0)' }     // Slide into view
    });

    return (
        <div className="flex items-center flex-col px-10 py-10">
            <div className="w-full flex justify-center">
                <SearchInput />
            </div>

            <div className="w-full my-10">
                <Typography variant="body1">With an average of</Typography>
                <Typography variant="h4">80%</Typography>
            </div>

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
                <Typography sx={{ marginBottom: "1.25rem" }} variant="h5">Programs For You</Typography>
                <ul>
                    <ProgramList />
                </ul>
            </div>
        </div>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Search Page</title>
