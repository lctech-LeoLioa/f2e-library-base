export const parseJwt = (jwt: string) => {
  if (!jwt) {
    return null
  }
  const base64Url = jwt.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  let json = null
  try {
    json = JSON.parse(jsonPayload)
  } catch (error) {
    console.log(error)
  }
  return json
}

export const loadJs = (src: string, defer?: boolean) => {
  if (document.querySelector('script[src=' + src + ']')) {
    return
  }
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  script.defer = defer || false
  document.head.appendChild(script)
}

export const loadCss = (src: string) => {
  if (document.querySelector('link[href="' + src + '"]')) {
    return
  }
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = src
  document.head.appendChild(link)
}

export const maxZIndex = (): number => {
  let gotZindex = Math.max(
    1,
    ...Array.from(document.querySelectorAll('*'))
      .map(el => getComputedStyle(el).zIndex)
      .filter(v => !isNaN(parseInt(v[0])))
      .map(o => parseInt(o))
  )
  if (gotZindex >= 2000000000) {
    gotZindex = 2000000000 - 100
  }
  return gotZindex
}

export const moveToTop = (el: HTMLElement): void => {
  if (el) {
    el.style.zIndex = maxZIndex().toString()
  }
}

export const fixedContainer = (el: HTMLElement): void => {
  if (el && el.style) {
    el.style.position = 'fixed'
    el.style.width = '100%'
    el.style.height = '100vh'
    el.style.left = '0'
    el.style.top = '0'
  }
}

export function log(text: string, type: string = '') {
  let logStyle = ''
  if (type === 'init') {
    logStyle = 'text-shadow: 1px 1px 2px black, 0 0 1em #B06161, 0 0 0.2em #B06161; font-size: 18px;'
  }

  if (type === 'setter') {
    logStyle = 'text-shadow: 0.5px 0.5px black, 0 0 1em #C683D7; font-size: 14px;'
  }

  if (type === 'state') {
    logStyle = 'text-shadow: 0.5px 0.5px black, 0 0 1em #EEF296; font-size: 14px;'
  }

  if (type === 'error') {
    logStyle = 'text-shadow: 0.5px 0.5px black, 0 0 1em #B31312; font-size: 12px;'
  }

  console.log(`%c CORE > ${text}`, logStyle)
}
