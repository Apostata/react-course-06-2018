import React from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text" 
            value={props.filterState}
            onChange={ event => props.applyFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
