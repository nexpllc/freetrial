export default function PlanList({ brand }) {
  return (
    <section className="plan">
      <div className="plan-in">
        <h3>what's included in the trial</h3>
        <ul>
          {brand.plan.map(([feature, status]) => (
            <li key={feature} className={status === 'coming soon' ? 'off' : undefined}>
              {feature} <em>{status}</em>
            </li>
          ))}
        </ul>
        <div className="note">features may change without notice. no refunds after day 7.</div>
      </div>
    </section>
  );
}
