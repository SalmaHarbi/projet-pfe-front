import { Component } from '@angular/core';
import { HeaderComponent } from '../Manager/header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    HeaderComponent, 
    CommonModule, 
    FooterComponent
  ], 
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  isMenuVisible = true;

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
