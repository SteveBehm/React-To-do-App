import Content from "./components/Content";
import AddColor from "./components/AddColor";
import { useState } from 'react';

function App() {
  const [colorValue, setColorValue] = useState('')
  const [hexValue, setHexValue] = useState('')
  const [isDarkText, setIsDarkText] = useState(true)

  return (
    <div className="App">
      <Content
        colorValue={colorValue}
        hexValue={hexValue}
        isDarkText={isDarkText}
      />
      <AddColor
        colorValue={colorValue}
        isDarkText={isDarkText}
        setColorValue={setColorValue}
        setHexValue={setHexValue}
        setIsDarkText={setIsDarkText}
      />
    </div>
  );
}

export default App;
