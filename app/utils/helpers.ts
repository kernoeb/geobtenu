export function debounce<T extends (...args: never[]) => void>(fn: T, delay: number) {
  let timeoutID: ReturnType<typeof setTimeout> | null = null
  return function (this: unknown, ...args: Parameters<T>) {
    if (timeoutID) clearTimeout(timeoutID)
    timeoutID = setTimeout(() => fn.apply(this, args), delay)
  }
}

export function removeAccents(text: string): string {
  return text
    .replace(/[ÁÀÂÃÄ]/gi, 'a')
    .replace(/[ÉÈÊË]/gi, 'e')
    .replace(/[ÍÌÎÏ]/gi, 'i')
    .replace(/[ÓÒÔÕÖ]/gi, 'o')
    .replace(/[ÚÙÛÜ]/gi, 'u')
    .replace(/[Ç]/gi, 'c')
}

export function sanitize(text: string): string {
  return removeAccents(text)
    .replace(/[-‘’']/g, ' ')
    .replace(/[.*?!]/g, '')
    .toUpperCase()
    .trim()
}

/** Continent id -> fill colour for the SVG maps. */
export function continentColor(continent?: string): string | undefined {
  switch (continent) {
    case 'EU': return '#eaff00'
    case 'AN': return '#29997f'
    case 'AF': return '#ffc600'
    case 'NA': return '#00ccff'
    case 'OC': return '#ff0000'
    case 'SA': return '#00ffee'
    case 'AS': return '#1ff18f'
    default: return undefined
  }
}
