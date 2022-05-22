import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header(props) {
  const { isLogin, setIsLogin } = props;

  const handleClick = () => {
    setIsLogin(false);
    localStorage.clear();
  };

  const name = (params) => {};
  const renderNav = isLogin ? (
    <>
      <Nav className="me-auto">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
      </Nav>

      <Nav>
        <Link to="/" className="nav-link" onClick={handleClick}>
          Logout
        </Link>
      </Nav>
    </>
  ) : (
    <>
      <Nav className="me-auto">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </Nav>

      <Nav>
        <Link to="/login" className="nav-link">
          Log In
        </Link>
      </Nav>
      <Nav>
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
      </Nav>
    </>
  );
  //console.log('Header-->', isLogin);
  return (
    <section>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {renderNav}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  );
}

export default Header;
