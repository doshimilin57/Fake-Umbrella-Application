import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UtitlityService } from '../../../../utitlity.service';
@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css'],
})
export class DeviceFormComponent implements OnInit, OnDestroy {
  @ViewChild('myModal') public myModal: ModalDirective;
  model: any = {};
  users = [];
  querySub;
  deviceId = '';
  index;
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
    if (this.deviceId === '') {
      this.save(form);
    } else {
      this.update(form);
    }
    form.reset();
    this.utility.navigate('/devices');
  }

  save(form) {
    form.value.id = this.utility.generateId();
    const data = this.utility.getDevices();
    console.log(data);
    if (data === null) {
      const arr = [];
      console.log(form.value);
      arr.push(form.value);
      console.log(arr);
      this.utility.saveDevice(JSON.stringify(arr));
    } else {
      data.push(form.value);

      this.utility.saveDevice(JSON.stringify(data));
    }
  }

  update(form) {
    console.log(this.index);
    const data = this.utility.getDevices();
    form.value.id = this.deviceId;
    data[this.index] = form.value;
    this.utility.saveDevice(JSON.stringify(data));
  }

  getQueryParam() {
    this.querySub = this.utility.getQueryParam().subscribe((res) => {
      const id = res.id;
      console.log(id);
      if (typeof id !== 'undefined') {
        console.log('calling');
        this.deviceId = id;
        if (this.utility.getDevices() !== null) {
          const data = this.utility.getDevices();
          const singleData = data.find((v, i) => {
            this.index = i;
            return v.id === this.deviceId;
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
    const data = this.utility.getDevices();
    data.splice(this.index, 1);
    this.utility.saveDevice(JSON.stringify(data));

    this.utility.navigate('/devices');
  }
}
