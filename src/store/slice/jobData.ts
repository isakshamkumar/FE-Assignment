import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobData = createAsyncThunk("fetchJobData", async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    limit: 8,
    offset: 0,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
  };

  const response = await fetch(
    "https://api.weekday.technology/adhoc/getSampleJdJSON",
    requestOptions
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
});

const jobDataSlice = createSlice({
  name: "jobData",
  initialState: {
    isLoading: false,
    data: null,
  },
  reducers: {
    applyFilters: (state, action) => {
        const { filter, role } = action.payload;
        console.log(filter, 'applyFilters',role,'role');
        //@ts-ignore
        console.log(state.data?.jdList,'jdlist'); // Log jdList array
        //@ts-ignore
        const filteredData = state.data?.jdList.filter((jd) => {
          if (role === "jobRole") {
            // console.log(jd.jobRole, 'jd.jobRole');
            
            return jd.jobRole.toLowerCase() === filter[0].toLowerCase();
          }
          if(role==="numberOfEmployees"){
            return jd.numberOfEmployees === filter;
          }
          if (role === "location") {
            return jd.location.toLowerCase() === filter[0].toLowerCase();
          }
          if (role === "minsalary") {
            const minSalaray= filter.split('-')[0];
            const maxSalaray= filter.split('-')[1];
            return jd.minJdSalary >= minSalaray && jd.minJdSalary <= maxSalaray;          }
          if (role === "experience") {
            return jd.minExp === filter;
          }
          return true;
        }
        );
        console.log(filteredData, 'filteredData');
    //@ts-ignore
          state.data.jdList = filteredData;
    
  },},
  extraReducers: (builder) => {
    builder.addCase(fetchJobData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchJobData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchJobData.rejected, (state) => {
      state.isLoading = true;
    });
  },
});
export const { applyFilters } = jobDataSlice.actions;

export default jobDataSlice.reducer;
