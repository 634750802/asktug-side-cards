import Component from "@ember/component";
import {action} from "@ember/object";
import {inject as service} from "@ember/service";
import discourseComputed from "discourse-common/utils/decorators";
import Badge from "discourse/models/badge";
import UserBadge from "discourse/models/user-badge";

export default Component.extend({
  router: service(),
  classNames: ['asktug-card', 'asktug-summary'],

  asktugCore: service('asktug-core'),
  summary: null,
  allBadges: [],

  @discourseComputed('userBadges')
  badges(userBadges) {
    return (userBadges ?? []).slice(0, 5);
  },

  @discourseComputed('userBadges')
  badges_count(userBadges) {
    return userBadges?.length ?? '-';
  },

  @discourseComputed('summary')
  topics_count() {
    return this.summary?.topic_count ?? '-';
  },

  @discourseComputed('summary')
  likes_count() {
    return this.summary?.likes_received ?? '-';
  },

  @discourseComputed('asktugCore.userPosts')
  posts_count(posts) {
    return posts?.page.totalElements ?? '-';
  },

  @discourseComputed('asktugCore.ssoMe')
  exp_number(ssoMe) {
    return ssoMe?.current_exps ?? '-';
  },

  @discourseComputed('asktugCore.ssoMe')
  rank_number(ssoMe) {
    return ssoMe?.current_rank ?? '-';
  },

  @discourseComputed('currentUser')
  home_url(currentUser) {
    return `https://tidb.io/u/${currentUser.username}/answer`;
  },

  @discourseComputed('currentUser.username')
  me_url(username) {
    return `/u/${username}`;
  },

  @action
  gotoMePage(event) {
    event.preventDefault();
    this.router.transitionTo("user.summary", this.currentUser.username);
  },

  items: [
    {
      icon: 'asktug-icon-topics',
      title: '帖子',
      key: 'topics_count',
    },
    {
      icon: 'asktug-icon-likes',
      title: '获赞',
      key: 'likes_count',
    },
    {
      icon: 'asktug-icon-posts',
      title: '文章',
      key: 'posts_count',
    },
    {
      icon: 'asktug-icon-exp',
      title: '经验值',
      key: 'exp_number',
    },
  ],

  didInsertElement() {
    this.loadAllBadges();
    if (this.currentUser) {
      this.reloadSummary();
      this.reloadUserBadges();
    }
  },

  loadAllBadges() {
    Badge.findAll().then(badges => {
      this.allBadges = badges.filter(b => b.enabled);
      this.notifyPropertyChange('allBadges');
    });
  },

  reloadUserBadges() {
    UserBadge.findByUsername(this.currentUser.username).then(res => {
      this.userBadges = res.map(({badge}) => badge);
      this.notifyPropertyChange('userBadges');
    });
  },

  reloadSummary() {
    this.currentUser.summary().then(summary => {
      this.summary = summary;
      this.notifyPropertyChange('summary');
    });
  },
});
