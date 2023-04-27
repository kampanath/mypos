import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  positions = ['Admin', 'Cashier'];

  ngOnInit() {

  }

  // DI dependency injection
  constructor(private router: Router, private networkService: NetworkService) {

  }

  onSubmit(registerForm: NgForm) {
    this.networkService.register(registerForm.value).subscribe(
      (data) => {
        alert(data.message);
        this.router.navigate(["/login"]);
      },
      (error) => {
        alert(JSON.stringify(error));
      },() => {
        // stop spinner
      });
  }

  checkPasswordMatch(registerForm: NgForm): boolean {
    const values = registerForm.value;
    return values.password_retry !== '' && values.password !== values.password_retry
  }
}
