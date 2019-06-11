import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'; 
import {ICurrentWeather} from '../icurrent-weather';

//this is another interface to filter out the data from
// the API data on top of of what we get with services
interface ICurrentWeatherData{
  weather: [{
    description: string,
    icon: string,
  }],
  main: {
    temp: number, 
  },
  sys: {
    country: string,
  }, 
  dt: number,
  name: string
}

@Injectable({
  providedIn: 'root'
}) 
export class WeatherService {

  constructor(private httpClient: HttpClient) { }
 //this is where we get the data
  getCurrentWeather(city: string, country:string) {
    //when we get the data, convert it to the declared version of the data in ICurrentWeatherData
    return this.httpClient.get<ICurrentWeatherData>(
      //inline formatting
      //we should not use the sample api, but copy the actual api 
      //api.openweathermap.org/data/2.5/weather?q=  (without the actual city, country)
      //this is where we insert the URL for the api call, and you need to pass the key
      //$ to fill in the values
      `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${environment.appId}`
    ).pipe(
      map(data => this.transformToICurrentWeather(data))
    )
  }
    private transformToICurrentWeather(data:ICurrentWeatherData) : ICurrentWeather {
      return {
        //read the data from name field
        city: data.name,
        country: data.sys.country,
        date: data.dt * 1000,
        //we access the first element in the data and grab the icon key and do the png
        image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        temperature: data.main.temp,
        description: data.weather[0].description
      }
    }
}
