import express from 'express';
import controllers from '../controllers/cars.controllers.js';
import { carValidationSchema } from '../utils/carValidations.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.get('/', controllers.getCars);
router.get('/:id', controllers.getCarsById);
router.post('/', validate(carValidationSchema), controllers.addCars);
router.patch('/:id', validate(carValidationSchema), controllers.updateCars);
router.delete('/:id', controllers.deleteCars);

export { router };