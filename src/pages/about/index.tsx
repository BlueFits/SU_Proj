import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"
import { Container, Typography } from "@mui/material"
import { useSpring, animated } from "@react-spring/web"
import { fade, fadeAndSlide } from "../../anims/CustomAnims"

// const pageStyles = {
//     padding: "96px",
// }
const headingStyles = {
    marginTop: 0,
    marginBottom: 64,
    maxWidth: 320,
}

const NotFoundPage: React.FC<PageProps> = () => {
    const fadeAndSlideSpring = useSpring(fadeAndSlide);
    const fadeSpring = useSpring(fade);


    return (
        <Container>
            <main>
                <animated.section style={fadeSpring}>
                    <Typography variant="h1" style={headingStyles}>About Us</Typography>
                </animated.section>
                <animated.section style={fadeAndSlideSpring}>
                    <Typography>
                        At SelectU, we understand that choosing the right educational program can be overwhelming.
                        With so many online resources available, it’s easy to feel lost in a sea of cluttered information.
                        Students often struggle to navigate these platforms, which can prevent them from discovering all
                        the opportunities available to them—opportunities that might be the perfect fit for their goals
                        and aspirations.
                    </Typography>

                    <Typography marginTop={5}>
                        That’s where SelectU comes in. We created our platform with one goal in mind: to make it easier for
                        prospective students to find the right educational programs without the confusion. Our dedicated
                        team works tirelessly to ensure that the information we provide is accurate, relevant, and up-to-date.
                        We source all our data directly from Canadian schools, colleges, and universities, so students can trust
                        that the opportunities they see are reliable and current.
                    </Typography>

                    <Typography marginTop={5}>
                        Our mission is simple: <strong>to empower students to make informed decisions about their future.</strong>
                        We do this by offering insights and services built on integrity, and we are committed to continuously
                        improving our platform to meet the changing needs of students. At SelectU, we’re here to help students
                        discover their path—easily and confidently.
                    </Typography>

                    <Typography marginTop={5}>
                        If we have helped you, be sure to spread the word by sharing the site with your friends, family, colleagues, and social network. Good Luck!
                    </Typography>

                    <Typography marginTop={8}>
                        – SelectU Team
                    </Typography>
                </animated.section>
            </main>
        </Container>
    )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>About Us | SelectU.org</title>
