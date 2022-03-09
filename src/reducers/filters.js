import { CHANGE_FILTER } from '../actions';

const initialState = [
  {
    title: 'all',
    label: 'Все',
    enabled: false,
  },
  {
    title: 'without',
    label: 'Без пересадок',
    enabled: false,
  },
  {
    title: 'one',
    label: '1 пересадка',
    enabled: false,
  },
  {
    title: 'two',
    label: '2 пересадки',
    enabled: false,
  },
  {
    title: 'three',
    label: '3 пересадки',
    enabled: false,
  },
];

const switchFilters = (filters, title) => {
  if (title === 'all') {
    const idx = filters.findIndex((el) => el.title === 'all');
    const { enabled } = filters[idx];
    return filters.map((filter) => ({ ...filter, enabled: !enabled }));
  }

  const newFilters = filters.map((filter) => {
    return filter.title === title ? { ...filter, enabled: !filter.enabled } : filter;
  });

  const countEnabled = newFilters.filter(item => item.title !== 'all' && item.enabled).length

  if (countEnabled === newFilters.length - 1) {
    return newFilters.map((filter) => {
      return filter.title === 'all' ? { ...filter, enabled: true } : filter;
    });
  }

  if (countEnabled !== newFilters.length - 1) {
    return newFilters.map((filter) => {
      return filter.title === 'all' ? { ...filter, enabled: false } : filter;
    });
  }
  return newFilters;
};

const filters = (state = initialState, action) => {
    console.log(action)
  switch (action.type) {
    case CHANGE_FILTER:
      return [...switchFilters(state, action.payload)];
    default:
      return state;
  }
};

export default filters;
