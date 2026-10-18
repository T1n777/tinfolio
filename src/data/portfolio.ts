export const person = {
  name: 'Yatin Rajesh',
  monogram: 'yr',
  email: 'yatinrajesh123@gmail.com',
  github: 'https://github.com/T1n777',
  linkedin: 'https://www.linkedin.com/in/yatin-rajesh-8a8aa1202/',
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
    slug: 'tinarchy',
    number: '01',
    name: 'Tinarchy',
    category: 'SYSTEMS / SELF-HOSTING',
    year: '2026',
    role: 'Developer',
    summary:
      'A home server, with a proper control room. Live telemetry, service orchestration, and a little less SSH.',
    stack: ['Python', 'Linux', 'Nginx', 'Tailscale', 'SSE'],
    repo: 'https://github.com/T1n777/Tinarchy',
    visual: 'server',
    note: 'REAL INTERFACE · TIN’S HOME SERVER',
    problem:
      'A headless home server is useful until managing it means jumping between terminals, service logs, and separate dashboards. Tinarchy brings that scattered workflow into one control center.',
    approach: [
      'Built a modular Python backend behind Nginx, with a glassmorphic interface for system telemetry and service controls.',
      'Streamed telemetry with Server-Sent Events. Sending changed fields instead of entire snapshots reduced telemetry bandwidth by more than 50%, as recorded in the project documentation.',
      'Used the Tailscale UNIX domain socket for identity resolution, avoiding subprocess overhead and achieving documented verification latency below 2 ms.',
      'Connected Systemd services, Syncthing synchronization, headless JDownloader link submission, and Tor routing into a shared management interface.',
    ],
    outcome:
      'A working control center for my own Linux server, with reusable modules for authentication, telemetry, services, and reports. The repository now documents the broader ecosystem as Pinedash.',
    highlights: [
      { value: '>50%', label: 'less telemetry bandwidth' },
      { value: '<2 ms', label: 'identity resolution' },
      { value: 'SSE', label: 'live delta updates' },
    ],
  },
  {
    slug: 'spectreflow',
    number: '02',
    name: 'SpectreFlow',
    category: 'SECURITY / ANALYSIS',
    year: '2025',
    role: 'Developer · Genesys 2.0 hackathon',
    summary:
      'Following the traces a threat leaves behind. Static analysis, runtime behavior, and intelligence in one place.',
    stack: ['Python', 'Radare2', 'YARA', 'Docker', 'NetworkX'],
    repo: 'https://github.com/T1n777/SpectreFlow',
    visual: 'security',
    note: 'ANALYSIS PIPELINE · CONCEPT DIAGRAM',
    problem:
      'A suspicious executable rarely tells its story through a single signal. SpectreFlow combines file structure, runtime behavior, and known-threat intelligence to make that story easier to investigate.',
    approach: [
      'Integrated Radare2 to generate control flow graphs and YARA rules to detect patterns associated with ransomware, keyloggers, and anti-debugging behavior.',
      'Combined static inspection with process, network, and filesystem monitoring. Docker provides the isolated analysis environment for Linux targets.',
      'Added hash-based lookups against VirusTotal and MalwareBazaar to bring external threat intelligence into the analysis workflow.',
      'Built a Tkinter dashboard for live logs, risk scoring, and interactive graph visualization, alongside a CLI and JSON reporting.',
    ],
    outcome:
      'A hackathon-built malware analysis suite that connects multiple kinds of evidence in a single workflow. Developed for the Genesys 2.0 hackathon at PES University.',
    highlights: [
      { value: 'Static', label: 'file and rule analysis' },
      { value: 'Dynamic', label: 'runtime monitoring' },
      { value: 'Graph', label: 'control flow visualization' },
    ],
  },
  {
    slug: 'pesu-wifi',
    number: '03',
    name: 'PESU WiFi',
    category: 'ANDROID / EVERYDAY TOOLS',
    year: '2026',
    role: 'Collaborative development',
    summary:
      'Campus WiFi that stays out of your way. One tap to connect, switch accounts, and get back to work.',
    stack: ['Kotlin', 'Jetpack Compose', 'OkHttp', 'Coroutines'],
    repo: 'https://github.com/imyash0722/pesu-wifi-android',
    live: 'https://imyash0722.github.io/pesu-wifi-android/',
    visual: 'wifi',
    note: 'CONNECTION FLOW · CONCEPT ILLUSTRATION',
    problem:
      'Campus captive portals interrupt the simple act of getting online. Connections expire, roaming between access points can break a session, and switching accounts adds friction.',
    approach: [
      'Developed a native Kotlin app with Jetpack Compose and Material 3 for portal login, session management, and one-tap multi-account switching.',
      'Worked on an event-driven background keepalive engine using OkHttp, AlarmManager, and coroutines, with an idle mode outside campus networks.',
      'Implemented direct Wi-Fi SocketFactory binding and BSSID handover verification to handle network transitions and cellular fallback.',
      'Used AES-256 encrypted credential storage through AndroidX Crypto. The shared project continues to evolve with roaming improvements and diagnostic tools.',
    ],
    outcome:
      'An Android companion that automates the repetitive parts of campus connectivity. This is a shared project; the canonical repository and release website are maintained under imyash0722.',
    highlights: [
      { value: '1 tap', label: 'account switching' },
      { value: 'Native', label: 'Kotlin + Compose' },
      { value: 'AES-256', label: 'credential encryption' },
    ],
  },
  {
    slug: 'kinemation',
    number: '04',
    name: 'Kinemation',
    category: 'RESEARCH / COMPUTER VISION',
    year: '2026',
    role: 'Pose Estimation Research Intern · ACM AIEP',
    summary:
      'Making motion make sense. Turning human movement into coherent, frame-to-frame skeletal animation.',
    stack: ['Python', 'MediaPipe', 'OpenCV', 'NumPy'],
    repo: 'https://github.com/acmpesuecc/kinemation',
    visual: 'motion',
    note: 'POSE SEQUENCE · CONCEPT ILLUSTRATION',
    problem:
      'Pose estimates can look accurate one frame at a time and still produce jittery animation. Kinemation investigates how temporal context can turn those individual estimates into coherent movement.',
    approach: [
      'Worked on a real-time human pose estimation pipeline using MediaPipe and OpenCV during the ACM Industrial Experience Program.',
      'Researched temporal cohesion techniques to improve stability between consecutive frames, rather than treating each pose as an isolated prediction.',
      'Explored 3D pose estimation to extend the pipeline beyond 2D skeletal tracking.',
      'Contributed within the Kinemation research team. The shared repository documents the wider pipeline, including keypoint adaptation and temporal smoothing approaches.',
    ],
    outcome:
      'Research experience connecting computer vision papers to an implementation, with a focus on temporal consistency. Internship period: January–April 2026. The team repository tracks ongoing research and implementation.',
    highlights: [
      { value: '2D → 3D', label: 'pose exploration' },
      { value: 'Temporal', label: 'frame-to-frame coherence' },
      { value: 'ACM', label: 'industrial experience program' },
    ],
  },
];

export const otherProjects = [
  {
    name: 'Chronos Log',
    category: 'NETWORKING',
    description: 'Distributed UDP logging with SDN prioritization for critical messages.',
    stack: 'Python / OpenFlow / Mininet',
    href: 'https://github.com/T1n777/Chronos_Log',
  },
  {
    name: 'PSWC Study App',
    category: 'EDUCATION',
    description: 'A C programming companion with practice problems, flashcards, and lab prep.',
    stack: 'React / TypeScript',
    href: 'https://github.com/T1n777/pswc-study-app',
    live: 'https://pswc-study-app.vercel.app',
  },
  {
    name: 'AI Task Manager',
    category: 'PRODUCTIVITY',
    description: 'AI-assisted task structuring and prioritization in a Python desktop app.',
    stack: 'Python / wxPython / LLM APIs',
    href: 'https://github.com/T1n777/AI-Task-Manager',
  },
  {
    name: 'Personal Expense Tracker',
    category: 'EVERYDAY TOOLS',
    description: 'A desktop expense log with categories, calendar selection, and summaries.',
    stack: 'Python / Tkinter',
    href: 'https://github.com/T1n777/Personal-Expense-Tracker',
  },
];
