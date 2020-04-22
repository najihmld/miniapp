module.exports = {
  response: (response, status, data) => {
    const result = {}
    result.status = status || 200
    result.data = data

    return response.status(result.status).json(result)
  }
}