import { Component } from '@angular/core';
import { UtitlityService } from '../../utitlity.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
})

export class LoginComponent {
  model: any = {};
  constructor(public utility: UtitlityService) { }

  login(form) {
    console.log(this.model);
    if (
      this.model.email === 'admin@gmail.com' &&
      this.model.password === '123456'
    ) {
      this.utility.setAuthenticatedStatus('true');
      this.utility.navigate('/users');
    } else {
      alert('Wrong credentials');
      form.reset();
    }
  }
}
