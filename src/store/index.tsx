import { configureStore } from "@reduxjs/toolkit";
import jobDataReducer from "./slice/jobData";
import { JobState } from "./interface/jobInterface";

export const store = configureStore({
  reducer: {
    jobs: jobDataReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export interface RootState {
  jobs: JobState;
}
