export const SEND_MAP_OBJECT = 'SEND_MAP_OBJECT'

export const sendMapObject = (mapObject) => dispatch => {
  dispatch({
    type: SEND_MAP_OBJECT,
    mapObject
  })
}
