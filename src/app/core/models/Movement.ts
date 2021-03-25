import { Deposit } from './Deposit';
import { MovementType } from './MovementType';
import { NameDescription } from './NameDescription';
import { Product } from './Product';
import { Unit } from './Unit';
export class Movement extends NameDescription{
    movementGUID: string;
    product:Product;
    movementType:MovementType;
    time:Date;
    depotIn:Deposit;
    depotOut:Deposit;
    unit:Unit;
    quantity:number;
    
    constructor(){
        super();
    }
}



