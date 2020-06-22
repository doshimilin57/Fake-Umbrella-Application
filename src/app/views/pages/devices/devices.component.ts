import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { UtitlityService } from '../../../utitlity.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  name = '';
  rows = [];
  tableOffset = 0;
  columns = [
    { name: 'Device Name', prop: 'deviceName' },
    { name: 'Device Type', prop: 'deviceType' },
    { name: 'OS Version', prop: 'osVersion' },
    { name: 'Last LoggedIn Time', prop: 'lastLoggedinTime' },
  ];
  temp = [];
  constructor(private router: Router, public utility: UtitlityService) { }

  ngOnInit(): void {
    const devices = this.utility.getDevices();
    if (devices === null) {
      return;
    }

    this.rows = [...devices];
    this.temp = [...this.rows];
  }

  updateFilter(event) {
    console.log(event.target.value, event);
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.deviceName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    this.table.offset = 0;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  onActivate(event) {
    console.log(event.type);
    if (event.type === 'click') {
      console.log(event.row);
      this.router.navigateByUrl('/device-form?id=' + event.row.id);
    }
  }
}
