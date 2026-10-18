import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, '../logs');
var filePath;

const dataLogger = async (req, res, next) => {
    try{
        // folder check
        const folderExists = await fs.stat(folderPath);
        try{
            filePath = path.join(folderPath, `${new Date().toISOString().split('T')[0]}.log`);
        }
        catch(err){
            await fs.mkdir(folderPath);
            filePath = path.join(folderPath, `${new Date().toISOString().split('T')[0]}.log`);
        };

        //writing logs
        const log = `[${new Date().toISOString()}] - ${req.method} request to ${req.url}\n`;
        await fs.appendFile(filePath, log);
        
        next();
    }
    catch(err){
        res.status(400).send(`Error while data logging. ${err}`);
    };
};

export default dataLogger;