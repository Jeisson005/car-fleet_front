import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { AuthService } from './services/auth.service';
import { environment } from '../enviroment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private renewTime: number;

  constructor(private router: Router, private authService: AuthService) {
    this.renewTime = environment.renewTime * 1000;
  }
  title = 'car-fleet_front';

  ngOnInit(): void {
    interval(this.renewTime)
      .subscribe(() => {
        this.authService.renew();
      });
  }

  showMenu(): boolean {
    return this.router.url === '/login';
  }
}
