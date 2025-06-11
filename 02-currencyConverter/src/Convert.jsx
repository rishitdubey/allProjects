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
                    <InputBox label="From" currency={fromCurrency} setFromAount={setFromAmount} fromCurrency={fromCurrency}
                        setFromCurrency={setFromCurrency} currencyOptions={currencyOptions} />
                </div>
                <br />
                <div id="output">
                    <OutputBox label="To" convertedAmount={convertedAmount} toCurrency={toCurrency} setToCurrency={setToCurrency}
                        currencyOptions={currencyOptions} />
                </div>
                <br />
                <div id="convert">
                    <ConvertButton convert={convert} />
                </div>
            </div>
        </>
    )
}

const ConvertButton = (convert) => {
    return <div>
        <button onClick={convert}>
            Convert {`${fromCurrency}`.toUpperCase()} to {`${toCurrency}`.toUpperCase()}
        </button>
    </div>
}
const InputBox = (label, currency = 0, setFromAmount, fromCurrency = "usd", setFromCurrency, currencyOptions = []) => {

    return <>

        <div className="w-md h-30 bg-neutral-500 rounded-xl px-5 py-2">
            <div className=" flex flex-row justify-between">
                <p className="text-gray-900">{label}</p>
                <p className="text-gray-900">Currency</p>
            </div>
        </div>

        <input
            type="number"
            value={currency}
            onChange={(e) => setFromAmount(e.target.value)} />

        <select
            value={fromCurrency}
            onChange={(event) => setFromCurrency(event.target.value)}
        >
            {
                currencyOptions.map((currency) => {
                    <option key={currency}>
                        {currency}
                    </option>
                })
            }
        </select>
    </>
}

const OutputBox = (label, convertedAmount, toCurrency = "inr", setToCurrency, currencyOptions = []) => {

    return <>
        <div>
            <p>{label}</p>
            <p>Currency</p>
        </div>

        <input
            type="number"
            readOnly
            value={convertedAmount} />

        <select
            value={toCurrency}
            onChange={(event) => setToCurrency(event.target.value)}
        >
            {
                currencyOptions.map((currency) => {
                    <option key={currency}>
                        {currency}
                    </option>
                })
            }
        </select>
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