import {Component, OnInit} from '@angular/core';
import {Publication} from '../../../shared/models/publication';
import {PublicationService} from '../../../services/publication.service';
import {environment} from '../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-addpublication',
  templateUrl: './addpublication.component.html',
  styleUrls: ['./addpublication.component.css']
})
export class AddpublicationComponent implements OnInit {
  pub: Publication = new Publication()
  router: any;
  user: any;
  formPost: FormGroup

  constructor(
    private fb: FormBuilder,
    private publicationservice: PublicationService) {
  }

  ngOnInit(): void {
    this.user = localStorage.getItem(environment.users);
    this.formPost = this.fb.group({
      id_user: [this.user.id],
      nom_pub: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      extension_status: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      type: ['', [Validators.required]],

    })
  }

  get form() {
    return this.formPost.controls;
  }

  //onSubmit(){
  // this.publicationservice.addPuplication(this.pub).subscribe((data)=>this.router.navigateByUrl('/publications'))

  //}
  addPost() {

  }
}
