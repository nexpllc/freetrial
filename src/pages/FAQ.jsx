import CrossSell from '../components/CrossSell';
import Signup from '../components/Signup';

export default function FAQ({ brand, onSwitch }) {
  return (
    <>
      <section className="sec">
        <div className="prose">
          <h1>faq</h1>
          <p className="lede">questions, answered like terms nobody wrote for lawyers.</p>

          <h4>is this a real subscription?</h4>
          <p>no. it's a t-shirt. you pay once, you keep it, nothing renews and nothing charges you again. the joke is the joke.</p>

          <h4>what's the difference between the two sides?</h4>
          <p>same shirts, same cotton, different punchlines. the {brand.word} side is the one you're on now — hit the switch up top to see the other. you can mix both in one cart and it ships as one order.</p>

          <h4>how does it fit?</h4>
          <p>boxy and relaxed, unisex sizing. true to size for the intended look, size down if you want it fitted. chest in inches: S 20 / M 21.5 / L 23 / XL 24.5. 240gsm ringspun cotton, pre-shrunk.</p>

          <h4>how long is shipping?</h4>
          <p>printed and shipped from cape coral, florida. 3–5 business days to print, then standard post. free over $60.</p>

          <h4>can i return it?</h4>
          <p>30 days, unworn and unwashed. reply to your order email and we'll send a label. no exit interview.</p>

          <h4>how do i wash it?</h4>
          <p>cold wash, low tumble dry, no bleach, don't iron directly on the print.</p>

          <h4>do you do the matching pair?</h4>
          <p>yes — one from each side is the two for $50 bundle. that's the whole reason the switch exists.</p>
        </div>
      </section>
      <CrossSell brand={brand} onSwitch={onSwitch} />
      <Signup />
    </>
  );
}
