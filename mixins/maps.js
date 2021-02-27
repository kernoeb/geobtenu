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
      zoom: false
    }
  },
  computed: {
    productionMode () {
      return process.env.NODE_ENV === 'production'
    }
  },
  methods: {
    fetchData (url, zoom) {
      // noinspection JSUnresolvedFunction
      fetch(url).then(response => response.json()).then((data) => {
        this.elements = data

        const elem = document.getElementById('worldmap')
        const parent = elem.parentElement

        setTimeout(() => {
          // eslint-disable-next-line no-undef
          this.panzoom = Panzoom(elem, {
            canvas: true,
            maxScale: 8,
            isSVG: true
          })
          if (this.zoom && this.$vuetify.breakpoint.mobile) { this.panzoom.zoom(1.2) }
          parent.addEventListener('wheel', this.panzoom.zoomWithWheel)
        }, 100)
      }).catch(() => {
        this.elements = []
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
      this.panzoom.reset()
      if (this.zoom && this.$vuetify.breakpoint.mobile) { this.panzoom.zoom(1.2, { animate: true }) }
    },
    moveTooltip (el) {
      if (this.$refs.tooltip) {
        this.$refs.tooltip.style.left = el.pageX + 'px'
        this.$refs.tooltip.style.top = `${el.pageY - 30}px`
      }
    }
  }
}
