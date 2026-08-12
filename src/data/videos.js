/* Videos from the Nexp channel.
 *
 * Titles are stored exactly as published — the lowercase look is done in CSS,
 * so nothing here misquotes a real video title. Add a new one by pasting the
 * id from its watch URL (youtube.com/watch?v=THIS_PART).
 *
 * Thumbnails come straight from img.youtube.com, so there is no API key and
 * nothing to keep in sync when a video is renamed.
 */

export const YOUTUBE_CHANNEL = 'https://www.youtube.com/@Nexp';

export const VIDEOS = [
  { id: 'lld4gjfk_8E', title: 'This Is How You Ruin Friendships in Fortnite 💔' },
  { id: 'qUmochF308c', title: 'You’ll Lose Braincells Watching This Video' },
  { id: 'BGh6_OAbMa4', title: 'This Got Me Canceled in 18 Minutes' },
];

export const thumbFor = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/* youtube-nocookie, and only ever loaded after a click. A normal youtube.com
   embed drops tracking cookies the moment the page renders, which would make
   the "no third-party advertising trackers" line in our privacy policy false. */
export const embedFor = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
