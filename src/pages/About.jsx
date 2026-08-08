import CrossSell from '../components/CrossSell';
import Signup from '../components/Signup';

export default function About({ brand, onSwitch }) {
  return (
    <>
      <section className="sec">
        <div className="prose">
          <h1>about</h1>
          <p className="lede">{brand.aboutLede}</p>
          {brand.about.map((para) => <p key={para}>{para}</p>)}

          <h4>how it's made</h4>
          <p>240gsm ringspun cotton, boxy relaxed cut, printed and shipped from cape coral, florida. every order comes with the insert card and the hang tag, because the packaging is half the joke.</p>

          <h4>who's behind it</h4>
          <p>a nexp brand. one person, a heat press, and a group chat that wouldn't let the idea die.</p>
        </div>
      </section>
      <CrossSell brand={brand} onSwitch={onSwitch} />
      <Signup />
    </>
  );
}
