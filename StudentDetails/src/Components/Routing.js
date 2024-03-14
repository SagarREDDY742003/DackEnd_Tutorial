import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './Main';
import Detail from './Detail';

const Routing = () => {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/Details/:id" element={<Detail/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing;