import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Plant} from "../Datatypes/Plant";

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  readonly #baseURL = 'https://api-production-f861.up.railway.app/moestuin';

  constructor(private httpClient: HttpClient) {
  }

  getPlant(): Observable<Plant[]> {
    return this.httpClient.get<Plant[]>(`${this.#baseURL}`)
  }

  getPlantById(id: string): Observable<Plant> {
    return  this.httpClient.get<Plant>(`${this.#baseURL}/${id}`);
  }

  addPlant(plant: Plant): Observable<Plant> {
    return this.httpClient.post<Plant>(`${this.#baseURL}/create`, plant);
  }

  updatePlant(plant: Plant): Observable<Plant> {
    return this.httpClient.put<Plant>(`${this.#baseURL}/update/${plant._id}`, plant);
  }
  deletePlant(id:string): Observable<Plant> {
    return this.httpClient.delete<Plant>(`${this.#baseURL}/delete/${id}`);
  }

}
