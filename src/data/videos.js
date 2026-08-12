/* Videos from the Nexp channel.
 *
 * To add one: open the video on YouTube, copy the part of the URL after
 * `watch?v=`, and drop it in below as { id, title }. Titles are stored exactly
 * as published — the lowercase look is done in CSS, so nothing here misquotes
 * a real title. Thumbnails come straight from i.ytimg.com, so there is no API
 * key and nothing to re-sync when a video is renamed.
 *
 * While this list is empty the whole section is hidden rather than rendered
 * blank, so an unpublished video never leaves a hole on the page.
 */

export const YOUTUBE_CHANNEL = 'https://www.youtube.com/@Nexp';

export const VIDEOS = [
  // Waiting on the "Free Trial Boyfriend" upload — it is not on the channel
  // yet, and a made-up id would render a dead thumbnail and a broken player.
  // { id: 'PASTE_ID_HERE', title: 'Free Trial Boyfriend' },
];

/* Previously featured, removed in favour of a single brand video. Kept here
   because the ids are tedious to look up again:
   { id: 'lld4gjfk_8E', title: 'This Is How You Ruin Friendships in Fortnite 💔' }
   { id: 'qUmochF308c', title: 'You’ll Lose Braincells Watching This Video' }
   { id: 'BGh6_OAbMa4', title: 'This Got Me Canceled in 18 Minutes' } */

export const thumbFor = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/* youtube-nocookie, and only ever loaded after a click. A normal youtube.com
   embed drops tracking cookies the moment the page renders, which would make
   the "no third-party advertising trackers" line in our privacy policy false. */
export const embedFor = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
