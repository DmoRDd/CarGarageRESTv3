// libs
import { readData } from '../utils/jsonRead.js';
import { fileURLToPath } from 'url';
import path from 'path'

// filename and dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// config
const dbPath = path.join(__dirname, '../', 'models', 'db.json');
const carsList = await readData(dbPath);


// services
const _getCars = async () => {
    if(carsList.length == 0){
        throw new Error('Arac bulunmamaktadir.');
    };

    return carsList;
};



const _getCarsById = async (id) => {
    const car = carsList.find(car => car.id == id);

    if(!car){
        throw new Error(`${id} ID'li arac bulunmamaktadir.`);
    }

    return car;
}



const _getCarsByBrand = async (brand) => {
    const cars = carsList.filter(car => car.brand == brand);

    if(cars.length == 0){
        throw new Error(`${brand} markali arac bulunmamaktadir.`);
    };

    return cars;
};



const _getCarsFiltered = async (filters) => {
    var cars = carsList;
    for(const [key, value] of Object.entries(filters)){
        
        if(key == 'minHp'){
            cars = cars.filter(car => car.horsePower > Number(value));
        }
        else if(key == 'maxHp'){
            cars = cars.filter(car => car.horsePower < Number(value));
        }
        else if(key == 'sortByHp'){
            if(value == 'ascending'){
                cars = cars.toSorted((a, b) => a.horsePower - b.horsePower);
            }
            else{
                cars = cars.toSorted((a, b) => b.horsePower - a.horsePower);
            }
        }
        else{
            cars = cars.filter(car => car[key] == value);
        }
      
    }

    return cars;
}



const _addCars = async (specs) => {
    for(const key of Object.keys(specs)){
        if(key == 'id'){
            throw new Error('Gecersiz parametre girisi yapildi.');
        }
    }

    var id;
    if(carsList.length === 0){
        id = 1;
    }
    else{
        id = carsList[carsList.length - 1].id + 1;
    }
    
    const newCar = {
        id : id,
        ...specs // spread operator kullanarak specs icindeki degerleri tek tek object e ekledik/
    };

    carsList.push(newCar);

    return newCar;
};



const _updateCars = async (id, updates) => {
    const car = carsList.find(car => car.id == id);
    if(!car){
        throw new Error(`${id} ID'li Arac bulunmamaktadir.`)
    }

    const notAllowedProperty = 'id';
    for(const [key, value] of Object.entries(updates)){
        if(key != notAllowedProperty){
            car[key] = value;
        }
        else{
            throw new Error("Gecersiz parametre girisi yapildi.");
        }
    }
    
    return car;
}



const _deleteCars = async (id) => {
    const car = carsList.findIndex(car => car.id == id);

    if(car === -1){
        throw new Error(`${id} ID'li arac bulunmamaktadir.`)
    }
    
    const deletedCar = carsList.splice(car, 1);
    return deletedCar;
}



export default { _getCars, _getCarsById, _getCarsByBrand, _getCarsFiltered, _addCars, _updateCars, _deleteCars };