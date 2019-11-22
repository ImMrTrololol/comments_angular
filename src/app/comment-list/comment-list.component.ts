import { Component } from '@angular/core';
import {
FormsModule,
ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent {
  comment = "";
  search_field = "";
  search_result = [];
  search(){
    this.search_result = [];
    this.append_search(this.list);
    this.search_field = "";
  }
  append_search(arr){
    for(let i =0; i<arr.length; i++){
      if(arr[i].title.toLowerCase().includes(this.search_field.toLowerCase())){
        this.search_result.push(arr[i].title)
      }
      this.append_search(arr[i].children);
    }
  }
  append_child(lst, id_arr) {
    if (id_arr.length === 1) {
      let local_id = id_arr[0];
      let child: NavigationModel;
      let to_child_id = lst[local_id].id.concat([lst[local_id].children.length]);
      child = {
        title: lst[local_id].data,
        id: to_child_id,
        data: "",
        children: []
      };
      lst[local_id].data = "";
      lst[local_id].children.push(child);
      return lst
    } else {
      let arr = id_arr.slice(1);
      let local_id = id_arr[0];
      lst[local_id].children = this.append_child(lst[local_id].children, arr);
      return lst
    }
  }

  add_comment(id, text) {
    if (text) {
      this.list = this.append_child(this.list, id);
      console.log(this.list)
    }
  }

  add_new_comment() {
    if (this.comment) {
      let child: NavigationModel;
      child = {
        title: this.comment,
        id: [this.list.length],
        data: "",
        children: []
      };
      this.list.push(child);
      this.comment = "";
    }
  }

  public list: NavigationModel[] = [
    {
      title: "First yf[",
      data: "",
      id: [0],
      children: [
        {
          title: "omg",
          data: "",
          id: [0, 0],
          children: []

        }
      ]
    },
    {
      title: "Saw this on pikabu",
      data: "",
      id: [1],
      children: []

    },
    {
      title: "Dislike, unsub",
      data: "",
      id: [2],
      children: []

    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus at urna condimentum mattis pellentesque id nibh. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Viverra nam libero justo laoreet. Turpis egestas maecenas pharetra convallis posuere morbi leo. Cursus in hac habitasse platea dictumst quisque sagittis purus sit. Nisl nisi scelerisque eu ultrices vitae auctor eu. Interdum varius sit amet mattis vulputate enim nulla aliquet porttitor. Dignissim diam quis enim lobortis scelerisque fermentum. Elit eget gravida cum sociis natoque penatibus. Imperdiet sed euismod nisi porta lorem mollis. Lacinia at quis risus sed. Non tellus orci ac auctor augue mauris. Non tellus orci ac auctor augue mauris augue. Justo nec ultrices dui sapien eget mi proin sed. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Dolor sit amet consectetur adipiscing elit ut aliquam purus sit. Odio ut enim blandit volutpat. Nullam non nisi est sit.",
      data: "",
      id: [3],
      children: []

    }
  ];

}

class NavigationModel {
  public title: string;
  public data: string;
  public id: number[];
  public children: NavigationModel[];
}
/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
