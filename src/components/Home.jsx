import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>This is a home page</h1>
      <h3>Go to product page</h3>
      <button>
        <Link to='/product'>
          Product page
        </Link>
      </button>
    </div>
  )
}

export default Home