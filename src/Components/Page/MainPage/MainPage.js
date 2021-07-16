import React from 'react'
import { Link } from 'react-router-dom'

function MainPage() {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            MainPage
        <Link to="/">main</Link>
          <Link to="/adminPage">adminPage</Link>
          <Link to="/loginPage">loginPage</Link>
          <Link to="/paymentPage">paymentPage</Link>
          <Link to="/reviewPage">reviewPage</Link>

        </div>
    )
}

export default MainPage
