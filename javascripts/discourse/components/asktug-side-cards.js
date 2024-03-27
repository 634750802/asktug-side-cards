import {observes} from "@ember-decorators/object";
import Component from "@ember/component";
import {and} from "@ember/object/computed";
import {service} from "@ember/service";
import discourseComputed from "discourse-common/utils/decorators";

export default class extends Component {
  @service router;
  classNames = ['asktug-side'];

  @and("displayForRoute")
  shouldDisplay = null;

  @discourseComputed
  activeRoutes() {
    return new RegExp(`^discovery\.(latest|top|new)$`);
  }

  @discourseComputed("router.currentRouteName")
  displayForRoute(currentRouteName) {
    return this.activeRoutes.test(currentRouteName) && currentRouteName !== 'discovery.categories';
  }

  @discourseComputed("currentUser")
  displaySummaryCard(currentUser) {
    return !!currentUser;
  }

  // Setting a class on <html> from a component is not great
  // but we need it for backwards compatibility
  @observes("shouldDisplay")
  displayChanged() {
    console.log(this.activeRoutes, this.displayForRoute, this.shouldDisplay);
    document.documentElement.classList.toggle(
      "display-asktug-side",
      this.shouldDisplay
    );
  }

  didInsertElement() {
    this.displayChanged();
  }

};
