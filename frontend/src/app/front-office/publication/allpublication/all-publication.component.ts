import {Component, OnInit} from '@angular/core';
import {PublicationService} from '../../../services/publication.service';
import {environment} from '../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentService} from '../../../services/comment.service';
import moment from 'moment';

@Component({
  selector: 'app-all-publication',
  templateUrl: './all-publication.component.html',
  styleUrls: ['./all-publication.component.css']
})
export class AllPublicationComponent implements OnInit {
  fileName = '';
  //searchText:string="";
// message:string="";
  user: any;
  fileUploaded: any;
  formPost: FormGroup;
  posts: any
  apiImg = environment.apiImg + 'Publication/';
  popup = false
  formComment: FormGroup;
  dateNow = Date.now()
  comments: any;
  edit=false;

  constructor(
    private publicationService: PublicationService,
    private commentService: CommentService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(environment.users));
    console.log(this.user)
    this.formPost = this.fb.group({
      picture: ['', [Validators.required]],
      nom_pub: ['', [Validators.required]],
    })
    this.formComment = this.fb.group({
      contenue_commentaires: ['', [Validators.required]],
      UserId: ['', [Validators.required]],
      PublicationId: ['', [Validators.required]],
    })
    this.getAllPosts()
  }

  getAllPosts() {
    this.publicationService.getAllPosts().subscribe(data => this.posts = data)
  }

  onFileSelected(event) {
    console.log(event.target.files)
    this.fileUploaded = event.target.files[0];
    if (this.fileUploaded) {
      this.fileName = this.fileUploaded.name;
    }
  }

  addPost() {
    console.log(this.user)
    const fd = new FormData();
    fd.append("nom_pub", this.formPost.value.nom_pub)
    fd.append("photo", this.fileUploaded)
    fd.append("user", this.user.id)
    this.publicationService.addPost(fd).subscribe(res => {
      console.log(res)
      this.formPost.reset();
      this.fileName = '';
      this.posts.push(res)
    })
  }

  deletePost(post: any, index) {
    this.publicationService.deletePublication(post.id).subscribe(res => {
      this.posts.splice(index, 1)
      return res
    })
  }

  showDialog(post, user) {
    console.log()
    this.formComment.patchValue({
      PublicationId: post.id,
      UserId: user.id,
    })
    this.publicationService.getPublication(post.id).subscribe((res: any) => {
      this.comments = res.Commentaires
    })
    this.popup = true
  }

  commentPost() {
    console.log(this.formComment.value)
    this.commentService.addComment(this.formComment.value).subscribe(res => {
      this.popup = false;
      this.formComment.reset();
      return res
    })
  }

  calculateDiff(date: string) {
    return moment.duration(moment().diff(date)).humanize();

  }

  deleteComment(comment: any, i: number) {
    this.commentService.deleteComment(comment.id).subscribe(res => {
      this.popup = false;
      console.log(this.comments)
      this.comments.splice(comment.id, 1)
      console.log(this.comments)
      this.formComment.reset();
      return res
    })

  }
  editComment(comment: any, i: number) {
    this.edit = true;
    this.formComment.patchValue({
      contenue_commentaires: comment.contenue_commentaires,
      id: comment.id,
      index: i,
    })
  }

  update() {
    this.commentService.updateComment(this.formComment.value, this.formComment.value.id).subscribe(res => {
      console.log(res)
      this.comments.splice(this.formComment.value.index, 1);
      this.popup = false;
      this.formComment.reset();
      this.edit = false;
    })

  }
}

