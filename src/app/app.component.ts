import { Component } from '@angular/core';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})
export class AppComponent {
  regYear: string;  
  constructor(private registerService: RegisterService) {
    this.registerService.getUSStates().subscribe(
      data => {
        this.regYear = data.json().year; 
      },
      err => console.error(err) 
    );
  } 

}
