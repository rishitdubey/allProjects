import { useState } from 'react'
import './App.css'
import "tailwindcss"
import { NumbersBox, CharactersBox, LengthSlider } from './outputs';
import { Generator } from './passGenerator';

function App() {
  const [length, setLength] = useState(6);
  const [numbersPresent, setNumbersPresent] = useState(false);
  const [charPresent, setCharPresent] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <>
      <Generator password={password} length={length} numbersPresent={numbersPresent} charPresent={charPresent} setPassword={setPassword} />
      <Output password={password} setLength={setLength} length={length} setNumbersPresent={setNumbersPresent} setCharPresent={setCharPresent} />
    </>)
}

const Output = ({ setLength, length, setNumbersPresent, setCharPresent }) => {
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <LengthSlider setLength={setLength} length={length} />
        <NumbersBox setNumbersPresent={setNumbersPresent} />
        <CharactersBox setCharPresent={setCharPresent} />
      </div>
    </>
  )
}

export default App