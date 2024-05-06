import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { applyFilters, fetchJobData } from "../../../store/slice/jobData";

const FilterSection = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.jobs.data);
  console.log(state,'state');
  
  const loading = useSelector((state: RootState) => state.jobs.isLoading);
  const [jobRole, setJobRole] = useState<string[]>([]);
  const [numberOfEmployees, setNumberOfEmployees] = useState<string[]>([]);
  const [experience, setExperience] = useState<number>(0);
  const [location, setLocation] = useState<string[]>([]);
  const [minsalary, setMinsalary] = useState<number>(0);
  const handleJobRole = (e: any, role: string) => {
    dispatch(applyFilters({ filter: e.target.value, role }));
  };
  const handleEmployees = (e: any, role: string) => {
    dispatch(applyFilters({ filter: e.target.value, role }));
  }
  const handleExperience = (e: any, role: string) => {
    dispatch(applyFilters({ filter: e.target.value, role }));
  };
  const handleLocation = (e: any, role: string) => {
    dispatch(applyFilters({ filter: e.target.value, role }));
  };
  const handleMinSalary = (e: any, role: string) => {
    dispatch(applyFilters({ filter: e.target.value, role }));
  }
  useEffect(() => {
    dispatch(fetchJobData());
  }, [dispatch]);

  if (loading) {
    return <>Real thing takes time to load...</>;
  }
  const uniqueJobRoles = Array.from(
    new Set(state?.jdList?.map((item) => item.jobRole))
  );
  const numberOfEmployeesData = [
    "less than 5",
    "less than 20",
    "less than 100",
    "greater than 100",
  ];
  const uniqueJobExperience = Array.from(
    new Set(
      state?.jdList.map((item) => item.minExp).filter((exp) => exp !== null)
    )
  ).sort((a, b) => a - b);
  const uniqueJobLocations = Array.from(
    new Set(state?.jdList.map((item) => item.location))
  );
  const uniqueJobMinBasePay = Array.from(
    new Set(
      state?.jdList
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
        // Start a new range
        currentRangeStart = rangeStart;
        currentRangeEnd = rangeEnd;
        ranges.push(`${currentRangeStart}-${currentRangeEnd}`);
      } else {
        // Extend the current range
        currentRangeEnd = rangeEnd;
        ranges[ranges.length - 1] = `${currentRangeStart}-${currentRangeEnd}`;
      }
    }
  });
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          width: "100%",
          overflowX: { md: "unset", xs: "scroll" },
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Roles</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={jobRole}
            onChange={(e) => {
              setJobRole(
                typeof e.target.value === "string"
                  ? e.target.value.split(",")
                  : e.target.value
              );
              handleJobRole(e, "jobRole");
            }}
            input={<OutlinedInput id="select-multiple-chip" label="Roles" />}
            sx={{ minWidth: "250px" }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Roles</em>
            </MenuItem>
            {uniqueJobRoles.map((role) => (
              <MenuItem sx={{ width: "100%" }} key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Employees
          </InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={numberOfEmployees}
            onChange={(e) =>{

                setNumberOfEmployees(
                    typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : e.target.value
                )
                handleEmployees(e, "numberOfEmployees")
            }
        }
            input={<OutlinedInput id="select-multiple-chip" label="Roles" />}
            sx={{ minWidth: "250px" }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>No Of Employees</em>
            </MenuItem>
            {numberOfEmployeesData.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Experience
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={experience}
            onChange={(e) =>
                {
                    setExperience(e.target.value as number)
                    handleExperience(e, "experience")
                }
                } 
            autoWidth
            label="Age"
            sx={{ minWidth: "250px" }}
          >
            <MenuItem disabled value="">
              <em>Experience</em>
            </MenuItem>
            {uniqueJobExperience.map((exp, index) => (
              <MenuItem
                sx={{ minWidth: "250px", width: "100%" }}
                key={index}
                value={exp}
              >
                {exp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Location
          </InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={location}
            onChange={(e) =>
                {

                    setLocation(
                        typeof e.target.value === "string"
                        ? e.target.value.split(",")
                        : e.target.value
                    )
                    handleLocation(e, "location")
                }
            }
            input={<OutlinedInput id="select-multiple-chip" label="Location" />}
            sx={{ minWidth: "250px" }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>Location</em>
            </MenuItem>
            {uniqueJobLocations.map((role) => (
              <MenuItem key={role} sx={{ width: "100%" }} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Base Pay
          </InputLabel>

          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            value={minsalary}
            onChange={(e) => 
                {
                    setMinsalary(e.target.value as number)
                    handleMinSalary(e, "minsalary")
                }

                }
            autoWidth
            label="Base Pay"
            sx={{ minWidth: "250px" }}
          >
            <MenuItem disabled value="">
              <em>Range</em>
            </MenuItem>
            {ranges.map((exp, index) => (
              <MenuItem
                sx={{ minWidth: "250px", width: "100%" }}
                key={index}
                value={exp}
              >
                {exp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default FilterSection;
