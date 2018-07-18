import { AuthenticationService } from '../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  
  model: any = {};
  returnUrl: string; 
  
  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }
   
  login () {
    this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(
          (data) => {
            this.router.navigate([this.returnUrl]);
          }, 
          (error) => {
            alert('Username or password is incorrect!');
          }); 
  }

}
