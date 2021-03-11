import { IGUID } from './IGUID';
import { NameDescription } from './NameDescription';
export class Category extends NameDescription{
    categoryGUID: string;
    constructor(){
        super();
    }

    getGUID (){return this.categoryGUID}
}



