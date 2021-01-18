import { combineReducers } from 'redux'
import { projectsReducer } from './projects/reducer'
import { projectViewReducer } from './project-view/reducer'
import { serversReducer } from './servers/reducer'
import { serverViewReducer } from './server/reducer'
import { databasesReducer } from './databases/reducer'
import { filesReducer } from './files/reducer'
import { databaseBackupsReducer } from './database-backups/reducer'
import { filesBackupsReducer } from './files-backups/reducer'
import { profileReducer } from './profile/reducer'

export const rootReducer = combineReducers({
    projects: projectsReducer,
    projectView: projectViewReducer,
    servers: serversReducer,
    server: serverViewReducer,
    databases: databasesReducer,
    files: filesReducer,
    databaseBackups: databaseBackupsReducer,
    filesBackups: filesBackupsReducer,
    profile: profileReducer,
});