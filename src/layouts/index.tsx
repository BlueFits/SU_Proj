import React from "react";
import { Typography } from "@mui/material";
import * as packageJSON from "../../package.json";
import { AppProvider, Navigation } from '@toolpad/core/AppProvider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { extendTheme, styled } from '@mui/material/styles';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchIcon from '@mui/icons-material/Search';
import GradeIcon from '@mui/icons-material/Grade';
import InfoIcon from '@mui/icons-material/Info';
import QuizIcon from '@mui/icons-material/Quiz';


const NAVIGATION: Navigation = [
	{
		kind: 'header',
		title: 'Main items',
	},
	{
		segment: 'search/',
		title: 'Search',
		icon: <SearchIcon />,
	},
	{
		segment: 'saved',
		title: 'Saved Programs',
		icon: <GradeIcon />,
	},
	{
		kind: 'divider',
	},
	{
		kind: 'header',
		title: 'More Info',
	},
	{
		segment: 'about',
		title: 'About us',
		icon: <InfoIcon />,
		children: [
			{
				segment: 'faq',
				title: 'Faq',
				icon: <QuizIcon />,
			},
		],
	},
	// {
	// 	segment: 'reports',
	// 	title: 'Reports',
	// 	icon: <BarChartIcon />,
	// 	children: [
	// 		{
	// 			segment: 'sales',
	// 			title: 'Sales',
	// 			icon: <DescriptionIcon />,
	// 		},
	// 		{
	// 			segment: 'traffic',
	// 			title: 'Traffic',
	// 			icon: <DescriptionIcon />,
	// 		},
	// 	],
	// },
];

const demoTheme = extendTheme({
	colorSchemes: { light: true, dark: true },
	colorSchemeSelector: 'class',
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 600,
			lg: 1200,
			xl: 1536,
		},
	},
});

const Layout = ({ location, children }: any) => {
	const matches = useMediaQuery('(max-width:425px)');

	return (
		<AppProvider

			branding={{ title: "SelectU", logo: false }}
			navigation={NAVIGATION}
			// router={router}
			theme={demoTheme}
		// window={demoWindow}
		>
			<DashboardLayout
				defaultSidebarCollapsed
			>
				<PageContainer maxWidth={false}>
					{children}
				</PageContainer>
			</DashboardLayout>
			{/* <footer className="flex justify-center items-center p-5 border-[1px]">
				<Typography marginTop={2} color="textDisabled" variant="caption">{packageJSON.version}  © SelectU 2024</Typography>
			</footer> */}
		</AppProvider>
	);
};

export default Layout;