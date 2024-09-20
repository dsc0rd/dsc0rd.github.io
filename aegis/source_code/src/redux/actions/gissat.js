export const SEND_CUSTOM_MESSAGE = 'SEND_CUSTOM_MESSAGE'
export const TOGGLE_VIEWER_STATE = 'TOGGLE_VIEWER_STATE'

export const sendCustomMessage = (title, content) => dispatch => {
  dispatch({
    type: SEND_CUSTOM_MESSAGE,
    customMessage: {title, content}
  })
}


export const toggleViewerState = (state) => dispatch => {
  dispatch({
    type: TOGGLE_VIEWER_STATE,
    viewerState: state
  })
}
