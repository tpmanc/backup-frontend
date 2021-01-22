import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from "react-router-dom"
import { serverLoad } from '../store/server/actions'
import { databasesLoad, databaseSave, databaseDelete, databaseRun } from '../store/databases/actions'
import { filesLoad, filesSave, filesDelete, filesRun } from '../store/files/actions'

import { Table } from 'rsuite'
import { Loader } from 'rsuite'
import { Notification } from 'rsuite'
import { Placeholder } from 'rsuite'
import { Drawer } from 'rsuite'
import { Icon } from 'rsuite'
import { Button, IconButton } from 'rsuite'
import { Panel } from 'rsuite'
import { Divider } from 'rsuite'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'rsuite'

export default function ServerView() {
    const dispatch = useDispatch()
    let { id } = useParams()
    const { Column, HeaderCell, Cell } = Table

    const serverRequestStatus = useSelector(state => state.server.status)
    const server = useSelector(state => state.server.item)

    const databasesRequestStatus = useSelector(state => state.databases.status)
    const databasesSaveRequestStatus = useSelector(state => state.databases.saveStatus)
    const databasesDeleteRequestStatus = useSelector(state => state.databases.deleteStatus)
    const databases = useSelector(state => state.databases.items)
    
    const filesRequestStatus = useSelector(state => state.files.status)
    const filesSaveRequestStatus = useSelector(state => state.files.saveStatus)
    const filesDeleteRequestStatus = useSelector(state => state.files.deleteStatus)
    const files = useSelector(state => state.files.items)

    useEffect(() => {
        dispatch(
            databasesLoad(
                id,
                () => {},
                onError,
            )
        )
        dispatch(
            serverLoad(
                id,
                () => {},
                onError,
            )
        )
        dispatch(
            filesLoad(
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
    const success = (message) => {
        Notification.success({
            title: 'Success!',
            placement: 'topEnd',
            description: message,
        })
    }

    const [ databaseDrawerOpen, setDatabaseDrawerOpen ] = useState(false)
    const [ databaseDrawerTitle, setDatabaseDrawerTitle ] = useState('')
    const [ formId, setFormId ] = useState(0)
    const [ formUser, setFormUser ] = useState('')
    const [ formPassword, setFormPassword ] = useState('')
    const [ formDatabase, setFormDatabase ] = useState('')

    const [ formFilesId, setFormFilesId ] = useState(0)
    const [ formPath, setFormPath ] = useState('')

    const [ filesDrawerOpen, setFilesDrawerOpen ] = useState(false)
    const [ filesDrawerTitle, setFilesDrawerTitle ] = useState('')

    const addDatabase = () => {
        setDatabaseDrawerTitle('Add Database Backup')
        openDatabaseDrawer()
    }
    const openDatabaseDrawer = () => {
        setDatabaseDrawerOpen(true)
    }
    const closeDatabaseDrawer = () => {
        resetDatabaseForm()
        setDatabaseDrawerOpen(false)
    }
    const onUserChanged = value => setFormUser(value)
    const onPasswordChanged = value => setFormPassword(value)
    const onDatabaseChanged = value => setFormDatabase(value)
    const resetDatabaseForm = () => {
        setFormId(0)
        setFormUser('')
        setFormPassword('')
        setFormDatabase('')
    }
    const saveDatabase = () => {
        dispatch(
            databaseSave(
                {
                    serverId: id,
                    id: formId,
                    user: formUser,
                    password: formPassword,
                    database: formDatabase,
                },
                () => {
                    closeDatabaseDrawer()
                    resetDatabaseForm()
                    Notification.success({
                        title: 'Success!',
                        placement: 'topEnd',
                        description: 'Database Saved',
                    })
                },
                onError,
            )
        )
    }

    const onPathChanged = value => setFormPath(value)
    const addFiles = () => {
        setFilesDrawerTitle('Add Files Backup')
        openFilesDrawer()
    }
    const openFilesDrawer = () => {
        setFilesDrawerOpen(true)
    }
    const closeFilesDrawer = () => {
        resetFilesForm()
        setFilesDrawerOpen(false)
    }
    const resetFilesForm = () => {
        setFormFilesId(0)
        setFormPath('')
    }
    const saveFiles = () => {
        dispatch(
            filesSave(
                {
                    serverId: id,
                    id: formFilesId,
                    path: formPath,
                },
                () => {
                    closeFilesDrawer()
                    resetFilesForm()
                    Notification.success({
                        title: 'Success!',
                        placement: 'topEnd',
                        description: 'Files Backup Saved',
                    })
                },
                onError,
            )
        )
    }

    const renderDatabaseTable = () => {
        return <Table
            data={databases}
            onRowClick={data => {}}
        >
            <Column width={70} align="center">
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
            </Column>

            <Column flexGrow={1}>
                <HeaderCell>Database</HeaderCell>
                <Cell dataKey="database" />
            </Column>

            <Column width={200}>
                <HeaderCell></HeaderCell>

                <Cell>
                    {rowData => {
                        function runAction() {
                            dispatch(
                                databaseRun(
                                    rowData.id,
                                    () => {
                                        success('Database Backup Started')
                                    },
                                    onError,
                                )
                            )
                        }
                        return (
                            <span>
                                <IconButton size="xs" icon={ <Icon icon="play"/> } onClick={runAction} />
                            </span>
                        )
                    }}
                </Cell>
            </Column>

            <Column width={200} fixed="right">
                <HeaderCell>Action</HeaderCell>

                <Cell>
                    {rowData => {
                    function editAction() {
                        setFormId(rowData.id)
                        setFormUser(rowData.user)
                        setFormPassword(rowData.password)
                        setFormDatabase(rowData.database)
                        setDatabaseDrawerTitle('Edit Database')
                        openDatabaseDrawer()
                    }
                    function deleteAction() {
                        dispatch(
                            databaseDelete(
                                rowData.id,
                                () => {
                                    success('Database Backup Removed')
                                },
                                onError,
                            )
                        )
                    }
                    return (
                        <span>
                            <IconButton size="xs" icon={ <Icon icon="eye"/> } componentClass={Link} to={`/database/${rowData.id}`} />{' '}
                            <IconButton size="xs" icon={ <Icon icon="edit"/> } onClick={editAction} />{' '}
                            <IconButton size="xs" icon={ <Icon icon="trash2"/> } onClick={deleteAction} />
                        </span>
                    );
                    }}
                </Cell>
            </Column>
        </Table>
    }

    const renderFilesTable = () => {
        return <Table
            data={files}
            onRowClick={data => {}}
        >
            <Column width={70} align="center">
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
            </Column>

            <Column flexGrow={1}>
            <HeaderCell>Path</HeaderCell>
            <Cell dataKey="path" />
            </Column>

            <Column width={200}>
                <HeaderCell></HeaderCell>

                <Cell>
                    {rowData => {
                    function runAction() {
                        dispatch(
                            filesRun(
                                rowData.id,
                                () => {
                                    success('Files Backup Started')
                                },
                                onError,
                            )
                        )
                    }
                    return (
                        <span>
                            <IconButton size="xs" icon={ <Icon icon="play"/> } onClick={runAction} />
                        </span>
                    );
                    }}
                </Cell>
            </Column>

            <Column width={200} fixed="right">
                <HeaderCell>Action</HeaderCell>

                <Cell>
                    {rowData => {
                    function editAction() {
                        setFormFilesId(rowData.id)
                        setFormPath(rowData.path)
                        setFilesDrawerTitle('Edit Files')
                        openFilesDrawer()
                    }
                    function deleteAction() {
                        dispatch(
                            filesDelete(
                                rowData.id,
                                () => {
                                    success('Files Backup Removed')
                                },
                                onError,
                            )
                        )
                    }
                    return (
                        <span>
                            <IconButton size="xs" icon={ <Icon icon="eye"/> } componentClass={Link} to={`/files/${rowData.id}`} />{' '}
                            <IconButton size="xs" icon={ <Icon icon="edit"/> } onClick={editAction} />{' '}
                            <IconButton size="xs" icon={ <Icon icon="trash2"/> } onClick={deleteAction} />
                        </span>
                    );
                    }}
                </Cell>
            </Column>
        </Table>
    }

    return (
        <div>
            {
                serverRequestStatus !== 'loaded'
                    ? <Placeholder.Paragraph rows={1} rowHeight={42} rowMargin={0} active />
                    : <h3>Server "{server.host}"</h3>
            }

            <br/>
            <h4>Database Backups</h4>
            <Panel bordered>
                <Button onClick={addDatabase} color="green">
                    Add Database Backup
                </Button>

                <Divider />

                {
                    (databasesRequestStatus === 'loading')
                        ? <Placeholder.Paragraph rows={5} active>
                            <Loader center backdrop content="loading" size="md" />
                        </Placeholder.Paragraph>
                        : renderDatabaseTable()
                }
            </Panel>

            <br/>
            <h4>Files Backups</h4>
            <Panel bordered>
                <Button onClick={addFiles} color="green">
                    Add Files Backup
                </Button>

                <Divider />

                {
                    (filesRequestStatus === 'loading')
                        ? <Placeholder.Paragraph rows={5} active>
                            <Loader center backdrop content="loading" size="md" />
                        </Placeholder.Paragraph>
                        : renderFilesTable()
                }
            </Panel>

            <Drawer
                show={databaseDrawerOpen}
                onHide={closeDatabaseDrawer}
            >
                <Drawer.Header>
                    <Drawer.Title>{ databaseDrawerTitle }</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <p>Fill Database connection information</p><br/>
                    <Form fluid>
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
                            <ControlLabel>Database</ControlLabel>
                            <FormControl name="database" placeholder="Database" onChange={onDatabaseChanged} value={formDatabase} />
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                    </Form>
                </Drawer.Body>
                <Drawer.Footer>
                    <Button onClick={saveDatabase} appearance="primary" loading={databasesSaveRequestStatus === 'processing'}>Save</Button>
                    <Button onClick={closeDatabaseDrawer} appearance="subtle">Cancel</Button>
                </Drawer.Footer>
            </Drawer>

            <Drawer
                show={filesDrawerOpen}
                onHide={closeFilesDrawer}
            >
                <Drawer.Header>
                    <Drawer.Title>{ filesDrawerTitle }</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <Form fluid>
                        <FormGroup>
                            <ControlLabel>Folder Path</ControlLabel>
                            <FormControl name="path" placeholder="Path" onChange={onPathChanged} value={formPath} />
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                    </Form>
                </Drawer.Body>
                <Drawer.Footer>
                    <Button onClick={saveFiles} appearance="primary" loading={databasesSaveRequestStatus === 'processing'}>Save</Button>
                    <Button onClick={closeDatabaseDrawer} appearance="subtle">Cancel</Button>
                </Drawer.Footer>
            </Drawer>
        </div>
    )
}