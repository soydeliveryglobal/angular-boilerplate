import { NameDescription } from './NameDescription';
export class Deposit extends NameDescription{
    depositGUID: string;
    intelliCode: string;
    enableIn: boolean;
    enableOut: boolean;
    constructor(){
        super();
    }
}



