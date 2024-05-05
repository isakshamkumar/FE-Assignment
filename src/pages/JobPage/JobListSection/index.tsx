import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { AppDispatch } from "../../../store";
import { fetchJobData } from "../../../store/slice/jobData";
import JobCard from "src/components/JobCard";
const JobListSection = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  React.useEffect(() => {
    void dispatch(fetchJobData());
  }, [dispatch]);

  if (state.jobs.isLoading) {
    return <>Real thing takes time to load...</>;
  }

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={"40px"}>
      {state.jobs.data?.jdList.map((item) => (
        <JobCard
          key={item.companyName}
          companyName={item.companyName}
          companyLogo={item.logoUrl}
          role={item.jobRole}
          location={item.location}
          desc={item.jobDetailsFromCompany}
          currency={item.salaryCurrencyCode}
          minsalary={item?.minJdSalary ?? 0}
          maxsalary={item?.maxJdSalary ?? 0}
          minExp={item.minExp}
        />
      ))}
    </Box>
  );
};

export default JobListSection;
