import {registerUnbound} from 'discourse-common/lib/helpers';

registerUnbound('blog-url', function (post) {
  return `https://tidb.net/blog/${post.slug}`;
});
