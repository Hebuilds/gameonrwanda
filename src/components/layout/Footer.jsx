import { Link } from 'react-router-dom'
import { GiBasketballBall } from 'react-icons/gi'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import { COMPANY_INFO } from '../../constants/teams'

const footerLinks = {
  League:   [
    { label: 'Teams',     path: '/teams'     },
    { label: 'Players',   path: '/players'   },
    { label: 'Standings', path: '/standings' },
    { label: 'Fixtures',  path: '/fixtures'  },
  ],
  Content:  [
    { label: 'News',      path: '/news'      },
    { label: 'Gallery',   path: '/gallery'   },
  ],
  Company:  [
    { label: 'About Us',  path: '/about'     },
    { label: 'Contact',   path: '/contact'   },
    { label: 'Team Login',path: '/login'     },
  ],
}

const socials = [
  { icon: FaFacebook,  href: '#' },
  { icon: FaTwitter,   href: '#' },
  { icon: FaInstagram, href: '#' },
  { icon: FaYoutube,   href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-pitch-mid border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand — spans 2 cols */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-amber rounded-xl flex items-center justify-center
                              shadow-lg shadow-amber/30">
                <GiBasketballBall className="text-pitch text-xl" />
              </div>
              <div>
                <div className="font-display text-lg tracking-widest text-amber leading-none">
                  GAME ON RWANDA
                </div>
                <div className="font-display text-[10px] tracking-[3px] text-white/25 leading-none mt-0.5">
                  LOYAL TO THE SOIL
                </div>
              </div>
            </div>

            <p className="text-white/35 text-sm leading-relaxed mb-4 max-w-xs">
              Rwanda's premier corporate sports management organization — transforming workplace
              culture through the power of sport.
            </p>

            {/* Initiative badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                            bg-amber/10 border border-amber/20 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber" />
              <span className="text-amber text-xs font-bold tracking-wide">
                Sport Saves Lives
              </span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href }, i) => (
                <a key={i} href={href}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                             text-white/35 hover:bg-amber/20 hover:text-amber transition-all">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-white/30 mb-4">
                {heading}
              </div>
              <ul className="space-y-2.5">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <Link to={path}
                      className="text-sm text-white/45 hover:text-amber transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row
                        items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Game On Rwanda · Rwanda Corporate League.
            All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.gameonrwanda.com" target="_blank" rel="noreferrer"
              className="text-white/20 text-xs hover:text-amber transition-colors">
              www.gameonrwanda.com
            </a>
            <span className="text-white/10">·</span>
            <span className="text-white/20 text-xs">🇷🇼 Kigali, Rwanda</span>
          </div>
        </div>
      </div>
    </footer>
  )
}