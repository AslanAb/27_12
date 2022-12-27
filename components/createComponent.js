const creatBtn = document.querySelector("#create_btn")

creatBtn.addEventListener('click', () => {
    const name = document.querySelector("#name").value
    const params = document.querySelector("#params").value
    const hbs = document.querySelector("#hbs").value
    const styles = document.querySelector("#styles").value

    const payload = { name, params, hbs, styles }
    fetch("http://localhost:8080/components", {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(() => alert("Компонент создан успешно!"))
    .catch(() => alert("Error"))
})
