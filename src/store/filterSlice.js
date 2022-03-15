import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filters: [
      {
        title: 'all',
        label: 'Все',
        enabled: true,
      },
      {
        title: 'without',
        label: 'Без пересадок',
        enabled: true,
      },
      {
        title: 'one',
        label: '1 пересадка',
        enabled: true,
      },
      {
        title: 'two',
        label: '2 пересадки',
        enabled: true,
      },
      {
        title: 'three',
        label: '3 пересадки',
        enabled: true,
      },
    ],
  },
  reducers: {
    changeFilter(state, action) {
      const filter = state.filters.find((el) => el.title === action.payload.title);
      filter.enabled = !filter.enabled;

      if (action.payload.title === 'all') {
        state.filters.forEach((item) => {
          const all = state.filters.find((el) => el.title === 'all');
          item.enabled = !all.enabled;
        });
      }

      const countEnabled = state.filters.filter((item) => item.title !== 'all' && item.enabled).length;

      if (countEnabled === 4) {
        state.filters.forEach((item) => {
          if (item.title === 'all') item.enabled = true;
        });
      }

      if (countEnabled !== 4) {
        state.filters.forEach((item) => {
          if (item.title === 'all') item.enabled = false;
        });
      }
    },
  },
});

export const { changeFilter } = filterSlice.actions;

export default filterSlice.reducer;
