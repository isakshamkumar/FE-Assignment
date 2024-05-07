import { JobFilter } from "../slice/jobData";

export interface JobState {
  data: {
    jdList: [
      {
        companyName: string;
        jdLink: string;
        jdUid: string;
        jobDetailsFromCompany: string;
        jobRole: string;
        location: string;
        logoUrl: string;
        maxExp: number;
        minExp: number;
        maxJdSalary: number | null;
        minJdSalary: number | null;
        salaryCurrencyCode: string;
      }
    ];
    totalCount: number;
  };
  isLoading: boolean;
  filters: JobFilter[];
  limit: number;
  offset: number;
}
