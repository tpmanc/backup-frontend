import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams, Link } from "react-router-dom"
import { projectLoad } from '../store/project-view/actions'
import { serversLoad, serverSave, serverDelete } from '../store/servers/actions'

import { Loader } from 'rsuite'
import { Notification } from 'rsuite'
import { Table } from 'rsuite'
import { Drawer } from 'rsuite'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'rsuite'
import { Button, IconButton } from 'rsuite'
import { Icon } from 'rsuite'
import { Breadcrumb } from 'rsuite'
import { Placeholder } from 'rsuite'
import { Panel } from 'rsuite'
import { Divider } from 'rsuite'

export default function ProjectView() {
    const dispatch = useDispatch()
    const history = useHistory()
    let { id } = useParams()

    const projectRequestStatus = useSelector(state => state.projectView.status)
    const project = useSelector(state => state.projectView.item)
    
    const serversRequestStatus = useSelector(state => state.servers.status)
    const servers = useSelector(state => state.servers.items)

    const { Column, HeaderCell, Cell } = Table

    useEffect(() => {
        dispatch(
            projectLoad(
                id,
                () => {},
                onError,
            )
        )
        dispatch(
            serversLoad(
                id,
                () => {},
                onError,
            )
        )
    }, [id])

    const onError = (message) => {
        Notification.error({
            title: 'Error!',
            placement: 'topEnd',
            description: message,
        })
    }

    const renderServers = () => {
        return <Table
            height={400}
            data={servers}
            onRowClick={data => {
                // history.push(`/server/${data.id}`)
            }}
        >
            <Column width={70} align="center">
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
            </Column>

            <Column flexGrow={1}>
            <HeaderCell>host</HeaderCell>
            <Cell dataKey="host" />
            </Column>

            <Column width={200} fixed="right">
            <HeaderCell>Action</HeaderCell>

            <Cell>
                {rowData => {
                function editAction() {
                    setFormId(rowData.id)
                    setFormHost(rowData.host)
                    setFormUser(rowData.user)
                    setFormPassword(rowData.password)
                    setFormPort(rowData.port)

                    setDrawerTitle('Edit Server')
                    openDrawer()
                }
                function deleteAction() {
                    dispatch(
                        serverDelete(
                            rowData.id,
                            () => {},
                            onError,
                        )
                    )
                }
                return (
                    <span>
                        <IconButton size="xs" icon={ <Icon icon="eye"/> } componentClass={Link} to={`/server/${rowData.id}`} />{' '}
                        <IconButton size="xs" icon={ <Icon icon="edit"/> } onClick={editAction} />{' '}
                        <IconButton size="xs" icon={ <Icon icon="trash2"/> } onClick={deleteAction} />
                    </span>
                );
                }}
            </Cell>
            </Column>
        </Table>
    }

    const [ drawerOpen, setDrawerOpen ] = useState(false)
    const [ drawerTitle, setDrawerTitle ] = useState('')
    const [ formId, setFormId ] = useState(0)
    const [ formHost, setFormHost ] = useState('')
    const [ formUser, setFormUser ] = useState('')
    const [ formPassword, setFormPassword ] = useState('')
    const [ formPort, setFormPort ] = useState('')

    const addServer = () => {
        setDrawerTitle('Add Server')
        openDrawer()
    }
    const openDrawer = () => {
        setDrawerOpen(true)
    }
    const closeDrawer = () => {
        setFormId(0)
        setFormHost('')
        setFormUser('')
        setFormPassword('')
        setFormPort('')
    
        setDrawerOpen(false)
    }
    const onHostChanged = value => setFormHost(value)
    const onUserChanged = value => setFormUser(value)
    const onPasswordChanged = value => setFormPassword(value)
    const onPortChanged = value => setFormPort(value)
    const saveServer = () => {
        dispatch(
            serverSave({
                projectId: id,
                formId,
                formHost,
                formUser,
                formPassword,
                formPort,
            }, () => {
                closeDrawer()
                
                setFormId(0)
                setFormHost('')
                setFormUser('')
                setFormPassword('')
                setFormPort('')

                Notification.success({
                    title: 'Success!',
                    placement: 'topEnd',
                    description: 'Server Saved',
                })
            }, onError)
        )
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item componentClass={Link} to='/'>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item componentClass={Link} to='/projects'>Projects</Breadcrumb.Item>
                <Breadcrumb.Item active>Project</Breadcrumb.Item>
            </Breadcrumb>
            
            {
                projectRequestStatus !== 'loaded'
                    ? <Placeholder.Paragraph rows={1} rowHeight={42} rowMargin={0} />
                    : <h3>Project "{project.title}"</h3>
            }

            <br/>
            <h4>Servers</h4>
            <Panel bordered>
                <Button onClick={addServer} color="green">
                    Add Server
                </Button>

                <Divider />

                {
                    serversRequestStatus !== 'loaded'
                    ? <Loader content="loading" size="md" />
                    : renderServers()
                }
            </Panel>
            
            <Drawer
                show={drawerOpen}
                onHide={closeDrawer}
            >
                <Drawer.Header>
                    <Drawer.Title>{ drawerTitle }</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <Form fluid>
                        <FormGroup>
                            <ControlLabel>Host</ControlLabel>
                            <FormControl name="host" placeholder="Host" onChange={onHostChanged} value={formHost} />
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>User</ControlLabel>
                            <FormControl name="user" placeholder="User" onChange={onUserChanged} value={formUser} />
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl name="password" placeholder="Password" onChange={onPasswordChanged} value={formPassword} />
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Port</ControlLabel>
                            <FormControl name="port" type="number" placeholder="Port" onChange={onPortChanged} value={formPort} />
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                    </Form>
                </Drawer.Body>
                <Drawer.Footer>
                    <Button onClick={saveServer} appearance="primary">Save</Button>
                    <Button onClick={closeDrawer} appearance="subtle">Cancel</Button>
                </Drawer.Footer>
            </Drawer>
        </div>
    )
}