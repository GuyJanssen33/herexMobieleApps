import { Component, OnInit } from '@angular/core';
import {Plant} from "../Datatypes/Plant";
import {ApiService} from "../services/api.service";
import {mergeMap, Observable, of} from "rxjs";
import {AuthService} from "../services/auth.service";



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit {
  public isListLoaded: boolean = false;
  public newFavorite : any;
  public PlantList: Observable<Plant[]> = this.ApiService.getPlant();

  public BladList: Array<Plant> = [];
  public isBladListLoaded: boolean = false;
  public KoolList: Array<Plant> = [];
  public isKoolListLoaded: boolean = false;
  public PeulList: Array<Plant> = [];
  public isPeulListLoaded: boolean = false;
  public KnolList: Array<Plant> = [];
  public isKnolListLoaded: boolean = false;
  public UiList: Array<Plant> = [];
  public isUiListLoaded: boolean = false;
  public GebleekteList: Array<Plant> = [];
  public isGebleekteListLoaded: boolean = false;
  public VruchtList: Array<Plant> = [];
  public isVruchtListLoaded: boolean = false;
  // Plant: Plant;
  plant: any;

  isClicked: boolean = false;

  constructor( public ApiService: ApiService) {}

  toggleClick() {
    this.isClicked = !this.isClicked;
  }
  sendId(_id:string) {
    console.log(_id)
    const id: string =_id
    console.log('ID:',id)
  }


  ionViewDidLeave() {
    this.isListLoaded = false;
    /*this.isBladListLoaded = false;
    this.isKoolListLoaded = false;
    this.isPeulListLoaded = false;
    this.isKnolListLoaded = false;
    this.isUiListLoaded = false;
    this.isGebleekteListLoaded = false;
    this.isVruchtListLoaded = false;
*/

    this.BladList = [];
    this.KoolList = [];
    this.PeulList = [];
    this.KnolList = [];
    this.UiList = [];
    this.GebleekteList = [];
    this.VruchtList = [];

  }
  ionViewWillEnter() {
    if(!this.isListLoaded){
      this.getListAndDivide();
      this.isListLoaded = true;
      this.isBladListLoaded = true;
      this.isKoolListLoaded = true;
      this.isPeulListLoaded = true;
      this.isKnolListLoaded = true;
      this.isUiListLoaded = true;
      this.isGebleekteListLoaded = true;
      this.isVruchtListLoaded = true;
    }

  }
  getListAndDivide(){

    this.PlantList.subscribe(plant => plant.forEach(
      p => {
        switch(p.categorie) {
          case "Blad- en steelgewassen": {
            this.BladList.push(p);
            break;
          }
          case "Knol- en wortelgewassen": {
            this.KnolList.push(p);
            break;
          }
          case "Ui-achtigen": {
            this.UiList.push(p);
            break;
          }
          case "Koolsoorten": {
            this.KoolList.push(p);
            break;
          }
          case "Peulvruchten": {
            this.PeulList.push(p);
            break;
          }
          case "Gebleekte Gewassen": {
            this.GebleekteList.push(p);
            break;
          }
          default: {
            this.VruchtList.push(p);
            break;
          }
        }}));
    console.log(this.BladList, "test", this.VruchtList);

  }
  ngOnInit():void{
    this.getListAndDivide();
  }

  protected readonly AuthService = AuthService;
}
