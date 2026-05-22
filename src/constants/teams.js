export const SPORTS = ['Basketball', 'Football', 'Volleyball']

export const TEAMS = [
  {
    id: 1,
    slug: 'bk',
    name: 'BK BBC',
    fullName: 'Bank of Kigali BBC',
    institution: 'Bank of Kigali',
    sport: 'Basketball',
    founded: 2018,
    players: 12,
    wins: 7,
    losses: 1,
    status: 'active',
    achievement: 'RCL Champions 2024 & 2025',
    description:
      'The champions of the Rwanda Corporate League 2024 and 2025. In 2024 BK defeated Equity. In 2025 BK defeated REG. The gold standard of corporate basketball in Rwanda.',
  },
  {
    id: 2,
    slug: 'equity',
    name: 'EQUITY',
    fullName: 'Equity Bank BBC',
    institution: 'Equity Bank Rwanda',
    sport: 'Basketball',
    founded: 2019,
    players: 12,
    wins: 5,
    losses: 3,
    status: 'active',
    achievement: 'RCL Runner-Up 2024 · 4th RCL 2025',
    description:
      'Runner-up of the Rwanda Corporate League 2024. Equity has been a consistent force in the RCL, finishing 2nd in 2024. A highly competitive squad representing Equity Bank Rwanda.',
  },
  {
    id: 3,
    slug: 'reg',
    name: 'REG BBC',
    fullName: 'Rwanda Energy Group BBC',
    institution: 'Rwanda Energy Group',
    sport: 'Basketball',
    founded: 2019,
    players: 12,
    wins: 6,
    losses: 2,
    status: 'active',
    achievement: 'RCL Runner-Up 2025 · 2nd RCL 2025',
    description:
      'REG BBC has been a consistent performer in the Rwanda Corporate League, finishing 2nd in RCL 2025. Rwanda Energy Group brings real energy to the court.',
  },
  {
    id: 4,
    slug: 'dgie',
    name: 'DGIE',
    fullName: 'Immigration - DGIE',
    institution: 'Directorate General of Immigration & Emigration',
    sport: 'Basketball',
    founded: 2019,
    players: 12,
    wins: 4,
    losses: 4,
    status: 'active',
    achievement: '3rd Place RCL 2024 & 2025',
    description:
      'DGIE has established themselves as one of the biggest corporate teams in RCL, finishing 3rd in both 2024 and 2025. A proud representative of Rwanda\'s immigration service.',
  },
  {
    id: 5,
    slug: 'rwandair',
    name: 'RWANDAIR',
    fullName: 'RwandAir Eagles',
    institution: 'RwandAir',
    sport: 'Basketball',
    founded: 2019,
    players: 12,
    wins: 4,
    losses: 4,
    status: 'active',
    achievement: 'RCL Founding Member 2024',
    description:
      'During the RCL inauguration in 2024, RwandAir sent a great statement as one of the leading companies in sport. The national carrier flying high both in the skies and on the court.',
  },
  {
    id: 6,
    slug: 'ihs',
    name: 'IHS RWANDA',
    fullName: 'IHS Rwanda',
    institution: 'IHS Rwanda',
    sport: 'Basketball',
    founded: 2020,
    players: 11,
    wins: 3,
    losses: 5,
    status: 'active',
    achievement: 'Youth Employment Champion',
    description:
      'IHS Rwanda has proven to be among the best corporate companies by giving job opportunities to young athletes. A team that represents both sport and social impact.',
  },
  {
    id: 7,
    slug: 'gasabo-3d',
    name: 'GASABO 3D',
    fullName: 'Gasabo 3D Basketball',
    institution: 'Gasabo District',
    sport: 'Basketball',
    founded: 2021,
    players: 11,
    wins: 2,
    losses: 6,
    status: 'active',
    achievement: 'RCL 2025 Participant',
    description:
      'Gasabo District\'s competitive basketball program. Known for developing local talent and representing community basketball in the Rwanda Corporate League.',
  },
]

export const BASKETBALL_POSITIONS = [
  'All Positions',
  'Point Guard',
  'Shooting Guard',
  'Small Forward',
  'Power Forward',
  'Center',
]

export const PLAYERS = [
  // BK BBC
  { id:1,  name:'Shyaka Olivier',       team:'BK BBC',      institution:'Bank of Kigali',       position:'Small Forward',  number:7,  age:27, status:'verified', note:'RCL 2025 Scoring Leader — 107 PTS' },
  { id:2,  name:'Icyishatse Herve',      team:'BK BBC',      institution:'Bank of Kigali',       position:'Center',         number:5,  age:25, status:'verified', note:'RCL 2025 Scoring Leader — 93 PTS'  },
  { id:3,  name:'Jean Claude Mugisha',   team:'BK BBC',      institution:'Bank of Kigali',       position:'Point Guard',    number:1,  age:28, status:'verified' },
  { id:4,  name:'Patrick Niyonzima',     team:'BK BBC',      institution:'Bank of Kigali',       position:'Shooting Guard', number:3,  age:25, status:'verified' },
  { id:5,  name:'Eric Habimana',         team:'BK BBC',      institution:'Bank of Kigali',       position:'Power Forward',  number:11, age:26, status:'verified' },
  // EQUITY
  { id:6,  name:'Niyungeko Jean de Dieu',team:'EQUITY',      institution:'Equity Bank Rwanda',   position:'Point Guard',    number:13, age:24, status:'verified', note:'RCL 2025 Assist Leader — 15 AST' },
  { id:7,  name:'Kevin Mutabazi',        team:'EQUITY',      institution:'Equity Bank Rwanda',   position:'Shooting Guard', number:4,  age:22, status:'verified' },
  { id:8,  name:'Alain Rukundo',         team:'EQUITY',      institution:'Equity Bank Rwanda',   position:'Power Forward',  number:9,  age:30, status:'verified' },
  // REG BBC
  { id:9,  name:'Isezerano Enock',       team:'REG BBC',     institution:'Rwanda Energy Group',  position:'Center',         number:0,  age:29, status:'verified', note:'RCL 2025 Scoring Leader — 148 PTS' },
  { id:10, name:'Yves Nzabonimpa',       team:'REG BBC',     institution:'Rwanda Energy Group',  position:'Point Guard',    number:3,  age:26, status:'verified' },
  { id:11, name:'Fiston Kamanzi',        team:'REG BBC',     institution:'Rwanda Energy Group',  position:'Power Forward',  number:14, age:28, status:'verified' },
  // DGIE
  { id:12, name:'Jonathan Inkindi',      team:'DGIE',        institution:'DGIE Rwanda',          position:'Point Guard',    number:7,  age:27, status:'verified', note:'RCL 2025 Assist Leader — 21 AST' },
  { id:13, name:'Bruno Nyamwasa',        team:'DGIE',        institution:'DGIE Rwanda',          position:'Center',         number:9,  age:31, status:'verified', note:'RCL 2025 — 9 REB' },
  // RWANDAIR
  { id:14, name:'Thierry Ishimwe',       team:'RWANDAIR',    institution:'RwandAir',             position:'Point Guard',    number:1,  age:25, status:'verified' },
  { id:15, name:'Frank Ntwali',          team:'RWANDAIR',    institution:'RwandAir',             position:'Center',         number:10, age:24, status:'pending'  },
  // IHS
  { id:16, name:'Bayisenge Jean de Dieu',team:'IHS RWANDA',  institution:'IHS Rwanda',           position:'Shooting Guard', number:6,  age:27, status:'verified', note:'RCL 2025 Assist Leader — 16 AST' },
  { id:17, name:'Clement Habineza',      team:'IHS RWANDA',  institution:'IHS Rwanda',           position:'Small Forward',  number:12, age:23, status:'pending'  },
  // GASABO 3D
  { id:18, name:'Alex Nkurunziza',       team:'GASABO 3D',   institution:'Gasabo District',      position:'Point Guard',    number:2,  age:23, status:'verified' },
  { id:19, name:'Bosco Tuyishime',       team:'GASABO 3D',   institution:'Gasabo District',      position:'Small Forward',  number:8,  age:26, status:'pending'  },
]

export const STANDINGS = [
  { pos:1, team:'BK BBC',     played:8, won:7, lost:1, pf:684, pa:598, diff:86,  pct:.875, streak:'W5', form:['W','W','W','W','W'] },
  { pos:2, team:'REG BBC',    played:8, won:6, lost:2, pf:651, pa:612, diff:39,  pct:.750, streak:'W3', form:['W','W','W','L','W'] },
  { pos:3, team:'DGIE',       played:8, won:5, lost:3, pf:632, pa:619, diff:13,  pct:.625, streak:'L1', form:['W','L','W','W','L'] },
  { pos:4, team:'EQUITY',     played:8, won:4, lost:4, pf:618, pa:625, diff:-7,  pct:.500, streak:'W1', form:['L','W','L','L','W'] },
  { pos:5, team:'RWANDAIR',   played:8, won:3, lost:5, pf:599, pa:631, diff:-32, pct:.375, streak:'L2', form:['L','L','W','L','W'] },
  { pos:6, team:'IHS RWANDA', played:8, won:3, lost:5, pf:588, pa:634, diff:-46, pct:.375, streak:'L1', form:['W','L','L','W','L'] },
  { pos:7, team:'GASABO 3D',  played:8, won:2, lost:6, pf:564, pa:660, diff:-96, pct:.250, streak:'L3', form:['L','L','L','W','L'] },
]

export const FIXTURES = [
  { id:1, round:'Week 9', home:'BK BBC',    away:'EQUITY',    date:'May 18, 2025', time:'15:00', venue:'Kigali Arena',            status:'upcoming' },
  { id:2, round:'Week 9', home:'REG BBC',   away:'RWANDAIR',  date:'May 18, 2025', time:'17:00', venue:'Remera Gymnasium',        status:'upcoming' },
  { id:3, round:'Week 9', home:'DGIE',      away:'GASABO 3D', date:'May 19, 2025', time:'14:00', venue:'Kigali Arena',            status:'upcoming' },
  { id:4, round:'Week 9', home:'IHS RWANDA',away:'REG BBC',   date:'May 21, 2025', time:'16:00', venue:'Amahoro Sports Complex',  status:'upcoming' },
  { id:5, round:'Week 8', home:'BK BBC',    away:'REG BBC',   date:'May 10, 2025', time:'15:00', venue:'Kigali Arena',            status:'completed', homeScore:82, awayScore:71 },
  { id:6, round:'Week 8', home:'EQUITY',    away:'DGIE',      date:'May 10, 2025', time:'17:00', venue:'Remera Gymnasium',        status:'completed', homeScore:75, awayScore:68 },
  { id:7, round:'Week 8', home:'RWANDAIR',  away:'IHS RWANDA',date:'May 11, 2025', time:'14:00', venue:'Kigali Arena',            status:'completed', homeScore:79, awayScore:74 },
  { id:8, round:'Week 7', home:'GASABO 3D', away:'BK BBC',    date:'May 3,  2025', time:'15:00', venue:'Amahoro Sports Complex',  status:'completed', homeScore:58, awayScore:91 },
]

// Company info — used across About page, Footer, etc.
export const COMPANY_INFO = {
  name:       'Game On Rwanda',
  shortName:  'GOR',
  tagline:    'Loyal To The Soil',
  initiative: 'Sport Saves Lives',
  website:    'www.gameonrwanda.com',
  leagueName: 'Rwanda Corporate League',
  shortLeague:'RCL',
  founded:    2024,
  about: 'Game On is a purpose-led sports management organization committed to transforming corporate culture through structured and impactful sport tournaments. We leverage the power of sports to enhance employee wellness, promote mental health awareness, and strengthen inter-company networks across Rwanda.',
  mission: 'To use the power of sport to promote employee wellness, support mental health awareness, and strengthen collaboration among companies — creating healthier corporate communities and a more productive workforce in Rwanda.',
  vision: 'To become Rwanda\'s leading sports management and corporate wellness platform, using sport as transformative tools to inspire healthier lifestyles, strengthen workplace culture, and drive social impact across Africa.',
  impact: [
    { stat: '141+', label: 'Kids Back to School', desc: 'Through our #BackToSchool collaboration with Save the Children Rwanda in 2026.' },
    { stat: '7,300', label: 'Social Media Reach', desc: 'People learning about physical and mental wellness through sport activity.' },
    { stat: '300+', label: 'Youth Engaged', desc: 'Kids in Busanza – Rwanco village learning about the effects of drugs on mental health.' },
  ],
  pillars: [
    { num:'01', title:'Inclusivity & Empowerment', desc:'Promoting equal participation by engaging people with disabilities, ensuring that everyone has an opportunity to be part of the game.' },
    { num:'02', title:'Corporate Wellness', desc:'Providing a platform that encourages employees to stay active, improve their physical and mental health, and embrace healthier lifestyles.' },
    { num:'03', title:'Collaboration & Networking', desc:'Serving as a unique hub where organizations connect, share experiences, and build stronger partnerships through teamwork and competition.' },
  ],
  expansionPlans: [
    { num:'01', title:'Regional Expansion', desc:'Extend the Rwanda Corporate League model to other East African countries, beginning with Kenya. Establish cross-border corporate sports tournaments fostering regional corporate engagement.' },
    { num:'02', title:'Diversification of Sports', desc:'Introduce additional sporting disciplines to integrate with people with disabilities — like wheelchair basketball or amputee football.' },
    { num:'03', title:'Community Development', desc:'Partner with schools and youth academies to nurture the next generation of all sports in Rwanda. Launch CSR-driven programs linking corporate players with underprivileged communities.' },
  ],
}