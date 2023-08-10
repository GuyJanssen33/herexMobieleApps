import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {Plant} from "../../Datatypes/Plant";
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import {FavorietenService} from "../../services/favorieten.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-tab1-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss'],
})
export class DetailsPage implements OnInit {

  public plant?:Plant|any;
  public favPlant?:Plant = this.plant;


  public naam: string|any ;
  public _id: string|any ;
  public Id: number|any ;
  public zaaitijd: string|any ;
  public zaaitijdBuiten: string|any ;
  public oogsttijd: string|any ;
  public zaaienTotKiem: string|any ;
  public zaaienTotOogst: string|any ;
  public plantafstand: string|any  ;
  public categorie: string|any ;
  public details: string|any ;
  public linkUrl: string|any;
  constructor(public router: Router,
              public ApiService: ApiService,
              public favorietenservice: FavorietenService,
              public activatedRoute: ActivatedRoute,
              public navCtrl: NavController) {}

  ngOnInit(): void {
    this.setData();
  }

  AddPlantToFavorietenList(): void {

    const id : string|any = this.plant?._id;

    this.favorietenservice.mijnFavorieten.push(id);
    this.favorietenservice.saveList(this.favorietenservice.mijnFavorieten);

  }

  updatePlant(plant: Plant): void {
    const newPlant: Plant = {
      _id: this._id,
      Id: this.Id,
      naam: this.naam ,
      zaaitijd: this.zaaitijd,
      zaaitijdBuiten: this.zaaitijdBuiten,
      oogsttijd: this.oogsttijd,
      zaaienTotKiem: this.zaaienTotKiem,
      zaaienTotOogst: this.zaaienTotOogst,
      plantafstand: this.plantafstand,
      categorie: this.categorie,
      details: this.details,
    };
    console.log(newPlant);
    this.ApiService.updatePlant(newPlant).subscribe(
      response => {console.log('Plant succesvol aangepast: ', response);
      },
      error => {
        console.log('Er is een fout opgetreden: ', error);
      }
    );
  }

  deletePlant(plant: Plant): void {
    console.log(this._id);
    this.ApiService.deletePlant(this._id).subscribe(
      response => {console.log('Plant succesvol verwijderd: ', response);
      },
      error => {
        console.log('Er is een fout opgetreden: ', error);
      }
    );
  }
  navigateToFavorietenPage() {
    const myObject = { favPlant: this.plant};
    this.navCtrl.navigateForward('favorieten', );
  }
  setData(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null){
      this.ApiService.getPlantById(id).subscribe(plant => {
        this.plant = plant;
        this._id = this.plant._id;
        this.Id = this.plant.Id;
        this.naam = this.plant.naam;
        this.zaaitijd = this.plant.zaaitijd;
        this.zaaitijdBuiten = this.plant.zaaitijdBuiten;
        this.oogsttijd = this.plant.oogsttijd;
        this.zaaienTotKiem = this.plant.zaaienTotKiem;
        this.zaaienTotOogst = this.plant.zaaienTotOogst;
        this.plantafstand = this.plant.plantafstand;
        this.categorie = this.plant.categorie;
        this.details = this.plant.details;
        this.linkUrl = this.plant.details;
        console.log(this.plant);
        console.log(this.zaaitijd)
        console.log(this.plant.oogsttijd)

      });
    }

  }


  protected readonly AuthService = AuthService;
}
