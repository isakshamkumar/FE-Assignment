import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobData = createAsyncThunk("fetchJobData", async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    limit: 50,
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
      const { filter,role} = action.payload;
console.log(filter,'applyFilters');

      //@ts-ignore
      const filteredData = state.data?.jdList.filter((item) => item[role] === filter);
    console.log(filteredData,'filteredData');
    
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
