import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
  },
  reducers: {
    addRequest(state, action) {
      const newRequest = action.payload;
      state.requests = newRequest;
    },
    updateRequest(state, action) {
      const newRequest = action.payload;
      state.requests.push({
        ...newRequest,
      });
    },
    deleteRequest(state, action) {
      const removedRequest = action.payload;
      const updatedRequests = state.requests.filter(
        (request) =>
          (request.id === removedRequest.id &&
            request.requestId !== removedRequest.requestId) ||
          request.requestId !== removedRequest.requestId
      );
      state.requests = updatedRequests;
    },
  },
});
export const requestActions = requestSlice.actions;
export default requestSlice;
