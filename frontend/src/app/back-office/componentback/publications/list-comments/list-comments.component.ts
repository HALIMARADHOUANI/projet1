
import { Component, OnInit } from '@angular/core';
import {CommentService} from '../../../../services/comment.service';
import {Comments} from '../../../../shared/models/comments';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comments.component.css',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {
  cs:Comments[] = [];
  searchText:string = "";
  message:string="";
  constructor(private commService:CommentService) { }

  ngOnInit(): void {
  }

Search() {

  this.cs =  this.cs.filter((p)=> p.continue_comment.includes(this.searchText));

 }

 getComment(){
  this.commService.getComment().subscribe((data)=>this.cs=data)
 }

  //  this.publicationservice.getPuplication().subscribe((data)=>this.ps=data)


delete(id : any){
  this.commService.deleteComment(id).subscribe((data)=>this.getComment())

}
}
