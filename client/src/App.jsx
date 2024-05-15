import React from 'react'
import {Navbar, Hero, Companies, Courses, Achievement, Feedback} from "./component/index.js";
import './App.css'

const App = () => {
    return (
        <div>
            <Navbar/>
            <Hero/>
            <Companies/>
            <Courses/>
            <Achievement/>
            <Feedback/>
        </div>
    )
}
export default App
