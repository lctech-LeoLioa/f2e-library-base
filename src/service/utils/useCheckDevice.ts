import { useMediaQuery } from '@vueuse/core'
import screens from '@/vender/tailwindcss/screens.json'

export const useCheckDevice = () => {
  const isMobile = computed(() => {
    return !useMediaQuery(`(min-width: ${screens.desktop})`).value
  })

  return {
    isMobile,
  }
}
