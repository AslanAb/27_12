const express = require("express");
const fs = require("fs");
const router = express.Router();
const { COMPONENTS_FILE_PATH, getDataFromFile } = require("../utils.js");

router.post("/", (req, res) => {
    const { name, params, hbs, styles } = req.body;

    const componentsArray = JSON.parse(fs.readFileSync(COMPONENTS_FILE_PATH));
    const newComponent = {
        id: componentsArray[componentsArray.length - 1]?.id + 1 || 1,
        name,
        params,
        hbs,
        styles,
    };

    fs.writeFileSync(COMPONENTS_FILE_PATH, JSON.stringify([...componentsArray, newComponent]));
    res.status(201).send("ok");
});

router.get("/", (req, res) => res.status(200).send(getDataFromFile(COMPONENTS_FILE_PATH)));

module.exports = router;