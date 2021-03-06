import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  // чтобы использовать FormGroup мы регистрируем в импортс (admin.module.ts) - FormsModule,   ReactiveFormsModule,
  submitted = false
  message: string


  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe( (params: Params) => {
      if( params['loginAgain'] ) {
        this.message = 'Please enter data'
      } else if(params['authFailed']) {
        this.message = 'Session is end. Please enter data again'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required, 
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
        // 6 сколько символов нужно вводить
      ])
    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe( () => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
    this.submitted = false
    }, () => {
      this.submitted = false
    } )
  }

}
