import {observes} from "@ember-decorators/object";
import Service from "@ember/service";
import {transformResponse} from "../utils/fetch";

export default class AsktugCore extends Service {
  posts = null;
  events = null;
  ssoMe = null;
  userPosts = null;
  config = null;


  init() {
    this.currentUserChanged();
    this.reloadPosts();
    this.reloadEvents();
    this.reloadConfig();
  }

  reloadSSOMe() {
    fetch('/_/sso/api/points/me').then(transformResponse).then(res => {
      this.ssoMe = res.data;
      this.notifyPropertyChange('ssoMe');
    });
  }

  reloadUserPosts() {
    fetch(`/_/blog/api/users/username/${this.currentUser.username}/posts`).then(transformResponse).then(res => {
      this.userPosts = res;
      this.notifyPropertyChange('userPosts');
    });
  }

  reloadPosts() {
    fetch('/_/blog/api/posts/recommend').then(transformResponse).then(posts => {
      this.posts = posts;
      this.notifyPropertyChange('posts');
    });
  }

  reloadEvents() {
    fetch('https://tidb.net/next-api/cms/tidbio-activitiespage-activities?_sort=date:DESC&_limit=2').then(transformResponse).then(events => {
      this.events = events;
      this.notifyPropertyChange('events');
    });
  }

  reloadConfig () {
    fetch('https://asktug.com/_/sso/api/asktug/site/config').then(transformResponse).then(config => {
      this.config = config;
      this.notifyPropertyChange('config');
    });
  }

  @observes("currentUser.id")
  currentUserChanged() {
    if (this.currentUser) {
      this.reloadSSOMe();
      this.reloadUserPosts();
    }
  }
}
