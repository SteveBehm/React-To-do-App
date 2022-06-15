const Content = () => {

  const handleNameChange = () => {
    const names = ['Steve', 'Madison', 'Randy'];
    const randomNum = Math.floor(Math.random() * 3);
    return names[randomNum];
  }

  const handleClick = () => {
    console.log('you clicked it')
  }

  const handleClick2 = (name) => {
    console.log(`${name} was clicked`)
  }
  const handleClick3 = (e) => {
    console.log(e.target.innerHTML)
  }

  return  (
    <main>
      <p onDoubleClick={handleClick}>
        Hello {handleNameChange()}!
      </p>
      <button onClick={handleClick}>Click it!</button>
      <button onClick={() => handleClick2('Steve')}>Click it!</button>
      <button onClick={(e) => handleClick3(e)}>Click it!</button>
    </main>
  )
}

export default Content;
