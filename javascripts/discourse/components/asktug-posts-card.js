import Component from "@ember/component";
import {service} from "@ember/service";
import discourseComputed from "discourse-common/utils/decorators";

export default class extends Component {
  @service router;
  @service('asktug-core') asktugCore;
  classNames = ['asktug-card', 'asktug-posts'];

  @discourseComputed("asktugCore.posts")
  posts_list(posts) {
    return (posts?.content ?? []).slice(0, 10);
  }
};
