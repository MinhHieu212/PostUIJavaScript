import postApi from './api/postApi.js'
import { initPostForm, toast } from './utils'

// Post and patch why it not work??

async function handlerFormSubmit(postValue) {
  try {
    const postId = postValue.id

    const savePost = postId ? await postApi.update(postValue) : await postApi.add(postValue)

    toast.success('Succes Save Post')

    setInterval(() => {
      window.location.assign(`/post-details.html?id=${savePost.id}`)
    }, 2000)
  } catch (error) {
    toast.error(`Error : ${error}`)
    console.log(' handlerAddEditPost failed', error)
  }
}

;(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')

    // get default value
    const defaultValue = postId
      ? await postApi.getById(postId)
      : {
          title: '',
          description: '',
          author: '',
          imageUrl: '',
        }

    initPostForm({
      postFromId: 'postForm',
      defaultValue: defaultValue,
      onChange: handlerFormSubmit,
    })
  } catch (error) {
    console.log('failed to fetch data details', error)
  }
})()
