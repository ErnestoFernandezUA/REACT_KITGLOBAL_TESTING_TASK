/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import {
  createSlice,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

export interface ControlState {
  // I use this state to control global UI
  popup: {
    // like this
    // showPopup1: boolean;
    // showPopup2: boolean;
  },
}

const initialState: ControlState = {
  popup: {
  },
};

const controlSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
  },
});

export default controlSlice.reducer;
export const {
  resetState,
} = controlSlice.actions;
