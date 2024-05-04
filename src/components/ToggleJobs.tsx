import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ToggleJobs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "fit-content",
          marginX: "auto",
        }}
      >
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
         <Box sx={{ position: "relative" }}>
            <Typography
              sx={{
                position: "absolute",
                right: "0",
                top: "0",
                borderRadius: "40%",
                color: "white",
                backgroundColor: "#1976D2",
                padding: ".1rem .4rem",
                height: "24px",
              }}
            >
              20
            </Typography>
            <Tab label="Applied Jobs" {...a11yProps(1)} />
          </Box>
          <Box sx={{ position: "relative" }}>
            <Typography
              sx={{
                position: "absolute",
                right: "0",
                top: "0",
                borderRadius: "40%",
                color: "white",
                backgroundColor: "#1976D2",
                padding: ".1rem .4rem",
                height: "24px",
              }}
            >
              210
            </Typography>
            <Tab label="Search Jobs" {...a11yProps(1)} />
          </Box>
        </Tabs>
      </Box>
    </Box>
  );
}
