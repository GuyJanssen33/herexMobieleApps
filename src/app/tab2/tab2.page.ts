import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  cityName = '';
  weatherData: any;
  weatherForecast: any[] =[];


  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if (this.cityName) {
      this.weatherService.getWeatherData(this.cityName).subscribe(
        (data: any) => {
          this.weatherData = data;
          console.log('Weather Data:', this.weatherData);
        },
        (error: any) => {
          console.error('Error fetching weather data:', error);
        }
      );

      this.weatherService.getWeatherForecast(this.cityName).subscribe(
        (data:any) => {
          this.weatherForecast = data.list;
          console.log('Weather Forecast:', this.weatherForecast);


        },
        (error:any) => {
          console.error('Error fetching weather forecast:', error);
        }
      );
    }
  }

}
