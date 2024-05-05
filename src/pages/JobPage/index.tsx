import { Box } from "@mui/material";
import FilterSection from "./FilterSection";
import JobListSection from "./JobListSection";

const JobPage = (): JSX.Element => {
  return (
    <div>
      <Box
        display={"flex"}
        flexDirection={"column"}
        paddingX={"5%"}
        alignItems={"center"}
      >
        {" "}
        <FilterSection />
        <Box marginTop={"80px"}>
          <JobListSection />
        </Box>
      </Box>
    </div>
  );
};

export default JobPage;
