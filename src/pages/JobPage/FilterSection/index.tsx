import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import FilterBox from "../../../components/FilterBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  fetchJobData,
  setExperienceFilter,
  setLocationFilter,
} from "../../../store/slice/jobData";
import { setJobRolesFilter } from "../../../store/slice/jobData";
import theme from "../../../Theme";

const FilterSection = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector((state: RootState) => state);

  useEffect(() => {
    void dispatch(fetchJobData({ limit: 10, offset: 0 }));
  }, [dispatch]);

  if (state.jobs.isLoading) {
    return <>Real thing takes time to load...</>;
  }

  const uniqueJobRoles = Array.from(
    new Set(state.jobs.data?.jdList?.map((item) => item.jobRole))
  );
  const uniqueJobExperience = Array.from(
    new Set(
      state.jobs.data?.jdList
        .map((item) => item.minExp)
        .filter((exp) => exp !== null)
    )
  ).sort((a, b) => a - b);
  const uniqueJobLocations = Array.from(
    new Set(state.jobs.data?.jdList.map((item) => item.location))
  );
  const uniqueJobMinBasePay = Array.from(
    new Set(
      state.jobs.data?.jdList
        .map((item) => item.minJdSalary)
        .filter((exp) => exp !== null)
    )
  ).sort((a, b) => (a as number) - (b as number));
  const rangeSize = 10;
  const ranges: string[] = [];
  let currentRangeStart: number | null = null;
  let currentRangeEnd: number | null = null;
  uniqueJobMinBasePay.forEach((value) => {
    if (value !== null) {
      const rangeStart = Math.floor(value / rangeSize) * rangeSize;
      const rangeEnd = rangeStart + rangeSize;
      if (currentRangeStart === null || rangeStart > currentRangeEnd!) {
        currentRangeStart = rangeStart;
        currentRangeEnd = rangeEnd;
        ranges.push(`${currentRangeStart}-${currentRangeEnd}`);
      } else {
        currentRangeEnd = rangeEnd;
        ranges[ranges.length - 1] = `${currentRangeStart}-${currentRangeEnd}`;
      }
    }
  });

  const handleRoleClick = (role: string) => {
    dispatch(setJobRolesFilter({ type: "role", value: role }));
  };

  const handleExperienceClick = (exp: number) => {
    dispatch(setExperienceFilter({ type: "experience", value: exp }));
  };

  const handleLocationClick = (location: string) => {
    dispatch(setLocationFilter({ type: "location", value: location }));
  };

  // const handleSalaryClick = (salary: number) => {
  //   dispatch(setSalaryFilter({ type: "salary", value: salary }));
  // };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",

            overflowX: { md: "unset", xs: "scroll" },
          }}
        >
          <FilterBox heading="Roles">
            <Box
              display={"flex"}
              flexDirection={"column"}
              borderRadius={"6px"}
              gap={"10px"}
              sx={{
                "& :hover": {
                  backgroundColor: theme.colorConstants.bgLightBlue,
                },
              }}
            >
              {uniqueJobRoles.map((role, index) => (
                <Typography
                  onClick={() => handleRoleClick(role)}
                  key={index}
                  padding={"8px"}
                  sx={{
                    cursor: "pointer",
                    color: theme.colorConstants.mediumGray,
                    fontSize: "18px",
                    fontWeight: "400",
                    "& :hover": {
                      backgroundColor: theme.colorConstants.bgLightBlue,
                    },
                  }}
                >
                  {role}
                </Typography>
              ))}
            </Box>
          </FilterBox>
          <FilterBox heading="Number of Employees">
            <Box
              display={"flex"}
              flexDirection={"column"}
              borderRadius={"6px"}
              gap={"10px"}
              sx={{
                "& :hover": {
                  backgroundColor: theme.colorConstants.bgLightBlue,
                },
              }}
            >
              <Typography
                padding={"8px"}
                sx={{
                  cursor: "pointer",
                  color: theme.colorConstants.mediumGray,
                  fontSize: "18px",
                  fontWeight: "400",
                  "& :hover": {
                    backgroundColor: theme.colorConstants.bgLightBlue,
                  },
                }}
              >
                {"less than <5"}
              </Typography>
              <Typography
                padding={"8px"}
                sx={{
                  cursor: "pointer",
                  color: theme.colorConstants.mediumGray,
                  fontSize: "18px",
                  fontWeight: "400",
                  "& :hover": {
                    backgroundColor: theme.colorConstants.bgLightBlue,
                  },
                }}
              >
                {"less than <20"}
              </Typography>
              <Typography
                padding={"8px"}
                sx={{
                  cursor: "pointer",
                  color: theme.colorConstants.mediumGray,
                  fontSize: "18px",
                  fontWeight: "400",
                  "& :hover": {
                    backgroundColor: theme.colorConstants.bgLightBlue,
                  },
                }}
              >
                {"less than <100"}
              </Typography>
              <Typography
                padding={"8px"}
                sx={{
                  cursor: "pointer",
                  color: theme.colorConstants.mediumGray,
                  fontSize: "18px",
                  fontWeight: "400",
                  "& :hover": {
                    backgroundColor: theme.colorConstants.bgLightBlue,
                  },
                }}
              >
                {"greater than >100"}
              </Typography>
            </Box>
          </FilterBox>
          <FilterBox heading="Experience">
            <Box
              display={"flex"}
              flexDirection={"column"}
              borderRadius={"6px"}
              gap={"10px"}
              sx={{
                "& :hover": {
                  backgroundColor: theme.colorConstants.bgLightBlue,
                },
              }}
            >
              {uniqueJobExperience.map((exp, index) => (
                <Typography
                  key={index}
                  padding={"8px"}
                  onClick={() => handleExperienceClick(exp)}
                  sx={{
                    cursor: "pointer",
                    color: theme.colorConstants.mediumGray,
                    fontSize: "18px",
                    fontWeight: "400",
                    "& :hover": {
                      backgroundColor: theme.colorConstants.bgLightBlue,
                    },
                  }}
                >
                  {exp}
                </Typography>
              ))}
            </Box>
          </FilterBox>
          <FilterBox heading="Loaction">
            <Box
              display={"flex"}
              flexDirection={"column"}
              borderRadius={"6px"}
              gap={"10px"}
              sx={{
                "& :hover": {
                  backgroundColor: theme.colorConstants.bgLightBlue,
                },
              }}
            >
              {uniqueJobLocations.map((location, index) => (
                <Typography
                  key={index}
                  onClick={() => handleLocationClick(location)}
                  padding={"8px"}
                  sx={{
                    cursor: "pointer",
                    color: theme.colorConstants.mediumGray,
                    fontSize: "18px",
                    fontWeight: "400",
                    "& :hover": {
                      backgroundColor: theme.colorConstants.bgLightBlue,
                    },
                  }}
                >
                  {location}
                </Typography>
              ))}
            </Box>
          </FilterBox>
          <FilterBox heading="Minimun Base Pay Salary">
            <Box
              display={"flex"}
              flexDirection={"column"}
              borderRadius={"6px"}
              gap={"10px"}
              sx={{
                "& :hover": {
                  backgroundColor: theme.colorConstants.bgLightBlue,
                },
              }}
            >
              {ranges.map((range, index) => (
                <Typography
                  key={index}
                  padding={"8px"}
                  sx={{
                    cursor: "pointer",
                    color: theme.colorConstants.mediumGray,
                    fontSize: "18px",
                    fontWeight: "400",
                    "& :hover": {
                      backgroundColor: theme.colorConstants.bgLightBlue,
                    },
                  }}
                >
                  {range}
                </Typography>
              ))}
            </Box>
          </FilterBox>
        </Box>
      </Box>
    </>
  );
};

export default FilterSection;
