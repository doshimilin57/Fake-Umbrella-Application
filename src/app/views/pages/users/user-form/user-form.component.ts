import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UtitlityService } from '../../../../utitlity.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})

export class UserFormComponent implements OnInit, OnDestroy {
  @ViewChild('myModal') public myModal: ModalDirective;
  model: any = {};
  users = [];
  querySub: any;
  userId = '';
  index: any;
  constructor(public utility: UtitlityService) { }

  ngOnInit(): void {
    this.getQueryParam();
  }

  cancel() {
    this.utility.goBack();
  }

  submit(form) {
    console.log(form.value);
    console.log(this.utility.generateId());
    if (this.userId === '') {
      this.save(form);
    } else {
      this.update(form);
    }
    form.reset();
    this.utility.navigate('/users');
  }

  save(form) {
    form.value.id = this.utility.generateId();
    const data = this.utility.getUsers();
    console.log(data);
    if (data === null) {
      const arr = [];
      console.log(form.value);
      arr.push(form.value);
      console.log(arr);
      this.utility.saveUser(JSON.stringify(arr));
    } else {
      data.push(form.value);

      this.utility.saveUser(JSON.stringify(data));
    }
  }

  update(form) {
    console.log(this.index);
    const data = this.utility.getUsers();
    form.value.id = this.userId;
    data[this.index] = form.value;
    this.utility.saveUser(JSON.stringify(data));
  }

  getQueryParam() {
    this.querySub = this.utility.getQueryParam().subscribe((res) => {
      const id = res.id;
      console.log(id);
      if (typeof id !== 'undefined') {
        console.log('calling');
        this.userId = id;
        if (this.utility.getUsers() !== null) {
          const data = this.utility.getUsers();
          const singleData = data.find((v, i) => {
            this.index = i;
            return v.id === this.userId;
          });
          if (singleData !== undefined) {
            this.model = singleData;
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  delete() {
    const data = this.utility.getUsers();
    data.splice(this.index, 1);
    this.utility.saveUser(JSON.stringify(data));
    this.utility.navigate('/users');
  }
}
