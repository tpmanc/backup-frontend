import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom"
import AuthRoute from './components/auth-route'
import AppSidebar from './components/app-sidebar/sidebar'
import AppHeader from './components/app-header/app-header'
import AppEcho from './components/echo'
import IndexPage from './pages/index'
import Projects from './pages/projects'
import ProjectView from './pages/project-view'
import ServerView from './pages/server-view'
import DatabaseView from './pages/database-view'
import FilesView from './pages/files-view'
import LoginPage from './pages/login'
import AppLoader from './pages/app-loader'
import { profileLoad } from './store/profile/actions'

import 'rsuite/dist/styles/rsuite-default.css'
import './App.css'
import { Container } from 'rsuite'
import { Content } from 'rsuite'

function App() {
  const dispatch = useDispatch()
  const profileRequestStatus = useSelector(state => state.profile.profileStatus)
  const profile = useSelector(state => state.profile.profile)

  useEffect(() => {
    dispatch(
      profileLoad(
        () => {
          //init echo
        },
        () => {
          // history.push('/login')
        },
        err => {},
      )
    )
  }, [])

  const contentStyles = {
    padding: 20,
    backgroundColor: '#ebedef',
  }

  return (
    <div className="show-fake-browser sidebar-page">
      <Router>
        <Switch>
          <Route strict path="/login">
            <LoginPage />
          </Route>
          {
            ((profileRequestStatus === 'loaded' || profileRequestStatus === 'error') && profile === null) ? <Redirect to={{pathname: '/login'}} /> : ''
          }
          {
            profileRequestStatus === 'init' || profileRequestStatus === 'loading'
              ? <AppLoader />
              : <Container className='full-height'>
                  <AppSidebar />
        
                  <Container>
                    <AppHeader />
                    <Content style={contentStyles}>
                      <AuthRoute authed={profile !== null} strict path='/projects' component={Projects} />
                      <AuthRoute authed={profile !== null} strict path='/project/:id' component={ProjectView} />
                      <AuthRoute authed={profile !== null} strict path='/server/:id' component={ServerView} />
                      <AuthRoute authed={profile !== null} strict path='/database/:id' component={DatabaseView} />
                      <AuthRoute authed={profile !== null} strict path='/files/:id' component={FilesView} />
                      <AuthRoute authed={profile !== null} strict path='/' component={IndexPage} />
                    </Content>
                  </Container>
                </Container>
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
