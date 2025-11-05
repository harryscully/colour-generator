// CONSTANTS
const colourPicker = document.getElementById("colour-picker")
const schemePicker = document.getElementById("scheme-mode")
const getSchemeBtn = document.getElementById("get-scheme-btn")

const schemeModes = [
    "Monochrome",
    "Monochrome-dark",
    "Monochrome-light",
    "Analogic",
    "Complement",
    "Analogic-complement",
    "Triad"
]

// HELPER FUNCTIONS
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }   
    return color;
}

function getColorScheme(pickedColor, pickedMode) {
    const schemeQuery = `?hex=${pickedColor.slice(1)}&mode=${pickedMode.toLowerCase()}&count=5`

    fetch(`https://www.thecolorapi.com/scheme${schemeQuery}`)
        .then(res => res.json())
        .then(data => {
            let html = ''
            data.colors.forEach(color => {
                html += `
                    <div class="color" style="background-color: ${color.hex.value} ">
                        <p class="color-name">${color.hex.value}
                        <span>${color.name.value}</span></p>
                    </div>
                `
            })
            document.getElementById("colours").innerHTML = html
        })
}

// ON PAGE LOAD
const randomColor = getRandomColor()
const randomMode = schemeModes[Math.floor(Math.random() * schemeModes.length)]

colourPicker.value = randomColor
schemePicker.value = randomMode
getColorScheme(randomColor, randomMode)


// EVENT LISTENER
getSchemeBtn.addEventListener("click", () => {
    getColorScheme(colourPicker.value, schemePicker.value)
})

