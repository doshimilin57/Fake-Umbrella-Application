import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { UtitlityService } from '../../../utitlity.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UserReportsService } from './reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  rows = [];
  tableOffset = 0;
  columns = [
    { name: 'Name', prop: 'name' },
    { name: 'Person of contact', prop: 'person_contact' },
    { name: 'Telephone Phone', prop: 'phone' },
    { name: 'Rain', prop: 'rain' },
    { name: 'DateTime', prop: 'rain_dates' },
  ];

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public chartError = false;
  public chartErrorMsg = '';
  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartColors: Array<any> = [
    {
      backgroundColor: []
    }
  ];

  public barChartData: any[] = [
    { data: [], label: 'Top 4 customers' },
  ];

  constructor(private router: Router, private http: HttpClient,
    public utility: UtitlityService,
    public userReportsService: UserReportsService) { }

  async ngOnInit() {

    let users = this.utility.getUsers();

    // get users with rain and color
    users = await this.userReportsService.getUsersWeather(users);

    /* Comment this code to Display all the Data in Reports page and UnComment 'this.rows = users;' */

    const tblUsers = [];
    for (const user of users) {
      if (user.rain === 'YES') {
        tblUsers.push(user);
      }
    }

    // this.rows = users;

    this.rows = [...tblUsers];

    const requests = [];
    const employees = [];
    const labels = [];
    const top4Employees = [];
    const top4Labels = [];

    // get the weather for users
    users.sort(this.compare);
    const rains = [];

    for (const user of users) {
      employees.push(user.employees);
      labels.push(user.name);
      rains.push(user.rain_color);
    }

    const chartUsersData = users.slice(0, 4);

    for (const tempuser of chartUsersData) {
      top4Employees.push(tempuser.employees);
      top4Labels.push(tempuser.name);
    }

    const top4Rains = rains.splice(0, 4);

    this.barChartData = [{ data: top4Employees, label: 'Number of Employees' }];
    this.barChartLabels = top4Labels;
    this.barChartColors = [{ backgroundColor: top4Rains }];

  }

  // sort users by employees
  compare(a, b) {
    if (a.employees < b.employees) {
      return 1;
    }
    if (a.employees > b.employees) {
      return -1;
    }
    return 0;
  }

  // chart events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }


  onActivate(event) {
    console.log(event.type);
  }
}
