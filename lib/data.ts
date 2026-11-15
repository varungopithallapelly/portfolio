// Single source of truth for portfolio content.
// Colours are CSS variable names so they adapt to light/dark mode.

export type Hue = 'accent' | 'green' | 'blue' | 'violet' | 'amber' | 'pink' | 'orange'
export const hue = (h: Hue) => `var(--${h})`

export const profile = {
  name: 'Varun Thallapelly',
  first: 'Varun',
  last: 'Thallapelly',
  roles: ['Data Analyst', 'AI Solutions Developer', 'Automation Engineer', 'Full-Stack Builder'],
  location: 'Guildford, United Kingdom',
  timezone: 'Europe/London',
  email: 'thallapellyvarun@gmail.com',
  phone: '+44 7471 301 412',
  phoneHref: 'tel:+447471301412',
  cv: '/varun-thallapelly-cv.pdf',
  photo: '/images/varun_profile.avif',
  github: 'varungopithallapelly',
}

export const socials = {
  github: 'https://github.com/varungopithallapelly',
  linkedin: 'https://www.linkedin.com/in/varun-gopi-thallapelly/',
  instagram: 'https://www.instagram.com/__varun._/',
  email: `mailto:${profile.email}`,
}

export const stats = [
  { value: 3, suffix: '+', label: 'Years experience' },
  { value: 8, suffix: '+', label: 'Shipped products' },
  { value: 85, suffix: '%', label: 'Process time reduced' },
  { value: 3, suffix: '', label: 'Freelance clients' },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'impact', label: 'Impact' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export type Job = {
  title: string
  company: string
  fullCompany: string
  location: string
  period: string
  current: boolean
  highlights: { value: string; label: string }[]
  bullets: string[]
  tech: string[]
}

export const jobs: Job[] = [
  {
    title: 'Data Analyst',
    company: 'SD Care Agency',
    fullCompany: 'San Damiano Corporation Ltd.',
    location: 'Guildford, UK',
    period: 'Aug 2024 – Present',
    current: true,
    highlights: [
      { value: '1 wk → 1 day', label: 'Payroll run' },
      { value: '2 wk → 1 day', label: 'Invoicing cycle' },
      { value: 'Good', label: 'CQC rating, both entities' },
    ],
    bullets: [
      'Collaborated directly with the CEO and Finance Manager to build a 5-year strategic business plan and financial restructuring model to support group-level expansion.',
      'Developed a fully custom in-house payroll system (Python, MongoDB, React JS) integrating data from multiple clock-in platforms, reduced a one-week manual payroll process to a single day.',
      'Built an automated accounts receivable and invoicing system pulling live data from Nourish Care software, generating monthly and bi-weekly client invoices, cut a two-week cycle to one day.',
      'Led website consolidation and digital infrastructure project, unified two company sites into a single high-performance platform with AI smart search, SEO optimisation, Google Ads and Meta Ads, Google Tag Manager, and Google Analytics 4.',
      'Designed and deployed end-to-end business intelligence infrastructure, built KPI frameworks and interactive Power BI dashboards monitoring performance across HR, Finance, and Operations in real time.',
      'Conducted deep-dive process analysis across all business units, identifying inefficiencies and implementing data-driven optimisations that materially reduced operational overhead.',
      'Delivered an end-to-end HR automation suite covering training tracking, recruitment pipeline management, annual leave, appraisals, and QCS policy compliance.',
      'Supported ISO 9001:2015 quality management audits and CQC inspections — both SD Care entities achieved a Good CQC rating.',
      'Built and deployed an AI-powered companion app (Web, Android, iOS) for healthcare clients, improving client engagement and daily wellbeing communication.',
    ],
    tech: ['Python', 'Power BI', 'PostgreSQL', 'MongoDB', 'React JS', 'Next.js', 'Excel', 'SharePoint', 'ISO 9001', 'Google Analytics 4', 'Google Tag Manager'],
  },
  {
    title: 'IT Executive',
    company: 'SD Care Agency',
    fullCompany: 'San Damiano Corporation Ltd.',
    location: 'Guildford, UK',
    period: 'Nov 2023 – Jul 2024',
    current: false,
    highlights: [
      { value: '5+', label: 'Internal apps shipped' },
      { value: '4', label: 'Departments supported' },
      { value: 'Minutes', label: 'HR paperwork turnaround' },
    ],
    bullets: [
      'Integrated and managed Mindbody CRM for Omnia Lifestyle Limited, handling pricing configuration, booking systems, therapist management, and website chatbot integration for digital client engagement.',
      'Developed a Field Supervision Report application (phone, tablet, desktop) for the domiciliary care team — enabling live carer supervision, performance rating, feedback recording, and offline report generation.',
      'Built an automated HR operations application combining annual leave computation, HR meeting invitation generation, and resignation acceptance processing, enabling the HR team to prepare and send documentation in minutes.',
      'Developed an appraisal form application (AppSheet) where HR sets objectives, routes to line manager for review and rating, and the system auto-generates a formatted PDF on completion.',
      'Built an in-house training tracker dashboard connected to CareSkills with live completion dashboards, targeted email actions, and automated weekly training status reminders.',
      'Designed and implemented an end-to-end hiring process tracker on Monday.com covering the full recruitment pipeline from CV receipt through to onboarding, with a centralised employee database.',
      'Acted as the internal technical lead bridging business requirements and technology delivery across HR, Finance, Operations, and Marketing.',
    ],
    tech: ['Mindbody CRM', 'AppSheet', 'Monday.com', 'CareSkills', 'AI Automation', 'Power BI', 'SharePoint', 'System Administration'],
  },
  {
    title: 'Data Analyst',
    company: 'Trade Wins Ltd',
    fullCompany: 'Trade Wins Ltd',
    location: 'Remote',
    period: 'Oct 2022 – Jul 2023',
    current: false,
    highlights: [
      { value: 'BI', label: 'Dashboards & reporting' },
      { value: 'HR + Fin', label: 'Workflows automated' },
      { value: 'Remote', label: 'Distributed team' },
    ],
    bullets: [
      'Designed dashboards and reporting templates to support business decision-making and performance tracking.',
      'Managed and optimised SharePoint and database systems to improve data accessibility and integrity.',
      'Automated administrative workflows, reducing manual effort for HR and finance processes.',
      'Provided analytical insights for project planning, recruitment administration, and performance management.',
    ],
    tech: ['Python', 'Power BI', 'Excel', 'SharePoint', 'SQL'],
  },
]

export const education = [
  { degree: 'MSc Business Analytics', school: 'University of Surrey', location: 'Guildford, United Kingdom', period: 'Sep 2021 – Sep 2022' },
  { degree: 'BSc Electrical Engineering', school: 'Kakatiya Institute of Technology & Science', location: 'Warangal, India', period: 'Jun 2016 – Jun 2020' },
]

export type Project = {
  slug: string
  href: string
  title: string
  category: string[]
  type: string
  year: string
  hue: Hue
  emoji: string
  tagline: string
  metric?: { value: string; label: string }
  tech: string[]
  featured?: boolean
  overview?: string
  challenge?: string
  solution?: string
  results?: string[]
  imageLabels?: string[]
}

export const projectCategories = ['All', 'AI & Automation', 'Data Analytics', 'Software', 'Web & Marketing', 'Freelance']

export const projects: Project[] = [
  {
    slug: 'ai-agent',
    href: '/projects/ai-agent',
    title: 'Agentic AI Customer Support System',
    category: ['AI & Automation', 'Freelance'],
    type: 'Freelance', year: '2024', hue: 'green', emoji: '⚡', featured: true,
    tagline: '3 optical gallery clients · 72 languages · 24/7',
    metric: { value: '72', label: 'languages, one agent' },
    tech: ['Agentic AI', 'NLP', 'Voice AI', 'Python', 'Sentiment Analysis', 'Multilingual Processing', 'Real-time Analytics'],
    overview: 'Designed and built an end-to-end agentic AI voice system simultaneously serving 3 optical gallery franchise clients through a single agent architecture.',
    challenge: 'Three independent franchise clients needed 24/7 customer support but couldn\'t afford separate teams. Each had overlapping booking slots and different customer bases.',
    solution: 'Built a multi-tenant agentic AI voice system that handles all three simultaneously. The agent detects which franchise is being called, resolves booking conflicts in real-time, and switches language dynamically based on customer preference — all within a single call.',
    results: ['24/7 inbound call handling with zero human intervention during off-hours', 'Supports 72 languages dynamically within a single call', 'Real-time tone analysis triggers personalised promotions', 'Post-call sentiment scoring feeds back into model retraining', 'Automated booking confirmations and calendar updates', 'Separate outbound agent for follow-ups, dues, and cold-call campaigns'],
    imageLabels: ['Inbound Agent Dashboard', 'Outbound Campaign View'],
  },
  {
    slug: 'payroll',
    href: '/projects/payroll',
    title: 'In-House Payroll Software',
    category: ['Software'],
    type: 'SD Care', year: '2023', hue: 'amber', emoji: '💰', featured: true,
    tagline: 'Reduced 1-week payroll process to 1 day',
    metric: { value: '<5s', label: 'per timesheet' },
    tech: ['Python', 'MongoDB', 'React JS', 'QuickBooks API', 'Excel Automation', 'PDF Generation'],
    overview: 'Fully custom payroll system built from scratch in Python, MongoDB and React JS. Recognised as the most reliable and productive financial tool deployed within the organisation.',
    challenge: 'The combined HR and finance payroll process previously took up to one week to complete manually across multiple disconnected systems.',
    solution: 'Built a fully integrated payroll system that pulls clock-in data from multiple platforms into a single system, generates individual timesheets in under 5 seconds, and exports QuickBooks-compatible CSVs for payslip generation in under 10 seconds.',
    results: ['Timesheet generation in under 5 seconds', 'QuickBooks-compatible export in under 10 seconds', 'Outputs in both Excel and PDF formats', 'Secure file storage on company server', '1-week manual process reduced to 1 day', 'Recognised as most reliable financial tool in the organisation'],
    imageLabels: ['Timesheet Generator', 'QuickBooks Export View'],
  },
  {
    slug: 'intel-arc-lora',
    href: '/work/intel-arc-lora',
    title: 'Local LoRA Training on Intel Arc',
    category: ['AI & Automation'],
    type: 'Build Log', year: 'Experiment', hue: 'blue', emoji: '🧠',
    tagline: 'Own your AI likeness — trained on a laptop GPU',
    metric: { value: '~25m', label: 'to train a LoRA' },
    tech: ['ComfyUI', 'Stable Diffusion', 'LoRA', 'Python', 'Intel XPU', 'AnimateDiff'],
  },
  {
    slug: 'invoicing',
    href: '/projects/invoicing',
    title: 'Accounts Receivable & Invoicing Software',
    category: ['Software'],
    type: 'SD Care', year: '2023', hue: 'orange', emoji: '📄',
    tagline: 'Automated 2-week invoicing cycle to 1 day',
    metric: { value: '14×', label: 'faster cycle' },
    tech: ['Python', 'Nourish Care API', 'Excel Automation', 'PDF Generation', 'Data Processing'],
    overview: 'Custom invoicing software that pulls live care data from Nourish Care software and automatically generates client invoices in both Excel and PDF formats.',
    challenge: 'The accounts receivable team spent two weeks per cycle manually compiling care data and generating invoices for each client.',
    solution: 'Integrated directly with Nourish Care software API to pull client care records automatically, then formats and generates monthly and bi-weekly invoices with zero manual input required.',
    results: ['Handles both monthly and bi-weekly invoice cycles', 'Pulls data directly from Nourish Care in real-time', 'Generates Excel and PDF invoices automatically', 'Secure storage on company server', '2-week process reduced to 1 day'],
    imageLabels: ['Invoice Generator Dashboard', 'Client Report View'],
  },
  {
    slug: 'hr-suite',
    href: '/projects/hr-suite',
    title: 'HR Automation Suite',
    category: ['AI & Automation', 'Software'],
    type: 'SD Care', year: '2023', hue: 'blue', emoji: '👥',
    tagline: 'Full HR pipeline automated end-to-end',
    tech: ['Python', 'React JS', 'Email Automation', 'LinkedIn API', 'Indeed API', 'SharePoint', 'Dashboard Design'],
    overview: 'Comprehensive HR automation suite covering training tracking, leave management, appraisals, recruitment, and compliance — all in one integrated system.',
    challenge: 'HR processes were entirely manual across disconnected spreadsheets and emails. Recruitment alone required manually checking multiple job platforms and following up candidates individually.',
    solution: 'Built a modular HR automation suite: training tracker with real-time dashboard and automated notifications, annual leave automation, appraisal system, meeting invitations, birthday reminders, QCS policy management. Topped with a full recruitment tracker pulling from Indeed, LinkedIn, and other platforms into a central database.',
    results: ['Real-time training completion visibility across all staff', 'Automated email notifications to employees and managers', 'Candidate data pulled from Indeed, LinkedIn automatically', 'Full recruitment pipeline from shortlisting to onboarding', 'Annual leave and appraisal processes fully automated', 'QCS policy integration for compliance management'],
    imageLabels: ['Training Tracker Dashboard', 'Recruitment Pipeline View'],
  },
  {
    slug: 'ai-buddy',
    href: '/projects/ai-buddy',
    title: 'AI Buddy App — Healthcare',
    category: ['AI & Automation', 'Software', 'Freelance'],
    type: 'SD Care', year: '2024', hue: 'green', emoji: '🤖',
    tagline: 'Live on Web, Android & iOS',
    metric: { value: '3', label: 'platforms, one codebase' },
    tech: ['React JS', 'React Native', 'AI Integration', 'MongoDB', 'Cross-Platform Development', 'Healthcare UX'],
    overview: 'AI-powered companion application deployed across web, Android, and iOS for healthcare clients. Designed specifically to support client engagement, communication, and day-to-day wellbeing.',
    challenge: 'Healthcare clients needed consistent, accessible support outside of care hours. Traditional apps felt clinical and difficult to use for the target demographic.',
    solution: 'Built an accessibility-first AI companion app with natural conversation, simple navigation, and personalised engagement features. Deployed simultaneously across three platforms from a single codebase.',
    results: ['Live on Web, Android, and iOS simultaneously', 'Accessibility-first design for non-technical users', 'AI-powered natural conversation', 'Improved client engagement and communication metrics'],
    imageLabels: ['Mobile App Interface', 'Web Dashboard View'],
  },
  {
    slug: 'website',
    href: '/projects/website',
    title: 'Unified Company Website',
    category: ['Web & Marketing'],
    type: 'SD Care', year: '2024', hue: 'pink', emoji: '🌐',
    tagline: 'Top Core Web Vitals · AI smart search · SEO',
    tech: ['Next.js', 'Technical SEO', 'Core Web Vitals', 'AI Smart Search', 'Google Ads', 'Meta Ads', 'Landing Page Design'],
    overview: 'Consolidated two separate company websites into a single high-performance platform with AI-powered smart search, integrated advertising, and full SEO optimisation.',
    challenge: 'Two separate websites for SD Care and SD Care Agency created brand confusion, split SEO authority, and made content management twice as complicated.',
    solution: 'Unified both sites into one high-performance platform focused on Core Web Vitals, technical SEO, and user experience. Added AI smart search and an AI agent layer to handle user queries. Integrated Google Ads and Meta Ads with dedicated landing pages for each service.',
    results: ['Top Core Web Vitals scores across all metrics', 'Unified brand presence with improved SEO authority', 'AI-powered smart search reduces inbound queries', 'Google Ads and Meta Ads integrated with attribution tracking', 'Dedicated landing pages for each service line'],
    imageLabels: ['Homepage Design', 'Landing Page View'],
  },
  {
    slug: 'interview-sim',
    href: '/projects/interview-sim',
    title: 'AI Interview Simulator',
    category: ['AI & Automation', 'Freelance'],
    type: 'Product', year: '2024', hue: 'violet', emoji: '🎯',
    tagline: 'AI recruiter conducts real mock interviews',
    tech: ['AI', 'NLP', 'React JS', 'Python', 'Prompt Engineering', 'LLM Integration'],
    overview: 'AI-powered interview simulation app where candidates upload their CV and a job description, and the AI acts as a recruiter conducting a realistic mock interview with detailed feedback.',
    challenge: 'Job candidates have no reliable way to practise interviews in a realistic environment with actual feedback — especially for specific roles.',
    solution: 'Built an app where candidates upload their CV and target job description. The AI analyses both and conducts a personalised mock interview as a recruiter, asking relevant questions, evaluating answers, and providing targeted coaching.',
    results: ['Fully personalised to each candidate\'s CV and target role', 'AI recruiter conducts realistic multi-question interviews', 'Detailed performance evaluation and scoring', 'Targeted coaching to improve specific weak areas', 'Confidence building through repetition and feedback'],
    imageLabels: ['Interview Interface', 'Feedback & Scoring View'],
  },
  {
    slug: 'insurance-analytics',
    href: '/projects/insurance-analytics',
    title: 'Motor Insurance Pricing Analytics',
    category: ['Data Analytics'],
    type: 'MSc Academic', year: '2022', hue: 'orange', emoji: '📊',
    tagline: '+27% pricing accuracy · -15% cost of risk',
    metric: { value: '+27%', label: 'pricing accuracy' },
    tech: ['R Studio', 'Power BI', 'MS Excel', 'Predictive Modelling', 'Statistical Analysis', 'Market Research'],
    overview: 'Forecasted expected claim cost per vehicle and risk profile for a motor insurance company, enabling competitive pricing against market competitors using predictive modelling.',
    challenge: 'Motor insurance pricing based on insufficient historical analysis was leading to mispriced policies — either too high to win business or too low to cover risk.',
    solution: 'Analysed historical sales data, built predictive models for claim cost and risk profiles, and evaluated market trends to develop a competitive pricing framework.',
    results: ['27% improvement in pricing accuracy', '15% reduction in cost of risk', 'Competitive pricing model benchmarked against market data', 'Risk profiling by vehicle type, age, and driver history'],
    imageLabels: ['Risk Model Dashboard', 'Pricing Analysis Report'],
  },
]

export type SkillGroup = { category: string; hue: Hue; blurb: string; skills: { name: string; match?: string[] }[] }

// `match` lists project tech tags that count as using this skill (for the skill explorer).
export const skillGroups: SkillGroup[] = [
  {
    category: 'Data & Analytics', hue: 'accent', blurb: 'Turning raw, messy data into numbers people can act on.',
    skills: [
      { name: 'Python (Pandas, NumPy)', match: ['Python'] }, { name: 'R Studio', match: ['R Studio'] }, { name: 'Power BI', match: ['Power BI'] },
      { name: 'PostgreSQL' }, { name: 'MS Excel (Advanced)', match: ['MS Excel', 'Excel Automation'] }, { name: 'IBM SPSS Modeller' }, { name: 'Stata' },
      { name: 'SIMUL8' }, { name: 'Predictive Modelling', match: ['Predictive Modelling', 'Statistical Analysis'] }, { name: 'KPI Design' }, { name: 'Scikit-learn' }, { name: 'DEAP' },
    ],
  },
  {
    category: 'AI, ML & Automation', hue: 'green', blurb: 'Agents and pipelines that do real work, unattended.',
    skills: [
      { name: 'Agentic AI Systems', match: ['Agentic AI'] }, { name: 'NLP', match: ['NLP'] }, { name: 'Sentiment Analysis', match: ['Sentiment Analysis'] },
      { name: 'AI Voice Agents', match: ['Voice AI'] }, { name: 'Workflow Automation', match: ['Email Automation', 'Excel Automation'] }, { name: 'Model Retraining', match: ['LoRA'] },
      { name: 'Prompt Engineering', match: ['Prompt Engineering', 'LLM Integration'] }, { name: 'Smart Search Integration', match: ['AI Smart Search'] },
    ],
  },
  {
    category: 'Software & Web', hue: 'blue', blurb: 'Full-stack apps that teams use every single day.',
    skills: [
      { name: 'Python (Backend)', match: ['Python'] }, { name: 'React JS', match: ['React JS', 'React Native'] }, { name: 'Next.js', match: ['Next.js'] },
      { name: 'MongoDB', match: ['MongoDB'] }, { name: 'Full-Stack Development', match: ['Cross-Platform Development'] }, { name: 'API Integration', match: ['QuickBooks API', 'Nourish Care API', 'LinkedIn API', 'Indeed API'] },
      { name: 'Core Web Vitals', match: ['Core Web Vitals'] }, { name: 'SEO Optimisation', match: ['Technical SEO'] }, { name: 'Website Performance', match: ['Core Web Vitals'] },
    ],
  },
  {
    category: 'Business & Strategy', hue: 'violet', blurb: 'Speaking the language of finance, compliance and ops.',
    skills: [
      { name: 'Business Process Analysis' }, { name: 'Financial Modelling' }, { name: '5-Year Business Planning' }, { name: 'KPI Frameworks', match: ['Dashboard Design'] },
      { name: 'SharePoint Admin', match: ['SharePoint'] }, { name: 'ISO 9001:2015' }, { name: 'CQC Audit Support' }, { name: 'Strategic Planning', match: ['Market Research'] },
    ],
  },
  {
    category: 'Design & Architecture', hue: 'orange', blurb: 'From floor plans to interfaces.',
    skills: [
      { name: 'AutoCAD (Floor Plans)' }, { name: 'SketchUp Pro' }, { name: 'V-Ray Rendering' }, { name: '3D Architectural Models' }, { name: 'UI/UX Design', match: ['Healthcare UX', 'Landing Page Design'] },
    ],
  },
  {
    category: 'Marketing & Ads', hue: 'pink', blurb: 'Getting the right people to the thing you built.',
    skills: [
      { name: 'Google Ads', match: ['Google Ads'] }, { name: 'Meta Ads', match: ['Meta Ads'] }, { name: 'Landing Page Design', match: ['Landing Page Design'] },
      { name: 'SEO Strategy', match: ['Technical SEO'] }, { name: 'Campaign Attribution' }, { name: 'Conversion Tracking' },
    ],
  },
]

export const marqueeTech = ['Python', 'Power BI', 'React', 'Next.js', 'MongoDB', 'PostgreSQL', 'Agentic AI', 'NLP', 'Voice Agents', 'R Studio', 'SharePoint', 'Google Ads', 'ComfyUI', 'QuickBooks API', 'Excel', 'GA4']
