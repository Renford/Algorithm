// const insert = require('sort-insert.js');

const fs = require('fs');
const path = require('path');
const lodash = require('lodash');

const map = (dir) => {
    let tree = {};

    const files = fs.readdirSync(dir);

    files.forEach(file => {
        if (path.extname(file) === '.js') {
            tree = Object.assign(tree, require(path.join(dir, file)))
        }
    });
    
    return tree;
}

module.exports = map(path.join(__dirname))