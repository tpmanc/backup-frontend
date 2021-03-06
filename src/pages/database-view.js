import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { databaseBackupsLoad } from '../store/database-backups/actions'

import { Notification } from 'rsuite'
import { Panel } from 'rsuite'
import { Table } from 'rsuite'
import { Icon } from 'rsuite'
import { IconButton } from 'rsuite'

export default function DatabaseView() {
    const dispatch = useDispatch()
    let { id } = useParams()
    const { Column, HeaderCell, Cell } = Table

    const backupsRequestStatus = useSelector(state => state.databaseBackups.status)
    const backups = useSelector(state => state.databaseBackups.item)

    useEffect(() => {
        dispatch(
            databaseBackupsLoad(
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

    const renderBackups = () => {
        return <Table
            data={backups}
            onRowClick={data => {}}
        >
            <Column width={70} align="center">
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
            </Column>

            <Column flexGrow={1}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
            </Column>

            <Column width={200} fixed="right">
                <HeaderCell>Action</HeaderCell>

                <Cell>
                    {rowData => {
                    function deleteAction() {
                        dispatch(
                            // filesDelete(
                            //     rowData.id,
                            //     () => {
                            //         success('Files Backup Removed')
                            //     },
                            //     onError,
                            // )
                        )
                    }
                    return (
                        <span>
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
            <h3>Backups</h3>

            <Panel bordered>
                {
                    (backupsRequestStatus === 'loading')
                        ? <div>loading</div>
                        : renderBackups()
                }
            </Panel>
        </div>
    )
}