
import './App.css'

function App() {
  const cliendId = String(Math.random());
  console.log(cliendId)
  return (
    <>
      <div className='home'>
        <button className='button' onClick={()=>{
          localStorage.setItem('clientId', cliendId)
        }}>Register</button>
      </div>
    </>
  )
}

export default App
