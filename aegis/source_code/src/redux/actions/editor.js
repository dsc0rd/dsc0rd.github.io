export const SEND_EDITOR_TITLE = 'SEND_EDITOR_TITLE'
export const TOGGLE_EDITOR_STATE = 'TOGGLE_EDITOR_STATE'

export const sendEditorTitle = (title) => dispatch => {
  dispatch({
    type: SEND_EDITOR_TITLE,
    editorTitle: title
  })
}

export const toggleEditorState = (state) => dispatch => {
  dispatch({
    type: TOGGLE_EDITOR_STATE,
    editorState: state
  })
}
