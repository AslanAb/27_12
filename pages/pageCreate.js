const componentsDiv = document.querySelector("#components")
const previewDiv = document.querySelector("#preview")
const creatPageBtn = document.querySelector("#create_page_btn")

const drawPreview = () => {
    let previewComponents = JSON.parse(localStorage.getItem("previewComponents")) || []
    
    previewDiv.innerHTML = ''
    for (let i = 0; i < previewComponents.length; i++) {
        previewDiv.innerHTML += `
            <div class="component_item">
            <p><b>${previewComponents[i].name}</b></p>
            <button onclick="deleteComponent(${i})">Delete</button>
            </div>
        `
    }

}

drawPreview()

const loadComponents = async () => {
    const response = await fetch('http://localhost:8080/components')
    const components = await response.json()

    localStorage.setItem("components", JSON.stringify(components))

    

    for (let component of components) {
        componentsDiv.innerHTML += `
            <div class="component_item">
            <p><b>${component.name}</b></p>
            <button onclick="addComponent(${component.id})">Add</button>
            </div>
        `
    }
}

loadComponents()

const addComponent = componentID => {
    const components = JSON.parse(localStorage.getItem("components"))
    const component = components.find(component => component.id === +componentID)
    
    let previewComponents = JSON.parse(localStorage.getItem("previewComponents")) || []
    previewComponents.push(component)
    localStorage.setItem('previewComponents', JSON.stringify(previewComponents))
    drawPreview()
}

const deleteComponent = index => {
    let previewComponents = JSON.parse(localStorage.getItem("previewComponents")) || []
    previewComponents.splice(index, 1)
    localStorage.setItem("previewComponents", JSON.stringify(previewComponents))
    drawPreview()
}

creatPageBtn.addEventListener("click", () => {
    let previewComponents = JSON.parse(localStorage.getItem("previewComponents")) || []
    const pageName = document.querySelector("#page_name_input").value
    const payload = {
        pageName,
        componentsIds: previewComponents.map(item => item.id)
    }
    fetch("http://localhost:8080/pages", {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        alert("Страница создана успешно!")
        localStorage.removeItem("previewComponents")
        document.querySelector("#page_name_input").value = ''
        drawPreview()
    })
        
    .catch(() => alert("Error"))
})