import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Input,
  Dropdown,
  Form,
  FormGroup,
  Button,
  Label,
} from 'reactstrap';
import get from '../api/get';

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movieGenre, setMovieGenre] = useState([])
  const [tvGenre, setTvGenre] = useState([])
  const [search, setSearch] = useState('')

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownToggle = () => setDropdownOpen((prevState) => !prevState);

  const navigate = useNavigate()

  const toggle = () => setIsOpen(!isOpen);

  const onSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${search}`)
    setSearch('')
  }

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  const getGenre = async () => {
    try {
      const movie = await get.getGenre('movie')
      const tv = await get.getGenre('tv')
      setMovieGenre(movie.data.genres)
      setTvGenre(tv.data.genres)
    } catch (error) {

    }
  }

  useEffect(() => {
    getGenre()
  }, []);

  return (
    <div className='px-3 pb-3 pt-3 bg-dark shadow-lg'>
      <Navbar color='dark' className='d-flex flex-wrap' dark className="dark" expand='md'>
        {/* <NavbarBrand> */}
        <Link to='/' className='nav-link text-white fs-4 fw-bold me-5'>TENFLIX</Link>
        {/* </NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto flex-wrap d-flex justify-content-between w-100" navbar>
            <div className='d-flex flex-column flex-sm-row'>
              <NavItem>
                <Link to='/top_rated/tv' className='nav-link text-nowrap'>Top Rated Tv Series</Link>
              </NavItem>
              <NavItem>
                <Link to='/top_rated/movie' className='nav-link text-nowrap'>Top Rated Movies</Link>
              </NavItem>
              <Dropdown toggle={dropdownToggle} isOpen={dropdownOpen} nav inNavbar>
                <DropdownToggle className='nav-link' nav caret>
                  Genre
                </DropdownToggle>
                <DropdownMenu style={{ maxHeight: '400px', overflow: 'auto', marginBottom: '20px' }}>
                  <Dropdown>
                    <DropdownToggle className='ms-2 nav-link text-dark fw-bolder fs-5' nav>
                      Movie
                    </DropdownToggle>
                    <DropdownItem divider />
                    {movieGenre.map((genre, index) => (
                      <DropdownItem key={index}>
                        <Link to={`/movie/${genre.id}/${genre.name}`} onClick={dropdownToggle} className='nav-link text-dark'>{genre.name}</Link>
                      </DropdownItem>
                    ))}

                    <DropdownItem divider />
                  </Dropdown>
                  <Dropdown>
                    <DropdownToggle className='ms-2 nav-link text-dark fw-bolder fs-5' nav>
                      Tv
                    </DropdownToggle>

                    <DropdownItem divider />
                    {tvGenre.map((genre, index) => (
                      <DropdownItem key={index}>
                        <Link to={`/tv/${genre.id}/${genre.name}`} onClick={dropdownToggle} className='nav-link text-dark'>{genre.name}</Link>
                      </DropdownItem>
                    ))}

                  </Dropdown>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Nav>
        </Collapse>
        <div className='col-12 col-md-4 col-lg-6 mt-3'>
          <Form className='d-flex gap-3' onSubmit={onSubmit}>
            <Input
              id="search"
              name="search"
              placeholder="Search"
              type="text"
              onChange={onChange}
              value={search}
            />
            <Button color='primary'>
              Search
            </Button>
          </Form>
        </div>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;