import React, { useEffect, useState, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttp from '../../hooks/http';
import ErrorModal from '../UI/ErrorModal';

const Search = React.memo(props => {
  const { applyFilter } = props;
  const [filterState, setFilterState] = useState('');
  const inputRef = useRef();
  const { loading, error, data, identifier, sendRequest, clear } = useHttp();

  useEffect(()=>{
    const timer = setTimeout(() => {
      if (filterState === inputRef.current.value){
        const query = filterState.length === 0? "" : `?orderBy="title"&equalTo="${filterState}"`;
        sendRequest(
          `https://react-hooks-update-d4774.firebaseio.com/ingredients.json${query}`,
          'GET',
          null,
          null,
          'GET_INGREDIENT'
        );
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    }
  }, [filterState, inputRef, sendRequest]);

  useEffect(()=>{
    if(!loading && !error && data && identifier === 'GET_INGREDIENT'){
      const ingredientsArray = [];
      
      for( const key in data){
        ingredientsArray.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        });
      }
      applyFilter(ingredientsArray);
    }
  }, [data, error, loading, applyFilter, identifier])
  
  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {loading && 'Loading...'}
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
