import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '../../../Services/navigation.service';
import { UtilityService } from '../../../Services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  message = '';
  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  login() {
    this.navigationService
      .loginUser(this.Email.value, this.PWD.value)
      .subscribe((res: any) => {
        if (res.toString() !== 'invalid') {
          this.message = 'Logged In Successfully.';
          this.utilityService.setUser(res.toString());
          console.log(this.utilityService.getUser());
        } else {
          this.message = 'Invalid Credentials!';
        }
      });
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
}
