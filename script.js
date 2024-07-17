const payLevels = {
    1.25: "Regular pay (1.25x)",
    1.5: "Weekend (1.5x)",
    2.5: "Public Holiday (2.5x)"
}

addShift();

function calculate() {
    const baseRate = Number(document.getElementsByName("hourlyrate")[0].value)
    console.log(baseRate)
    let total = 0;

    const shiftList = document.getElementById("shiftContainer");
    for (let shiftNum = 0; shiftNum < shiftList.childElementCount; shiftNum++) {

        //time
        let shiftTime = Number(document.getElementsByName("hrs"+shiftNum)[0].value)
        const mins = Number(document.getElementsByName("mins"+shiftNum)[0].value)
        shiftTime += Math.round((mins/60)*100)/100
        console.log(shiftTime)

        //multiplier
        const multiplier = Number(document.querySelector(`#shift${shiftNum} label input.extrapay:checked`).value)
        console.log(multiplier)

        //subtotal
        const subtotal = Math.round(baseRate * multiplier * shiftTime * 100)/100 + 1.25
        console.log(subtotal)

        const subtotalText = shiftList.children[shiftNum].getElementsByClassName("subtotal")[0]
        subtotalText.innerText = "$"+subtotal
        total += subtotal
    }

    //make grand total
    const totalText = document.getElementById("total")
    totalText.innerText = "Total: $"+Math.round(total*100)/100
}

function addShift() {
    const shiftList = document.getElementById("shiftContainer");
    const shiftNum = shiftList.childElementCount

    const thisShift = document.createElement("div")
    thisShift.id = "shift" + shiftNum
    thisShift.className = "shift"
    
    //Hours worked
    const hrsL = document.createElement("label")
    hrsL.for = "hrs" + shiftNum
    hrsL.innerText = "Hours Worked:"
    const hrsI = document.createElement("input")
    hrsI.type = "number"
    hrsI.name = "hrs" + shiftNum
    hrsI.className = "hrsWorked"
    hrsI.setAttribute("onchange", "calculate()")

    thisShift.appendChild(hrsL)
    thisShift.appendChild(hrsI)
    thisShift.appendChild(document.createElement("br"))

    //Minutes worked
    const minsL = document.createElement("label")
    minsL.for = "mins" + shiftNum
    minsL.innerText = "Minutes Worked:"
    const minsI = document.createElement("input")
    minsI.type = "number"
    minsI.name = "mins" + shiftNum
    minsI.className = "minsWorked"
    minsI.setAttribute("onchange", "calculate()")

    thisShift.appendChild(minsL)
    thisShift.appendChild(minsI)
    thisShift.appendChild(document.createElement("br"))

    for (let payScale in payLevels) {
        label = document.createElement("label")
        radio = document.createElement("input")
        radio.setAttribute("onchange", "calculate()")
        radio.type = "radio"
        radio.name = "extrapay" + shiftNum
        radio.className = "extrapay"
        radio.value = payScale

        label.appendChild(radio)
        label.innerHTML += payLevels[payScale] + "<br>"
        

        thisShift.appendChild(label)
    }
    //subtotal
    const subtotal = document.createElement("p")
    subtotal.className = "subtotal"
    subtotal.innerText = "$"
    thisShift.appendChild(subtotal)

    shiftList.appendChild(thisShift)
}

function deleteShift() {
    const shiftList = document.getElementById("shiftContainer");
    const num = shiftList.childElementCount - 1
    const thisShift = shiftList.children[num];
    thisShift.remove()
    calculate()
}