import { useEffect, useState, type FormEvent } from 'react';
import { productsBySlug, type Product, type AffiliateLink } from '../data/products';

/* ─────────────────────────── Types & constants ────────────────────────── */

type Step =
  | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6'
  | 'calculating' | 'results';

type Volume    = '1-2' | '3-4' | '5+';
type Household = 'just-me' | 'two-person' | 'entertain';
type Counter   = 'tight' | 'normal' | 'plenty';
type HandsOn   = 'one-touch' | 'semi-auto' | 'full-manual';
type Filter    = 'espresso-only' | 'both';

interface Answers {
  volume?:    Volume;
  household?: Household;
  budget?:    number;
  counter?:   Counter;
  handsOn?:   HandsOn;
  filter?:    Filter;
}

interface Option<T extends string> {
  label: string;
  value: T;
  hint:  string;   // marginalia shown on hover, italic display-serif
}

const BUDGET_STOPS  = [300, 500, 750, 1000, 1500, 2000, 3000, 3500];
const BUDGET_LABELS = ['$300', '$500', '$750', '$1,000', '$1,500', '$2,000', '$3,000', '$3,500+'];
const DEFAULT_BUDGET_INDEX = 3; // $1,000

const PLACEHOLDER = {
  editorialPick:  'profitec-go',
  alsoConsider:   ['breville-bambino-plus', 'lelit-anna'],
  grinder:        'eureka-mignon-silenzio',
  scale:          'acaia-lunar',
  pitcher:        'motta-europa-pitcher',
  cleaning:       'urnex-cafiza-tabs',
} as const;

const PLACEHOLDER_DEK =
  'A rare combination at this price: PID precision, café-grade steam pressure, ' +
  'and a footprint that respects a kitchen counter. Pulls and steams in the same ' +
  'short workflow most home setups can sustain.';

const ALSO_CONSIDER_RATIONALES: Record<string, string> = {
  'breville-bambino-plus':
    "If your budget is tighter and you're newer to milk work, this is where to start — three-second heat-up, real microfoam capability, no learning cliff.",
  'lelit-anna':
    "If you'd rather skip the modifications a Gaggia eventually invites, the Anna is the step up — PID stability and a steam wand that works out of the box.",
};

/* ─────────────────────────── Hash routing ─────────────────────────────── */

function readHash(): Step {
  if (typeof window === 'undefined') return 'q1';
  const h = window.location.hash.replace('#', '');
  if (h === 'results' || h === 'calculating') return h;
  if (/^q[1-6]$/.test(h)) return h as Step;
  return 'q1';
}

function setHash(step: Step) {
  if (typeof window === 'undefined') return;
  if (window.location.hash !== `#${step}`) {
    window.location.hash = `#${step}`;
  }
}

/* ─────────────────────────── Main component ───────────────────────────── */

export default function RecommendTool() {
  const [step,    setStep]    = useState<Step>('q1');
  const [answers, setAnswers] = useState<Answers>({});
  const [hint,    setHint]    = useState<string | null>(null);

  useEffect(() => {
    setStep(readHash());
    const onHash = () => setStep(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Reset hovered hint when step changes
  useEffect(() => { setHint(null); }, [step]);

  // Calculating → results
  useEffect(() => {
    if (step !== 'calculating') return;
    const t = window.setTimeout(() => setHash('results'), 1500);
    return () => window.clearTimeout(t);
  }, [step]);

  function choose<K extends keyof Answers>(key: K, val: Answers[K], next: Step) {
    setAnswers(a => ({ ...a, [key]: val }));
    window.setTimeout(() => setHash(next), 200);
  }

  function restart() {
    setAnswers({});
    setHash('q1');
  }

  if (step === 'calculating') return <Calculating />;
  if (step === 'results')     return <Results answers={answers} onRestart={restart} />;

  /* ── Question screens ─────────────────────────────────────────────── */

  let body: React.ReactNode = null;

  switch (step) {
    case 'q1': {
      const opts: Option<Volume>[] = [
        { label: '1–2',       value: '1-2', hint: '→ A single boiler stays in scope.' },
        { label: '3–4',       value: '3-4', hint: '→ Heat-recovery starts to matter.' },
        { label: '5 or more', value: '5+',  hint: '→ Dual-boiler territory.' },
      ];
      body = (
        <QuestionShell index={1} onBack={null} hint={hint}>
          <Heading>How many cappuccinos do you make on a typical day?</Heading>
          <OptionList
            options={opts}
            selected={answers.volume}
            onSelect={(v) => choose('volume', v, 'q2')}
            onHover={setHint}
          />
        </QuestionShell>
      );
      break;
    }

    case 'q2': {
      const opts: Option<Household>[] = [
        { label: 'Just me',              value: 'just-me',    hint: '→ Single-shot reliability.' },
        { label: 'Two-person household', value: 'two-person', hint: '→ Back-to-back capability.' },
        { label: 'I entertain often',    value: 'entertain',  hint: '→ Steam capacity becomes the constraint.' },
      ];
      body = (
        <QuestionShell index={2} onBack={() => setHash('q1')} hint={hint}>
          <Heading>Just for you, or for others too?</Heading>
          <OptionList
            options={opts}
            selected={answers.household}
            onSelect={(v) => choose('household', v, 'q3')}
            onHover={setHint}
          />
        </QuestionShell>
      );
      break;
    }

    case 'q3':
      body = (
        <QuestionShell index={3} onBack={() => setHash('q2')} hint={hint}>
          <Heading>What&rsquo;s your budget for the machine itself?</Heading>
          <Sub>Plan on a separate grinder &mdash; we&rsquo;ll cover that.</Sub>
          <BudgetSlider
            initialIndex={
              typeof answers.budget === 'number'
                ? Math.max(0, BUDGET_STOPS.indexOf(answers.budget))
                : DEFAULT_BUDGET_INDEX
            }
            onContinue={(idx) => choose('budget', BUDGET_STOPS[idx], 'q4')}
          />
        </QuestionShell>
      );
      break;

    case 'q4': {
      const opts: Option<Counter>[] = [
        { label: 'Tight — every inch counts', value: 'tight',  hint: '→ Compact prosumer territory.' },
        { label: 'Normal kitchen',            value: 'normal', hint: '→ Most options open.' },
        { label: 'Plenty',                    value: 'plenty', hint: '→ Footprint stops being a filter.' },
      ];
      body = (
        <QuestionShell index={4} onBack={() => setHash('q3')} hint={hint}>
          <Heading>How much counter space can you give it?</Heading>
          <OptionList
            options={opts}
            selected={answers.counter}
            onSelect={(v) => choose('counter', v, 'q5')}
            onHover={setHint}
          />
        </QuestionShell>
      );
      break;
    }

    case 'q5': {
      const opts: Option<HandsOn>[] = [
        { label: 'One-touch automatic — I just want a cappuccino',       value: 'one-touch',   hint: '→ Super-automatic territory.' },
        { label: "Semi-automatic — I'll learn the craft, within reason", value: 'semi-auto',   hint: '→ The classic enthusiast bracket.' },
        { label: 'Full manual — I want control over every variable',     value: 'full-manual', hint: '→ Lever or fully-manual prosumer.' },
      ];
      body = (
        <QuestionShell index={5} onBack={() => setHash('q4')} hint={hint}>
          <Heading>How hands-on do you want to be?</Heading>
          <OptionList
            options={opts}
            selected={answers.handsOn}
            onSelect={(v) => choose('handsOn', v, 'q6')}
            onHover={setHint}
          />
        </QuestionShell>
      );
      break;
    }

    case 'q6': {
      const opts: Option<Filter>[] = [
        { label: 'No, espresso drinks only', value: 'espresso-only', hint: '→ Single-purpose espresso.' },
        { label: 'Yes, both',                value: 'both',          hint: '→ Combo or hybrid setups.' },
      ];
      body = (
        <QuestionShell index={6} onBack={() => setHash('q5')} hint={hint}>
          <Heading>Do you also want to make filter coffee on this machine?</Heading>
          <OptionList
            options={opts}
            selected={answers.filter}
            onSelect={(v) => choose('filter', v, 'calculating')}
            onHover={setHint}
          />
        </QuestionShell>
      );
      break;
    }
  }

  return <div key={step} className="step-fade">{body}</div>;
}

/* ─────────────────────────── Shared UI pieces ─────────────────────────── */

type Stage = 'setup' | 'budget' | 'match';

function QuestionShell({
  index,
  total = 6,
  children,
  onBack,
  hint,
}: {
  index: number;
  total?: number;
  children: React.ReactNode;
  onBack: (() => void) | null;
  hint: string | null;
}) {
  const stage: Stage = index <= 2 ? 'setup' : index <= 4 ? 'budget' : 'match';
  const ORDINAL = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six'];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">

      {/* Main 12-col grid */}
      <div className="grid grid-cols-12 gap-x-6 max-w-6xl mx-auto w-full px-6 pt-[14vh] flex-1">

        {/* Hairline rule across cols 3–12 */}
        <div className="col-start-3 col-end-13 row-start-1 h-px bg-espresso/15 self-start" />

        {/* Vertical word-form kicker */}
        <div
          className="col-start-1 col-end-3 row-start-2 mt-3 self-start justify-self-start [writing-mode:vertical-rl] [transform:rotate(180deg)] origin-center small-caps font-display text-caption text-espresso/55 tracking-[0.22em] whitespace-nowrap not-italic"
        >
          {ORDINAL[index]} of Six
        </div>

        {/* Question content cols 3–9 */}
        <div className="col-start-3 col-end-10 row-start-2 pt-10">
          {children}
        </div>

        {/* Right margin: hint + step indicator */}
        <div className="col-start-10 col-end-13 row-start-2 pt-10 justify-self-end flex flex-col items-end gap-12 min-w-[160px]">
          <div className="h-12 text-right">
            {hint && (
              <p key={hint} className="step-fade font-display italic text-lead text-walnut leading-[1.25] max-w-[18ch]">
                {hint}
              </p>
            )}
          </div>
          <StepIndicator current={stage} />
        </div>

      </div>

      <RunningFoot index={index} total={total} onBack={onBack} />

    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-h2 lg:text-h1 text-ink leading-[0.98] mb-6 -tracking-[0.01em]">
      {children}
    </h2>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-small text-walnut italic mb-12 max-w-[42ch]">
      {children}
    </p>
  );
}

function OptionList<T extends string>({
  options,
  selected,
  onSelect,
  onHover,
}: {
  options: Option<T>[];
  selected: T | undefined;
  onSelect: (v: T) => void;
  onHover: (hint: string | null) => void;
}) {
  return (
    <ol className="list-none m-0 p-0 mt-14 border-t border-espresso/15">
      {options.map(({ label, value, hint }) => {
        const isSelected = selected === value;
        return (
          <li
            key={value}
            className="border-b border-espresso/15 hover:border-espresso/40 transition-colors duration-150"
            onMouseEnter={() => onHover(hint)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(hint)}
            onBlur={() => onHover(null)}
          >
            <button
              type="button"
              onClick={() => onSelect(value)}
              className="group flex items-baseline w-full text-left min-h-16 py-4"
            >
              <span
                className={
                  'font-body text-lead flex-1 transition-colors duration-150 ' +
                  (isSelected
                    ? 'text-espresso'
                    : 'text-espresso/80 group-hover:text-espresso')
                }
              >
                {label}
              </span>
              {isSelected && (
                <span className="small-caps font-body text-micro text-ember tracking-[0.32em] ml-4 whitespace-nowrap">
                  &rarr; next
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Step indicator ────────────────────────────────────────────────────── */

const STAGES: { key: Stage; label: string }[] = [
  { key: 'setup',  label: 'Setup'  },
  { key: 'budget', label: 'Budget' },
  { key: 'match',  label: 'Match'  },
];

function StepIndicator({ current }: { current: Stage }) {
  return (
    <ol className="list-none m-0 p-0 space-y-2 text-right">
      {STAGES.map((s) => {
        const isCurrent = s.key === current;
        const tone = isCurrent ? 'text-espresso' : 'text-espresso/30';
        return (
          <li key={s.key} className={tone}>
            <span className="font-display italic text-small leading-none">
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Running foot ──────────────────────────────────────────────────────── */

function RunningFoot({
  index,
  total,
  onBack,
}: {
  index: number;
  total: number;
  onBack: (() => void) | null;
}) {
  const idx2   = String(index).padStart(2, '0');
  const total2 = String(total).padStart(2, '0');
  return (
    <div className="border-t border-espresso/30 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-3 small-caps font-body text-micro text-espresso/65 tracking-[0.32em]">
        <div className="text-left">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="hover:text-ink transition-colors duration-150"
            >
              &larr; Back
            </button>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
        <div className="text-center tnum">
          Question {idx2} &thinsp;of&thinsp; {total2}
        </div>
        <div className="text-right">
          cappuccino.io
        </div>
      </div>
    </div>
  );
}

function BudgetSlider({
  initialIndex,
  onContinue,
}: {
  initialIndex: number;
  onContinue: (idx: number) => void;
}) {
  const [idx, setIdx] = useState(initialIndex);
  return (
    <div className="mt-12">
      <p className="font-display text-display text-ink mb-12 leading-[0.9] -tracking-[0.02em] tnum">
        {BUDGET_LABELS[idx]}
      </p>
      <input
        type="range"
        min={0}
        max={BUDGET_STOPS.length - 1}
        step={1}
        value={idx}
        onChange={(e) => setIdx(Number(e.target.value))}
        className="range-editorial"
        aria-label="Budget"
      />
      <div className="flex justify-between mt-4 small-caps font-body text-micro text-espresso/45 tracking-[0.28em] tnum">
        <span>$300</span>
        <span>$3,500+</span>
      </div>
      <div className="mt-16">
        <button
          type="button"
          onClick={() => onContinue(idx)}
          className="group inline-flex items-baseline gap-3"
        >
          <span className="font-display italic text-h3 text-ink group-hover:text-ember transition-colors duration-150 leading-none">
            Continue
          </span>
          <span className="font-body text-h4 text-walnut group-hover:text-ember transition-colors duration-150 leading-none">
            &rarr;
          </span>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── Calculating state ────────────────────────── */

function Calculating() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-32 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <p className="font-display italic text-h3 text-ink leading-[1.1] max-w-[28ch]">
        Matching your answers to ten machines we trust.
      </p>
      <span className="pulse-dot mt-10" aria-hidden="true" />
    </div>
  );
}

/* ─────────────────────────── Results ──────────────────────────────────── */

function primaryLink(p: Product): AffiliateLink | undefined {
  return p.affiliateLinks[0];
}

function altLink(p: Product): AffiliateLink | undefined {
  return p.affiliateLinks[1];
}

function Results({
  answers,
  onRestart,
}: {
  answers: Answers;
  onRestart: () => void;
}) {
  const pick      = productsBySlug[PLACEHOLDER.editorialPick];
  const consider  = PLACEHOLDER.alsoConsider.map((s) => productsBySlug[s]);
  const grinder   = productsBySlug[PLACEHOLDER.grinder];
  const scale     = productsBySlug[PLACEHOLDER.scale];
  const pitcher   = productsBySlug[PLACEHOLDER.pitcher];
  const cleaning  = productsBySlug[PLACEHOLDER.cleaning];

  return (
    <div className="max-w-4xl mx-auto px-6 pt-20 md:pt-28 pb-24">

      <section>
        <p className="small-caps font-body text-caption text-ember tracking-[0.32em] mb-6">
          Editorial pick
        </p>
        <h2 className="font-display text-h1 text-ink leading-[0.98] mb-6 -tracking-[0.015em]">
          {pick.brand} {pick.name}
        </h2>
        <p className="font-display italic text-h4 text-walnut leading-[1.3] max-w-[40ch] mb-8">
          {PLACEHOLDER_DEK}
        </p>
        <p className="small-caps font-body text-caption text-espresso/55 tracking-[0.28em] mb-8 tnum">
          {pick.priceRange}&ensp;&middot;&ensp;{pick.category}&ensp;&middot;&ensp;{pick.cappuccinoRating}/10 cappuccino
        </p>
        <RetailerLinks product={pick} />
      </section>

      <section className="mt-20 border-t border-espresso/[0.12] pt-14">
        <div className="bg-cream/60 px-7 py-9 md:px-10 md:py-12">
          <p className="small-caps font-body text-caption text-espresso/65 tracking-[0.32em] mb-4">
            Featured partner &mdash; paid placement
          </p>
          <p className="font-body text-body text-walnut leading-relaxed mb-6 max-w-[52ch]">
            We&rsquo;re selecting our first featured partner for this segment.
            Brands:&ensp;
            <a
              href="/sponsor"
              className="text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-ink/70 transition-colors duration-150"
            >
              Get featured&thinsp;&rarr;
            </a>
          </p>
        </div>
      </section>

      <section className="mt-20 border-t border-espresso/[0.12] pt-14">
        <p className="small-caps font-body text-caption text-espresso/55 tracking-[0.32em] mb-10">
          Also worth considering
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {consider.map((p) => (
            <div key={p.slug}>
              <p className="small-caps font-body text-caption text-espresso/45 tracking-[0.28em] mb-2">
                {p.brand}
              </p>
              <h3 className="font-display text-h3 text-ink mb-4 leading-[1.05]">
                {p.name}
              </h3>
              <p className="font-body text-small text-walnut leading-[1.55] mb-5 max-w-[50ch]">
                {ALSO_CONSIDER_RATIONALES[p.slug] ?? p.whoItsFor}
              </p>
              {primaryLink(p) && (
                <a
                  href={primaryLink(p)!.url}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  className="font-body text-small text-espresso underline underline-offset-4 decoration-espresso/30 hover:text-ink hover:decoration-ink/60 transition-colors duration-150"
                >
                  See at {primaryLink(p)!.retailer}&thinsp;&rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 border-t border-espresso/[0.12] pt-14">
        <h2 className="font-display text-h2 text-ink mb-12 leading-[1.02]">
          What you&rsquo;ll also need
        </h2>
        <div className="space-y-12">
          <Subrec label="Grinder"      note="Buy as much grinder as you can — it matters more than the machine for cappuccino consistency."         product={grinder}  />
          <Subrec label="Scale"        note="Yield by weight, not eye. Removes the largest source of shot-to-shot variance."                       product={scale}    />
          <Subrec label="Milk pitcher" note="The right pitcher shape is the difference between airy foam and microfoam."                            product={pitcher}  />
          <Subrec label="Cleaning"     note="Backflush weekly. Skip this and the espresso quality will drift before you notice."                    product={cleaning} />
        </div>
      </section>

      <section className="mt-24 border-t border-espresso/[0.12] pt-14">
        <p className="font-body text-body text-walnut leading-relaxed mb-8 max-w-[54ch]">
          Email these recommendations to yourself, plus the comparison notes
          that didn&rsquo;t fit on this page.
        </p>
        <SaveForm />
      </section>

      <section className="mt-24 text-center">
        <p className="font-body text-small text-espresso/55">
          Different setup in mind?&ensp;
          <button
            type="button"
            onClick={onRestart}
            className="text-espresso underline underline-offset-4 decoration-espresso/30 hover:text-ink hover:decoration-ink/60 transition-colors duration-150"
          >
            Start over
          </button>
        </p>
      </section>

    </div>
  );
}

function RetailerLinks({ product }: { product: Product }) {
  const primary = primaryLink(product);
  const alt     = altLink(product);
  if (!primary) return null;
  return (
    <div className="space-y-4">
      <a
        href={primary.url}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="inline-block font-display italic text-h3 text-ink hover:text-ember transition-colors duration-150 leading-none"
      >
        See {product.brand} {product.name} at {primary.retailer}&thinsp;&rarr;
      </a>
      {alt && (
        <div>
          <a
            href={alt.url}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="font-body text-small text-walnut underline underline-offset-4 decoration-walnut/30 hover:text-ink hover:decoration-ink/55 transition-colors duration-150"
          >
            View at {alt.retailer}
          </a>
        </div>
      )}
    </div>
  );
}

function Subrec({
  label,
  note,
  product,
}: {
  label: string;
  note: string;
  product: Product;
}) {
  const link = primaryLink(product);
  return (
    <div>
      <p className="small-caps font-body text-caption text-espresso/55 tracking-[0.32em] mb-3">
        {label}
      </p>
      <p className="font-body text-small text-walnut leading-relaxed mb-4 max-w-[54ch]">
        {note}
      </p>
      <p className="font-body text-body text-espresso">
        <span className="text-espresso/55">{product.brand}&ensp;</span>
        <span className="font-display text-lead text-ink">{product.name}</span>
        <span className="text-espresso/55 tnum">&ensp;&middot;&ensp;{product.priceRange}</span>
      </p>
      {link && (
        <a
          href={link.url}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="inline-block mt-3 font-body text-small text-espresso underline underline-offset-4 decoration-espresso/30 hover:text-ink hover:decoration-ink/60 transition-colors duration-150"
        >
          See at {link.retailer}&thinsp;&rarr;
        </a>
      )}
    </div>
  );
}

function SaveForm() {
  const [email, setEmail] = useState('');
  const [sent,  setSent]  = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  if (sent) {
    return (
      <p className="font-body text-small text-walnut">
        On its way. Check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm">
      <label htmlFor="save-email" className="sr-only">Email address</label>
      <input
        id="save-email"
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="w-full font-body text-body text-espresso bg-transparent border-0 border-b border-espresso/35 focus:border-ink focus:outline-none pb-2 placeholder:text-espresso/30 transition-colors duration-150"
      />
    </form>
  );
}
