import { Component } from '@angular/core';
import {PhotoService} from "../services/photo.service";
import {Camera, CameraResultType} from "@capacitor/camera";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
imageElement: any = {src: undefined}
  constructor(public photoService: PhotoService) {}


}
