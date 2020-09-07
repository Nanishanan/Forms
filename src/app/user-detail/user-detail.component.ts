import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MyServicesService } from 'src/Services/my-services.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public details;

  constructor(private detailService:MyServicesService, private router: Router) { }

  ngOnInit(): void {
    console.log("id:", sessionStorage.getItem('username'));
    const username = sessionStorage.getItem('username');
    this.detailService.getUsername(username).subscribe((data)=>{
        this.details = data;
        console.log("User details: " ,data);
        console.log("User details: " ,this.details);
    },(error)=>{
      console.log("Hogaya");
    });
  }

  updateDetails(){
    console.log('Updated');
    sessionStorage.setItem('username',this.details[0].username);
    sessionStorage.setItem('id',this.details[0]._id);
    this.router.navigate(['/app-edit-detail']);
  }

}
