import Component from "@ember/component";
import {service} from "@ember/service";
import discourseComputed from "discourse-common/utils/decorators";
import {transformResponse} from "../utils/fetch";

export default class extends Component {
  @service router;
  @service('asktug-core') asktugCore;
  classNames = ['asktug-card', 'asktug-ranking'];


  top = null;

  @discourseComputed("top")
  users_list(top) {
    return top;
  }

  @discourseComputed("asktugCore.ssoMe", "currentUser")
  me(ssoMe, currentUser) {
    if (!currentUser) {
      return null;
    }
    return {
      ranking: ssoMe?.current_rank,
      username: currentUser?.username,
      exp: ssoMe?.current_exps,
    };
  }

  @discourseComputed("users_list", "currentUser.username")
  has_me(users, username) {
    return users?.find(({ user }) => user.username === username);
  }

  didInsertElement() {
    this.reloadPosts();
  }

  reloadPosts() {
    fetch('/_/sso/api/points/top?period=weekly&limit=10').then(transformResponse).then(top => {
      this.top = top.data;
      this.notifyPropertyChange('top');
    });
  }
};
