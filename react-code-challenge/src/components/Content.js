const Content = ({ colorValue, hexValue, isDarkText }) => {
  return (
    <div
      className="box"
      style={{
        backgroundColor: colorValue,
        color: isDarkText ? "#000" : "#FFF"
      }}
    >
      <h3 className="colorName">{colorValue ? colorValue : "Empty Value"}</h3>
      <h4>{hexValue ? hexValue : null}</h4>
    </div>
  )
}

Content.defaultProps = {
  colorValue: "Empty Color Value"
}

export default Content;
