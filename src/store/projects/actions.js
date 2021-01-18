import {
  PROJECTS_LOAD_START,
  PROJECTS_LOAD_SUCCESS,
  PROJECTS_LOAD_ERROR,
  PROJECTS_INIT,
  PROJECTS_SAVE_START,
  PROJECTS_SAVE_SUCCESS,
  PROJECTS_SAVE_ERROR,
  PROJECTS_DELETE_START,
  PROJECTS_DELETE_SUCCESS,
  PROJECTS_DELETE_ERROR,
} from './const'
import { client } from '../../api/client'
import axios from 'axios'
import { axiosHelper } from '../../helpers/axios-helper'

export const projectsLoad = () => {
  return dispatch => {
    dispatch(projectsLoadStart())

    axiosHelper.get(
      client.getApiUrl() + '/projects',
      (res) => {
        dispatch(
          projectsLoadFinish({
            status: 'ok',
            items: res.data,
          })
        )
      },
      (err) => {
        dispatch(projectsLoadError(err.message))
      },
    )
  }
}
const projectsLoadFinish = res => ({
    type: PROJECTS_LOAD_SUCCESS,
    payload: {
      ...res
    }
})
const projectsLoadStart = res => ({
    type: PROJECTS_LOAD_START,
    payload: {
      ...res
    }
})
const projectsLoadError = res => ({
    type: PROJECTS_LOAD_ERROR,
    payload: {
      ...res
    }
})

export const projectsInit = res => ({
  type: PROJECTS_INIT,
  payload: {
    ...res
  }
})


export const projectSave = ({id, title}, callback, errorCallback) => {
  return dispatch => {
      dispatch(
        projectSaveStart()
      )

      axios
          .post(client.getApiUrl() + '/project/save', {
              id,
              title,
          })
          .then(res => {
              console.log(res.data)
              dispatch(
                projectSaveFinish({
                  item: res.data,
                  isNew: id == 0,
                })
              )

              callback()
          })
          .catch(err => {
              dispatch(projectSaveError());

              errorCallback(err.message)
          });
  }
}
const projectSaveStart = res => ({
  type: PROJECTS_SAVE_START,
  payload: {
    ...res
  }
})
const projectSaveFinish = res => ({
  type: PROJECTS_SAVE_SUCCESS,
  payload: {
    ...res
  }
})
const projectSaveError = res => ({
  type: PROJECTS_SAVE_ERROR,
  payload: {
    ...res
  }
})



export const projectDelete = (id, callback, onError) => {
  return dispatch => {
    dispatch(
      projectDeleteStart()
    )

    axios
      .post(client.getApiUrl() + '/project/delete', {
        id,
      })
      .then(res => {
        dispatch(
          projectDeleteFinish({
            id: res.data.id,
          })
        )

        callback()
      })
      .catch(err => {
        dispatch(projectDeleteError())

        if (onError !== undefined) {
          onError(err.message)
        }
      })
  }
}
const projectDeleteStart = res => ({
  type: PROJECTS_DELETE_START,
  payload: {
    ...res
  }
})
const projectDeleteFinish = res => ({
  type: PROJECTS_DELETE_SUCCESS,
  payload: {
    ...res
  }
})
const projectDeleteError = res => ({
  type: PROJECTS_DELETE_ERROR,
  payload: {
    ...res
  }
})