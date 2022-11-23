import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import './splash.css'
import { getAllClubs } from '../../store/bookclub'



function SplashPage(){

    const dispatch = useDispatch()
    const bookClubs = useSelector((state) => state.bookclubs.BookClubs)
    console.log(bookClubs)

    useEffect(() => {
        dispatch(getAllClubs())
    }, [dispatch])


    return (
        <div>

        </div>
    )
}

export default SplashPage
