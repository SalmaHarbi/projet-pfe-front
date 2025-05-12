import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FooterComponent } from '../footer/footer.component';
import { HeaderEmployeeComponent } from '../header-employee/header-employee.component';
@Component({
  selector: 'app-home-employee',
  imports: [HeaderEmployeeComponent, CommonModule, FooterComponent],
  templateUrl: './home-employee.component.html',
  styleUrl: './home-employee.component.css'
})
export class HomeEmployeeComponent {
  isMenuVisible = true;


  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
