import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;
  errores = {
    email: [
      { tipo: 'required', mensaje: 'El correo electrónico es obligatorio' },
      { tipo: 'email', mensaje: 'Por favor, ingrese un correo electrónico válido' }
    ],
    password: [
      { tipo: 'required', mensaje: 'La contraseña es obligatoria' },
      { tipo: 'minlength', mensaje: 'La contraseña debe tener al menos 6 caracteres' }
    ]
  };
  constructor(private formBuilder: FormBuilder,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Método para activar la validación
  onFieldBlur(field: string) {
    // Valida a medida que vamos escribiendo cosas en el formulario
    this.loginForm.get(field)?.markAsTouched();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
  
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
