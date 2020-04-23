const {createPost, getPosts} = require('../model/post')
const helper = require('../helper')
const jwt = require('jsonwebtoken')

module.exports = {
  createPost: async (req, res) => {
    try {
      const setData = {
        title: req.body.title,
        description: req.body.description
      }
      const result = await createPost(setData)
      return helper.response(res, 200, result)
    } catch (err) {
      return helper.response(res, 404, err)
    }
  },
  getPosts: async (req, res) => {
    try {
      const result = await getPosts()
      return helper.response(res, 200, result)
    } catch (err) {
      return helper.response(res, 404, err)
    }
  }
}