import React from 'react';
import { connect } from "react-redux";
import { changeFilter } from "../../actions";
import './TransferFilter.scss';

const TransferFilter = ({filters, onCheckboxClick}) => {
  return (
    <div className="transfer-filter">
      <div className="transfer-filter__header">Количество пересадок</div>
      <ul className="transfer-filter__checkboxes">
        {filters.map((item => {
          const {enabled, title, label} = item;
          return(
            <li className="checkbox-item">
            <label className="check">
              <input className="check__input" type="checkbox" checked={enabled} onChange={() => onCheckboxClick(title)}/>
              <span className="check__box"></span>
              {label}
            </label>
          </li>
          )
        }))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ filters }) => ({
  filters,
});

const mapDispatchToProps = (dispatch) => ({
  onCheckboxClick: (title) => {
    dispatch(changeFilter(title));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(TransferFilter);
