import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from './../../shared/posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  post: Post
  submited = false

  updateSubscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.route.params
    .pipe( switchMap( (params: Params) => {
      return this.postsService.getById(params['id'])
    })).subscribe( (post: Post) => {
      this.post = post
      this.form = new FormGroup( {
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),

      })
    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }
    this.submited = true

    this.updateSubscription = this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe( () =>{
      this.submited = false
    })
  }

  ngOnDestroy() {
    if(this.updateSubscription) {
      this.updateSubscription.unsubscribe()
    }
  }

}
