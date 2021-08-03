import { StateOfActor } from './stateofactor';
import { TypeOfActor } from './TypeOfActor';
export class Actor{

    actorGUID: string;
    name:string;
    address:string;
    taxServiceNumber:string;
    typeOfActor:TypeOfActor;
    stateOfActor:StateOfActor;

    constructor(){

    }
}