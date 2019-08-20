import React, { useEffect, useState, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { applyFilter } = props;
  const [filterState, setFilterState] = useState('');
  const inputRef = useRef();

  useEffect(()=>{
    setTimeout(() => {
      if (filterState === inputRef.current.value){
        const query = filterState.length === 0? "" : `?orderBy="title"&equalTo="${filterState}"`;
        fetch(`https://react-hooks-update-d4774.firebaseio.com/ingredients.json${query}`)
        .then( 
          response => response.json()
        )
        .then( json => {
          const ingredientsArray = [];
    
          for( const key in json){
            ingredientsArray.push({
              id: key,
              title: json[key].title,
              amount: json[key].amount
            });
          }
          applyFilter(ingredientsArray);
        })
      }
    }, 500)
  }, [filterState, applyFilter, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text" 
            ref={inputRef}
            value={filterState}
            onChange={ event => setFilterState(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
