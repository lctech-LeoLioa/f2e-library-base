const COMP_TYPE_MAP = {
  /** f2eBase 樣式隸屬的檔案們 */
  f2eBase: import.meta.glob(
    ['@/components/**/**/*.vue', '@/components/**/*.vue', '@/components/*.vue', '@/assets/style.scss'],
    { eager: true }
  ),
}

const compKey = ref<keyof typeof COMP_TYPE_MAP>('f2eBase')
const compPathList = computed(() => {
  const compList = COMP_TYPE_MAP[compKey.value]
  return Object.keys(compList)
})

const sheets = ref<HTMLStyleElement[]>([])
const sheetHtml = ref('')

const updateStyle = ({ include }: { include: string[] }) => {
  const styleElements = document.documentElement.querySelectorAll('head style[data-vite-dev-id]')
  sheets.value = Array.from(styleElements)
    .filter(el => {
      const viteDevId = (el as HTMLStyleElement).dataset.viteDevId
      return include.some(path => viteDevId?.includes(path))
    })
    .map(el => {
      return el.cloneNode(true) as HTMLStyleElement
    })
}

if (import.meta.hot) {
  import.meta.hot.on('vite:afterUpdate', () => {
    updateStyle({ include: compPathList.value })
  })
}

watch(sheets, nVal => {
  sheetHtml.value = nVal.reduce((acc, cur) => {
    return acc.concat((cur as HTMLStyleElement)?.outerHTML)
  }, '')
})

export const useHeadStyleDev = (
  { compTypeKey }: { compTypeKey: keyof typeof COMP_TYPE_MAP } = {
    compTypeKey: 'f2eBase',
  }
) => {
  compKey.value = compTypeKey

  onMounted(() => {
    if (import.meta.env.DEV) {
      updateStyle({ include: compPathList.value })
    }
  })

  return {
    sheets,
    sheetHtml,
  }
}
