import { createSlice } from "@reduxjs/toolkit";

const proposalSlice = createSlice({
  name: "proposals",
  initialState: {
    proposals: [],
    rejectedProposals: [],
  },
  reducers: {
    addProposal(state, action) {
      const newProposal = action.payload;
      state.proposals = newProposal;
    },
    addRejectedProposals(state, action) {
      const newProposal = action.payload;
      state.rejectedProposals = newProposal;
    },
    updateProposal(state, action) {
      const newProposal = action.payload;
      state.proposals.push({
        ...newProposal,
      });
    },
    deleteProposal(state, action) {
      const removedProposal = action.payload;
      state.proposals = state.proposals.filter(
        (proposal) => proposal.proposalId !== removedProposal._id
      );
    },
  },
});
export const proposalsActions = proposalSlice.actions;
export default proposalSlice;
