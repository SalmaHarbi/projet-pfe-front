import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { HeaderEmployeeComponent } from '../header-employee/header-employee.component';
@Component({
  selector: 'app-about-us-employee',
  standalone: true,
  imports: [
    HeaderEmployeeComponent, 
    CommonModule, 
    FooterComponent
  ],
  templateUrl: './about-us-employee.component.html',
  styleUrl: './about-us-employee.component.css'
})
export class AboutUsEmployeeComponent {
  isMenuVisible = true;

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
