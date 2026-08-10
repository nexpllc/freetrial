/* Community wall — real customer photos, and nothing else.
 *
 * This shipped with six invented handles and invented locations. A wall of
 * made-up customers is the same problem as made-up reviews, so it is empty
 * until real submissions arrive through the form.
 *
 * Add them as { id, handle, loc, image } with the file in public/spotted/.
 * The wall renders itself once there is anything in here; while it is empty
 * the section shows the call for photos instead of a grid of placeholders.
 */

export const SPOTTED = [];
