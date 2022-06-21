import colorNames from 'colornames'

const AddColor = ({ colorValue, isDarkText, setColorValue, setHexValue, setIsDarkText }) => {
  return (
    <form className="addColorForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor='addColor'>Add Color</label>
      <input
        autoFocus
        id='addColor'
        type='text'
        placeholder='Add color name'
        required
        value={colorValue}
        onChange={(e) => {
          setColorValue(e.target.value);
          setHexValue(colorNames(e.target.value));
          }
        }
      />
      <button
        type="button"
        onClick={() => setIsDarkText(!isDarkText)}
      >
      Toggle Text Color
      </button>
    </form>
  )
}

export default AddColor;
