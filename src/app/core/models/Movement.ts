import { Depot } from './Depot';
import { MovementType } from './MovementType';
import { Product } from './Product';
import { Unit } from './Unit';
export class Movement{
    movementGUID: string;
    product: Product;
    movementType: MovementType;
    time: Date;
    depotIn: Depot;
    depotOut: Depot;
    unit: Unit;
    quantity: number;
    details: string;
    constructor(){
    }
}



