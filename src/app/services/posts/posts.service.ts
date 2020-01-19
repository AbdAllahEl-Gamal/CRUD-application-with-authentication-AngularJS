import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from  '../../interfaces/post';
import { Observable } from 'rxjs/index';
import {ApiResponse} from  '../../interfaces/api.response';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  getPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(this.baseUrl);
  }

  getPostById(id: number): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(this.baseUrl + '/' + id);
  }

  createPost(post: Post): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, post);
  }

  updatePost(post: Post): Observable<Array<Post>> {
    console.log(post);
    return this.http.put<Array<Post>>(this.baseUrl + '/' + post.id, post);
  }

  deletePost(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + '/' + id);
  }
}
