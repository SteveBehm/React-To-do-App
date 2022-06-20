// you can destructure the props in the parameter list so that you
// don't have to use props then below props.title

const Header = ({ title }) => {

  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}

// example of a default prop
Header.defaultProps = {
  title: "Default Title"
}

export default Header;
