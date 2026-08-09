/* Legal docs for the free trial line, operating on shopnexp.com.
 *
 * Adapted from the Shop Nexp versions. Where the two disagreed, the copy the
 * customer actually reads on this site wins — so returns are 30 days here, not
 * the 14 the nexp docs specified, because the product pages and FAQ promise 30.
 * If you change a window in one place, change it in both. */

export const CONTACT_EMAIL = 'contact@shopnexp.com';

export const LEGAL = {
  privacy: {
    title: 'privacy policy',
    updated: 'last updated: august 8, 2026',
    body: [
      ['who we are', `free trial is a brand operated by Nexp LLC, which runs shopnexp.com. Questions about this policy: ${CONTACT_EMAIL}.`],
      ['what we collect', "Email address — only if you join the list, via the signup form or the popup. Order information — name, shipping address, and email when you buy, collected and processed by Shopify, our checkout provider. Payment details — never seen or stored by us; card processing happens entirely on Shopify's PCI-compliant systems. Device storage — your cart contents and small preferences (like whether you've already seen the signup popup) are saved in your own browser, on your device. That data never reaches us and we cannot read it."],
      ["what we don't do", "We don't sell your data. We don't buy data about you. We don't run third-party advertising trackers on this site."],
      ['analytics', 'We use privacy-friendly, cookieless analytics to count visits and pages viewed. It does not identify you personally and does not track you across other websites.'],
      ['emails', 'If you join the list, we send drop announcements and early access notices. Every email has an unsubscribe link. Unsubscribing is instant and permanent.'],
      ['photo submissions', `If you send us a photo through the spotted form, we keep your handle, the link you sent, and your email if you gave one, so we can credit you and reply. Ask us to delete it at ${CONTACT_EMAIL} and we will.`],
      ['your rights', `You can ask us to show you, correct, or delete any personal data we hold about you at any time by emailing ${CONTACT_EMAIL}. If you're in the EU/UK or California, you have additional statutory rights (GDPR/CCPA) which we honor.`],
      ['minors', 'This store is not directed at children under 13, and we do not knowingly collect their data.'],
      ['changes', "If this policy changes materially, we'll update the date above and note it on the site."],
    ],
  },

  terms: {
    title: 'terms of service',
    updated: 'last updated: august 8, 2026',
    body: [
      ['the basics', "By using this site or buying from it, you agree to these terms. If you don't agree, don't use the site."],
      ['it is a t-shirt', 'Nothing on this site is a subscription. The trial framing is a joke printed on cotton. You pay once, you keep the shirt, nothing renews, and nothing charges you again. No product here creates any ongoing obligation for anyone, and no product is a person or a service.'],
      ['products & availability', 'Pieces are produced to order rather than pulled from warehouse stock. Quantities and sizes shown are accurate at page load, but adding to cart does not reserve an item. Runs are produced once; a sold-out item returning is a possibility, not a promise.'],
      ['pricing & payment', 'Prices are in USD and may change between drops. Payment is processed by Shopify. Your order is confirmed when you receive the confirmation email, not when you tap checkout.'],
      ['the pair discount', "One lockup tee from each side in the same cart takes $10 off, applied automatically. It can't be combined with other codes, applied retroactively, or exchanged for cash. We can withdraw it at any time for future orders."],
      ['intellectual property', 'All designs, brand names, phrases, and site content are the property of Nexp LLC. Buying a product gives you the product — not a license to reproduce the designs. Bootlegs will be pursued.'],
      ['acceptable use', "Don't attempt to break, scrape, spam, or exploit the site or its discount logic. We may refuse or cancel orders that show signs of fraud or abuse, with a full refund."],
      ['photos & user content', `If you send us a photo, tag us, or use our hashtag in a public post, you grant Nexp LLC a non-exclusive, worldwide, royalty-free license to repost and display that content — including your handle — on this website, our social channels, and our marketing. We always credit the original poster. Want your photo taken down? Email ${CONTACT_EMAIL} and it comes down, no questions asked.`],
      ['liability', 'To the maximum extent permitted by law, our liability for any claim related to a purchase is limited to the amount you paid for that purchase. Products are provided as described; normal garment care applies.'],
      ['disputes', `These terms are governed by the laws of the State of Florida, USA. We'll always try to fix problems directly first — email ${CONTACT_EMAIL} before anything else.`],
    ],
  },

  shipping: {
    title: 'shipping & returns',
    updated: 'last updated: august 8, 2026',
    body: [
      ['made to order', "Each piece is printed after you order it rather than pulled from stock — that's what keeps runs small. Printing takes 3–5 business days before shipping begins. You get a tracking link by email the moment it leaves production."],
      ['where it ships from', 'Printed and shipped from Cape Coral, Florida.'],
      ['delivery', 'After printing: US delivery usually takes 4–10 business days. International delivery typically takes 10–30 business days depending on destination and customs. All timeframes are estimates, not guarantees — carriers and customs are outside our control.'],
      ['shipping costs', 'Free standard shipping on US orders over $60. Under that, and for international destinations, shipping is calculated at checkout based on destination.'],
      ['customs & duties', "International orders may be charged import duties or taxes by your own country. Those are set by your government, not us, and are the buyer's responsibility."],
      ['returns & exchanges', `Unworn, unwashed items can be returned or exchanged within 30 days of delivery. Reply to your order email or write to ${CONTACT_EMAIL} with your order number and we'll send a label. No notice period, no exit interview. Exchanges depend on remaining stock, so a different size is first-come, first-served.`],
      ['refunds', 'Approved refunds go back to your original payment method within 5–10 business days of us receiving the return. Original shipping costs are non-refundable unless we made the error.'],
      ['damaged or wrong items', `If we messed up — wrong item, defect, damage in transit — email a photo to ${CONTACT_EMAIL} within 7 days of delivery and we'll make it right at no cost to you. That one's on us.`],
      ['final sale', "Anything marked final sale can't be returned."],
    ],
  },
};
