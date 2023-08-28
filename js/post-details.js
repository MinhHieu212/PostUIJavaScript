import dayjs from 'dayjs'
import postApi from './api/postApi'
import { registerLightBox, setTextContent } from './utils'

function renderPostDetails(postItem) {
  if (!postItem) return

  setTextContent(document, '#postDetailTitle', postItem.title)
  setTextContent(document, '#postDetailDescription', postItem.description)
  setTextContent(document, '#postDetailAuthor', postItem.author)
  setTextContent(
    document,
    '#postDetailTimeSpan',
    dayjs(postItem.updateAt).format(' - DD/MM/YYYY HH:mm'),
  )

  const heroImage = document.getElementById('postHeroImage')
  if (heroImage) {
    heroImage.style.backgroundImage = `url(${postItem.imageUrl})`

    heroImage.addEventListener('error', () => {
      heroImage.style.backgroundImage = url('https://placehold.co/1370x400?text=Thumbnail')
    })
  }

  const editpPageLink = document.getElementById('goToEditPageLink')
  if (editpPageLink) {
    editpPageLink.href = `/add-edit-post.html?id=${postItem.id}`
    editpPageLink.innerHTML = `<i class="fas fa-edit"></i> Edit Post`
  }
}

;(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')

    if (!postId) return

    const postItem = await postApi.getById(postId)

    renderPostDetails(postItem)

    registerLightBox({
      modalId: 'lightbox',
      imglightbox: 'img[data-id="lightboxImg"]',
      prevlightbox: 'button[data-id="lightboxPrev"]',
      nextlightbox: 'button[data-id="lightboxNext"]',
    })
  } catch (error) {
    console.log('get post item failed', error)
  }
})()
