// import { useState } from 'react'
import rateMyUnitLogo from './assets/logo-default.svg'
import './styles/App.css'

function App() {
    return (
      <>
          <div>
              <a href="https://react.dev" target="_blank">
                  <img src={rateMyUnitLogo} className="logo" alt="Rate My Unit logo"/>
              </a>
          </div>
          <br/>
          <b>
              <h1>Welcome to Rate My Unit</h1>
          </b>
          <div className="card flex justify-center gap-10">
              <button onClick={() => {}}>
                  Sign up
              </button>
              <button onClick={() => {}}>
                  Log in
              </button>
          </div>
          <div>
              <p>
                  Explore honest, student-written reviews for Monash University units.
                  Whether you're planning your next semester or curious about a subject,
                  our community-driven insights will help you make informed decisions.
              </p>
              <br/>
              <p>
                  Sign up to share your own experiences, or browse reviews to see what others thought.
                  Let’s make unit selection a little easier—together.
              </p>
          </div>
      </>
  )
}

export default App
