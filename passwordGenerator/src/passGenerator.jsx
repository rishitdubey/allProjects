import "tailwindcss"
import { useEffect } from "react";

export const Generator = ({ length, numbersPresent, charPresent, setPassword, password }) => {
  let allChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "1234567890";
  const characters = "!@#$%^&*()-_{}[]\|;/?<>,.";
  let passGenerated = "";

  if (numbersPresent) allChar += numbers;
  if (charPresent) allChar += characters;

  useEffect(() => {
    for (let i = 0; i < length; i++) {
      const randomPosition = Math.floor(Math.random() * allChar.length);
      passGenerated += allChar[randomPosition];
    }
    setPassword(passGenerated);

  }, [length, numbersPresent, charPresent])

  return (
    <>
      <input type="text"
        value={password}
        readOnly
        className="bg-green-300 w-max"
      />
    </>
  )
}