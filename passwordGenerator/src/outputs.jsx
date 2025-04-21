import { memo } from "react"
export const LengthSlider = memo(({ setLength, length }) => {
  return (
    <>
      <input type="range"
        min={4}
        max={50}
        value={length}
        onChange={(event) => setLength(event.target.value)}></input>
      <label>Length({length})</label>
    </>
  )
})

export const NumbersBox = memo(({ setNumbersPresent }) => {
  return (
    <>
      <input type='checkbox'
        onChange={(() => setNumbersPresent(curr => !curr))} />
      <label>Numbers</label>
    </>
  )
})

export const CharactersBox = memo(({ setCharPresent }) => {
  return (
    <>
      <input type='checkbox'
        onChange={(() => setCharPresent(curr => !curr))} />
      <label>Characters</label>
    </>
  )
})