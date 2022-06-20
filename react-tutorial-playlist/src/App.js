import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { useState } from 'react'

function App() {
  const [items, setItems] = useState([
      {
        id: 1,
        checked: false,
        item: 'half pound of cocoa covered almonds'
      },
      {
        id: 2,
        checked: false,
        item: 'pickles'
      },
      {
        id: 3,
        checked: false,
        item: 'turkey'
      }

  ])

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked} : item);
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems))
  }

  return (
    <div className='App'>
      <Header title="Grocery List" />
      <Content
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
