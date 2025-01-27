
export default class Component {
  constructor(config = {}) {
    this[ATTRIBUTE_SYMBOL] = Object.create(null)
    this[PROPERTY_SYMBOL] = Object.create(null)
    this[EVENT_SYMBOL] = Object.create(null)
    this[STATE_SYMBOL] = Object.create(null)

    this.root = null

    this.created()
  }

  appendTo(element) {
    element.appendChild(this.root)
  }

  created() {
    this.root = document.createElement('div')
  }

  mounted() {
  }

  unmounted() { }

  update() {
  }

  appendChild(child) {
    this.children.push(child)
    child.appendTo(this.root)
  }

  get children() {
    return this[PROPERTY_SYMBOL].children
  }

  getAttribute(name) {
    if(name=='style')
      this.root.getAttribute('style')
    return this[ATTRIBUTE_SYMBOL][name]
  }

  setAttribute(name, value) {
    if(name=='style')
      this.root.setAttribute('style',value)
    return this[PROPERTY_SYMBOL][name] = this[ATTRIBUTE_SYMBOL][name] = value
  }

  addEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type])
      this[EVENT_SYMBOL][type] = new Set
    this[EVENT_SYMBOL][type].add(listener)
  }
  removeEventListener(type, listener) {
    if (!this[EVENT_SYMBOL][type])
      return
    this[EVENT_SYMBOL][type].delete(listener)
  }
  triggerEvent(type) {
    if (!this[EVENT_SYMBOL][type]) { return }
    for (let event of this[EVENT_SYMBOL][type]) {
      event.call(this)
    }
  }
}
