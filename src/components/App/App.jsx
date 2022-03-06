import React from 'react';
import './App.scss';
import logo from '../../img/Logo.png';
import { TransferFilter } from '../TransferFilter';
import { TicketList } from '../TicketList';
import { SearchMode } from '../SearchMode';

const App = () => {
  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="" />
      </header>
      <div className="main">
        <TransferFilter />
        <div className="ticket-list-menu">
          <SearchMode />
          <TicketList />
        </div>
      </div>
    </div>
  );
};

export default App;
