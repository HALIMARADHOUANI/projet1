import {Component, OnInit} from '@angular/core';
import {PublicationService} from '../../../../services/publication.service';
import {environment} from '../../../../../environments/environment';
import moment from 'moment/moment';
import {CommentService} from '../../../../services/comment.service';

@Component({
  selector: 'app-listpublication',
  templateUrl: './listpublication.component.html',
  styleUrls: ['./listpublication.component.css']
})
export class ListpublicationComponent implements OnInit {
  user: any;
  posts: any
  apiImg = environment.apiImg + 'Publication/';
  popup = false
  dateNow = Date.now()
  comments: any;

  constructor(
    private publicationService: PublicationService,
    private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(environment.users));
    console.log(this.user)
    this.getAllPosts()
  }

  getAllPosts() {
    this.publicationService.getAllPosts().subscribe(data => this.posts = data)
  }

  deletePost(post: any, index) {
    this.publicationService.deletePublication(post.id).subscribe(res => {
      this.posts.splice(index, 1)
      return res
    })
  }

  showDialog(post) {
    console.log()
    this.publicationService.getPublication(post.id).subscribe((res: any) => {
      this.comments = res.Commentaires
    })
    this.popup = true
  }

  calculateDiff(date: string) {
    return moment.duration(moment().diff(date)).humanize();
  }

  deleteComment(comment: any, i: number) {
    this.commentService.deleteComment(comment.id).subscribe(res => {
      this.popup = false;
      this.comments.splice(comment.id, 1)
      return res
    })

  }

}
