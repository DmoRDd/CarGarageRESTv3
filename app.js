// libs
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { router } from './routes/cars.routes.js'; 
import dataLogger from './middlewares/dataLogger.js'
import requestLogger from './middlewares/requestLogger.js'


// app
const app = express();
const port = process.env.PORT || 3000;


// middlewares
app.use(express.json());
app.use(dataLogger);
app.use(requestLogger);
app.use(express.urlencoded({ extended : true }));


// input validation



// main
app.get('/', (req, res) => {
    try {
        return res.status(200).send(`
            <h1>Car Garage'a Hosgeldiniz</h1>
            <p>Garage API'ina ulasmak icin /garage endpoint'ine gidiniz.</p>
            `);
    } catch (err) {
        return res.status(500).send(`Server Error!!!\nError: ${err}`);
    };
});


// routes
app.use('/garage', router);


// starting server
app.listen(port, () => {
    console.log(`Car Garage API Server Listening On Port ${port}.`)
});