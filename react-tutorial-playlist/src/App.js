import Header from "./components/header";
import Content from "./components/content";
import Footer from "./components/footer";
import AddItem from "./components/AddItem";
import SearchItem from "./components/SearchItem";
import { useState, useEffect } from 'react'

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || [])
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('shoppinglist', JSON.stringify(items));
  }, [items])

  const addItem = (item) => {
    // if there are items, find the last value in the array and increment its id
    // if there are no items then this new item will have the id of 1
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item }
    const listItems = [...items, myNewItem]
    setItems(listItems);
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked} : item);
    setItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!newItem) return;

    // addItem
    addItem(newItem)
    // remove item from input value
    setNewItem('');
  }

  return (
    <div className='App'>
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
