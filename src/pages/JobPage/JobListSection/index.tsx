import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { AppDispatch } from "../../../store";
import { fetchJobData } from "../../../store/slice/jobData";
import JobCard from "../../../components/JobCard";
interface JobListSectionProps {
  limit: number;
  offset: number;
}
const JobListSection: React.FC<JobListSectionProps> = ({
  limit,
  offset,
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    void dispatch(fetchJobData({ limit: limit, offset: offset }));
  }, [dispatch, limit, offset]);
  const state = useSelector((state: RootState) => state);
  const filteredJobs = state?.jobs.data?.jdList.filter((job) => {
    return state?.jobs.filters.every((filter) => {
      switch (filter.type) {
        case "role":
          return job.jobRole === filter.value;
        case "location":
          return job.location === filter.value;
        case "experience":
          return job.minExp === filter.value;
        case "salary":
          return job.minJdSalary === filter.value;
        default:
          return false;
      }
    });
  });

  if (state.jobs.isLoading) {
    return <>Real thing takes time to load...</>;
  }

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={"40px"}>
      {filteredJobs?.map((item) => (
        <JobCard
          key={item.jdUid}
          companyName={item.companyName}
          companyLogo={item.logoUrl}
          role={item.jobRole}
          location={item.location}
          desc={item.jobDetailsFromCompany}
          currency={item.salaryCurrencyCode}
          minsalary={item?.minJdSalary ?? 0}
          maxsalary={item?.maxJdSalary ?? 0}
          minExp={item.minExp}
          pathTo={item.jdLink}
        />
      ))}
    </Box>
  );
};

export default JobListSection;
