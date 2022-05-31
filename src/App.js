import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);


  useEffect(() => {
    axios.get(`www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
      .then((response) => {
        setData(response.data);
      })
  }, [])


  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = data.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(data)
    }
}
  return (
    <div>
      <input type="text" placeholder='Search....' onChange={(e) => searchItems(e.target.value)} />


      <div>
        {filteredResults.map((item) => {
          return (
            <div key={item.idMeal}>
              <img src={item.strMealThumb} alt={item.strMeal}/>
              <h2>{item.strMeal}</h2>
              <p>{item.strCategory}</p>
              <p>{item.strInstructions}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App;
