import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../store/filterSlice';
import './TransferFilter.scss';

const TransferFilter = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filter);
  return (
    <div className="transfer-filter">
      <div className="transfer-filter__header">Количество пересадок</div>
      <ul className="transfer-filter__checkboxes">
        {filters.map((item) => {
          const { enabled, title, label } = item;
          return (
            <li className="checkbox-item">
              <label className="check">
                <input
                  className="check__input"
                  type="checkbox"
                  checked={enabled}
                  onChange={() => dispatch(changeFilter({ title }))}
                />
                <span className="check__box" />
                {label}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TransferFilter;
