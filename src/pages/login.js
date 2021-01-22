import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { profileLogin } from '../store/profile/actions'

import { Table } from 'rsuite'
import { Button } from 'rsuite'
import { Panel } from 'rsuite'
import { Notification } from 'rsuite'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'rsuite'

export default function LoginPage() {
    const dispatch = useDispatch()

    // const postStatus = useSelector(state => state.projects.status)
    // const authToken = useSelector(state => state.profile.token)
    
    const [ login, setLogin ] = useState('')
    const [ password, setPassword ] = useState('')

    const onLoginChanged = value => setLogin(value)
    const onPasswordChanged = value => setPassword(value)

    useEffect(() => {
    })
    
    const loginSubmit = () => {
        dispatch(
            profileLogin(
                {
                    login,
                    password,
                },
                () => {
                    Notification.success({
                        title: 'Success!',
                        placement: 'topEnd',
                        description: 'Ok',
                    })
                },
                onError
            )
        )
    }
    const onError = (message) => {
        Notification.error({
            title: 'Error!',
            placement: 'topEnd',
            description: message,
        })
    }

    return (
        <div>
            <h3>Login To Profile</h3>

            <Panel header="Login" bordered>
                <Form fluid>
                    <FormGroup>
                        <ControlLabel>E-mail</ControlLabel>
                        <FormControl name="email" placeholder="Email" onChange={onLoginChanged} value={login} />
                        <HelpBlock>Required</HelpBlock>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl name="password" placeholder="Password" onChange={onPasswordChanged} value={password} />
                        <HelpBlock>Required</HelpBlock>
                    </FormGroup>
                </Form>

                <Button onClick={loginSubmit} color="green">
                    Login
                </Button>
            </Panel>
        </div>
    )
}