type CallbackFunction = () => void
type UnsubscribeFunction = () => void

export default function detectBackButton(
  callback: CallbackFunction
): UnsubscribeFunction {
  const id = Date.now()

  history.replaceState(
    { ...history.state, nextId: id },
    document.title,
    location.pathname
  )
  history.pushState({ id }, document.title, location.pathname)

  function handlePopEvent(evt: PopStateEvent) {
    const isBackButtonPressed = 'nextId' in evt.state && evt.state.nextId === id
    if (isBackButtonPressed) {
      // console.log('BACK BUTTON PRESSED')
      callback()
    }
  }

  window.addEventListener('popstate', handlePopEvent)
  // console.log('LISTENING TO POP STATE EVENT')

  function unsub() {
    // console.log('UNLISTENING POP STATE EVENT')
    window.removeEventListener('popstate', handlePopEvent)

    if ('id' in history.state && history.state.id === id) {
      history.back()
    }
  }

  return unsub
}
