import React from 'react';
import Router from 'next/router';

const index = () =>(
    <div>
       Deu Ruim!
        <button onClick={()=>Router.push('/')}>Go to Home</button>
    </div>
);

export default index;