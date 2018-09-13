import React from 'react';

const user = (props) =>(
    <div className="teste">
        <h1>
            {props.name}
        </h1>
        <p>Age: {props.age}</p>
        <style jsx>
         {`
            .teste{
                border: 1px solid #eee;
                box-shadow: 0px 2px 3px #ccc;
                padding:20px;
                text-align:center
            }
         `}   
        </style>
    </div>
);
export default user;