import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '6315a4c8fd301b7a203fc12ade045e37'; // Replace with your actual OpenWeather API key
  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  private weatherEndpoint = '/weather';
  private forecastEndpoint = '/forecast';

  constructor(private http: HttpClient) {}

  getWeatherData(city: string): Observable<any> {
    const params = { q: city, appid: this.apiKey, units: 'metric' };
    return this.http.get(`${this.apiUrl}${this.weatherEndpoint}`, { params });
  }

  getWeatherForecast(city: string): Observable<any> {
    const params = { q: city, appid: this.apiKey, units: 'metric' };
    return this.http.get(`${this.apiUrl}${this.forecastEndpoint}`, { params });
  }

}
