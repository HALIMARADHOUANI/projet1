import {Component, OnInit} from '@angular/core';
import {Comments} from '../../../../shared/models/comments';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  stage!: Comments;
  formComment: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.stage = new Comments();
    this.formComment = this.fb.group({
      id_comment: ['', [Validators.required]],
      id_pub: ['', [Validators.required]],
      continue_comment: ['', [Validators.required]],
      date_create_comment: [new Date(), [Validators.required]],
      date_modifier_comment: ['', [Validators.required]],
    })
  }

  get form() {
    return this.formComment.controls;
  }
}
