import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./student-slice";
import tutorSlice from "./tutor-slice";
import requestSlice from "./request-slice";
import proposalSlice from "./proposal-slice";
import authSlice from "./auth-slice";
const store = configureStore({
  reducer: {
    student: studentSlice.reducer,
    tutor: tutorSlice.reducer,
    request: requestSlice.reducer,
    proposal: proposalSlice.reducer,
    auth: authSlice.reducer,
  },
});
export default store;
