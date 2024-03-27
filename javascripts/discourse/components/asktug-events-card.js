import Component from "@ember/component";
import {inject as service} from "@ember/service";
import discourseComputed from "discourse-common/utils/decorators";

export default class extends Component {
  @service('asktug-core') asktugCore;
  classNames = ['asktug-card', 'asktug-events'];

  @discourseComputed("asktugCore.events")
  events_list(events) {
    return (events ?? []).sort((a, b) => {
      return (new Date(b.date)).getTime() - (new Date(a.date)).getTime();
    }).slice(0, 2).map(event => {
      const [, month, day] = event.date.split('-');
      return {
        month: parseInt(month, 10),
        day: parseInt(day, 10),
        ...event,
      };
    });
  }
};
