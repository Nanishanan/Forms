import { CustomValidations } from './../classes/custom.validations';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MyServicesService } from 'src/Services/my-services.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(private saveDetail: MyServicesService) { }

  userForm: FormGroup;

  get phone(){
    return this.userForm.get('phone');
  }

  get uname(){
    return this.userForm.get('username');
  }


  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      username: new FormControl('',null, CustomValidations.asyncUnique),
      email: new FormControl(''),
      phone: new FormControl('',[
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern("^[0-9]+$")  
      ]),
      address: new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        geo: new FormGroup({
          lat: new FormControl(''),
          lon: new FormControl('')  
        })
      }),
      company: new FormGroup({
        name: new FormControl('IBM'),
        location: new FormControl(''),
      }),
      password: new FormControl(''),
      hobbies: new FormArray([])
    });
  }

  addHobby() {
    (<FormArray>this.userForm.get('hobbies')).push(new FormControl(''));
  }

  deleteHobby(i){
    (<FormArray>this.userForm.get('hobbies')).removeAt(i);
  }

  submit(){
    this.saveDetail.saveData(this.userForm.value).subscribe((data)=>{
      console.log(data);
    },(error)=> console.log('Error Posting.. '));
    console.log(this.userForm.value);
  }

  formReset(){
    this.userForm.reset();
  }

}
