import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0,
  scorePlus: 0,
  highScore: 0,
};

export const scoreSlice = createSlice({
  name: "scoreCount",
  initialState,
  reducers: {
    reset: (state) => {
        state.score = 0;
    },
    increment: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.scorePlus = ((action.payload.base + action.payload.additive) + 10 * action.payload.streak) * action.payload.final_multipier;
      state.score += state.scorePlus;
    },
    decrement: (state) => {
      state.score -= 1;
    },
    summary: (state) => {
      if (state.score > state.highScore) {
        state.highScore = state.score;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset, increment, decrement, incrementByAmount, summary } = scoreSlice.actions;

export default scoreSlice.reducer;
