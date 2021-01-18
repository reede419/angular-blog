import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';

@Pipe({
    name: 'searchPosts'
})

export class SearchPosts implements PipeTransform {
    transform(posts: Post[], search = ''): Post[] {
        if(!search.trim()) { //проверка на пустую строку
            return posts
        } 

        return posts.filter( post => {
            return post.title.toLowerCase()
                .includes(search.toLowerCase())
        })
    }
}