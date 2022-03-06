import React from 'react';
import './SearchMode.scss';

const SearchMode = () => {
  return (
    <div className="search-mode">
      <button className="search-mode__button button--active">Самый дешевый</button>
      <button className="search-mode__button">Самый быстрый</button>
      <button className="search-mode__button">Оптимальный</button>
    </div>
  );
};

export default SearchMode;
