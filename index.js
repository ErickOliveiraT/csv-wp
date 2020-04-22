const fs = require('fs')

function printLines(filename, options) {
    if (!options) {
        options = {
            encoding: 'UTF-8',
            delimiter: ','
        }
    }
    try {
        const data = fs.readFileSync(filename, options.encoding);
        const lines = data.split(/\r?\n/);
        lines.forEach((line) => {
            console.log(line);
        })
    }
    catch (err) {
        console.log(err);
    }
}

function getLines(filename, options) {
    if (!options) {
        options = {
            encoding: 'UTF-8',
            delimiter: ','
        }
    }
    try {
        const data = fs.readFileSync(filename, options.encoding);
        return data.split(/\r?\n/);
    }
    catch (err) {
        console.log(err);
    }
}

function getSingleLine(filename, index, options) {
    if (!options) {
        options = {
            encoding: 'UTF-8',
            delimiter: ','
        }
    }
    try {
        const data = fs.readFileSync(filename, options.encoding);
        return data.split(/\r?\n/)[index];
    }
    catch (err) {
        console.log(err);
    }
}

function getHeader(filename, options) {
    if (!options) {
        options = {
            encoding: 'UTF-8',
            delimiter: ','
        }
    }
    try {
        const data = fs.readFileSync(filename, options.encoding);
        return data.split(/\r?\n/)[0];
    }
    catch (err) {
        console.log(err);
    }
}

function getAttribute(filename, attribute, options) {
    if (!options) {
        options = {
            encoding: 'UTF-8',
            delimiter: ','
        }
    }
    try {
        const data = fs.readFileSync(filename, options.encoding);
        const header = data.split(/\r?\n/)[0];
        const content = data.split(/\r?\n/);
        const attributes = header.split(options.delimiter);
        for (let i = 0; i < attributes.length; i++) {
            if (attributes[i] == attribute) {
                var res = [];
                content.forEach((line, index) => {
                    if (index > 0) res.push(line.split(options.delimiter)[i]);
                })
                return res;
            }
        }
        throw new Error('Invalid Attribute');
    }
    catch (err) {
        console.log(err);
    }
}

function find(filename, key, value, options) {
    if (!options) {
        options = {
            encoding: 'UTF-8',
            delimiter: ','
        }
    }
    try {
        const data = fs.readFileSync(filename, options.encoding);
        const header = data.split(/\r?\n/)[0];
        const content = data.split(/\r?\n/);
        const attributes = header.split(options.delimiter);
        for (let i = 0; i < attributes.length; i++) {
            if (attributes[i] == key) {
                var res = [];
                content.forEach((line, index) => {
                    if (index > 0 && line.split(options.delimiter)[i] == value) {
                        res.push(line);
                    }
                })
                return res;
            }
        }
        throw new Error('Invalid Attribute');
    }
    catch (err) {
        console.log(err);
    }
}

function appendRow(filename, row, options) {
    if (!options) {
        options = {
            encoding: 'UTF-8',
            delimiter: ','
        }
    }
    try {
        if(fs.existsSync(filename)) { 
          row.forEach((field, index) => {
            if (index == row.length-1) fs.appendFileSync(filename, field+'\n');
            else fs.appendFileSync(filename, field+options.delimiter);
          });
        } else { //Does not exist
            throw new Error('Invalid filename');
        }
    }
    catch (err) {
        console.log(err);
    } 
}

function writeRow(filename, row, options) {
    if (!options) {
        options = {
            encoding: 'UTF-8',
            delimiter: ','
        }
    }
    try {
        if(fs.existsSync(filename)) {
          let to_write = new String(); 
          row.forEach((field, index) => {
            if (index == row.length-1) to_write += field;
            else to_write += field+options.delimiter;
          });
          fs.writeFileSync(filename, to_write+'\n');
        } else { //Does not exist
            throw new Error('Invalid filename');
        }
    }
    catch (err) {
        console.log(err);
    } 
}

function writeCSV(filename, header, data, options) {
    if (!options) {
        options = {
            encoding: 'UTF-8',
            delimiter: ','
        }
    }
    writeRow(filename, header, options)
    data.forEach((row) => {
        appendRow(filename, row, options);
    })
}

module.exports = {
    printLines,
    getLines,
    getSingleLine,
    getHeader,
    getAttribute,
    find,
    appendRow,
    writeRow,
    writeCSV
}