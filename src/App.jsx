import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

//useState hook
function App() {
  const [length, setLength] = useState(8)
  const [numsAllow, setNumber] = useState(false)
  const [charAllow, setCharacter] = useState(false)
  const [password, setPassword] = useState("")


  //useRef hook
  let passwordRef = useRef(null) //check Line:58 where it is being call

  //useCallback hook
  const passwordGen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numsAllow) str += "0123456789"
    if(charAllow) str += "!@#$%^&*{}[]-_+=~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
      
    }

    setPassword(pass)

  }, [length, numsAllow, charAllow, setPassword]) //Here we hv use setPassword inorder to optimised and store it in cache even if we remove it the code will works fine but it is recommended to make the code optimized while using useCallback()
  // }, [length, numsAllow, charAllow]) 


  const copyPassToClipboard = useCallback(()=>{

    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,1); // This is to select specific range of input data
    window.navigator.clipboard.writeText(password)

  },[password])

  //useEffect hook
  useEffect(()=>{
    passwordGen()
  },[length, numsAllow, charAllow, passwordGen])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" 
            value={password} 
            className='outline-none w-full py-1 px-3' 
            placeholder='password' 
            readOnly
            ref={passwordRef}
            />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPassToClipboard}
          >copy</button>
        </div>

        <div className="flex text-sm gap-x-2">  
          <div className="flex items-center gap-x-1">
            <input type="range" 
              min={6} 
              max={40} 
              value={length} 
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
              />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numsAllow}
              id='numberInput'
              onChange={() => {
                setNumber((prev)=> !prev);
              }
            }
            />
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={charAllow}
              id='characterInput'
              onChange={() => {
                setCharacter((prev)=> !prev);
              }
            }
            />
            <label>Character</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
