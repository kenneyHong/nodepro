function sendError(mes, data = null) {
  return sendMessage(mes, 'ERROR', data)
}
function sendCorrect(mes, data = null) {
  return sendMessage(mes, 'CORRECT', data)
}
function sendMessage( mes, err, data = null) {
  return {
    Code: err,
    Command: err == 'ERROR' ? data : null,
    Data: data,
    Message: mes,
  }
}
module.exports = {
  sendError,
  sendCorrect
}