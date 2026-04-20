import clsx from 'clsx';
import styles from './styles.module.css';

// Deterministic color bucket for tag chips
const COLOR_MAP = {
  'Rubric as Reward':     'blue',
  'Rubric as Feedback':   'sky',
  'Rubric Generator':     'amber',
  'Rubric Select Ans':    'teal',
  'Generate DPO Pair':    'orange',
  'Training-Time':        'purple',
  'Test-Time Scaling':    'rose',
  'Test':                 'violet',
  'Generate Rubrics':     'yellow',
  'Human-in-the-Loop':    'green',
  'RAG':                  'indigo',
};

function resolveColor(tag) {
  if (!tag) return 'gray';
  for (const [key, color] of Object.entries(COLOR_MAP)) {
    if (tag.startsWith(key)) return color;
  }
  // Fallback: simple hash
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) & 0xff;
  const buckets = ['blue', 'sky', 'amber', 'teal', 'orange', 'purple', 'violet', 'yellow', 'green'];
  return buckets[h % buckets.length];
}

function TagChip({label}) {
  if (!label) return null;
  const color = resolveColor(label);
  return (
    <span className={clsx(styles.chip, styles[`chip_${color}`])}>
      {label}
    </span>
  );
}

function LinkCell({href}) {
  if (!href) return <span className={styles.noLink}>—</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={styles.linkCell}
      title={href}>
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

/**
 * PaperTable — Notion-style spreadsheet overview
 *
 * papers: Array<{
 *   title: string,
 *   href?: string,
 *   org?: string,
 *   year?: string,
 *   usage?: string,        // 如何使用 Rubrics
 *   stage?: string,        // 按模型训练阶段分类
 * }>
 */
export function PaperTable({papers = []}) {
  return (
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
          {papers.map((p, idx) => (
            <tr key={idx} className={styles.tr}>
              <td className={clsx(styles.td, styles.colIndex, styles.indexNum)}>
                {idx + 1}
              </td>
              <td className={clsx(styles.td, styles.colTitle)} title={p.title}>
                {p.anchor ? (
                  <a href={`#${p.anchor}`} className={styles.titleLink}>
                    {p.title}
                  </a>
                ) : p.href ? (
                  <a href={p.href} target="_blank" rel="noreferrer noopener"
                    className={styles.titleLink}>
                    {p.title}
                  </a>
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
        </tbody>
      </table>
    </div>
  );
}

export default PaperTable;
