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
    //get the bog posts from the WP Api
    this.getBlogPosts();
  }

  ngOnInit() {
     this.loaded = false;
  }

  getBlogPosts() {
    this.blogAPIService.getBlogPosts()
      .subscribe((result) => {
        this.loaded = true;
        this.blogPosts = result;
      });
  }
}
