import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import './main.css';
import { Link } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;

function Main(){

    const [stu, stuData] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}/student`)
        .then((res) => {
            stuData(res.data);
        })

    },[])

    const renderDetails = (data) => {
        if(data){
            return data.map((item) => {
                return(  
                    <div className='tab'>
                        <Link to={`/Details/${item.id}`} className='link'>
                        <p><span>ID: </span>{item.id}</p>
                        <p><span>Name: </span>{item.name}</p>
                        </Link>
                    </div>
                    
                )
            })
        }
        else{
            <p>NO data</p>
        }
    }

    return(
        <div className='main'>
            {/* <h1>Main Page</h1> */}
            {renderDetails(stu)}
        </div>
    )
}

export default Main;
