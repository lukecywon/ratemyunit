import { useState } from 'react'
import rateMyUnitLogo from './assets/logo-default.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={rateMyUnitLogo} className="logo" alt="Rate My Unit logo" />
        </a>
      </div>
      <h1>Welcome to Rate My Unit</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
