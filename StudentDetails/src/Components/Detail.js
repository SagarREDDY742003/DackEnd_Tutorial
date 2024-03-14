import React from 'react';
import {useParams} from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import './detail.css';

const baseUrl = process.env.REACT_APP_API_URL;

function Detail(){

    let params = useParams();
    let id = params.id;

    const [details, setDetails] = useState([])

    useEffect(() => {
        sessionStorage.setItem('id',id)
        axios.get(`${baseUrl}/studentDetails/${id}`)
        .then((res) => {
            setDetails(res.data);
            console.log(res.data);
        })
    },[id])

    const renderData = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <div>
                        <p><span>stuId: </span>{item.id}</p>
                        <p><span>Name: </span>{item.name}</p>
                        <p><span>Department: </span>{item.dept_name}</p>
                        <p><span>Year: </span>{item.year}</p>
                    </div>
                )
            })
        }
    }

    return(
        <>
            {renderData(details)}
        </>
    )
}
export default Detail;