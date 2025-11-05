import type React from "react"
import { Linkedin, Mail, Phone, MapPin, X } from "lucide-react"
import { useState } from 'react'; 
import logo from "../../assets/logoimg.png"
// import { Button } from "@/components/ui/button"

// --- EXISTING PRIVACY POLICY MODAL COMPONENT (Re-used for completeness) ---

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const policyContent = {
    effectiveDate: "4th Nov 2025",
    lastUpdated: "4th Nov 2025",
    company: "Orion Eduverse Pvt. Ltd",
    platform: "OmVerg",
    introduction: "Orion Eduverse Pvt. Ltd (“Company”, “we”, “our”, or “us”) operates OmVerg (“Platform”), which connects students, startups, and other stakeholders in the professional development, networking, and startup ecosystem.\n\nWe value your trust and are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform.",
    sections: [
      {
        title: "1. Information We Collect",
        content: [
          "We may collect the following categories of information:",
          "*a. From Students*\nName, email address, phone number, profile details\nEducational background, skills, interests, uploaded documents (e.g., resumes, certificates)\nCourse participation, learning activity, assessments",
          "*b. From Startups*\nFounder/team details, company name, contact information\nStartup profiles, pitch decks, documents, and progress updates\nHiring or collaboration preferences",
          "*c. Automatically Collected Data*\nDevice information (browser, OS, IP address)\nPlatform usage data (logins, activity, interactions)\nCookies and similar technologies (for session management and analytics)",
        ]
      },
      {
        title: "2. How We Use Your Information",
        content: [
          "We use collected information to:",
          "* Create and manage user accounts",
          "* Facilitate networking between students, startups, and other stakeholders",
          "* Enable startups to showcase their profiles and connect with other stakeholders",
          "* Monitor usage and improve Platform functionality",
          "* Send important notifications, updates, or service-related messages",
          "* Ensure safety, compliance, and fraud prevention",
        ]
      },
      {
        title: "3. How We Share Information",
        content: [
          "We do not sell your personal data. We may share information:",
          "* With other users of the Platform (e.g., students viewing startup profiles, startups viewing student profiles) based on user preferences and Platform functionality",
          "* With service providers who support Platform operations (hosting, analytics, communications)",
          "* If required by law, regulation, or legal process",
          "* During a business transfer (merger, acquisition, or asset sale)",
        ]
      },
      {
        title: "4. Data Retention",
        content: ["We retain your information as long as your account is active or as needed to provide services. If you request account deletion, we will delete your personal data, except where retention is legally required."],
      },
      {
        title: "5. Your Rights",
        content: [
          "Depending on your jurisdiction, you may have the right to:",
          "* Access, update, or delete your personal data",
          "* Restrict or object to processing of your data",
          "* Withdraw consent for optional data uses",
          "* Request data portability",
          "To exercise these rights, contact us at *contact@omverg.com*",
        ]
      },
      {
        title: "6. Security",
        content: ["We implement reasonable administrative, technical, and physical safeguards to protect your information. However, no system is fully secure, and we cannot guarantee absolute security."],
      },
      {
        title: "7. Use by Minors",
        content: ["Our Platform is intended for individuals *16 years or older* (or the applicable minimum age in your jurisdiction). If we learn that we have collected data from a minor without proper consent, we will delete it."],
      },
      {
        title: "8. International Users",
        content: ["If you are accessing our Platform from outside India, note that your data may be transferred, stored, and processed in jurisdictions with different data protection laws."],
      },
      {
        title: "9. Updates to This Policy",
        content: ["We may update this Privacy Policy from time to time. Changes will be posted on this page with a new “Last Updated” date. If changes are significant, we will notify you via email or Platform notice."],
      },
      {
        title: "10. Contact Us",
        content: [
          "If you have questions about this Privacy Policy, please contact us at:",
          "*Orion Eduverse Pvt Ltd.*",
          "Email: contact@omverg.com",
          "Address: Ranchi, Jharkhand, India.",
        ]
      },
    ]
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm' aria-modal="true" role="dialog">
      <div className='relative w-full max-w-4xl max-h-[90vh] mx-4 my-8 p-6 md:p-10 rounded-xl shadow-2xl bg-gray-900 text-white overflow-y-auto'>
        
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4 sticky top-0 bg-gray-900 z-10">
          <h2 className='text-3xl font-bold text-indigo-400'>Privacy Policy</h2>
          <button
            onClick={onClose}
            className='p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors'
            aria-label="Close privacy policy modal"
          >
            <X className='h-6 w-6 text-white' />
          </button>
        </div>

        {/* Dates */}
        <div className="text-sm text-gray-400 mb-6 space-y-1">
          <p>Effective Date: *{policyContent.effectiveDate}*</p>
          <p>Last Updated: *{policyContent.lastUpdated}*</p>
        </div>

        {/* Introduction */}
        <p className="mb-8 text-gray-300 whitespace-pre-line">{policyContent.introduction}</p>

        {/* Policy Sections */}
        <div className="space-y-8">
          {policyContent.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-3 text-white">{section.title}</h3>
              <div className="space-y-3 text-gray-300">
                {section.content.map((paragraph, pIndex) => {
                  const contentLines = paragraph.split('\n');
                  return contentLines.map((line, lIndex) => {
                    // Check for list item
                    if (line.startsWith('* ')) {
                      return (
                        <li key={pIndex + lIndex} className="ml-5 list-disc">
                          {line.substring(2)}
                        </li>
                      );
                    }
                    // Simple bolding for sub-sections like a, b, c
                    if (line.startsWith('')) {
                       const boldedText = line.replace(/\\(.?)\\*/g, '<strong>$1</strong>');
                       return <p key={pIndex + lIndex} dangerouslySetInnerHTML={{ __html: boldedText }} />;
                    }
                    // Regular paragraph
                    return <p key={pIndex + lIndex}>{line}</p>;
                  });
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- NEW TERMS OF SERVICE MODAL COMPONENT ---

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const termsContent = [
    {
      title: '✅ 1. Acceptance of Terms',
      content: [
        'By accessing or using OmVerg, you confirm that:',
        '* You have read and agree to these Terms',
        '* You are legally capable of entering an agreement',
        '* If representing a startup, you are authorized to act on its behalf',
      ],
    },
    {
      title: '✅ 2. Eligibility',
      content: [
        'OmVerg is intended for:',
        '* Registered startups, founders, teams',
        '* Students and early-stage innovators',
        'You must be 16 years or older, unless permitted by local law or with guardian/institution authorization.',
      ],
    },
    {
      title: '✅ 3. User Accounts',
      content: [
        'You agree to provide accurate and truthful information',
        'You are responsible for maintaining the confidentiality of your login credentials',
        'You are responsible for all activities under your account',
        'OmVerg may suspend accounts involved in fraud, misinformation, harassment, or misuse',
      ],
    },
    {
      title: '✅ 4. Platform Use',
      content: [
        'OmVerg provides features such as:',
        '* Startup & user discovery',
        '* Networking and connections',
        '* Messaging & collaboration tools',
        '* Opportunity, learning, or event listings',
        'Users must not:',
        '* Impersonate others or provide false information',
        '* Upload harmful content, spam, harassment, hate speech, or illegal material',
        '* Use the platform for data scraping or unauthorized data collection',
        '* Attempt to hack or disrupt the platform',
      ],
    },
    {
      title: '✅ 5. User Content',
      content: [
        'User Content includes profile information, posts, messages, documents, and media.',
        'By submitting content, you grant OmVerg a non-exclusive, worldwide, royalty-free license to:',
        '* Store',
        '* Display',
        '* Process',
        '* Share your content as needed for platform functionality',
        'You retain ownership of your content.',
        'You agree that:',
        '* Your content does not violate any copyright or trademark laws',
        '* You have permission to share documents and media uploaded by you',
        '* Your content may be visible to other users depending on your profile settings',
      ],
    },
    {
      title: '✅ 6. Privacy & Data',
      content: ['OmVerg collects certain user information to operate the platform.By using OmVerg, you consent to the collection and handling of data as described in the Privacy Policy (published separately).'],
    },
    {
      title: '✅ 7. Communication Rules',
      content: [
        'Users must use communication features responsibly.',
        'The following are not allowed:',
        '* Harassment, bullying, threats',
        '* Fake job offers, fraud, misleading claims',
        '* Unsolicited spam messages',
        '* Misrepresentation of skills, company, or identity',
        'OmVerg may restrict messaging or remove content that violates these rules.',
      ],
    },
    {
      title: '✅ 8. Third-Party Links & Services',
      content: [
        'OmVerg may include external links or integrations.',
        'We are not responsible for:',
        '* Their content',
        '* Their policies',
        '* Any damage caused by external websites or services',
        'Interactions with third parties are at the user’s own risk.',
      ],
    },
    {
      title: '✅ 9. Intellectual Property',
      content: [
        'All platform content including design, branding, UI, features, software, and trademarks belong to OmVerg.',
        'Users may not:',
        '* Copy, modify, distribute, or reverse-engineer the platform',
        '* Create competing versions or derivative works',
      ],
    },
    {
      title: '✅ 10. Payments (If Applicable)',
      content: [
        'Some features may require a subscription or payment.',
        'If activated:',
        '* Prices and billing details will be displayed clearly before purchase',
        '* Non-payment may result in restricted access',
      ],
    },
    {
      title: '✅ 11. Termination',
      content: [
        'We may suspend or terminate access if a user:',
        '* Violates these Terms',
        '* Harms the platform or other users',
        '* Uses the platform for illegal or fraudulent actions',
        'Users may delete accounts at any time.Some user-submitted information may remain as part of platform history (messages, collaborations, openings) to maintain ecosystem integrity.',
      ],
    },
    {
      title: '✅ 12. No Guarantee of Business Outcome',
      content: [
        'OmVerg is a networking and discovery platform.',
        'We do not guarantee:',
        '* Successful partnerships',
        '* Employment or internship outcomes',
        '* Accuracy of information posted by users',
        '* Safety or legitimacy of third-party interactions',
        'Users must independently verify any opportunity or connection.',
      ],
    },
    {
      title: '✅ 13. Limitation of Liability',
      content: [
        'OmVerg is not liable for:',
        '* Losses, damages, fraud, or disputes between users',
        '* Business decisions, partnerships, contracts, or financial outcomes',
        '* Downtime, bugs, or platform interruptions',
        '* Data loss or unauthorized access',
        'Use of the platform is at your own risk.',
      ],
    },
    {
      title: '✅ 14. Changes to Terms',
      content: ['OmVerg may update these Terms as the platform evolves.When changes are posted, continued use of the platform signifies acceptance.'],
    },
    {
      title: '✅ 15. Governing Law',
      content: ['These Terms are governed by the laws of India, unless otherwise required by your local jurisdiction.'],
    },
    {
      title: '✅ 16. Contact',
      content: [
        'For questions or support:',
        '📩 Email: *contact@omverg.com*',
      ],
    },
  ];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm' aria-modal="true" role="dialog">
      <div className='relative w-full max-w-4xl max-h-[90vh] mx-4 my-8 p-6 md:p-10 rounded-xl shadow-2xl bg-gray-900 text-white overflow-y-auto'>
        
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4 sticky top-0 bg-gray-900 z-10">
          <h2 className='text-3xl font-bold text-indigo-400'>OmVerg – Terms of Service</h2>
          <button
            onClick={onClose}
            className='p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors'
            aria-label="Close terms of service modal"
          >
            <X className='h-6 w-6 text-white' />
          </button>
        </div>

        {/* Dates */}
        <div className="text-sm text-gray-400 mb-6 space-y-1">
          <p>Effective Date: *4th Nov 2025*</p>
          <p>Last Updated: *4th Nov 2025*</p>
        </div>

        {/* Introduction */}
        <p className="mb-6 text-gray-300">
          Welcome to OmVerg (“OmVerg”, “we”, “our”). OmVerg is a digital networking and collaboration platform designed for startups, students, founders, and innovators. By using OmVerg, you agree to these Terms of Service (“Terms”). If you do not agree, please discontinue use of the platform.
        </p>

        {/* Terms Sections */}
        <div className="space-y-8">
          {termsContent.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-3 text-white">{section.title}</h3>
              <div className="space-y-3 text-gray-300">
                {section.content.map((line, pIndex) => {
                  // Check for list item
                  if (line.startsWith('* ')) {
                    return (
                      <li key={pIndex} className="ml-5 list-disc">
                        {line.substring(2)}
                      </li>
                    );
                  }
                  // Simple bolding for contact email
                  const formattedLine = line.replace(/\\(.?)\\*/g, '<strong>$1</strong>');
                  return <p key={pIndex} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- FOOTER COMPONENT (MODIFIED) ---

const Footer: React.FC = () => {
  // State for modal visibility
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false); // NEW state for Terms Modal
  
  const footerLinks = {
    platform: [
      { label: "Explore Startups", href: "/explore" },
      { label: "Find Funding", href: "/get-funded" },
      { label: "Host Events", href: "/host-session" },
      { label: "Share Needs", href: "/share-needs" },
      { label: "Hiring AI Companions", href: "/get-funded" },
      { label: "AI Tools", href: "/get-funded" },
    ],
    legal: [
      { label: "Privacy Policy", action: () => setIsPrivacyModalOpen(true) }, 
      // Modified 'Terms of Service' link to open NEW modal
      { label: "Terms of Service", action: () => setIsTermsModalOpen(true) }, 
      // { label: "Cookie Policy", href: "#cookies" },
      // { label: "GDPR", href: "#gdpr" },
    ],
  }

  const socialLinks = [
    // { icon: Twitter, href: "/host-session", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/omverg", label: "LinkedIn" },
    // { icon: Github, href: "#github", label: "GitHub" },
  ]

  return (
    <>
      <footer className="relative mt-12 overflow-hidden bg-gradient-to-r bg-black text-white">
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative w-full px-8 md:px-12 lg:px-20 xl:px-32 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div>
              <div className="flex items-center space-x-3 mb-6 group">
                <img src={logo} alt="" className="h-8 w-8" />
                <span className="text-2xl font-bold group-hover:text-white transition-colors duration-300">
                  Om<span className="text-fuchsia-400">Verg</span>
                </span>
              </div>
              <p className="text-purple-100 mb-6 leading-relaxed">
                Connecting innovators, investors, and entrepreneurs to build the future together. Join our community of
                game-changers.
              </p>
              <div className="space-y-3 text-sm text-purple-200">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@omverg.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 9380706694</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Ranchi, Jharkhand</span>
                </div>
              </div>
              <div className="flex mt-4 space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Platform</h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-purple-200 hover:text-white transition-all duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links (Updated to handle click or href) */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    {link.action && (
                      <button
                        onClick={link.action}
                        className="text-purple-200 cursor-pointer hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="text-center lg:text-left">
              <h4 className="text-2xl font-bold mb-4">Ready to Transform Your Startup Journey?</h4>
              <p className="text-purple-100 mb-6">
                Join thousands of entrepreneurs who are already connecting, learning, and growing together.
              </p>
              
            </div>
          </div>
        </div>
      </footer>

      {/* Render the Modals */}
      <PrivacyPolicyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
      <TermsOfServiceModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </>
  )
}

export default Footer