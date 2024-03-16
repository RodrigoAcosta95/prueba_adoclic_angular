import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string | null = null;

  constructor(private router: Router) { }

  login(email: string, password: string): Observable<boolean> {
    // validamos que el correo sea igual al solicitado junto a la contraseña
    if (email === 'user@demo.com' && password === '123456') {
      this.loggedIn.next(true);
      this.token = 'deberia_ser_un_token'; 
      Swal.fire('', '¡Ingreso correcto!', 'success');
      return of(true);
    } else {
      this.loggedIn.next(false);
      Swal.fire('', 'Credenciales inválidas', 'error');
      return throwError(() => new Error('Credenciales inválidas'));
      
    
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return this.token;
  }

  clearLogin(): void {
    this.loggedIn.next(false);
    this.token = null;
    window.location.reload();
  }
}
