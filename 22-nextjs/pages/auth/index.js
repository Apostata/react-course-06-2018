import React from 'react';
import Link from 'next/link';
import User from '../../components/User';

const auth = (props) =>(
    <div>
       <h1>Auth page of {props.appName}</h1>
        <p>Ir para <Link href="/"><a>Home</a></Link></p>
        <User name="Rene" age={33}/>
    </div>
);

auth.getInitialProps = ()=>{
    const promise = new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve({ appName : "Supper App (auth)" })
        }, 1000);
    });
    return promise;
}

export default auth;