const fs = require("fs");

module.exports.COMPONENTS_FILE_PATH = "./components.json";
module.exports.PAGES_FILE_PATH = "./pages.json";
module.exports.getDataFromFile = (filePath) => {
    let dataFromFile = []
    try {
        dataFromFile = JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }) || '[]');
    } catch {
        console.log("Error reading from file", filePath)
    }
    return dataFromFile
}

module.exports.getComponentById = componentId => {
    const components = this.getDataFromFile(this.COMPONENTS_FILE_PATH)
    return components.find(item => item.id === componentId)
}

module.exports.setHbsParams = (hbs, params) => {
    Object.keys(params).forEach(key => {
        console.log(key)
        // hbs.replace(`{{${key}}}`, params.key)
    })
}

