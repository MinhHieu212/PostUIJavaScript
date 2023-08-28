function showLightBox(modalElement) {
  const myModal = new window.bootstrap.Modal(modalElement)
  if (myModal) myModal.show()
}

export function registerLightBox({ modalId, imglightbox, prevlightbox, nextlightbox }) {
  const modalElement = document.getElementById(modalId)

  if (!modalElement) return

  if (modalElement.dataset.register) return

  const lightboxImg = document.querySelector(imglightbox)
  const lightboxNext = document.querySelector(nextlightbox)
  const lightboxPrev = document.querySelector(prevlightbox)

  if (!lightboxImg || !lightboxNext || !lightboxPrev) return

  let imgList = []
  let currentIndex = 0

  function showImgAtIndex(index) {
    lightboxImg.src = imgList[index].src
  }

  document.addEventListener('click', (event) => {
    const { target } = event

    if (target.tagName != 'IMG' || target.dataset.img != 'imgGroup') return

    imgList = document.querySelectorAll(`img[data-img="${target.dataset.img}"]`)
    currentIndex = [...imgList].findIndex((x) => x == target)

    showImgAtIndex(currentIndex)
    showLightBox(modalElement)
  })

  lightboxPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length
    showImgAtIndex(currentIndex)
  })

  lightboxNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imgList.length
    showImgAtIndex(currentIndex)
  })

  // use 1 time

  modalElement.dataset.register = true
}
