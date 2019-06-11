import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from '../icurrent-weather';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather
  //needs to know where the service is
  constructor(private weatherService: WeatherService) { 
    //this was a dummy data
    // this.current = {
    //   city: 'Bethesda',
    //   country: 'US',
    //   date: new Date(),
    //   image: '',
    //   temperature: 72,
    //   description: 'Sunny'
    // }
  }
  //each component goes through the lifecycle, when we click on componenet it exists
  //construct to memory 
  //initiailize the memory 
  ngOnInit() {
    //weatherservice is a variable in the constructor above
    this.weatherService.getCurrentWeather(
      //as we don't have those data, we will hardcode it
      //we binded city and country to html
      //subscribe is function
      'Bethesda', 'US').subscribe(data => this.current = data);
  }

}
