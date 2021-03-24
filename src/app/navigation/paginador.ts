import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

export class Paginador{
    public pagina = environment.PAGINA_INICIAL;  
    public pageSize = environment.CANTIDAD_DE_REGISTROS_POR_PAGINA; 
    public pageSizeOptions =  [5, 10, 25, 100];
    public cantidadDeRegistros = 0;

    public inicializarPaginador(){
        this.pagina = environment.PAGINA_INICIAL;
        
    }
    
    
  
    public createPaging():string{

        if ((this.pagina)<0){
            this.pagina = environment.PAGINA_INICIAL;       
        }
        let skip = (this.pagina * this.pageSize);
        let paginado=`&take=${this.pageSize}&skip=${skip}`
        return paginado;
    }



}


