import { createSlice } from '@reduxjs/toolkit';

const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    tabs: [
      {
        title: 'fast',
        label: 'Самый быстрый',
        enabled: true,
      },
      {
        title: 'cheap',
        label: 'Самый дешевый',
        enabled: false,
      },
      {
        title: 'optimal',
        label: 'Оптимальный',
        enabled: false,
      },
    ],
  },
  reducers: {
    changeTab(state, action) {
      // eslint-disable-next-line
      state.tabs.forEach((item) => (item.enabled = false));
      state.tabs.find((el) => el.title === action.payload.title).enabled = true;
    },
  },
});

export const { changeTab } = tabSlice.actions;

export default tabSlice.reducer;
