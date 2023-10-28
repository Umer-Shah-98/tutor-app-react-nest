import { createSlice } from "@reduxjs/toolkit";
// const tutors = JSON.parse(localStorage.getItem("tutors"));

const tutorSlice = createSlice({
  name: "tutors",
  initialState: {
    tutors:  [],
  },
  reducers: {
    addTutor(state, action) {
      const newTutor = action.payload;
      const existingTutor = state.tutors.find(
        (tutor) => tutor.email === newTutor.email
      );
      if (existingTutor) {
        alert("Tutor with same Email already exists, please try unique email");
      } else {
        state.tutors.push(newTutor);
      }
    },
    updateTutor: (state, action) => {
      const updatedTutor = action.payload;
      state.tutors = state.tutors.map((tutor) => {
        if (tutor._id === updatedTutor.tutorId) {
          // If the tutor's _id matches the updatedTutor's _id, update the balance
          return {
            ...tutor,
            balance: tutor.balance + updatedTutor.balance,
          };
        }
        return tutor; // Return the tutor unchanged if it's not the one being updated
      });
    },
    deleteTutor() {},
   getAllTutors(state,action){
    const tutors=action.payload;
    state.tutors=tutors
   }
  },
});
export const tutorActions = tutorSlice.actions;
export default tutorSlice;
