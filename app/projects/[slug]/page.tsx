'use client'

import { use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const projectData: Record<string, {
  title: string; type: string; year: string; color: string; gradient: string; icon: string;
  tagline: string; overview: string; challenge: string; solution: string; results: string[];
  tech: string[]; images: string[]; imageLabels: string[];
}> = {
  'ai-agent': {
    title: 'Agentic AI Customer Support System',
    type: 'Freelance', year: '2024', color: '#4ADE80',
    gradient: 'linear-gradient(135deg, #0a2a1a 0%, #0A0E1A 100%)',
    icon: '⚡',
    tagline: '3 optical gallery clients · 72 languages · 24/7',
    overview: 'Designed and built an end-to-end agentic AI voice system simultaneously serving 3 optical gallery franchise clients through a single agent architecture.',
    challenge: 'Three independent franchise clients needed 24/7 customer support but couldn\'t afford separate teams. Each had overlapping booking slots and different customer bases.',
    solution: 'Built a multi-tenant agentic AI voice system that handles all three simultaneously. The agent detects which franchise is being called, resolves booking conflicts in real-time, and switches language dynamically based on customer preference — all within a single call.',
    results: ['24/7 inbound call handling with zero human intervention during off-hours', 'Supports 72 languages dynamically within a single call', 'Real-time tone analysis triggers personalised promotions', 'Post-call sentiment scoring feeds back into model retraining', 'Automated booking confirmations and calendar updates', 'Separate outbound agent for follow-ups, dues, and cold-call campaigns'],
    tech: ['Agentic AI', 'NLP', 'Voice AI', 'Python', 'Sentiment Analysis', 'Multilingual Processing', 'Real-time Analytics'],
    images: ['project-ai-agent-1.jpg', 'project-ai-agent-2.jpg'],
    imageLabels: ['Inbound Agent Dashboard', 'Outbound Campaign View'],
  },
  'payroll': {
    title: 'In-House Payroll Software',
    type: 'SD Care', year: '2023', color: '#C8A96E',
    gradient: 'linear-gradient(135deg, #1a1200 0%, #0A0E1A 100%)',
    icon: '💰',
    tagline: 'Reduced 1-week payroll process to 1 day',
    overview: 'Fully custom payroll system built from scratch in Python, MongoDB and React JS. Recognised as the most reliable and productive financial tool deployed within the organisation.',
    challenge: 'The combined HR and finance payroll process previously took up to one week to complete manually across multiple disconnected systems.',
    solution: 'Built a fully integrated payroll system that pulls clock-in data from multiple platforms into a single system, generates individual timesheets in under 5 seconds, and exports QuickBooks-compatible CSVs for payslip generation in under 10 seconds.',
    results: ['Timesheet generation in under 5 seconds', 'QuickBooks-compatible export in under 10 seconds', 'Outputs in both Excel and PDF formats', 'Secure file storage on company server', '1-week manual process reduced to 1 day', 'Recognised as most reliable financial tool in the organisation'],
    tech: ['Python', 'MongoDB', 'React JS', 'QuickBooks API', 'Excel Automation', 'PDF Generation'],
    images: ['project-payroll-1.jpg', 'project-payroll-2.jpg'],
    imageLabels: ['Timesheet Generator', 'QuickBooks Export View'],
  },
  'invoicing': {
    title: 'Accounts Receivable & Invoicing Software',
    type: 'SD Care', year: '2023', color: '#C8A96E',
    gradient: 'linear-gradient(135deg, #1a1200 0%, #0A0E1A 100%)',
    icon: '📄',
    tagline: 'Automated 2-week invoicing cycle to 1 day',
    overview: 'Custom invoicing software that pulls live care data from Nourish Care software and automatically generates client invoices in both Excel and PDF formats.',
    challenge: 'The accounts receivable team spent two weeks per cycle manually compiling care data and generating invoices for each client.',
    solution: 'Integrated directly with Nourish Care software API to pull client care records automatically, then formats and generates monthly and bi-weekly invoices with zero manual input required.',
    results: ['Handles both monthly and bi-weekly invoice cycles', 'Pulls data directly from Nourish Care in real-time', 'Generates Excel and PDF invoices automatically', 'Secure storage on company server', '2-week process reduced to 1 day'],
    tech: ['Python', 'Nourish Care API', 'Excel Automation', 'PDF Generation', 'Data Processing'],
    images: ['project-invoicing-1.jpg', 'project-invoicing-2.jpg'],
    imageLabels: ['Invoice Generator Dashboard', 'Client Report View'],
  },
  'hr-suite': {
    title: 'HR Automation Suite',
    type: 'SD Care', year: '2023', color: '#7C9EFF',
    gradient: 'linear-gradient(135deg, #0a0d2a 0%, #0A0E1A 100%)',
    icon: '👥',
    tagline: 'Full HR pipeline automated end-to-end',
    overview: 'Comprehensive HR automation suite covering training tracking, leave management, appraisals, recruitment, and compliance — all in one integrated system.',
    challenge: 'HR processes were entirely manual across disconnected spreadsheets and emails. Recruitment alone required manually checking multiple job platforms and following up candidates individually.',
    solution: 'Built a modular HR automation suite: training tracker with real-time dashboard and automated notifications, annual leave automation, appraisal system, meeting invitations, birthday reminders, QCS policy management. Topped with a full recruitment tracker pulling from Indeed, LinkedIn, and other platforms into a central database.',
    results: ['Real-time training completion visibility across all staff', 'Automated email notifications to employees and managers', 'Candidate data pulled from Indeed, LinkedIn automatically', 'Full recruitment pipeline from shortlisting to onboarding', 'Annual leave and appraisal processes fully automated', 'QCS policy integration for compliance management'],
    tech: ['Python', 'React JS', 'Email Automation', 'LinkedIn API', 'Indeed API', 'SharePoint', 'Dashboard Design'],
    images: ['project-hr-1.jpg', 'project-hr-2.jpg'],
    imageLabels: ['Training Tracker Dashboard', 'Recruitment Pipeline View'],
  },
  'ai-buddy': {
    title: 'AI Buddy App — Healthcare',
    type: 'SD Care', year: '2024', color: '#4ADE80',
    gradient: 'linear-gradient(135deg, #0a2a1a 0%, #0A0E1A 100%)',
    icon: '🤖',
    tagline: 'Live on Web, Android & iOS',
    overview: 'AI-powered companion application deployed across web, Android, and iOS for healthcare clients. Designed specifically to support client engagement, communication, and day-to-day wellbeing.',
    challenge: 'Healthcare clients needed consistent, accessible support outside of care hours. Traditional apps felt clinical and difficult to use for the target demographic.',
    solution: 'Built an accessibility-first AI companion app with natural conversation, simple navigation, and personalised engagement features. Deployed simultaneously across three platforms from a single codebase.',
    results: ['Live on Web, Android, and iOS simultaneously', 'Accessibility-first design for non-technical users', 'AI-powered natural conversation', 'Improved client engagement and communication metrics'],
    tech: ['React JS', 'React Native', 'AI Integration', 'MongoDB', 'Cross-Platform Development', 'Healthcare UX'],
    images: ['project-ai-buddy-1.jpg', 'project-ai-buddy-2.jpg'],
    imageLabels: ['Mobile App Interface', 'Web Dashboard View'],
  },
  'website': {
    title: 'Unified Company Website',
    type: 'SD Care', year: '2024', color: '#EC4899',
    gradient: 'linear-gradient(135deg, #1a0010 0%, #0A0E1A 100%)',
    icon: '🌐',
    tagline: 'Top Core Web Vitals · AI smart search · SEO',
    overview: 'Consolidated two separate company websites into a single high-performance platform with AI-powered smart search, integrated advertising, and full SEO optimisation.',
    challenge: 'Two separate websites for SD Care and SD Care Agency created brand confusion, split SEO authority, and made content management twice as complicated.',
    solution: 'Unified both sites into one high-performance platform focused on Core Web Vitals, technical SEO, and user experience. Added AI smart search and an AI agent layer to handle user queries. Integrated Google Ads and Meta Ads with dedicated landing pages for each service.',
    results: ['Top Core Web Vitals scores across all metrics', 'Unified brand presence with improved SEO authority', 'AI-powered smart search reduces inbound queries', 'Google Ads and Meta Ads integrated with attribution tracking', 'Dedicated landing pages for each service line'],
    tech: ['Next.js', 'Technical SEO', 'Core Web Vitals', 'AI Smart Search', 'Google Ads', 'Meta Ads', 'Landing Page Design'],
    images: ['project-website-1.jpg', 'project-website-2.jpg'],
    imageLabels: ['Homepage Design', 'Landing Page View'],
  },
  'interview-sim': {
    title: 'AI Interview Simulator',
    type: 'Product', year: '2024', color: '#C084FC',
    gradient: 'linear-gradient(135deg, #120a2a 0%, #0A0E1A 100%)',
    icon: '🎯',
    tagline: 'AI recruiter conducts real mock interviews',
    overview: 'AI-powered interview simulation app where candidates upload their CV and a job description, and the AI acts as a recruiter conducting a realistic mock interview with detailed feedback.',
    challenge: 'Job candidates have no reliable way to practise interviews in a realistic environment with actual feedback — especially for specific roles.',
    solution: 'Built an app where candidates upload their CV and target job description. The AI analyses both and conducts a personalised mock interview as a recruiter, asking relevant questions, evaluating answers, and providing targeted coaching.',
    results: ['Fully personalised to each candidate\'s CV and target role', 'AI recruiter conducts realistic multi-question interviews', 'Detailed performance evaluation and scoring', 'Targeted coaching to improve specific weak areas', 'Confidence building through repetition and feedback'],
    tech: ['AI', 'NLP', 'React JS', 'Python', 'Prompt Engineering', 'LLM Integration'],
    images: ['project-interview-sim-1.jpg', 'project-interview-sim-2.jpg'],
    imageLabels: ['Interview Interface', 'Feedback & Scoring View'],
  },
  'insurance-analytics': {
    title: 'Motor Insurance Pricing Analytics',
    type: 'MSc Academic', year: '2022', color: '#F97316',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #0A0E1A 100%)',
    icon: '📊',
    tagline: '+27% pricing accuracy · -15% cost of risk',
    overview: 'Forecasted expected claim cost per vehicle and risk profile for a motor insurance company, enabling competitive pricing against market competitors using predictive modelling.',
    challenge: 'Motor insurance pricing based on insufficient historical analysis was leading to mispriced policies — either too high to win business or too low to cover risk.',
    solution: 'Analysed historical sales data, built predictive models for claim cost and risk profiles, and evaluated market trends to develop a competitive pricing framework.',
    results: ['27% improvement in pricing accuracy', '15% reduction in cost of risk', 'Competitive pricing model benchmarked against market data', 'Risk profiling by vehicle type, age, and driver history'],
    tech: ['R Studio', 'Power BI', 'MS Excel', 'Predictive Modelling', 'Statistical Analysis', 'Market Research'],
    images: ['project-insurance-1.jpg', 'project-insurance-2.jpg'],
    imageLabels: ['Risk Model Dashboard', 'Pricing Analysis Report'],
  },
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const project = projectData[slug]

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', fontFamily: 'monospace', marginBottom: '16px' }}>Project not found</p>
          <Link href="/#projects" style={{ color: 'var(--accent)', textDecoration: 'none', fontFamily: 'monospace', fontSize: '13px' }}>← Back to projects</Link>
        </div>
      </div>
    )
  }

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ height: '420px', background: project.gradient, position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)',
        }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 32px 48px', width: '100%', position: 'relative' }}>
          <Link href="/#projects" style={{
            fontFamily: 'monospace', fontSize: '12px', color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none', letterSpacing: '0.06em', display: 'inline-flex',
            alignItems: 'center', gap: '6px', marginBottom: '24px',
            transition: 'color 0.2s',
          }}>
            ← Back to projects
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '48px' }}>{project.icon}</span>
            <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'monospace', fontSize: '10px',
                  background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '3px 12px', borderRadius: '100px',
                  color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em',
                }}>
                  {project.type}
                </span>
                <span style={{
                  fontFamily: 'monospace', fontSize: '10px',
                  color: 'rgba(255,255,255,0.4)',
                }}>
                  {project.year}
                </span>
              </div>
              <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                {project.title}
              </h1>
            </div>
          </div>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: project.color, display: 'inline-block' }} />
            {project.tagline}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 style={{ fontSize: '13px', fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Overview</h2>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.85 }}>{project.overview}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 style={{ fontSize: '13px', fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>The Challenge</h2>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.85 }}>{project.challenge}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 style={{ fontSize: '13px', fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>The Solution</h2>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.85 }}>{project.solution}</p>
            </motion.div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 style={{ fontSize: '13px', fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Results</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
                {project.results.map((r, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                    style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: project.color, flexShrink: 0, marginTop: '6px' }} />
                    <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>{r}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 style={{ fontSize: '13px', fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Tech Stack</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tech.map(t => (
                  <span key={t} style={{
                    fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent)',
                    background: 'rgba(200,169,110,0.08)', padding: '6px 14px',
                    borderRadius: '100px', border: '1px solid rgba(200,169,110,0.2)',
                  }}>{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Image placeholders */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h2 style={{ fontSize: '13px', fontFamily: 'monospace', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Screenshots</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {project.images.map((img, i) => (
                  <div key={i} style={{
                    height: '160px', background: 'var(--surface2)',
                    borderRadius: '8px', border: '1px solid var(--faint)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', gap: '6px',
                  }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--muted)' }}>
                      {project.imageLabels[i]}
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '9px', color: 'var(--faint)' }}>
                      Save as: /images/projects/{img}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
