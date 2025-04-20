import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const OTP_DIGITS_INPUT = 5;
  const [inputArr, setInputArr] = useState(
    new Array(OTP_DIGITS_INPUT).fill("")
  );
  const inputRef = useRef([]);
  const handleOnChange = (e, index) => {
    console.log(e, index);
    const value = e.target.value;
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);

    newValue && inputRef.current[index + 1]?.focus();
  };
  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);
  const handleKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      inputRef.current[index - 1]?.focus();
    }
  };
  return (
    <div className="App">
      <h1>Validate Otp</h1>
      {inputArr.map((data, index) => {
        return (
          <input
            key={index}
            ref={(data) => (inputRef.current[index] = data)}
            className="input-box"
            value={inputArr[index]}
            onChange={(e) => handleOnChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
}
