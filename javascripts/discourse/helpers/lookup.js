import {registerUnbound} from 'discourse-common/lib/helpers';

registerUnbound('lookup', function (obj, key) {
  return obj?.[key];
});
