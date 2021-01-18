import React from 'react'
import { useEffect } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"
import AuthRoute from './components/auth-route'
import IndexPage from './pages/index'
import Projects from './pages/projects'
import ProjectView from './pages/project-view'
import ServerView from './pages/server-view'
import DatabaseView from './pages/database-view'
import FilesView from './pages/files-view'
import LoginPage from './pages/login'
import { profileLoad } from './store/profile/actions'

import 'rsuite/dist/styles/rsuite-default.css'
import { Navbar } from 'rsuite'
import { Container } from 'rsuite'
import { Content } from 'rsuite'
import { Sidebar, Sidenav } from 'rsuite';
import { Nav, Dropdown } from 'rsuite'
import { Icon } from 'rsuite'

function App() {
  const dispatch = useDispatch()
  // const history = useHistory()
  const profile = useSelector(state => state.profile.profile)

  useEffect(() => {
    dispatch(
      profileLoad(
        () => {},
        err => {
          
        },
      )
    )
  }, [])

  const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#34c3ff',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
  
  const iconStyles = {
    width: 56,
    height: 56,
    lineHeight: '56px',
    textAlign: 'center'
  }

  const contentStyles = {
    padding: 20,
  }

  const expand = true

  const NavToggle = ({ expand, onChange }) => {
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
              <Dropdown.Item>Help</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            { profile !== null ? profile.email : '' }
          </Nav>
  
          <Nav pullRight>
            <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
              <Icon icon={expand ? 'angle-left' : 'angle-right'} />
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
  }

  const handleToggle = () => {

  }

  return (
    <div className="show-fake-browser sidebar-page">
      <Router>
        <Container>
          <Sidebar
            style={{ display: 'flex', flexDirection: 'column' }}
            width={expand ? 260 : 56}
            collapsible
          >
            <Sidenav.Header>
              <div style={headerStyles}>
                <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
                <span style={{ marginLeft: 12 }}> Backuper</span>
              </div>
            </Sidenav.Header>
            <Sidenav
              expanded={expand}
              defaultOpenKeys={['3']}
              appearance="subtle"
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
            <NavToggle expand={expand} onChange={handleToggle} />
          </Sidebar>

          <Container>
            <Content style={contentStyles}>
              <Switch>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <AuthRoute authed={profile !== null} path='/projects' component={Projects} />
                <AuthRoute authed={profile !== null} path='/project/:id' component={ProjectView} />
                <AuthRoute authed={profile !== null} path='/server/:id' component={ServerView} />
                <AuthRoute authed={profile !== null} path='/database/:id' component={DatabaseView} />
                <AuthRoute authed={profile !== null} path='/files/:id' component={FilesView} />
                <AuthRoute authed={profile !== null} path='/' component={IndexPage} />
              </Switch>
            </Content>
          </Container>
        </Container>
      </Router>
    </div>
  );
}

export default App;
