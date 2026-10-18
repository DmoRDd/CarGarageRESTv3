import services from "../services/cars.service.js";

const getCars = async (req, res) => {
    try {
        const filters = req.query;
        if(Object.keys(filters).length != 0){
            const result = await services._getCarsFiltered(filters);
            return res.status(200).json(result);
        }

        const result = await services._getCars();
        return res.status(200).json(result);   
    } catch (err) {
        res.status(404).send(`Error while getting cars. ${err}`);
    };
};

const getCarsById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await services._getCarsById(id);

        return res.status(200).json(result);
    } catch (err) {
        res.status(404).send(`Error while getting car by ID. ${err}`);
    };
};

const addCars = async (req, res) => {
    try {
        const { specs } = req.body;
        const result = await services._addCars(specs);

        return res.status(200).json(result);
    } catch (err) {
        res.status(404).send(`Error while adding car. ${err}`);
    }
}

const updateCars = async (req, res) => {
    try {
        const { id } = req.params;
        const { specs } = req.body; 
        const result = await services._updateCars(id, specs);

        return res.status(200).json(result);
    } catch (err) {
        res.status(404).send(`Error while updating car. ${err}`);
        console.log(`\n\n Error: ${err}`);
    }
}

const deleteCars = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await services._deleteCars(id);

        return res.status(200).json(result);
    } catch (err) {
        res.status(404).send(`Error while deleting car. ${err}`);
    }
}

export default { getCars, getCarsById, addCars, updateCars, deleteCars };