
import EventTarget from './EventTarget'
// Safari just doesn't allow you to use the EventTarget interface in your own objects other than DOM elements. 
// So I simply replicated the class to do it.
// const EventTarget = window.EventTarget ? window.EventTarget : CustomEventTarget

export const EVENTS = {
  SAVE_DATA: 'save_data',
}

export const events = new EventTarget()

export default {
  EVENTS,
  events,
}
