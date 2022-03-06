import React from 'react';
import './TransferFilter.scss';

const TransferFilter = () => {
  return (
    <div className="transfer-filter">
      <div className="transfer-filter-header">Количество пересадок</div>
      <ul className="transfer-filter-checkboxes">
        <li className="checkbox-item">
          <label className="check">
            <input className="check__input" type="checkbox" />
            <span className="check__box"></span>
            Все
          </label>
        </li>
        <li className="checkbox-item">
          <label className="check">
            <input className="check__input" type="checkbox" />
            <span className="check__box"></span>
            Без пересадок
          </label>
        </li>
        <li className="checkbox-item">
          <label className="check">
            <input className="check__input" type="checkbox" />
            <span className="check__box"></span>1 пересадка
          </label>
        </li>
        <li className="checkbox-item">
          <label className="check">
            <input className="check__input" type="checkbox" />
            <span className="check__box"></span>2 пересадки
          </label>
        </li>
        <li className="checkbox-item">
          <label className="check">
            <input className="check__input" type="checkbox" />
            <span className="check__box"></span>3 пересадки
          </label>
        </li>
      </ul>
    </div>
  );
};

export default TransferFilter;
