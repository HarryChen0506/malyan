import triggerEvent from './triggerEvent'
import EVENTS from './EVENTS'
import EventTarget from './EventTarget'
import EventManager from './EventManager'
import MouseEventDispatchers from './eventDispatchers/MouseEventDispatchers'
import mouseEventListeners from './eventListeners/mouseEventListeners'

// Safari just doesn't allow you to use the EventTarget interface in your own objects other than DOM elements. 
// So I simply replicated the class to do it.
// const EventTarget = window.EventTarget ? window.EventTarget : CustomEventTarget
export const events = new EventTarget()

export {
  triggerEvent,
  EVENTS,
  EventTarget,
  EventManager,
  MouseEventDispatchers,
  mouseEventListeners
}

export default {
  triggerEvent,
  events,
  EVENTS,
  EventTarget,
  EventManager,
  MouseEventDispatchers,
  mouseEventListeners
}