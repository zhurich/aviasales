import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTab } from '../../store/tabSlice';

import './SearchMode.scss';

const SearchMode = () => {
  const dispatch = useDispatch();
  const { tabs } = useSelector((state) => state.tab);
  return (
    <div className="search-mode">
      {tabs.map((item) => {
        const { enabled, title, label } = item;
        const classNames = enabled ? 'search-mode__button search-mode__button--active' : 'search-mode__button';
        return (
          <button type="button" onClick={() => dispatch(changeTab({ title }))} className={classNames}>
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default SearchMode;
