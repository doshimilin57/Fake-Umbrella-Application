import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})

export class UserReportsService {
    constructor(public router: Router, public activeRoute: ActivatedRoute, private http: HttpClient) { }

    async getUsersWeather(users: any): Promise<any> {
        try {
            for (const user of users) {
                const results = await this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${user.address}&appid=7a2734d6cc6f5c96ef901703e6aee683`).toPromise();
                if (results && results['list'].length) {
                    const temp = [];
                    const dates = [];

                    for (const list of results['list']) {
                        for (const weather of list['weather']) {
                            // check if forecast for Rain anytime in 5 days
                            if (weather['main'] === 'Rain') {
                                temp.push('Rain');

                                dates.push(list.dt_txt);
                            }
                        }
                    }

                    /* This logic is to check when there will be rain anytime in next 5 days then 5 consecutive days */

                    // const color = (temp.length > 0) ? 'rgba(50,205,50)' : 'rgba(255,0,0)';

                    // user['rain'] = temp.length > 0 ? 'YES' : 'NO';

                    /* Devide the data in 5 groups to see there will be rain anytime in any of the days for span of total 5 days */

                    const usetemp1 = this.calculateResults(results['list'].slice(0, 8));
                    const usetemp2 = this.calculateResults(results['list'].slice(8, 16));
                    const usetemp3 = this.calculateResults(results['list'].slice(16, 24));
                    const usetemp4 = this.calculateResults(results['list'].slice(24, 32));
                    const usetemp5 = this.calculateResults(results['list'].slice(32, 40));


                    const condition = (usetemp1 === true && usetemp2 === true && usetemp3 === true
                        && usetemp4 === true && usetemp5 === true);

                    console.log(condition);

                    const color = (condition) ? 'rgba(50,205,50)' : 'rgba(255,0,0)';

                    user['rain'] = (condition) ? 'YES' : 'NO';

                    user['rain_color'] = color;

                    if (condition === true) {
                        user['rain_dates'] = dates[0];
                    } else {
                        user['rain_dates'] = '';
                    }

                }
            }
        } catch (error) {
            console.log(error);
        }

        return users;
    }

    calculateResults(userTemp) {
        let status = false;
        for (const list of userTemp) {
            for (const weather of list['weather']) {
                // check if forecast for Rain anytime in 5 days
                if (weather['main'] === 'Rain') {
                    status = true;
                }
            }
        }
        return status;
    }
}
