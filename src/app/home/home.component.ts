import { RegisterService } from '../service/register.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  entries: Array<any> = []; 
  year: number; 
  years: Array<number> = []; 
  selectedYear = ''; 
  
  public totalItems = 0;
  public currentPage = 1;
  rowperpage = 10; 
  rowid = 0; 
  
  constructor(private registerService: RegisterService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.year = new Date().getFullYear(); 
    for(let i = 0; i < 5; i ++) {
      this.years.push(this.year - i); 
    }
    this.loadRegistrations(); 
  }
  
  private loadRegistrations() {
    this.registerService.getAllRegistrations(this.rowid, this.rowperpage)
      .subscribe((data) => {this.entries = data.array; this.totalItems = data.total; });
  }
  
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.rowid = this.rowperpage * (this.currentPage - 1); 
    this.loadRegistrations(); 
  }
    
  doExport() {
    this.registerService.doExport(this.selectedYear).subscribe(
      (blob) => { 
        if(blob.size !== 0) {
          const blobs = new Blob([blob], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blobs, 'ampexports-'+this.datePipe.transform(new Date(), 'yyyy-MM-dd') +'.xlsx'); 
        }
    });
  }
   
    
}
