import Panzoom, { type PanZoom } from 'panzoom'

/**
 * Shared logic for the SVG maps (`/country`, `/continent`).
 * Replaces the old Vue 2 `mixins/maps.js`.
 */
export function useWorldMap() {
  const entered = ref(false)
  const current = ref<string | null>(null)
  const moving = ref(false)
  const panzoom = ref<PanZoom | null>(null)
  const tooltip = ref<HTMLElement | null>(null)

  function initPanzoom() {
    const elem = document.getElementById('worldmap')
    if (!elem) return

    const instance = Panzoom(elem, {
      maxZoom: 8,
      zoomDoubleClickSpeed: 1
    })
    instance.on('pan', () => {
      moving.value = true
    })
    instance.on('panend', () => {
      setTimeout(() => {
        moving.value = false
      }, 500)
    })
    panzoom.value = instance
  }

  function reset() {
    if (!panzoom.value) return
    panzoom.value.moveTo(0, 0)
    setTimeout(() => {
      panzoom.value?.zoomAbs(0, 0, 1)
    }, 10)
  }

  function moveTooltip(el: MouseEvent) {
    if (tooltip.value) {
      tooltip.value.style.left = el.pageX + 'px'
      tooltip.value.style.top = `${el.pageY - 30}px`
    }
  }

  onMounted(() => {
    nextTick(initPanzoom)
  })

  onBeforeUnmount(() => {
    panzoom.value?.dispose()
  })

  return { entered, current, moving, panzoom, tooltip, reset, moveTooltip }
}
