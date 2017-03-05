import { Component, OnInit } from '@angular/core';
import { BlogAPIService } from '../apiService/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [BlogAPIService]
})

export class BlogComponent implements OnInit {

  blogPosts : Object;

  constructor(private blogAPIService: BlogAPIService) {
    this.getBlogPosts();
  }

  ngOnInit() {
  }

  getBlogPosts() {
    this.blogAPIService.getBlogPosts()
      .subscribe((result) => {
        console.log(result);
        this.blogPosts = result;
        console.log(this.blogPosts);
      });
  }


}
