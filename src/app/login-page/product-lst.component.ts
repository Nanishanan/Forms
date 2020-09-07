import { FormControl } from '@angular/forms';
import { MyServicesService } from './../../Services/my-services.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-lst',
  templateUrl: './product-lst.component.html',
  styleUrls: ['./product-lst.component.css']
})
export class ProductLstComponent implements OnInit {

  constructor(private router:Router, private server: MyServicesService) { }

  private details;

  ngOnInit() {
  }

  submit(formdet){
    sessionStorage.setItem('username',formdet.value.username);
    //console.log(formdet.value.username);
    this.server.getUsername(formdet.value.username).subscribe((userDetails)=>{
      this.details=userDetails;
      var len:number = this.details.length;
      if (len == 0) {
        formdet.controls['username'].markAsTouched();
        formdet.controls['username'].markAsDirty();
        formdet.controls['username'].setErrors({'unavailable': true});
      }else{
        console.log(this.details[0].password);
        if(this.details[0].password != formdet.value.password){
          //console.log('Password Invalid');
          formdet.controls['password'].markAsTouched();
          formdet.controls['password'].markAsDirty();
          formdet.controls['password'].setErrors({'unavailable': true});
        } else {
          this.router.navigate(['/app-user-detail']); }            
      }
    },(error)=>{
      console.log("Error");
    });
  }

  registerClicked(event){
      this.router.navigate(['/register-page']);
  }

}
