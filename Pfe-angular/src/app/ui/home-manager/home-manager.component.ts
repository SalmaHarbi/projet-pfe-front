import { Component } from '@angular/core';
import { HeaderComponent } from '../Manager/header/header.component';
import { CommonModule } from '@angular/common'; 
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home-manager',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FooterComponent], 
  templateUrl: './home-manager.component.html',
  styleUrls: ['./home-manager.component.css']
})
export class HomeManagerComponent {
  isMenuVisible = true;


  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}