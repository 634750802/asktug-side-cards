import Component from "@ember/component";
import {and} from "@ember/object/computed";
import {inject as service} from "@ember/service";
import discourseComputed, {observes} from "discourse-common/utils/decorators";

export default Component.extend({
  router: service(),
  classNames: ['asktug-side'],

  @discourseComputed
  activeRoutes() {
    return new RegExp(`^discovery\.(latest|top|new)$`);
  },

  @discourseComputed("router.currentRouteName")
  displayForRoute(currentRouteName) {
    return this.activeRoutes.test(currentRouteName) && currentRouteName !== 'discovery.categories';
  },

  @discourseComputed("currentUser")
  displaySummaryCard(currentUser) {
    return !!currentUser;
  },

  @and("displayForRoute")
  shouldDisplay: null,

  // Setting a class on <html> from a component is not great
  // but we need it for backwards compatibility
  @observes("shouldDisplay")
  displayChanged() {
    document.documentElement.classList.toggle(
      "display-asktug-side",
      this.shouldDisplay
    );
  },

  didInsertElement() {
    this.displayChanged();
  },

});
