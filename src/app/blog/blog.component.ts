import { Component, OnInit } from '@angular/core';
import { BlogAPIService } from '../apiService/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers: [BlogAPIService]
})

export class BlogComponent implements OnInit {

  blogPosts : Object;
  loaded : boolean;

  constructor(private blogAPIService: BlogAPIService) {
    this.loaded = false;
    this.getBlogPosts();
  }

  ngOnInit() {
  }

  getBlogPosts() {
    this.blogAPIService.getBlogPosts()
      .subscribe((result) => {
        console.log(result);
        this.loaded = true;
        this.blogPosts = result;
        console.log(this.blogPosts);
      });
  }
}
