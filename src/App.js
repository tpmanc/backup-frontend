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
import AppSidebar from './components/app-sidebar/sidebar'
import AppEcho from './components/echo'
import IndexPage from './pages/index'
import Projects from './pages/projects'
import ProjectView from './pages/project-view'
import ServerView from './pages/server-view'
import DatabaseView from './pages/database-view'
import FilesView from './pages/files-view'
import LoginPage from './pages/login'
import { profileLoad } from './store/profile/actions'

import 'rsuite/dist/styles/rsuite-default.css'
import { Container } from 'rsuite'
import { Content } from 'rsuite'

function App() {
  const dispatch = useDispatch()
  // const history = useHistory()
  const profile = useSelector(state => state.profile.profile)

  useEffect(() => {
    dispatch(
      profileLoad(
        () => {},
        err => {},
      )
    )
  }, [])

  const contentStyles = {
    padding: 20,
  }

  return (
    <div className="show-fake-browser sidebar-page">
      <Router>
        <Container>
          <AppSidebar />

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
