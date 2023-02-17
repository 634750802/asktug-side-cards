/**
 *
 * @param {Response} resp
 */
export function transformResponse(resp) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
