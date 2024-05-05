import { configureStore } from "@reduxjs/toolkit";
import jobDataReducer from "./slice/jobData";
import { JobState } from "./interface/jobInterface";
import { applyFilters } from "./slice/jobData";
export const store = configureStore({
  reducer: {
    jobs: jobDataReducer,
    applyFilters: applyFilters,

  },
});
export type AppDispatch = typeof store.dispatch;
export interface RootState {
  jobs: JobState;
}
