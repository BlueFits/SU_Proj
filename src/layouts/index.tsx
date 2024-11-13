import React from "react";
import { Typography } from "@mui/material";
import * as packageJSON from "../../package.json";

const Layout = ({ location, children }: any) => {
  return (
    <div>
      {children}

      <footer className="flex justify-center items-center p-5">
        <Typography marginTop={2} color="textDisabled" variant="caption">{packageJSON.version}  © SelectU 2024</Typography>
      </footer>
    </div>
  );
};

export default Layout;