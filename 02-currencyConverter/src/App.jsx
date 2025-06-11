import { useState, useEffect } from "react";

const App = () => {
  const [fromAmount, setFromAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyData = useCurrencyInfo(fromCurrency);
  const currencyOptions = Object.keys(currencyData);
  const conversionFactor = currencyData[toCurrency];

  const convert = () => {
    setConvertedAmount(fromAmount * conversionFactor);
  }

  return (
    <>
      <div className="bg-neutral-900 min-h-screen">

        <div id="input">
          <InputBox currency={fromAmount} setFromAmount={setFromAmount} fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency} currencyOptions={currencyOptions} />
        </div>
        <br />
        <div id="output">
          <OutputBox convertedAmount={convertedAmount} toCurrency={toCurrency} setToCurrency={setToCurrency} currencyOptions={currencyOptions} />
        </div>
        <br />
        <div id="convert">
          <ConvertButton fromAmount={fromAmount} conversionFactor={conversionFactor} fromCurrency={fromCurrency} toCurrency={toCurrency} setConvertedAmount={setConvertedAmount} />
        </div>
      </div>
    </>
  )
}

const ConvertButton = ({ fromAmount, conversionFactor, fromCurrency, toCurrency, setConvertedAmount }) => {
  return <div className="w-xs h-10 bg-cyan-900 rounded-xl px-5 py-2">
    <button onClick={() => {
      setConvertedAmount(fromAmount * conversionFactor);
    }}>
      Convert {`${fromCurrency}`.toUpperCase()} to {`${toCurrency}`.toUpperCase()}
    </button>
  </div>
}

const InputBox = ({ currency = 0, setFromAmount, fromCurrency = "usd", setFromCurrency, currencyOptions = [] }) => {

  return <>

    <div className="w-md h-30 bg-neutral-500 rounded-xl px-5 py-2">
      <div className=" flex flex-row justify-between">
        <p className="text-gray-900">From</p>
        <p className="text-gray-900">Currency</p>
      </div>

      <div className="py-7 flex flex-row justify-between">
        <input
          id="inputAmount"
          type="number"
          value={currency}
          onChange={(e) => setFromAmount(Number((e.target.value)))} />

        <select
          value={fromCurrency}
          onChange={(event) => (setFromCurrency(Number(event.target.value)))}
        >
          {
            currencyOptions.map((currency) => {
              return <option key={currency}>
                {currency}
              </option>
            })
          }
        </select>
      </div>
    </div>
  </>
}

const OutputBox = ({ convertedAmount, toCurrency = "inr", setToCurrency, currencyOptions = [] }) => {

  return <>
    <div className="w-md h-30 bg-neutral-500 rounded-xl px-5 py-2">
      <div className=" flex flex-row justify-between">
        <p className="text-gray-900">To</p>
        <p className="text-gray-900">Currency</p>
      </div>

      <div className="py-7 flex flex-row justify-between">
        <output
          id="outputAmount"
          type="number"
          readOnly>
          {convertedAmount}
        </output>

        <select
          value={toCurrency}
          onChange={(event) => setToCurrency(Number((event.target.value)))}
        >
          {
            currencyOptions.map((currency) => {
              return <option key={currency}>
                {currency}
              </option>
            })
          }
        </select>
        
      </div>
    </div>
  </>
}

const useCurrencyInfo = (currency) => {
  const api = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`

  const [currencyData, setCurrencyData] = useState("")
  useEffect(() => {
    fetch(api)
      .then(res => res.json())
      .then(res => setCurrencyData(res[currency]))
  }, [currency])

  return currencyData;
}
export default App;
// import { useEffect, useState } from 'react'
// function App() {
//   const [amount, setAmount] = useState(0);
//   const [currency, setCurrency] = useState("");
//   const [from, setFrom] = useState("usd");
//   const [to, setTo] = useState("inr");

//   return (
//     <div className="bg-neutral-900 min-h-screen flex flex-row justify-evenly">
//       <InputBox/>
//     </div>
//   )
// }

// const InputBox = (label, amount=0, onAmountChange, onCurrencyChange,
// currencyOptions=[], selectCurrency="usd") => {

//   return (
//     <>
//       <div>

//         <div className="w-md h-30 bg-neutral-500 rounded-xl px-5 py-2">
//           <div className=" flex flex-row justify-between ">
//             <p className="text-gray-900">{label}</p>
//             <p className="text-gray-900">Currency</p>
//           </div>

//           <div className=" flex flex-row flex-wrap justify-between mt-3 px-4">

//             <div>
//               <input id="amount"
//                 type="number"
//                 value={amount}
//                 onChange={(event) => onAmountChange(Number(event.target.value))}
//                 className="bg-gray-300 rounded-sm">
//               </input>
//             </div>

//             <div className="right-0">
//               <select
//               required
//                 value={selectCurrency}
//                 onChange={(event)=>onCurrencyChange(event.target.value)}
//               >
//                 {
//                   currencyOptions.map((currency)=>{
//                     <option
//                     value={currency}
//                     key={currency}
//                     >
//                       {currency}
//                     </option>
//                   })
//                 }
//               </select>
//             </div>

//           </div>

//         </div>

//       </div>
//     </>
//   )
// }

// const useCurrencyInfo = (currency) => {

//   const [currencyData, setCurrencyData] = useState({});
//   const api = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;

//   useEffect(() => {
//     fetch(api)
//     .then((res)=>res.json())
//     .then((res)=>setCurrencyData(res[currency]))
//   }, [currency])

//   return currencyData;
// }

// export default App;
// // https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json