import { Injectable, OnInit } from '@angular/core';
import {Plugins} from '@capacitor/core';
import {Preferences} from "@capacitor/preferences";
import {Observable} from "rxjs";
import {Plant} from "../Datatypes/Plant";

@Injectable({
  providedIn: 'root'
})
export class FavorietenService  {
  mijnFavorieten: string[] = [];
  listKey = 'mijnFavorieten';

  saveList(mijnFavorieten: string[]) {
    const liststring = JSON.stringify(mijnFavorieten);
    Preferences.set({key: this.listKey, value:liststring})
  }

  async removePlant(id: string): Promise<any> {
    const index = this.mijnFavorieten.indexOf(id);

    if (index !== -1) {
      this.mijnFavorieten.splice(index, 1);
      console.log(index)
      this.saveList(this.mijnFavorieten)
      console.log('controle lijst die is opgeslagen')
      console.log(this.mijnFavorieten)
      console.log('removed successfully')
    }

  return[]
  }
  async getList(): Promise<any[]> {
    const result = await Preferences.get({ key: this.listKey });
    if (result.value) {
      return JSON.parse(result.value);
    }
    return [];
  }

 /* async ngOnInit() {
    this.mijnFavorieten = await this.getList();

  }*/
  constructor() {
    this.getList().then(x => this.mijnFavorieten = x)
  }
}
