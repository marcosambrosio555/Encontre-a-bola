const wrapper = document.querySelectorAll(".wrapper")
const nivel = document.querySelector(".nivel")
const modal = document.querySelector(".background.menu")
const btnStart = document.querySelector(".btn-start")

const configGame = {
    gameOn: false,
    speed: 500,
    timeMaxForMoves: 10,
    times: 0,
    nivel: 1,
}


let interval

function init() {

    configGame.gameOn = true

    downAllWrapper()

    setTimeout(start, 3000)

}

function start() {

    nivel.innerHTML = configGame.nivel

    interval = setInterval(() => {

        const numRandom = Math.round(Math.random() * 2)

        movePlace(numRandom)

        configGame.times >= configGame.timeMaxForMoves ? stopMoves() : configGame.times++

    }, configGame.speed)

}

function movePlace(position) {
    const left = document.querySelector(".place.left")
    const center = document.querySelector(".place.center")
    const right = document.querySelector(".place.right")

    if (position == 0) {
        left.className = "place center"
        center.className = "place left"
        return
    }

    if (position == 1) {
        const numRandom = Math.round(Math.random() * 1)

        if (numRandom == 0) {
            center.className = "place left"
            left.className = "place center"
        } else {
            center.className = "place right"
            right.className = "place center"
        }

        return
    }

    if (position == 2) {
        center.className = "place right"
        right.className = "place center"
        return
    }
}

function stopMoves() {
    clearInterval(interval)
    setTimeout(() => {
        configGame.gameOn = false
    }, 500)
}

function showBall() {
    const ball = document.querySelector(".place .ball")
    const placeWithBall = ball.closest(".place")
    placeWithBall.querySelector(".wrapper").classList.toggle("show")
}

function downAllWrapper() {
    wrapper.forEach(wrap => {
        wrap.classList.remove("show")
    })
}

function verification(wrapper) {
    const place = wrapper.closest(".place")
    const ball = place.querySelector(".ball")

    if (ball) {
        downAllWrapper()
        if (configGame.speed > 50) configGame.speed -= 50
        configGame.timeMaxForMoves += 5
        configGame.nivel++
        configGame.times = 0
        setTimeout(start, 3000)
    } else {
        setTimeout(() => {
            showBall()
        }, 1000)
        setTimeout(() => {
            gameOver()
        }, 5000)
    }
}

function gameOver() {

    const modal = document.querySelector(".background.game-over")
    const btnStart = modal.querySelector(".btn-start")

    modal.classList.remove("hide")

    modal.querySelector("p").innerHTML = `<p>Nível : ${configGame.nivel}</p>`

    reset()

    btnStart.addEventListener("click", () => {
        modal.classList.add("hide")
        init()
    })

}

function reset() {

    configGame.speed = 500
    configGame.timeMaxForMoves = 10
    configGame.nivel = 1
    configGame.times = 0
}

wrapper.forEach(wrap => {

    wrap.addEventListener("click", () => {
        if (configGame.gameOn) return
        configGame.gameOn = true
        wrap.classList.add("show")

        setTimeout(() => {
            verification(wrap)
        }, 2500)
    })

})

btnStart.addEventListener("click", () => {
    configGame.gameOn = true
    modal.classList.add("hide")
    setTimeout(() => {
        showBall()
        init()
    }, 1000)
})