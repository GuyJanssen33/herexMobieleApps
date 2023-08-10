import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Plant} from "../../Datatypes/Plant";
import {ApiService} from "../../services/api.service";
import {FavorietenService} from "../../services/favorieten.service"
import { Location } from '@angular/common';

@Component({
  selector: 'app-tab1-favorieten',
  templateUrl: 'favorieten.page.html',
  styleUrls: ['favorieten.page.scss'],
})
export class FavorietenPage implements OnInit {
  public plant?: Plant|any;
  public favorietenLijst: Array<string> = [];
  public favorietePlanten: Array<Plant> = [];
  public id = this.activatedRoute.snapshot.paramMap.get('id');
  constructor(
    public ApiService: ApiService,
    public activatedRoute: ActivatedRoute,
    public route:ActivatedRoute,
    public favorietenService: FavorietenService,
    private router: Router,
    public location: Location) {}

  ngOnInit(): void {
    this.getListFromService().then(() => {

      if (this.id != null) {
        this.putIdToList();
      }


      console.log(this.favorietenLijst);

      if (this.favorietenLijst.length > 0) {
        console.log("nu nog de volgende methoden");
        this.getPlantsFromList()
      }
    });
  }

   removeItem(item: string): void{
    console.log("we gaan nu de plant verwijderen");
    this.favorietenService.removePlant(item);
    this.favorietePlanten = []
    this.getListFromService().then(() => {

      if (this.id != null) {
        this.putIdToList();
      }


      console.log(this.favorietenLijst);

      if (this.favorietenLijst.length > 0) {
        console.log("we zullen zien");
        this.getPlantsFromList()
      }
    });;
     /*this.getPlantsFromList();*/
    /*this.refreshPage();*/
     /*this.getListFromService();*/
     /*this.location.back();*/

     /*const index = this.favorietePlanten.indexOf(id);

     if (index !== -1) {
       this.favorietePlanten.splice(index, 1);
       this.favorietenService.saveList(this.favorietePlanten)
     }*/
  }

  private refreshPage(): void {
    console.log("pagina word gerefreshed");
    this.router.navigateByUrl('/favorieten', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/favorieten']);
    });
  }
  ionViewWillEnter(){
    this.getListFromService().then(() => {

      if (this.id != null) {
        this.putIdToList();
      }
    });
  }

  ionViewDidLeave() {
    this.favorietenService.saveList(this.favorietenLijst);
  }
  getPlantsFromList(){
    console.log("hier zijn we geraakt")
    console.log(this.favorietenLijst.length);
    this.favorietenLijst.forEach((id) => {
        this.ApiService.getPlantById(id).subscribe((plant) => {
          this.favorietePlanten.push(plant);
          console.log(this.favorietePlanten)
        });
      }
    );
  }
  putIdToList(){
    console.log("nu gaan we de id toeveogen")

    if (this.id!=null){
      console.log(this.favorietenLijst)
      this.favorietenLijst.push(this.id);
      console.log(this.favorietenLijst)
      this.favorietenService.saveList(this.favorietenLijst);
    }
  }

  async getListFromService(){
    await this.favorietenService.getList().then((result) => {
      this.favorietenLijst = result;
      console.log(this.favorietenLijst);

    });
  }

}
