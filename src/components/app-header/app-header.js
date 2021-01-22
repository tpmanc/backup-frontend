import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { profileLogout } from '../../store/profile/actions'

import { Header } from 'rsuite'
import { Button, IconButton } from 'rsuite'
import { Icon } from 'rsuite'

import './app-header.sass'

function AppHeader() {
  const profile = useSelector(state => state.profile.profile)

  useEffect(() => {})

  return (
    <Header>
      header
      {/* <IconButton icon={<Icon icon="bell" />} /> */}
      <Button>{ profile.email ?? '' }</Button>
    </Header>
  )
}

export default AppHeader
