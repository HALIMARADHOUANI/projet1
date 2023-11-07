import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../../../services/authentificationService/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.css']
})
export class AllProfilesComponent implements OnInit {
  dataArray: any = []

  formSearch = this.fb.group({
    queue: ['']
  });
  formProfile: FormGroup;
  messageSuccess = ''

  constructor(private ds: DataService,
              private fb: FormBuilder,
              private route: Router) {
  }

  ngOnInit(): void {
    this.formProfile = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      prenom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      numTel: ['', [Validators.required]],
      id: [''],
    })
    this.getAll();
    this.formProfile.patchValue({
      nom: this.dataArray.nom,
      prenom: this.dataArray.prenom,
      numTel: this.dataArray.numTel,
    })

  }

  get form() {
    return this.formProfile.controls;
  }

  getAll() {
    this.ds.getAllProfils().subscribe((data: any) => {
      this.dataArray = data.data
    })

  }

  delete(id: any, i: number) {

    this.ds.deleteProfile(id).subscribe(response => {
      console.log(response)
      this.dataArray.splice(i, 1)

    })

  }


  getData(nom: string, prenom: string, numTel: string, id: any) {
    this.messageSuccess = ''
    console.log(this.formProfile.value)
    this.formProfile.patchValue({
      nom,
      prenom,
      id
    })
    console.log(this.formProfile.value)
  }


  updateNewProfile() {
    this.ds.updateProfile(this.formProfile.value, this.formProfile.value.id).subscribe(response => {
      console.log(response)
      this.messageSuccess = `this profile ${this.dataArray.nom} is updated`

    }, (err: HttpErrorResponse) => {
      console.log(err.message)

    })
  }


  desactivate(_id: any) {
    this.ds.desactivate(_id).subscribe(response => {
        this.getAll()
        return response
      },
      (err: HttpErrorResponse) => {
        console.log(err.message)

      })

  }

  activate(id) {
    this.ds.activate(id).subscribe(response => {
        this.getAll()
        return response
      },
      (err: HttpErrorResponse) => {
        console.log(err.message)

      })

  }

  search() {

    this.ds.search(this.formSearch.value.queue).subscribe((response: any) => {
      console.log(response)
      this.dataArray = response.data;
      return response
    }, (err: HttpErrorResponse) => {
      console.log(err.message)

    })

  }

  refresh() {
    this.dataArray = []
    this.getAll()
  }
}
