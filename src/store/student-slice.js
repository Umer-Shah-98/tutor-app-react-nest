import { createSlice } from "@reduxjs/toolkit";
// const students = JSON.parse(localStorage.getItem("students"));
const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
  },
  reducers: {
    addStudent(state, action) {
      const newStudent = action.payload;
      const existingStudent = state.students.find(
        (student) => student.email === newStudent.email
      );
      if (existingStudent) {
        alert(
          "Student with same Email already exists, please try unique email"
        );
      } else {
        state.students.push({
          ...newStudent,
        });
      }
    },
    updateStudent() {},
    deleteStudent() {},
    getAllStudents(state, action) {
      const students = action.payload;
      state.students = students;
    },
  },
});
export const studentActions = studentSlice.actions;
export default studentSlice;
