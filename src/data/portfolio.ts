export const person = {
  name: 'Your Name',
  monogram: 'yn',
  email: 'hello@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
};

export interface Project {
  slug: string;
  number: string;
  name: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  repo: string;
  live?: string;
  visual: 'server' | 'security' | 'wifi' | 'motion';
  note: string;
  problem: string;
  approach: string[];
  outcome: string;
  highlights: { value: string; label: string }[];
}

export const projects: Project[] = [
  {
    slug: 'server-core',
    number: '01',
    name: 'Server Core',
    category: 'SYSTEMS / INFRASTRUCTURE',
    year: '2026',
    role: 'Lead Architect',
    summary:
      'A modular server management console with live telemetry, container orchestration, and real-time event streaming.',
    stack: ['Python', 'Linux', 'Nginx', 'Docker', 'SSE'],
    repo: 'https://github.com/yourusername/server-core',
    visual: 'server',
    note: 'MODULAR CONTROL CENTER',
    problem:
      'Managing distributed home and cloud servers often requires context-switching across separate terminals and dashboards. Server Core unifies infrastructure monitoring into one responsive control room.',
    approach: [
      'Built a modular Python and async service layer behind an Nginx reverse proxy with live telemetry.',
      'Streamed metrics with Server-Sent Events (SSE), transmitting diffs rather than full states to reduce bandwidth consumption.',
      'Designed UNIX domain socket identity resolution for fast, zero-overhead authentication.',
      'Orchestrated service lifecycles, backup sync routines, and network routing in a single glassmorphic dashboard.',
    ],
    outcome:
      'A lightweight and modular server dashboard with reusable components for health monitoring, log streaming, and system control.',
    highlights: [
      { value: '>50%', label: 'bandwidth reduction' },
      { value: '<2 ms', label: 'auth latency' },
      { value: 'SSE', label: 'real-time streaming' },
    ],
  },
  {
    slug: 'spectre-engine',
    number: '02',
    name: 'Spectre Engine',
    category: 'SECURITY / ANALYSIS',
    year: '2025',
    role: 'Core Developer',
    summary:
      'Multi-stage binary analysis pipeline combining static decompilation, dynamic execution traces, and threat intelligence.',
    stack: ['Python', 'Radare2', 'YARA', 'Docker', 'NetworkX'],
    repo: 'https://github.com/yourusername/spectre-engine',
    visual: 'security',
    note: 'ANALYSIS PIPELINE DIAGRAM',
    problem:
      'Investigating suspicious software requires correlating structural signatures with runtime behaviors and threat databases.',
    approach: [
      'Integrated Radare2 for control-flow graph construction and YARA for pattern recognition against known threat families.',
      'Combined static inspection with isolated runtime monitoring in containerized sandboxes.',
      'Added automated threat-intelligence lookup integrations for real-time risk classification.',
      'Built an interactive graph visualizer and structured CLI reporting engine.',
    ],
    outcome:
      'An extensible security analysis suite combining static, dynamic, and graph-based investigation into a unified workflow.',
    highlights: [
      { value: 'Static', label: 'rules and CFG' },
      { value: 'Dynamic', label: 'sandbox tracing' },
      { value: 'Graph', label: 'interactive visualization' },
    ],
  },
  {
    slug: 'portal-flow',
    number: '03',
    name: 'Portal Flow',
    category: 'MOBILE / NETWORKING',
    year: '2026',
    role: 'Mobile Engineer',
    summary:
      'Frictionless network authentication companion app with automatic keepalive and session management.',
    stack: ['Kotlin', 'Jetpack Compose', 'OkHttp', 'Coroutines'],
    repo: 'https://github.com/yourusername/portal-flow',
    live: 'https://github.com/yourusername/portal-flow',
    visual: 'wifi',
    note: 'NETWORK SESSION WORKFLOW',
    problem:
      'Captive portal logins disconnect frequently and introduce friction when switching networks or waking from standby.',
    approach: [
      'Developed a modern Android client using Jetpack Compose and clean architecture principles.',
      'Implemented an event-driven background keepalive service using OkHttp and Kotlin Coroutines.',
      'Handled network transitions seamlessly with custom socket bindings and handover detection.',
      'Secured stored credentials with hardware-backed AES-256 encryption.',
    ],
    outcome:
      'A robust mobile utility that automates network reconnects and maintains persistent connectivity.',
    highlights: [
      { value: 'Instant', label: 'one-tap reconnect' },
      { value: 'Modern', label: 'Kotlin + Compose' },
      { value: 'Secure', label: 'AES-256 encryption' },
    ],
  },
  {
    slug: 'kinematics',
    number: '04',
    name: 'Kinematics',
    category: 'VISION / ANIMATION',
    year: '2026',
    role: 'Research Contributor',
    summary:
      'Real-time skeletal tracking and temporal coherence filtering for natural computer vision animation.',
    stack: ['Python', 'MediaPipe', 'OpenCV', 'NumPy'],
    repo: 'https://github.com/yourusername/kinematics',
    visual: 'motion',
    note: 'TEMPORAL POSE PIPELINE',
    problem:
      'Standard per-frame pose estimation models suffer from high-frequency jitter and temporal inconsistency across video sequences.',
    approach: [
      'Built a real-time tracking pipeline with MediaPipe and OpenCV.',
      'Applied temporal cohesion filters across consecutive frames to smooth joint trajectories.',
      'Explored 3D depth extrapolation to upgrade 2D coordinate streams into spatial skeletons.',
      'Benchmarked inference latency across edge devices and optimized array operations with NumPy.',
    ],
    outcome:
      'An open-source computer vision toolkit producing smooth, animation-ready skeletal motion data.',
    highlights: [
      { value: '2D → 3D', label: 'spatial tracking' },
      { value: 'Smooth', label: 'temporal filtering' },
      { value: 'Real-time', label: '60 FPS inference' },
    ],
  },
];

export const otherProjects = [
  {
    name: 'Log Stream',
    category: 'NETWORKING',
    description: 'High-throughput UDP log aggregator with SDN priority queues for mission-critical events.',
    stack: 'Python / AsyncIO / Mininet',
    href: 'https://github.com/yourusername/log-stream',
  },
  {
    name: 'Code Study App',
    category: 'EDUCATION',
    description: 'Interactive computer science learning platform with live code playgrounds and flashcards.',
    stack: 'React / TypeScript / Vite',
    href: 'https://github.com/yourusername/code-study-app',
    live: 'https://example.com',
  },
  {
    name: 'Task Planner',
    category: 'PRODUCTIVITY',
    description: 'Intelligent task management application with dependency graphs and timeline scheduling.',
    stack: 'TypeScript / React / Node.js',
    href: 'https://github.com/yourusername/task-planner',
  },
  {
    name: 'Expense Tracker',
    category: 'FINANCE',
    description: 'Clean personal finance tracker with categorization, exportable reports, and chart metrics.',
    stack: 'Python / SQLite',
    href: 'https://github.com/yourusername/expense-tracker',
  },
];
