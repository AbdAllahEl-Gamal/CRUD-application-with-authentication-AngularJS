import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Post } from  '../../interfaces/post';
import {PostsService} from '../../services/posts/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  public posts: Array<Post>;

  constructor(private router: Router, private postsService: PostsService) { }

  ngOnInit() {
    if(!window.localStorage.getItem('ACCESS_TOKEN')) {
      this.router.navigate(['login']);
      return;
    }

    this.postsService.getPosts().subscribe( (list: Array<Post>) => {
      this.posts = list;
      console.log(this.posts);
    });
  }

  deletePost(post: Post): void {
    this.postsService.deletePost(post.id).subscribe( data => {
      this.posts = this.posts.filter(u => u !== post);
    })
  };

  editPost(post: Post): void {
    window.localStorage.removeItem("editPostId");
    window.localStorage.setItem("editPostId", post.id.toString());
    this.router.navigate(['edit-post']);
  };

  addPost(): void {
    this.router.navigate(['add-post']);
  };

}