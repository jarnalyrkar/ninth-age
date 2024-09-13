export function imageHoverEffect() {
  const imageContainer = document.querySelector(".hero__image-container")
  let mousePos = {x:undefined, y:undefined}
  let running = false
  let timeSinceMovement = new Date();
  let diff = 0
  let throttleIsRunning = false
  imageContainer.classList.add('transitions')
  imageContainer.addEventListener('mousemove', (ev) => {
      if (!throttleIsRunning) {
        startThrottle()
      }
      mousePos.x = ev.clientX
      mousePos.y = ev.clientY
      let normalizedX = ((mousePos.x - 0) / (imageContainer.clientWidth - 0) * 100)
      let normalizedY = ((mousePos.y - 0) / (imageContainer.clientHeight - 0) * 100)
      let valueX = normalizedX
      let valueY = normalizedY
      imageContainer.style.backgroundPositionX = valueX + "%"
      imageContainer.style.backgroundPositionY = valueY + "%"
      const moved = new Date()
      diff = (moved - timeSinceMovement) / 1000
      timeSinceMovement = moved
      throttleIsRunning = true
    })
    let throttle = null

    function startThrottle() {
      throttle = setInterval(() => {
      if ((new Date() - timeSinceMovement) / 1000 >= 5) {
        throttleIsRunning = false
        clearInterval(throttle)
      }
    }, 1000)
    }
}