import React from 'react';
import css from './Filter.module.css';
const Filter = ({ filter, onFilterChange }) => {
  return (
    <div className={css.container}>
      <label className={css.label} htmlFor="filter">
        Filter by name:
      </label>
      <input
        className={css.input}
        id="filter"
        type="text"
        value={filter}
        onChange={e => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default Filter;
