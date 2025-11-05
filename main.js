const colourPicker = document.getElementById("colour-picker")
const schemePicker = document.getElementById("scheme-mode")
const getSchemeBtn = document.getElementById("get-scheme-btn")

getSchemeBtn.addEventListener("click", () => {
    getColorScheme(colourPicker.value, schemePicker.value)
})

function getColorScheme(pickedColor, pickedMode) {
    const schemeQuery = `?hex=${pickedColor.slice(1)}&mode=${pickedMode.toLowerCase()}&count=5`

    fetch(`https://www.thecolorapi.com/scheme${schemeQuery}`)
        .then(res => res.json())
        .then(data => {
            let html = ''
            data.colors.forEach(color => {
                html += `
                    <div class="color" style="background-color: ${color.hex.value} ">
                        <p class="color-name">${color.hex.value}</p>
                    </div>
                `
            })
            document.getElementById("colours").innerHTML = html
        })
}