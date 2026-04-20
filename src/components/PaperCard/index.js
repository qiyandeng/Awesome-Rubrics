import {useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

function ExternalLinkIcon({size = 14}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{display: 'block', flexShrink: 0}}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ChevronIcon({open}) {
  return (
    <svg
      className={clsx(styles.chevron, open && styles.chevronOpen)}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function PaperCard({
  id,
  title,
  href,
  authors,
  venue,
  year,
  type,
  idea,
  why,
  tags = [],
}) {
  const [open, setOpen] = useState(false);
  const metaParts = [year, venue, type].filter(Boolean);

  const toggle = () => setOpen((v) => !v);
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <article id={id} className={clsx(styles.entry, open && styles.entryOpen)}>
      {/* ── Row (always visible) ── */}
      <div
        className={styles.row}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={handleKey}>
        <span className={styles.cellChevron}>
          <ChevronIcon open={open} />
        </span>

        <span className={styles.cellTitle} title={title}>
          {title}
        </span>

        <span className={styles.cellMeta}>
          {metaParts.map((part, idx) => (
            <span key={part}>
              {part}
              {idx < metaParts.length - 1 && (
                <span className={styles.metaDot}> · </span>
              )}
            </span>
          ))}
        </span>

        {/* tags + link fade out when expanded — no duplication with card */}
        <span className={styles.cellTags}>
          {tags.slice(0, 1).map((tag) => (
            <span key={tag} className={styles.rowTag}>
              {tag}
            </span>
          ))}
          {tags.length > 1 && (
            <span className={styles.rowTagMore}>+{tags.length - 1}</span>
          )}
        </span>

        <span className={styles.cellLink}>
          {href && (
            <a
              className={styles.linkIcon}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              aria-label={`Open source for ${title}`}
              title="Open source">
              <ExternalLinkIcon />
            </a>
          )}
        </span>
      </div>

      {/* ── Card (smooth expand via grid-template-rows) ── */}
      <div className={clsx(styles.cardWrapper, open && styles.cardWrapperOpen)}>
        <div className={styles.cardInner}>
          {/* top bar: full tags + view source — replaces row's collapsed version */}
          <div className={styles.cardTopBar}>
            <div className={styles.cardTopTags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.sourceLink}
                onClick={(e) => e.stopPropagation()}>
                <ExternalLinkIcon size={13} />
                <span>View source</span>
              </a>
            )}
          </div>

          {authors && <p className={styles.authors}>{authors}</p>}

          {idea && (
            <div className={styles.block}>
              <span className={styles.blockLabel}>Core idea</span>
              <p className={styles.blockText}>{idea}</p>
            </div>
          )}

          {why && (
            <div className={styles.block}>
              <span className={styles.blockLabel}>Why it matters</span>
              <p className={styles.blockText}>{why}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function PaperGroup({label, title, description, children}) {
  return (
    <section className={styles.group}>
      <header className={styles.groupHeader}>
        {label && <p className={styles.groupLabel}>{label}</p>}
        <h2 className={styles.groupTitle}>{title}</h2>
        {description && <p className={styles.groupDescription}>{description}</p>}
      </header>
      <div className={styles.list}>{children}</div>
    </section>
  );
}

export default PaperCard;
