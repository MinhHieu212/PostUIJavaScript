import debounce from 'lodash.debounce'

export function initSearch({ elementId, defaultParams, onChange }) {
  const searchElement = document.getElementById(elementId)

  if (!searchElement) return

  if (defaultParams.get('title_like')) searchElement.value = defaultParams.get('title_like')

  const debounceSearch = debounce((event) => {
    onChange?.(event.target.value)
  }, 500)

  searchElement.addEventListener('input', debounceSearch)
}
