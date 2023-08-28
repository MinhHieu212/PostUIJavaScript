import { setTextContent } from './common'

function getTitleError(postForm) {
  if (!postForm) return

  const titleElement = postForm.querySelector('[name="title"]')

  if (!titleElement) return

  if (titleElement.validity.valueMissing) return 'Please enter title'
  // if not error
  return ''
}

function getAuthorError(postForm) {
  const authorElement = postForm.querySelector('[name="author"]')

  if (!authorElement) return

  if (authorElement.validity.valueMissing) return 'Please enter author name'
  // if not error
  return ''
}

export function validateFromJava(postForm, formValue) {
  // get error
  const error = {
    title: getTitleError(postForm),
    author: getAuthorError(postForm),
  }

  // set error
  for (const key in error) {
    const element = postForm.querySelector(`[name="${key}"]`)
    if (element) {
      element.setCustomValidity(error[key])
      setTextContent(element.parentElement, '.invalid-feedback', error[key])
    }
  }

  const isValied = postForm.checkValidity()
  if (!isValied) postForm.classList.add('was-validated')

  return isValied
}
