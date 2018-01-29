const fs = require('fs');
const path = require('path');

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