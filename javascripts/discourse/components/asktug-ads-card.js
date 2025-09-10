import Component from "@ember/component";
import {service} from "@ember/service";
import discourseComputed from "discourse-common/utils/decorators";

export default class extends Component {
  @service router;
  @service('asktug-core') asktugCore;
  classNames = ['asktug-card', 'asktug-ads'];

  @discourseComputed("asktugCore.config")
  banner(config) {
    return config?.data?.banner;
  }
};
