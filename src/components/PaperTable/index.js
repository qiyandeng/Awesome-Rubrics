import {useState, useMemo, useRef, useEffect} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const COLOR_MAP = {
  'Rubric as Reward':   'blue',
  'Rubric as Feedback': 'sky',
  'Rubric Generator':   'amber',
  'Rubric Select Ans':  'teal',
  'Generate DPO Pair':  'orange',
  'Training-Time':      'purple',
  'Inference-Time':  'rose',
  'Test-Time':               'violet',
  'Generate Rubrics':   'yellow',
  'Human-in-the-Loop':  'green',
  'RAG':                'indigo',
};

function resolveColor(tag) {
  if (!tag) return 'gray';
  for (const [key, color] of Object.entries(COLOR_MAP)) {
    if (tag.startsWith(key)) return color;
  }
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) & 0xff;
  const buckets = ['blue','sky','amber','teal','orange','purple','violet','yellow','green'];
  return buckets[h % buckets.length];
}

function TagChip({label, small}) {
  if (!label) return null;
  const color = resolveColor(label);
  return (
    <span className={clsx(styles.chip, styles[`chip_${color}`], small && styles.chipSmall)}>
      {label}
    </span>
  );
}

function LinkCell({href}) {
  if (!href) return <span className={styles.noLink}>—</span>;
  return (
    <a href={href} target="_blank" rel="noreferrer noopener"
      className={styles.linkCell} title={href}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
      <span>Link</span>
    </a>
  );
}

/** Custom academic-style dropdown */
function Dropdown({label, value, options, onChange}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const color = value ? resolveColor(value) : null;

  return (
    <div ref={ref} className={styles.dropdown}>
      <button
        type="button"
        className={clsx(styles.dropdownTrigger, open && styles.dropdownTriggerOpen)}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}>
        <span className={styles.dropdownLabel}>{label}</span>
        {value ? (
          <TagChip label={value} small />
        ) : (
          <span className={styles.dropdownAll}>All</span>
        )}
        <svg
          className={clsx(styles.dropdownChevron, open && styles.dropdownChevronOpen)}
          width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <ul className={styles.dropdownMenu} role="listbox">
          <li
            role="option"
            aria-selected={!value}
            className={clsx(styles.dropdownItem, !value && styles.dropdownItemActive)}
            onClick={() => { onChange(''); setOpen(false); }}>
            <span className={styles.dropdownDot} />
            <span className={styles.dropdownAllOpt}>All papers</span>
            {!value && <span className={styles.dropdownCheck}>✓</span>}
          </li>
          {options.map((opt) => {
            const c = resolveColor(opt);
            return (
              <li
                key={opt}
                role="option"
                aria-selected={value === opt}
                className={clsx(styles.dropdownItem, value === opt && styles.dropdownItemActive)}
                onClick={() => { onChange(opt); setOpen(false); }}>
                <span className={clsx(styles.dropdownDot, styles[`dot_${c}`])} />
                <span className={styles.dropdownOptText}>{opt}</span>
                {value === opt && <span className={styles.dropdownCheck}>✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function PaperTable({papers = []}) {
  const [usageFilter, setUsageFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');

  const usageOptions = useMemo(
    () => [...new Set(papers.map((p) => p.usage).filter(Boolean))].sort(),
    [papers],
  );
  const stageOptions = useMemo(
    () => [...new Set(papers.map((p) => p.stage).filter(Boolean))].sort(),
    [papers],
  );

  const filtered = useMemo(
    () => papers.filter(
      (p) =>
        (!usageFilter || p.usage === usageFilter) &&
        (!stageFilter || p.stage === stageFilter),
    ),
    [papers, usageFilter, stageFilter],
  );

  const hasFilter = usageFilter || stageFilter;

  return (
    <div>
      <div className={styles.filterBar}>
        <Dropdown
          label="How Rubrics Are Used"
          value={usageFilter}
          options={usageOptions}
          onChange={setUsageFilter}
        />
        <Dropdown
          label="Model Stage"
          value={stageFilter}
          options={stageOptions}
          onChange={setStageFilter}
        />
        {hasFilter && (
          <button className={styles.clearBtn}
            onClick={() => { setUsageFilter(''); setStageFilter(''); }}>
            × Clear
          </button>
        )}
        <span className={styles.filterCount}>
          {filtered.length} / {papers.length} papers
        </span>
      </div>

      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={clsx(styles.th, styles.colIndex)}>#</th>
              <th className={clsx(styles.th, styles.colTitle)}>Paper</th>
              <th className={clsx(styles.th, styles.colYear)}>Year</th>
              <th className={clsx(styles.th, styles.colUsage)}>How Rubrics Are Used</th>
              <th className={clsx(styles.th, styles.colStage)}>Model Stage</th>
              <th className={clsx(styles.th, styles.colLink)}>Link</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.title} className={styles.tr}>
                <td className={clsx(styles.td, styles.colIndex, styles.indexNum)}>
                  {papers.indexOf(p) + 1}
                </td>
                <td className={clsx(styles.td, styles.colTitle)} title={p.title}>
                  {p.anchor ? (
                    <a href={`#${p.anchor}`} className={styles.titleLink}>{p.title}</a>
                  ) : p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer noopener"
                      className={styles.titleLink}>{p.title}</a>
                  ) : (
                    <span className={styles.titleText}>{p.title}</span>
                  )}
                </td>
                <td className={clsx(styles.td, styles.colYear)}>
                  <span className={styles.yearText}>{p.year || ''}</span>
                </td>
                <td className={clsx(styles.td, styles.colUsage)}>
                  {p.usage ? <TagChip label={p.usage} /> : null}
                </td>
                <td className={clsx(styles.td, styles.colStage)}>
                  {p.stage ? <TagChip label={p.stage} /> : null}
                </td>
                <td className={clsx(styles.td, styles.colLink)}>
                  <LinkCell href={p.href} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyRow}>
                  No papers match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaperTable;
