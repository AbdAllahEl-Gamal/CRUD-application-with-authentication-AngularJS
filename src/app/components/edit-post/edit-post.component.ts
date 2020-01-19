import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {first} from 'rxjs/operators';
import { Post } from '../../interfaces/post';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  post: Post;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router, private postsService: PostsService) { }

  ngOnInit() {
    let postId = window.localStorage.getItem("editPostId");
    if(!postId) {
      alert("Invalid action.")
      this.router.navigate(['posts']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [''],
      userId: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required]
    });

    this.postsService.getPostById(+postId).subscribe( data => {
      console.log(data);
      this.editForm.setValue(data);
    });
  }

  onSubmit() {
    this.postsService.updatePost(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('Post updated successfully.');
          this.router.navigate(['posts']);
        },
        error => {
          alert(error);
        });
  }

}
