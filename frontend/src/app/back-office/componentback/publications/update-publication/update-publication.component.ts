import {Component, OnInit} from '@angular/core';
import {Publication} from '../../../../shared/models/publication';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-update-publication',
  templateUrl: './update-publication.component.html',
  styleUrls: ['./update-publication.component.css']
})
export class UpdatePublicationComponent implements OnInit {
  pub: Publication = new Publication()
  formPost: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formPost = this.fb.group({
      picture: ['', [Validators.required]],
      id_user: ['', [Validators.required]],
      nom_pub: ['', [Validators.required]],
      extension_status: ['', [Validators.required]],
      type: ['', [Validators.required]],
    })
  }

  get form() {
    return this.formPost.controls;
  }

  /* this. publicationservice.getPublicationById(this.ac.snapshot.params['id']).subscribe
   (data => {this.pub=data})
 }
 onSubmit(){
  // this.publicationservice. updatePublication(this.pub,this.ac.snapshot.params['id'])
   //.subscribe(data=>this.router.navigateByUrl('/publication'))
   this.publicationservice.updatePublication(this.ac.snapshot.params['id'],this.pub).subscribe((data)=>this.router.navigateByUrl('/publication'))
 }*/
}
