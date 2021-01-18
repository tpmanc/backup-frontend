import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from "react-router-dom"
import { projectsLoad, projectSave, projectDelete } from '../store/projects/actions'

import { Loader } from 'rsuite'
import { Drawer } from 'rsuite'
import { Table } from 'rsuite'
import { Icon } from 'rsuite'
import { Button, IconButton } from 'rsuite'
import { Panel } from 'rsuite'
import { Notification } from 'rsuite'
import { Placeholder } from 'rsuite'
import { Divider } from 'rsuite'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'rsuite'

export default function Projects() {
    const dispatch = useDispatch()
    const history = useHistory()

    const { Column, HeaderCell, Cell } = Table

    const postStatus = useSelector(state => state.projects.status)
    const projects = useSelector(state => state.projects.items)

    const requestStatus = useSelector(state => state.projects.saveStatus)
    
    const [ drawerOpen, setDrawerOpen ] = useState(false)
    const [ drawerTitle, setDrawerTitle ] = useState('')
    const [ id, setId ] = useState(0)
    const [ title, setTitle ] = useState('')

    useEffect(() => {
        if (postStatus === 'init') {
            dispatch(
                projectsLoad()
            )
        }
    })

    const deleteProject = (id) => {
        dispatch(
            projectDelete(
                id,
                () => {},
                onError,
            )
        )
    }

    const renderTable = () => {
        return <Table
            height={400}
            data={projects}
            onRowClick={data => {
                //history.push(`/project/${data.id}`)
            }}
        >
            <Column width={70} align="center">
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
            </Column>

            <Column flexGrow={1}>
            <HeaderCell>Title</HeaderCell>
            <Cell dataKey="title" />
            </Column>

            <Column width={200} fixed="right">
            <HeaderCell>Action</HeaderCell>

            <Cell>
                {rowData => {
                function editAction() {
                    setId(rowData.id)
                    setTitle(rowData.title)
                    setDrawerTitle('Edit Project')
                    openDrawer()
                }
                function deleteAction() {
                    deleteProject(rowData.id)
                }
                return (
                    <span>
                        <IconButton size="xs" icon={ <Icon icon="eye"/> } componentClass={Link} to={`/project/${rowData.id}`} />{' '}
                        <IconButton size="xs" icon={ <Icon icon="edit"/> } onClick={editAction} />{' '}
                        <IconButton size="xs" icon={ <Icon icon="trash2"/> } onClick={deleteAction} />
                    </span>
                );
                }}
            </Cell>
            </Column>
        </Table>
    }

    const addProject = () => {
        setDrawerTitle('Add Project')
        openDrawer()
    }
    const openDrawer = () => {
        setDrawerOpen(true)
    }
    const closeDrawer = () => {
        setId(0)
        setTitle('')
    
        setDrawerOpen(false)
    }
    const onTitleChanged = value => setTitle(value)
    const saveProject = () => {
        dispatch(
            projectSave(
                {
                    id,
                    title,
                },
                () => {
                    closeDrawer()
                    setTitle('')
                    setId(0)
                    Notification.success({
                        title: 'Success!',
                        placement: 'topStart',
                        description: 'Project Saved',
                    })
                },
                onError
            )
        )
    }
    const onError = (message) => {
        Notification.error({
            title: 'Error!',
            placement: 'topStart',
            description: message,
        })
    }

    return (
        <div>
            <h3>My Projects</h3>

            <Panel bordered>
                <Button onClick={addProject} color="green">
                    Add Project
                </Button>

                <Divider />

                {
                    (postStatus === 'loading' || postStatus === 'init')
                        ? <Placeholder.Paragraph rows={5} rowHeight={42} rowMargin={0}>
                            <Loader center backdrop content="loading" size="md" />
                        </Placeholder.Paragraph>
                        : renderTable()
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
                            <ControlLabel>Project Title</ControlLabel>
                            <FormControl name="name" placeholder="Title Input" onChange={onTitleChanged} value={title} />
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                    </Form>
                </Drawer.Body>
                <Drawer.Footer>
                    <Button onClick={saveProject} appearance="primary" loading={requestStatus === 'processing'}>Save</Button>
                    <Button onClick={closeDrawer} appearance="subtle">Cancel</Button>
                </Drawer.Footer>
            </Drawer>
        </div>
    )
}