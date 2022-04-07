import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

function User() {
    const [users, setusers] = useState( [] );
    const [loading, setloading] = useState( false );
    const [error, seterror] = useState( "" );

    useEffect(() => {
        fetchUsers()
    }, [] )
    
    const fetchUsers = async () => {
        try {
            setloading(true)
            const res = await axios.get( "https://jsonplaceholder.typicode.com/users" );
            setloading( false );
            console.log( "res", res );
            const data = res.data;
            setusers( data );
        } catch ( err ) {
            console.log( err );
            seterror( err );
            setloading( false );
        }
    };
    if ( !loading ) {
        if ( error ) {
            return <div style={{color:'red'}}>{error.message }</div>
        } else {
            return (
                <div>
                    {users.map( ( user ) => {
                        return <p key={ user.id }>{ user.name }</p>
                    } ) }
                </div>
            );
        }
       
    } else {
        return <h2>loading....</h2>
    }
    
}

export default User