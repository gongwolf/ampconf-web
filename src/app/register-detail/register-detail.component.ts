import { RegisterService } from '../service/register.service';
import { SessionService } from '../service/session.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver'; 

@Component({
  selector: 'app-register-detail',
  templateUrl: './register-detail.component.html',
  styleUrls: ['./register-detail.component.css']
})
export class RegisterDetailComponent implements OnInit {

  email: any; 
  data: any; 
  
  constructor(private route: ActivatedRoute, 
              private sessionService: SessionService,
              private registerService: RegisterService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.email = params['email'];
      this.data = this.sessionService.storage;  
    }); 
  }
  
   downloadPaymentForm () {
    this.registerService.getPaymentForm()
        .subscribe((blob) => {
          saveAs(blob, 'CC_Payment_Form_NMAMP.pdf')
    }); 
  }

}
