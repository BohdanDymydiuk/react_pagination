import React, { useState } from 'react';

import './App.css';
import { getNumbers } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [visiblePerPage, setVisiblePerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const pages: string[][] = [];
  const page: string[] = [];

  items.forEach((item, index) => {
    if ((index + 1) % visiblePerPage === 0 || index === items.length - 1) {
      page.push(item);
      pages.push([...page]);
      page.length = 0;
    } else {
      page.push(item);
    }
  });

  const firstItemByPage = pages[currentPage][0];
  const secondItemByPage = pages[currentPage][pages[currentPage].length - 1];
  const from = firstItemByPage.split(' ')[1];
  const to = secondItemByPage.split(' ')[1];

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {currentPage + 1} (items {from} - {to} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            defaultValue={'5'}
            onChange={e => {
              setVisiblePerPage(Number(e.target.value));
              setCurrentPage(0);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>
      <Pagination
        total={items.length}
        perPage={visiblePerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ul>
        {pages[currentPage].map((item, index) => {
          return (
            <li data-cy="item" key={index}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
