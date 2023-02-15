function _findElement(selector) {
  return document.querySelector(selector)
}

function showElement(selector, parent=false) {
  if (parent) _findElement(selector).parentElement.classList.remove('hidden')
  else _findElement(selector).classList.remove('hidden')
}

function hideElement(selector) {
  if (selector == "[data-log-line]") {
    for(let i=0; i<7; i += 1) {
      _findElement(`[data-log-line="${i}"]`).parentElement.classList.add('hidden')
    }
  }
  else _findElement(selector).classList.add('hidden')
}

function enableElement(selector) {
  _findElement(selector).classList.remove('disabled')
}

function disableElement(selector) {
  _findElement(selector).classList.add('disabled')
}

function hideManyElements(selectors) {
  selectors.forEach(selector => {
    hideElement(selector)
  })
}

// Welcome section

let c = 4
let loader_symbols = ["/", "|", "\\", "-"]
let intervalId

let first_cmd = new Typed('#fetch', {
  strings: ["nod^150e ^100f^300etc^150h.js^600"],
  typeSpeed: 60,
  startDelay: 1000,

  onComplete: () => {
    document.querySelector(".typed-cursor").style.opacity = 0
    Promise.resolve()
      .then(() => new Promise(resolve => {
        setTimeout(() => {
          intervalId = setInterval(() => {
            document.querySelector("#loader").innerHTML = loader_symbols[c % 4]
            c += 1
          }, 100)
          showElement("#debug_log")
          resolve()
        }, 1000)
      }))
      .then(() => new Promise(resolve => {
        for(let i=0; i<6; i += 1) {
          setTimeout(() => {
            showElement(`[data-log-line="${i}"]`, parent=true)
          }, 1000 + 200 * i)
        }
        setTimeout(() => {
          showElement(`[data-log-line="6"]`, parent=true)
          clearInterval(intervalId)
          hideElement("#loader")
          resolve()
        }, 2200)
      }))
      .then(() => new Promise(resolve => {
        setTimeout(() => {
          showElement("#return_status")
          resolve()
        }, 500)
      }))
      .then(() => new Promise(resolve => {
        setTimeout(() => {
          showElement("#clear", true)
          resolve()
        }, 500)
      }))
      .then(() => {
        let second_cmd = new Typed("#clear", {
          strings: ['cl^100ear^2000'],
          typeSpeed: 60,
          startDelay: 1000,
          
          onComplete: () => {
            document.addEventListener('wheel', disableWelcome)
          }
        })
      })
  }
})

function disableWelcome() {
  document.removeEventListener('wheel', disableWelcome)
  disableElement('#fetch_process')
  aboutMeSection()
}

function aboutMeSection() {
  let ranger = new Typed("#ranger", {
    strings: ['^1500ra^30n^100g^150e^10r^700'],
    typeSpeed: 60,
    onComplete: () => {
      showElement('header')
      showElement('footer')
      let floating = document.querySelector('#aboutme_floating_cmd')
      floating.style.top = '148px'
      floating.style.left = '80px'
      ranger.destroy()
      let nvim = new Typed('#ranger', {
        strings: ['^1500n^50vi^100m^10 abo^300ut^20_me.^200md^700'],
        typeSpeed: 60,
        onComplete: () => {
          document.querySelector('#active_file').innerHTML = 'about_me.md'
          document.querySelector("#about_me .typed-cursor").style.opacity = 0
          showElement('.about_me_container')
          Promise.resolve()
            .then(() => new Promise(resolve => {
              for(let i=4; i>=1; i-=1) {
                setTimeout(() => {
                  document.querySelectorAll('.about_me_container img')[i].remove()
                }, 700 + 200 * (4 - i))
              }

              let lines = document.querySelectorAll(".about_me_container pre")
              lines.forEach((line, i) => {
                setTimeout(() => { line.classList.remove('hidden') }, 700 + 100 * i)
              })
              resolve()
            }))
            // .then(() => {
            //   showElement('#aboutme_clear', parent=true)
            //   let aboutme_clear = new Typed('#aboutme_clear', {
            //     strings: ['clear'],
            //     typeSpeed: 60,
            //   })
            // })
        }
      })
    }
  })
}
