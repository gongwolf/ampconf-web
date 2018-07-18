import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const SERVICE_URL = 'http://mynmamp.nmsu.edu/ampconfapi';
const FILE_NAME = 'CC_Payment_Form_NMAMP.pdf';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  getUSStates() {
    return this.http.get('assets/data.json');
  }

  getPaymentForm() {
    const options = new RequestOptions({responseType: ResponseContentType.Blob })
    return this.http.get('assets/'+FILE_NAME, options)
      .map((res) => res.blob());
  }

  submit(data: any): Observable<any> {
    return this.http.post(SERVICE_URL + '/submit_registration.php',
      JSON.stringify(data)).map((res) => res.json() );
  }

  getAllRegistrations(rowid: number, rowperpage: number) {
    const params: string = this.jwt(rowid, rowperpage);
    console.log(params);
    return this.http.get(SERVICE_URL + '/registrations.php'+params)
      .map((res: Response) => res.json() );
  }

  private jwt(rowid: number, rowperpage: number) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      return '?email='+currentUser.email
            + '&token='+ currentUser.token
            + '&rowid='+rowid
            + '&rowperpage='+rowperpage;
    }
    return '';
  }

  doExport(year: string) {
    const params: string = this.jwtDoExport(year);
    const options = new RequestOptions({responseType: ResponseContentType.Blob })
    console.log(params);
    return this.http.get (SERVICE_URL + '/do_export.php' + params, options)
      .map((res: Response) => res.blob());
  }

  private jwtDoExport(year: string) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      return '?email='+currentUser.email
            + '&token='+ currentUser.token
            + '&year='+year;
    }
    return '';
  }

}
