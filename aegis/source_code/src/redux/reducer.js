import {SEND_MAP_OBJECT } from './actions/mapObject'
import {SEND_EDITOR_TITLE, TOGGLE_EDITOR_STATE} from './actions/editor'
import {SEND_CUSTOM_MESSAGE, TOGGLE_VIEWER_STATE} from './actions/gissat'


const initialState = {
  mapObject: {},
  editorState: false,
  viewerState: false,
  customMessage: {title: "", content: ""}
}



export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_MAP_OBJECT:
      return {
      ...state,
      mapObject: action.mapObject
      }
    case SEND_EDITOR_TITLE:
      return {
      ...state,
      editorTitle: action.editorTitle
      }
    case TOGGLE_EDITOR_STATE:
      return {
      ...state,
      editorState: !state.editorState
      }
    case SEND_CUSTOM_MESSAGE:
      return {
      ...state,
      customMessage: action.customMessage
      }
    case TOGGLE_VIEWER_STATE:
      return {
      ...state,
      viewerState: !state.viewerState
      }
    default:
      return state;
  }
}
