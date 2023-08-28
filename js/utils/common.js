export function setTextContent(parent, selector, text) {
  if (!parent) return

  const temp = parent.querySelector(selector)
  if (temp) temp.textContent = text
}

export function setFieldValue(form, selector, value) {
  if (!form) return

  const feild = form.querySelector(selector)
  if (feild) feild.value = value
}

export function setBackGroundImg(parent, selector, urlImg) {
  if (!parent) return

  const image = parent.querySelector(selector)
  if (image) image.style.backgroundImage = `url("${urlImg}")`
}
