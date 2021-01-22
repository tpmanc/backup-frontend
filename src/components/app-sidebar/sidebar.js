import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"
import { profileLogout } from '../../store/profile/actions'

import 'rsuite/dist/styles/rsuite-default.css'
import { Navbar } from 'rsuite'
import { Sidebar, Sidenav } from 'rsuite';
import { Nav, Dropdown } from 'rsuite'
import { Icon } from 'rsuite'

import './app-sidebar.sass'

function AppSidebar() {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile.profile)

  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {})
  
  const iconStyles = {
    width: 56,
    height: 56,
    lineHeight: '56px',
    textAlign: 'center'
  }

  const logoutRun = () => {
    dispatch(
      profileLogout(
       () => {},
       (err) => {
         alert(err)
       },
      )
    )
  }

  const NavToggle = ({ onChange }) => {
    return (
      <Navbar appearance="subtle" className="nav-toggle">
        <Navbar.Body>
          <Nav>
            <Dropdown
              placement="topStart"
              trigger="click"
              renderTitle={children => {
                return <Icon style={iconStyles} icon="cog" />;
              }}
            >
              <Dropdown.Item onClick={logoutRun}>Sign out</Dropdown.Item>
            </Dropdown>
            <span className="profile">
              { profile !== null ? profile.email : '' }
            </span>
          </Nav>
  
          <Nav pullRight>
            <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
              <Icon icon={isOpen ? 'angle-left' : 'angle-right'} />
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Sidebar
        style={{ display: 'flex', flexDirection: 'column' }}
        className='app-sidebar'
        width={isOpen ? 260 : 56}
        collapsible
        >
        <Sidenav.Header>
          <div className='app-sidebar__header'>
            <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
            <span style={{ marginLeft: 12 }}> Backuper</span>
          </div>
        </Sidenav.Header>
        <Sidenav
          expanded={isOpen}
          defaultOpenKeys={['3']}
          appearance="subtle"
          className='app-sidebar__body'
        >
          <Sidenav.Body>
            <Nav>
                <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />} componentClass={Link} to="/">
                Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<Icon icon="group" />} componentClass={Link} to="/projects">
                Projects
                </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle onChange={handleToggle} />
    </Sidebar>
  );
}

export default AppSidebar;
