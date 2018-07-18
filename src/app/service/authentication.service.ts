import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const SERVICE_URL = 'http://mynmamp.nmsu.edu/ampconfapi';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  login(email: string, password: string) {
    return this.http.post(SERVICE_URL + '/authenticate.php',
      JSON.stringify({ email: email, password: password }))
      .map((response: Response) => {
        console.log(response);
        const user = response.json();

        if(user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {
      localStorage.removeItem('currentUser');
   }

}
