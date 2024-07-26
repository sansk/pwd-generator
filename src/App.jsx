import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [pwd, setPwd] = useState("");

  const pwdRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) str += "0123456789";
    if (charAllow) str += "!~@#$%^*-+_";

    for (let i = 0; i < length; i++) {
      const item = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(item);
    }

    setPwd(pass);
  }, [length, numAllow, charAllow]);

  useEffect(() => {
    generatePassword();
  }, [length, numAllow, charAllow]);

  const copyPwdToClipboard = () => {
    window.navigator.clipboard.writeText(pwd);
    pwdRef.current?.select();
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={pwd}
          className="outline-none w-full py-1 px-3"
          placeholedr="Password"
          readOnly
          ref={pwdRef}
        />
        <button
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={copyPwdToClipboard}>
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            name="length"
            id=""
            min={6}
            max={30}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            name="numbers"
            id=""
            defaultChecked={numAllow}
            onChange={() => setNumAllow((prev) => !prev)}
          />
          <label htmlFor="numbers">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            name="char"
            id=""
            defaultChecked={charAllow}
            onChange={() => setCharAllow((prev) => !prev)}
          />
          <label htmlFor="char">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
