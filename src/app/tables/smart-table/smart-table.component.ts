import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from 'src/app/core/models/smart-table';


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls:['./smart-table.component.scss']
})
export class SmartTableComponent {

  settings = {
    actions: {
      custom: [
        {
          name: 'view',
          title: 'v ',
        },
        {
          name: 'delete',
          title: 'd',
        }
      ],
      add: false,
      edit: false,
      delete: false
    },
    /* add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    }, */
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };

   source: LocalDataSource
/* 
  constructor() {
    const data = SmartTableData
    this.source =  = new LocalDataSource(data);
  } 
 */
  data = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    // ... other rows here
    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ];
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCustom(event) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`)
  }

  

  
}
