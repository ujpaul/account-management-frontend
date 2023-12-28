import { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Dropdown, NavLink } from "react-bootstrap";
import { useDispatch } from "react-redux";
import logo from "../assets/img/logo.png";
import people5 from "../assets/img/people/people-5.jpg";
export function LoggedinHome({ children }) {
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [toggle, setToggle] = useState(true);
  const navToggle = () => {
    document.getElementById("body").classList.toggle("ms-aside-left-open");
    document.getElementById("ms-side-nav").classList.toggle("ms-aside-open");
    document.getElementById("overlayleft").classList.toggle("d-block");
  };
  const logout = () => {
    localStorage.clear();
  };
  return (
    <div>
      {/* Sidenav */}
      <div
        className='body ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar'
        id='body'
      >
        <div>
          {/* Overlays */}
          <div
            className='ms-aside-overlay ms-overlay-left ms-toggler'
            id='overlayleft'
            data-target='#ms-side-nav'
            data-toggle='slideLeft'
            onClick={navToggle}
          />
          {/* Sidebar Navigation Left */}
          <div
            id='ms-side-nav'
            className='side-nav fixed ms-aside-scrollable ms-aside-left side-Nav-Bg'
            style={{ overflowY: "auto" }}
          >
            {/* Navigation */}
            <Accordion
              defaultActiveKey='0'
              className='accordion ms-main-aside fs-14'
              id='side-nav-accordion'
            >
              <li className='menu-item'>
                <Link to='/loggedin/users'>
                  <span>
                    <i className='material-icons fs-16'>assignment_ind</i>Users
                  </span>
                </Link>
              </li>
            </Accordion>
          </div>
        </div>
        <main className='body-content loggedIn-Home-Main'>
          {/* Navbar */}
          <nav className='navbar ms-navbar'>
            <div
              className='ms-aside-toggler ms-toggler pl-0'
              data-target='#ms-side-nav'
              data-toggle='slideLeft'
              onClick={navToggle}
            >
              <div className='hide-harmburger-menu'>
                <span className='ms-toggler-bar bg-primary' />
                <span className='ms-toggler-bar bg-primary' />
                <span className='ms-toggler-bar bg-primary' />
              </div>
              <div className='switch-menu'>
                {toggle ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/arrow-left.png`}
                    alt='arrow left icon'
                    width={30}
                    onClick={() => setToggle(false)}
                  />
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/arrow-right.png`}
                    alt='arrow right icon'
                    width={30}
                    onClick={() => setToggle(true)}
                  />
                )}
              </div>
            </div>
            <div className='logo-sn logo-sm ms-d-block-sm'>
              <Link className='pl-0 ml-0 text-center navbar-brand mr-0' to=''>
                <img src={logo} alt='logo' />{" "}
              </Link>
            </div>
            <ul className='ms-nav-list ms-inline mb-0' id='ms-nav-options'>
              <Dropdown className='ms-nav-item ms-nav-user'>
                <Dropdown.Toggle
                  as={NavLink}
                  id='userDropdown'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                  className='p-0 toggle-icon-none'
                >
                  {" "}
                  <div className='d-flex'>
                    <div className='mt-2'>
                      <span
                        style={{
                          fontFamily: "Roboto",
                          fontWeight: 600,
                        }}
                        className='mr-2'
                      >
                        Welcome, {user?.name}
                      </span>
                    </div>
                    <div style={{ width: 40, height: 41, borderRadius: "50%" }}>
                      <img
                        className='ms-user-img ms-img-round float-right'
                        src={`http://localhost:9000/uploads/${user.profilePhoto}`}
                        alt='people'
                        onClick={() => setShow(true)}
                        width={40}
                        height={41}
                      />
                    </div>
                  </div>
                </Dropdown.Toggle>
                {show ? (
                  <Dropdown.Menu
                    className='dropdown-menu-right user-dropdown'
                    aria-labelledby='userDropdown'
                  >
                    <li className='dropdown-divider' />
                    <li className='dropdown-menu-footer'>
                      <Link
                        className='media fs-14 p-2'
                        to='/loggedin/change-password'
                      >
                        <span onClick={() => setShow(false)}>
                          <i
                            className='fa fa-user mr-2'
                            style={{ fontSize: 20 }}
                          />{" "}
                          Change Password
                        </span>
                      </Link>
                    </li>
                    <li className='dropdown-menu-footer'>
                      <Link className='media fs-14 p-2' onClick={logout} to='/'>
                        <span>
                          <i className='flaticon-shut-down mr-2' /> Logout
                        </span>
                      </Link>
                    </li>
                  </Dropdown.Menu>
                ) : (
                  <></>
                )}
              </Dropdown>
            </ul>
            <div
              className='ms-toggler ms-d-block-sm pr-0 ms-nav-toggler'
              data-toggle='slideDown'
              data-target='#ms-nav-options'
            >
              <Dropdown className='ms-nav-item ms-nav-user'>
                <Dropdown.Toggle
                  as={NavLink}
                  id='userDropdown'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                  className='p-0 toggle-icon-none'
                >
                  {" "}
                  <img
                    className='ms-user-img ms-img-round float-right'
                    src={`http://localhost:9000/uploads/${user.profilePhoto}`}
                    alt='people'
                  />{" "}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className='dropdown-menu-right user-dropdown'
                  aria-labelledby='userDropdown'
                >
                  <li className='dropdown-menu-header'>
                    <h6 className='dropdown-header ms-inline m-0'>
                      <span className='text-disabled'>
                        Welcome, {user?.name}
                      </span>
                    </h6>
                  </li>
                  <li className='dropdown-divider' />
                  <li className='ms-dropdown-list'>
                    <Link
                      className='media fs-14 p-2'
                      to='/loggedin/change-password'
                    >
                      {" "}
                      <span>
                        <i className='flaticon-user mr-2' /> Change Password
                      </span>{" "}
                    </Link>
                  </li>
                  <li className='dropdown-divider' />

                  <li className='dropdown-menu-footer'>
                    <Link className='media fs-14 p-2' to='/'>
                      {" "}
                      <span>
                        <i className='flaticon-shut-down mr-2' /> Logout
                      </span>{" "}
                    </Link>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </nav>
          {children}
          {/* <Outlet></Outlet> */}
        </main>
      </div>
    </div>
  );
}
