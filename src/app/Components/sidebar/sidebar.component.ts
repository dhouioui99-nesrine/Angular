import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
interface MenuItem {
  label: string;
  icon?: string;
  path: string[];            // segments après le rôle
  roles: string[];           // rôles autorisés
  submenu?: MenuItem[];      // sous-menus (avec leur propre path)
  route?: string[];          // chemin complet généré (absolu)
  unsynced?: boolean;    // ← ajouté


}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
 


  constructor(private authService: AuthServiceService, private router: Router) { }

  

 logout() {
    this.authService.logout();   // supprime les tokens
    this.router.navigateByUrl('/');  // redirection
  }
}
