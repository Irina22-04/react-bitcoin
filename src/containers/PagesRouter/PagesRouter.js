import React from "react";
import {Redirect, Route} from "react-router-dom";
import {Table} from "../Table/Table";
import {Result} from "../Result/Result";

export const PagesRouter = () => {
    return (
        <div>
            <Route path='/result' component={Result}/>
            <Route path='/' exact component={Table}/>
            <Route render={() => <Redirect to='/'/>}/>
        </div>
    )
};