import { Provider } from './Provider';
import { Variety } from './Variety';
import { Brand } from './Brand';
import { Line } from './Line';
import { Family } from './Family';
import { Category } from './Category';
import { NameDescription } from './NameDescription';
export class Product extends NameDescription{
    productGUID: string;
    category:Category;
    family:Family;
    line:Line;
    brand:Brand;
    storeCode: string;
    provider: Provider[];
    eanCode: string;
    externalCode: string;
    variety:Variety;
    useStock: boolean;
    productOrService: ProductOrServiceType
    constructor(){
        super();
    }
}

export enum ProductOrServiceType{
    Product = 0,    
    Service = 1
}



