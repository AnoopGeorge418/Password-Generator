import { useCallback, useEffect, useRef, useState } from "react"


function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [CharacterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if (numberAllowed) str += "0123456789"
    if (CharacterAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, CharacterAllowed]) 

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, CharacterAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-3xl font-bold mb-2 text-center">Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input 
          type="text" 
          className="outline-none w-full py-1 px-3 border mr-2" 
          value={password} 
          readOnly 
          placeholder="Your Secure Password"
          ref={passwordRef}
        />
        <button 
            className="outline-none bg-blue-700 text-white px-3 py-1 hover:bg-blue-600 shrink-0"
            onClick={copyPasswordToClipboard}
          >
          Copy
        </button>
      </div>

      <div className="flex text-5m gap-x-2">
        <div className="flex items-center gap-x-1">
          <label htmlFor="length">Password Length: {length}</label>
          <input 
            type="range" 
            min={6}
            max={100}
            value={length} 
            onChange={(e) => setLength(e.target.value)} 
            className="cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-x-1">
          <label htmlFor="numbers">Numbers</label>
          <input 
            type="checkbox" 
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
        </div>

        <div className="flex items-center gap-x-1">
          <label htmlFor="characters">Characters</label>
          <input 
            type="checkbox" 
            defaultChecked={CharacterAllowed}
            onChange={() => setCharacterAllowed((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  )
}

export default App
