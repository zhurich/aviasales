import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearchId = createAsyncThunk('todos/fetchSearchId', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://aviasales-test-api.kata.academy/search');

    if (!response.ok) {
      throw new Error('Server Error!');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchTickets = createAsyncThunk('todos/fetchTickets', async (searchId, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);

    if (!response.ok) {
      throw new Error('Server Error!');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    searchId: null,
    stop: false,
    status: null,
    error: null,
    showedTicketsLimit: 5,
  },
  reducers: {
    setTicketsLimit(state, action) {
      state.showedTicketsLimit = action.payload;
    },
  },

  extraReducers: {
    [fetchSearchId.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchSearchId.fulfilled]: (state, action) => {
      state.searchId = action.payload.searchId;
    },
    [fetchTickets.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.tickets.push(...action.payload.tickets);
      state.stop = action.payload.stop;
    },
    [fetchSearchId.rejected]: setError,
    [fetchTickets.rejected]: setError,
  },
});

export const { setTicketsLimit } = ticketsSlice.actions;

export default ticketsSlice.reducer;
