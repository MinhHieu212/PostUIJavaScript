import { setBackGroundImg, setFieldValue, setTextContent } from './common'
import * as yup from 'yup'

const ImageSource = {
  UPLOAD: 'upload',
  PICSUM: 'picsum',
}

function renderPostForm(form, defaultValue) {
  setFieldValue(form, '[name="title"]', defaultValue?.title)
  setFieldValue(form, '[name="author"]', defaultValue?.author)
  setFieldValue(form, '[name="description"]', defaultValue?.description)
  setFieldValue(form, '[name="imageUrl"]', defaultValue?.imageUrl)

  setBackGroundImg(document, '#postHeroImage', defaultValue?.imageUrl)
}

function getFromValue(postForm) {
  const formValue = {}
  const formdataList = new FormData(postForm)
  for (const [key, value] of formdataList) {
    formValue[key] = value
  }

  return formValue
}

function getFormRule() {
  return yup.object().shape({
    title: yup.string().required('please enter title'),

    author: yup
      .string()
      .required('please enter author')
      .test(
        'at-least-2-words',
        'please enter at least two words',
        (value) => value.split(' ').filter((x) => !!x && x.length >= 3).length >= 2,
      ),

    description: yup.string(),

    imageSource: yup
      .string()
      .required('please select an image source')
      .oneOf([ImageSource.PICSUM, ImageSource.UPLOAD], 'Invalid Image Source'),

    // imageUrl: yup.string().when('imageSource', {
    //   is: ImageSource.PICSUM,
    //   then: yup
    //     .string()
    //     .required('Please random a background image')
    //     .url('Please enter a a valid Url '),
    // }),

    // image: yup.mixed().when('imageSource', {
    //   is: ImageSource.UPLOAD,
    //   then: yup.mixed().test('required', 'Please select an image to upload', (value) => {
    //     return Boolean(value?.name)
    //   }),
    // }),
  })
}

function setFieldError(postForm, fieldName, message) {
  const element = postForm.querySelector(`[name="${fieldName}"]`)
  if (element) {
    console.log('set error for element', element)
    element.setCustomValidity(message)
    setTextContent(element.parentElement, '.invalid-feedback', message)
  }
}

async function validateForm(postForm, formValue) {
  try {
    ;['title', 'author', 'description', 'imageUrl'].forEach((name) =>
      setFieldError(postForm, name, ''),
    )

    const formRules = getFormRule()
    console.log(formRules)

    await formRules.validate(formValue, { abortEarly: false })
  } catch (error) {
    const errorLog = {}
    console.log(error.name)
    console.log(error.inner)

    if (error.name == 'ValidationError' && Array.isArray(error.inner)) {
      for (const validationError of error.inner) {
        const name = validationError.path

        if (errorLog[name]) continue
        setFieldError(postForm, name, validationError.message)

        errorLog[name] = true
      }
    }
  }

  const isValid = postForm.checkValidity()
  if (!isValid) postForm.classList.add('was-validated')
  return isValid
}

function showLoading() {
  const button = document.querySelector('[name="submit"]')
  if (button) {
    button.disabled = true
    button.textContent = 'Saving'
  }
}
function hideLoading() {
  const button = document.querySelector('[name="submit"]')
  if (button) {
    button.disabled = false
    button.textContent = 'Save'
  }
}

function initEventRandomImg(form) {
  const buttonRandom = document.getElementById('postChangeImage')
  if (buttonRandom) {
    buttonRandom.addEventListener('click', () => {
      let url = `https://picsum.photos/id/${Math.round(Math.random() * 1000)}/1369/400`

      setFieldValue(form, '[name="imageUrl"]', url)
      setBackGroundImg(document, '#postHeroImage', url)

      // validaiton on change
    })
  }
}

function changeOptionSource(postFrom, optionValue) {
  const optionList = postFrom.querySelectorAll('[name="imageSourceGroup"]')
  if (!optionList) return

  optionList.forEach((option) => {
    option.hidden = option.dataset.option != optionValue
  })
}

function initImageSourceOption(postForm) {
  const radioList = postForm.querySelectorAll('.form-check-input')
  if (!radioList) return

  radioList.forEach((radio) => {
    radio.addEventListener('change', (event) => {
      changeOptionSource(postForm, event.target.value)
    })
  })
}

function initUploadImage(postForm) {
  const uploadImg = postForm.querySelector('[name="image"]')
  if (!uploadImg) return

  uploadImg.addEventListener('change', (event) => {
    if (!event.target.files[0]) return
    const imageUrl = URL.createObjectURL(event.target.files[0])

    setBackGroundImg(document, '#postHeroImage', imageUrl)
    setFieldValue(postForm, '[name="imageUrl"]', imageUrl)
  })
}

export function initPostForm({ postFromId, defaultValue, onChange }) {
  const postForm = document.getElementById(postFromId)

  if (!postForm) return

  initEventRandomImg(postForm)
  initImageSourceOption(postForm)
  initUploadImage(postForm)

  let submitting = false

  renderPostForm(postForm, defaultValue)

  postForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (submitting) return

    submitting = true
    showLoading()

    const formValue = getFromValue(postForm)
    formValue.id = defaultValue.id

    const isValid = await validateForm(postForm, formValue)
    if (isValid) await onChange?.(formValue)

    hideLoading()
    submitting = false
  })
}
