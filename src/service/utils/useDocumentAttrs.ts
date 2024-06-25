const activeColorMode = ref<'dark' | 'light'>('dark')
const THEME_KEY = 'jtheme'

const MUTATION_OPTIONS: MutationObserverInit = {
  attributes: true,
}

const _attrMap = ref(new Map())
let observer: MutationObserver | null = null

watch(
  _attrMap,
  nVal => {
    activeColorMode.value = nVal.get(THEME_KEY) === 'light' ? 'light' : 'dark'
  },
  {
    immediate: true,
    deep: true,
  }
)

const isDarkMode = computed(() => activeColorMode.value === 'dark')
const isLightMode = computed(() => activeColorMode.value === 'light')
const attrMap = computed(() => Object.fromEntries(_attrMap.value))

const generateAttrMap = (el: HTMLElement) => {
  const attrMap = new Map()
  ;[...el.attributes].forEach(attr => {
    attrMap.set(attr.nodeName, attr.nodeValue || '')
  })
  return attrMap
}

export const useDocumentAttrs = () => {
  onMounted(() => {
    if (!observer) {
      observer = new MutationObserver((_mutationList, _observer) => {
        _attrMap.value = generateAttrMap(document.documentElement)
      })
    }

    const htmlEl = document.querySelector('html')
    if (!htmlEl) return
    observer.observe(htmlEl, MUTATION_OPTIONS)
    _attrMap.value = generateAttrMap(document.documentElement)
  })

  onUnmounted(() => observer && observer.disconnect())

  return {
    activeColorMode,
    isDarkMode,
    isLightMode,
    attrMap,
  }
}
