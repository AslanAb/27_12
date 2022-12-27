const fs = require("fs");

module.exports.COMPONENTS_FILE_PATH = "./components.json";
module.exports.getDataFromFile = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }) || '[]');
}