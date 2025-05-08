import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, RouterModule], // Add NavComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Expense Tracker';
}