import Component from "@ember/component";
import {inject as service} from "@ember/service";
import discourseComputed from "discourse-common/utils/decorators";

export default Component.extend({
  router: service(),
  classNames: ['asktug-card', 'asktug-posts'],

  asktugCore: service('asktug-core'),

  @discourseComputed("asktugCore.posts")
  posts_list(posts) {
    return (posts?.content ?? []).slice(0, 10);
  },
});
