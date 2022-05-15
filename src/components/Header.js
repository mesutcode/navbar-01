import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header(props) {
  const { status, setStatus } = props;

  const renderNav = status ? (
    <>
      <Nav className="me-auto">
        <Link to="/dashborad" className="nav-link">
          Dashboard
        </Link>
      </Nav>

      <Nav>
        <Link to="/" className="nav-link" onClick={() => localStorage.clear()}>
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
  //console.log('Header-->', status);
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
