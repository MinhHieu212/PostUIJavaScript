import { getUlPagination } from './selector'

export function initPagination({ elementId, defaultParams, onChange }) {
  const ulPagination = document.getElementById(elementId)

  if (!ulPagination) return

  const PrevLink = ulPagination.firstElementChild?.firstElementChild

  PrevLink.addEventListener('click', (event) => {
    event.preventDefault()
    console.log('Prev link click')
    const page = Number.parseInt(ulPagination.dataset.page) || 1
    if (page >= 2) onChange?.(page - 1)
  })

  const NextLink = ulPagination.lastElementChild?.firstElementChild

  NextLink.addEventListener('click', (event) => {
    event.preventDefault()
    console.log('Next link click')
    const page = Number.parseInt(ulPagination.dataset.page) || 1
    const totalPages = ulPagination.dataset.totalPages
    if (page < totalPages) onChange?.(page + 1)
  })
}

export function renderPagination(elementId, pagination) {
  const ulPagination = document.getElementById(elementId)

  if (!pagination || !ulPagination) return

  const { _limit, _page, _totalRows } = pagination

  const totalPages = Math.ceil(_totalRows / _limit)

  ulPagination.dataset.page = _page
  ulPagination.dataset.totalPages = totalPages

  if (_page <= 1) ulPagination.firstElementChild?.classList.add('disabled')
  else ulPagination.firstElementChild?.classList.remove('disabled')

  if (_page >= totalPages) ulPagination.lastElementChild.classList.add('disabled')
  else ulPagination.lastElementChild?.classList.remove('disabled')
}
