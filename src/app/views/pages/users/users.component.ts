import { Component, OnInit, ViewChild } from '@angular/core';

import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { UtitlityService } from '../../../utitlity.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  name = '';
  rows = [];
  tableOffset = 0;
  columns = [
    { name: 'Name', prop: 'name' },
    { name: 'Person of contact', prop: 'person_contact' },
    { name: 'Telephone Phone', prop: 'phone' },
    { name: 'Location', prop: 'address' },
    { name: 'Number of Employees', prop: 'employees' },
  ];
  temp = [];
  constructor(private router: Router, public utility: UtitlityService) { }

  ngOnInit(): void {
    const users = this.utility.getUsers();
    if (users === null) {
      return;
    }

    this.rows = [...users];
    this.temp = [...this.rows];

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
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
      this.router.navigateByUrl('/user-form?id=' + event.row.id);
    }
  }
}
