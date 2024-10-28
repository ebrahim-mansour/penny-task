import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../../state/auth/auth.actions';
import { selectUsername } from '../../state/auth/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/api';

  username$: Observable<string | null>;

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {
    this.username$ = this.store.select(selectUsername);
  }

  ngOnInit() {
    console.log('home component');
    // this.http
    //   .get(`${this.apiUrl}/products`, { withCredentials: true })
    //   .subscribe(
    //     (response) => {
    //       console.log(response);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
