import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

const Me =  () => {
    const[me, setMe]= useState("");
    useEffect( ()=>{
        async function fetchData() {
            const response = await axios.get('http://localhost:3000/api/v1/auth/me', {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            });
            setMe(response.data);

            console.log(response.data);
        }
        fetchData();
    },[])
    
  return (
    <div>
        <h2>id:{me.id}</h2>
        <p></p>
        <h2>name:</h2>
        <p>{me.full_name}</p>
        <h2>email:</h2>
        <p>{me.email}</p>
        <h2>role_id:</h2>
        <p>{me.role_id}</p>
    </div>
  )
}

export default Me