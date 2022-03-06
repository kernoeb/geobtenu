import Panzoom from 'panzoom'

export default {
  scrollToTop: true,
  transition: 'page',
  data () {
    return {
      elements: null,
      entered: false,
      current: null,
      panzoom: null,
      show: false,
      moving: false
    }
  },
  computed: {
    productionMode () {
      return process.env.NODE_ENV === 'production'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initPanzoom()
    })
  },
  methods: {
    initPanzoom () {
      const elem = document.getElementById('worldmap')

      this.panzoom = Panzoom(elem, {
        maxZoom: 8,
        zoomDoubleClickSpeed: 1
      })
      this.panzoom.on('pan', () => {
        this.moving = true
      })
      this.panzoom.on('panend', () => {
        setTimeout(() => { this.moving = false }, 500)
      })
    },
    getColor (continent) {
      if (continent === 'EU') {
        return '#eaff00'
      } else if (continent === 'AN') {
        return '#29997f'
      } else if (continent === 'AF') {
        return '#ffc600'
      } else if (continent === 'NA') {
        return '#00ccff'
      } else if (continent === 'OC') {
        return '#ff0000'
      } else if (continent === 'SA') {
        return '#00ffee'
      } else if (continent === 'AS') {
        return '#1ff18f'
      }
    },
    reset () {
      this.panzoom.moveTo(0, 0)
      setTimeout(() => {
        this.panzoom.zoomAbs(0, 0, 1)
      }, 10)
    },
    moveTooltip (el) {
      if (this.$refs.tooltip) {
        this.$refs.tooltip.style.left = el.pageX + 'px'
        this.$refs.tooltip.style.top = `${el.pageY - 30}px`
      }
    }
  }
}
