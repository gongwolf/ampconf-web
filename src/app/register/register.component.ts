import { RegisterService } from '../service/register.service';
import { SessionService } from '../service/session.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { saveAs } from 'file-saver'; 

const EMAIL_PATTERN = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';

@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public registerForm: FormGroup; 
  public touched: boolean; 
  public states: Array<any>; 
  public regDeadline: string;
  regTypes = [];
  allAffiliations = []; 
  allInstitutions = {}; 
  public affiliations = []; 
  public institutions = []; 
  public cdkconfig: any; 

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private sessionService: SessionService, 
              private router: Router) { }

  ngOnInit() {
    this.registerService.getUSStates().subscribe(
            data => {
               this.states = data.json().states;
               this.regTypes = data.json().registrationTypes; 
               this.allInstitutions = data.json().institutions; 
               this.allAffiliations = data.json().affiliations;
               this.regDeadline = data.json().deadline;
            },
            err => console.error(err)
    );
    this.buildForm(); 
    this.cdkconfig = {
      
      removePlugins: 'elementspath, blockquote',  
     
      toolbarGroups: [
        {'name':'basicstyles','groups':['basicstyles']},
        {'name':'paragraph','groups':['list','blocks']},
        {'name':'insert','groups':['insert']}
      ],
      removeButtons: 'Anchor,Source,Image,Table,Styles,Specialchar,HorizontalRule'
    }; 
  }
  
  buildForm(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]], 
      middle_initial: [''],
      last_name: ['', [Validators.required]], 
      gender: ['', [Validators.required]],
      ethnicity: [''],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      phone: ['', [Validators.required]], 
      registration_type: ['', [Validators.required]],
      program_affiliation: [''],
      institution: [''],
      registration_type_other: [''], 
      industry_other: [''], 
      meal_preferences: ['', [Validators.required]],
      discipline: ['', []],
      major: ['', []],
      classification: ['', []],
      presenter: ['', []],
      team_presentation: [''],
      contact_number: [''],
      member_names: [''],
      presentation_title: [''], 
      Abstract: ['<p></p>'], 
      category: [''], 
      faculty_name: [''], 
      faculty_title: [''], 
      faculty_institution: [''], 
      faculty_department: [''], 
      faculty_email: [''], 
      payment_amount: [''],
      payment_option: ['', [Validators.required]]
    }); 
    
  }
  
  onSelectRegType(regType: any) { 
    this.affiliations = this.allAffiliations.filter(p => p.regType === regType);
    this.institutions = []; 
    (<FormControl>this.registerForm.controls['program_affiliation']).setValue('');
    this.resetValues(); 
    if(this.registerForm.get('registration_type').value === 'Undergraduate Student') {
      this.registerForm.get('discipline').setValidators([Validators.required]); 
      this.registerForm.get('major').setValidators([Validators.required]);
      this.registerForm.get('classification').setValidators([Validators.required]);
      this.registerForm.get('presenter').setValidators([Validators.required]);
      
      this.registerForm.get('faculty_name').setValidators([Validators.required]);
      this.registerForm.get('faculty_title').setValidators([Validators.required]);
      this.registerForm.get('faculty_institution').setValidators([Validators.required]);
      this.registerForm.get('faculty_department').setValidators([Validators.required]);
      this.registerForm.get('faculty_email').setValidators([Validators.required]);
    } else {
      this.registerForm.get('discipline').setValidators(null); 
      this.registerForm.get('major').setValidators(null); 
      this.registerForm.get('classification').setValidators(null); 
      this.registerForm.get('presenter').setValidators(null); 
      
      this.registerForm.get('faculty_name').setValidators(null);
      this.registerForm.get('faculty_title').setValidators(null);
      this.registerForm.get('faculty_institution').setValidators(null);
      this.registerForm.get('faculty_department').setValidators(null);
      this.registerForm.get('faculty_email').setValidators(null);
      (<FormControl>this.registerForm.controls['discipline']).setValue('');
      (<FormControl>this.registerForm.controls['major']).setValue('');
      (<FormControl>this.registerForm.controls['classification']).setValue('');
      (<FormControl>this.registerForm.controls['presenter']).setValue('');
  
      (<FormControl>this.registerForm.controls['faculty_name']).setValue('');
      (<FormControl>this.registerForm.controls['faculty_title']).setValue('');
      (<FormControl>this.registerForm.controls['faculty_institution']).setValue('');
      (<FormControl>this.registerForm.controls['faculty_department']).setValue('');
      (<FormControl>this.registerForm.controls['faculty_email']).setValue('');
    }
    this.registerForm.get('discipline').updateValueAndValidity(); 
    this.registerForm.get('major').updateValueAndValidity(); 
    this.registerForm.get('classification').updateValueAndValidity(); 
    this.registerForm.get('presenter').updateValueAndValidity();
      
    this.registerForm.get('faculty_name').updateValueAndValidity();
    this.registerForm.get('faculty_title').updateValueAndValidity();
    this.registerForm.get('faculty_institution').updateValueAndValidity();
    this.registerForm.get('faculty_department').updateValueAndValidity();
    this.registerForm.get('faculty_email').updateValueAndValidity();
  }
   
  onSelectAffiliation(affiliation: any) {
    this.institutions = this.allInstitutions[affiliation];  
    this.resetValues(); 
  }
    
  resetValues() {
    (<FormControl>this.registerForm.controls['institution']).setValue('');
    (<FormControl>this.registerForm.controls['registration_type_other']).setValue('');
    (<FormControl>this.registerForm.controls['industry_other']).setValue('');
  }
  
  onPresenterChange(event) {
    if(this.registerForm.get('registration_type').value === 'Undergraduate Student' && 
      event.target.value === 'yes') {
      this.registerForm.get('team_presentation').setValidators([Validators.required]);  
      this.registerForm.get('presentation_title').setValidators([Validators.required]);
      this.registerForm.get('Abstract').setValidators([Validators.required]);
      this.registerForm.get('category').setValidators([Validators.required]);
    } else {
      this.registerForm.get('team_presentation').setValidators(null);  
      this.registerForm.get('presentation_title').setValidators(null); 
      this.registerForm.get('Abstract').setValidators(null); 
      this.registerForm.get('category').setValidators(null); 
      (<FormControl>this.registerForm.controls['team_presentation']).setValue('');
      (<FormControl>this.registerForm.controls['presentation_title']).setValue('');
      (<FormControl>this.registerForm.controls['category']).setValue('');
    }
    this.registerForm.get('team_presentation').updateValueAndValidity(); 
    this.registerForm.get('presentation_title').updateValueAndValidity(); 
    this.registerForm.get('category').updateValueAndValidity();
  }
      
  downloadPaymentForm () {
    this.registerService.getPaymentForm()
        .subscribe((blob) => {
          saveAs(blob, 'CC_Payment_Form_NMAMP.pdf')
    }); 
  }
  
  onSubmit(value: any, valid: boolean) {
    this.touched = true; 

    if(confirm('Are you ready to submit?')) {
      if(!valid) {
        alert('Required fields are missing!'); 
      }else {
        this.registerService.submit(value).subscribe(
        (data) => {
           if(data.error) {
             alert(data.error); 
           }else {
             this.sessionService.storage = value; 
             this.router.navigate(['/view', data.email]);
           } 
        }, 
        (error) => {
          console.log(error); 
        }); 
      }
  
      
    } 
  
  }
 
}
