import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { useSpring, animated } from '@react-spring/web';
import SearchInput from "../components/SearchInput/SearchInput";
import { Typography } from "@mui/material";




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
        <div className="flex items-center py-10 flex-col">
            <SearchInput />

            <div>
                <Typography>With an average of</Typography>
                <Typography>80%</Typography>
            </div>

            <div>
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
            </div>

            <div>
                <Typography>Programs For You</Typography>

                <ul>
                    <li>
                        <div>
                            <Typography>Geophysics (BSc with Specialization)</Typography>
                            <Typography>University of Alberta</Typography>
                        </div>

                        <div>
                            <Typography>80 - 82</Typography>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Search Page</title>
