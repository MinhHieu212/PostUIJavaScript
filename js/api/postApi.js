import axiosClient from './axiosClient.js'

const postApi = {
  add(data) {
    const path = '/posts'

    return axiosClient.post(path, data)
  },

  update(data) {
    const path = `/posts/${data.id}`

    return axiosClient.patch(path, data)
  },

  remove(id) {
    const path = `/posts/${id}`

    return axiosClient.remove(path)
  },

  getAll(params) {
    const path = '/posts'

    return axiosClient.get(path, { params })
  },

  getById(id) {
    const path = `/posts/${id}`

    return axiosClient.get(path)
  },
}

export default postApi
