import { Router } from '@angular/router';
import { MyServicesService } from './../../Services/my-services.service';
import { FormGroup, FormControl, Validators, FormArray, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css']
})
export class EditDetailComponent implements OnInit {

  constructor(private server: MyServicesService, private router: Router) { }

  editform: FormGroup;

  public details;
  public id = sessionStorage.getItem('id');

  get phone(){
    return this.editform.get('phone');
  }

  ngOnInit(): void {
    var username = sessionStorage.getItem('username');
    
    console.log(this.id);

    this.server.getUsername(username).subscribe((userdetail)=>{
      this.details=userdetail;
      this.editform.patchValue({name: this.details[0].name,
                                phone: this.details[0].phone,
                                email: this.details[0].email});
      this.editform.get("company").patchValue({cname: this.details[0].company.cname , 
                                               location: this.details[0].company.location});
      this.editform.get("address").patchValue({street: this.details[0].address.street,
                                               city: this.details[0].address.city});
      this.editform.get("address").get("geo").patchValue({lat: this.details[0].address.geo.lat,
                                                          lon: this.details[0].address.geo.lon});
      this.addHobbies();                                                        
    },(error)=>{
      console.log('Error');
    });

    this.editform = new FormGroup({
      name: new FormControl(''),
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
        cname: new FormControl(''),
        location: new FormControl(''),
      }),
      password: new FormControl(''),
      hobbies: new FormArray([])
    });
  }

  updateDetails(){
    if (this.editform.status != "VALID"){
      console.log('Error')
    } else {
    this.server.updateData(this.id,this.editform.value).subscribe((editedDetail)=>{
      //this.details=editedDetail;
      alert('Updated');
      this.router.navigate(['/app-user-detail']);
      console.log('Hola');
    },(error)=>{
      console.log('Error');
    });
    }
  }

  addHobbies(){
    console.log(this.details[0].hobbies.length);
    var leng: Number = this.details[0].hobbies.length;
    for(let i=0;i<leng;i++){
      console.log('loop' , i);
      console.log(this.details[0].hobbies[i]);
      (<FormArray>this.editform.get("hobbies")).push(new FormControl(this.details[0].hobbies[i]));      
    }
  }

  addHobby() {
    (<FormArray>this.editform.get("hobbies")).push(new FormControl(''));
  }

  deleteHobby(i){
    (<FormArray>this.editform.get('hobbies')).removeAt(i);
  }

  onFileChanged(event){
    const file = event.target.files[0];
  }

}
