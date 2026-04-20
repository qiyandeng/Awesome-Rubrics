import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const taxonomyGroups = [
  {
    title: 'By Use Case',
    items: [
      'Evaluating answer quality and agent trajectories',
      'Generating preference, reward, and post-training data',
    ],
  },
  {
    title: 'By Model Stage',
    items: [
      'Training-time and post-training supervision',
      'Inference-time selection, reflection, and verification',
      'Evaluation-time judge criteria',
    ],
  },
  {
    title: 'By Generation Strategy',
    items: [
      'Direct generation',
      'Retrieval-augmented generation',
      'Preference-driven extraction',
      'Refinement and expert-in-the-loop design',
    ],
  },
];

const representativeWorks = [
  'Learning to Judge',
  'RubricRAG',
  'Auto-Rubric',
  'Rethinking Rubric Generation',
  'Reflect-and-Revise / iRULER',
  'SedarEval / XpertBench',
];

function HeroSection() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.heroContainer)}>
        <p className={styles.kicker}>Survey portal for rubric research</p>
        <Heading as="h1" className={styles.heroTitle}>
          Awesome-Rubrics
        </Heading>
        <p className={styles.heroLead}>
          A curated academic hub for rubric generation, rubric refinement, rubric-based evaluation,
          and rubric-guided training.
        </p>
        <div className={styles.metaRow}>
          <span>Use cases</span>
          <span>Model stages</span>
          <span>Generation strategies</span>
          <span>Representative papers</span>
        </div>
        <div className={styles.actions}>
          <Link className="button button--primary button--lg" to="/docs/awesome-list">
            Browse Paper List
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Read Overview
          </Link>
        </div>
      </div>
    </header>
  );
}

function TaxonomyCard({title, items}) {
  return (
    <div className="col col--4">
      <div className={styles.taxonomyCard}>
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <ul className={styles.compactList}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="Home"
      description="Awesome-Rubrics is a curated hub for rubric-related resources and research.">
      <HeroSection />
      <main className={styles.mainSection}>
        <section className={clsx('container', styles.sectionBlock)}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Overview</p>
            <Heading as="h2">What this project organizes</Heading>
          </div>
          <div className={styles.narrativePanel}>
            <p>
              Rubrics are increasingly used in three connected settings: as explicit judge criteria
              for evaluation, as structure for inference-time verification and candidate selection,
              and as supervision or reward signals for training and post-training.
            </p>
            <p>
              This site organizes the area from a survey perspective, with emphasis on taxonomy,
              representative papers, and practical distinctions between general-purpose and
              domain-specific rubric design.
            </p>
          </div>
        </section>

        <section className={clsx('container', styles.sectionBlock)}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Taxonomy</p>
            <Heading as="h2">Three organizing axes</Heading>
          </div>
          <div className="row">
            {taxonomyGroups.map((item) => (
              <TaxonomyCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        <section className={clsx('container', styles.sectionBlock)}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Representative Works</p>
            <Heading as="h2">A compact reading list</Heading>
          </div>
          <div className={styles.paperPanel}>
            {representativeWorks.map((paper) => (
              <div key={paper} className={styles.paperItem}>
                <span className={styles.paperBullet}>•</span>
                <span>{paper}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={clsx('container', styles.sectionBlock)}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Reading Paths</p>
            <Heading as="h2">Start from the question you care about</Heading>
          </div>
          <div className="row">
            <div className="col col--6">
              <div className={styles.pathCard}>
                <Heading as="h3" className={styles.cardTitle}>
                  If you study rubric generation
                </Heading>
                <p>
                  Focus on direct generation, retrieval-augmented methods, preference-driven
                  extraction, refinement, and expert-in-the-loop pipelines.
                </p>
              </div>
            </div>
            <div className="col col--6">
              <div className={styles.pathCard}>
                <Heading as="h3" className={styles.cardTitle}>
                  If you study rubric application
                </Heading>
                <p>
                  Focus on evaluation criteria, agent trajectory assessment, reward modeling, and
                  domain-specific quality standards.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
