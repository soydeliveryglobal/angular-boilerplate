import { Variety } from './../../../core/models/Variety';
import { Provider } from './../../../core/models/Provider';
import { Brand } from './../../../core/models/Brand';
import { Line } from './../../../core/models/Line';
import { Family } from './../../../core/models/Family';
import { Category } from './../../../core/models/Category';
import { Product, ProductOrServiceType } from './../../../core/models/Product';

export class DtoProductModal{
    productsSelected: Product[];
    productsIn:Product[];
    readonly:boolean;
    error:boolean;
    loading: boolean;
    name:string;
    description:string;
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
}