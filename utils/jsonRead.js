import fs from 'fs/promises';

const readData = async path => {
    try {
        
        const data = await fs.readFile(path);
        return JSON.parse(data);

    } catch (err) {
        
        console.error(`Error while reading JSON data. Error: ${err}`);
        return;

    }
};

export { readData }