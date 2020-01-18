import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router, private postsService: PostsService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  get formControls() { 
    return this.addForm.controls; 
  }

  onSubmit() {
    this.postsService.createPost(this.addForm.value).subscribe( data => {
        if(this.addForm.invalid){
          return;
        }
        this.router.navigate(['posts']);
      });
  }

}
