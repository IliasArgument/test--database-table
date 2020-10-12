import React, { useState } from 'react';


export default props => {
       
       const [value, setValue] = useState('');

       const valueChange = event => {
           setValue(event.target.value)
       }
    return (

        <div className="input-group mb-3 mt-4">
    <div className="input-group-prepend">
       <button 
        className="btn btn-outline-secondary"
        onClick={()=> props.onSearchItem(value)}
        >Поиск</button>
    </div>
       <input
        className="form-control"
        value={value}
        onChange={valueChange}
        />
      </div>   
      
      
    );
}