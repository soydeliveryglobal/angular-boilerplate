import { NameDescription } from './NameDescription';
export class Depot extends NameDescription{
    depotGUID: string;
    intelliCode: string;
    enableIn: boolean;
    enableOut: boolean;
    constructor(){
        super();
    }
}



