import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Publication} from '../../../../shared/models/publication';
import {PublicationService} from '../../../../services/publication.service';

@Component({
  selector: 'app-addpublication',
  templateUrl: './addpublication.component.html',
  styleUrls: ['./addpublication.component.css']
})
export class AddpublicationComponent implements OnInit {
  pub:Publication=new Publication()
  //router: any;
  constructor(private publicationService:PublicationService,private router:Router) { }

  ngOnInit(): void {
  }
 // onSubmit(){
    //this.publicationservice.addPuplication(this.pub).subscribe((data)=>this.router.navigateByUrl('/publication'))

  //}
}
