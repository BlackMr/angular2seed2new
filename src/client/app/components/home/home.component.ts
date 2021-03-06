// libs
import {Store} from '@ngrx/store';
// app
import {FormComponent} from '../../frameworks/core/index';
import {NameListService} from '../../frameworks/app/index';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {DatabaseService} from '../../frameworks/core/services/database.service';


@FormComponent({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class HomeComponent {
  public newName: string = '';
  
  /*public firstOne: string= '';*/
  constructor(private store: Store<any>, public nameListService: NameListService, private databaseService: DatabaseService) { 
    console.log('## Home component constructor speaking ##');

    let count = 0;
    databaseService.sync('counters', (data:any) => {
      console.log('Synced path updated', data);
    });
    setInterval(() => {
      databaseService.addChild('counters', count++);
    }, 3000);

    console.log('## Home component constructor out ##');
  }
  
  /*
   * @param newname  any text as input.
   * @returns return false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    let newname = this.newName;
    this.nameListService.add(this.newName);
    this.newName = '';
    console.log(newname);
    console.log('## addName speaking ##');
    return false;

  }
  /*======================================================================================*/

};
