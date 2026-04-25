import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Pristine Data AI collects, uses, and protects your information.',
  alternates: { canonical: 'https://pristinedata.ai/privacy' },
}

const sections = [
  {
    title: '1. Information We Collect',
    body: [
      'We collect information you provide directly to us when you create an account, book a demo, or contact us. This includes your name, work email address, company name, job title, and any other information you choose to provide.',
      'When you use our platform, we automatically collect certain technical information including your IP address, browser type, operating system, referring URLs, and usage data such as pages viewed, features accessed, and search queries entered.',
      'We may also receive information about you from third-party sources, including data enrichment providers, CRM integrations, and analytics partners, consistent with their own privacy policies.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    body: [
      'We use the information we collect to provide, maintain, and improve our services: including processing your searches, generating enrichment results, building Opportunity Playbooks, and delivering outreach campaigns.',
      'We use your contact information to send transactional communications (account confirmations, usage alerts, billing receipts) and, where you have opted in, product updates and marketing communications.',
      'We use aggregate and anonymised usage data to understand how our platform is used, identify areas for improvement, and develop new features. This data cannot be used to identify individual users.',
      'We do not sell your personal data to third parties.',
    ],
  },
  {
    title: '3. Data Sharing',
    body: [
      'We share your information with third-party service providers who assist us in operating our platform: including cloud infrastructure providers, payment processors, analytics tools, and customer support software. These providers are contractually bound to use your data only to perform services on our behalf.',
      'We integrate with CRM platforms (Salesforce, HubSpot, Pipedrive) and outreach tools (Smartlead, Instantly) at your direction. Data sent to these integrations is governed by your agreements with those providers.',
      'We may disclose your information if required by law, court order, or governmental authority, or if we believe disclosure is necessary to protect the rights, property, or safety of Pristine, our users, or the public.',
      'In the event of a merger, acquisition, or sale of substantially all assets, your information may be transferred as part of that transaction. We will notify you via email or prominent notice on our platform before your data is transferred and becomes subject to a different privacy policy.',
    ],
  },
  {
    title: '4. Data Retention',
    body: [
      'We retain your account and usage data for as long as your account is active or as needed to provide services. If you close your account, we will delete or anonymise your personal data within 90 days, except where retention is required for legal, regulatory, or fraud prevention purposes.',
      'Enrichment results and campaign data associated with your account are retained for the duration of your subscription and for 30 days after termination, after which they are permanently deleted.',
    ],
  },
  {
    title: '5. Cookies and Tracking',
    body: [
      'We use cookies and similar tracking technologies to operate our platform, remember your preferences, and understand how users interact with our service.',
      'We use third-party analytics tools including Microsoft Clarity to collect anonymised usage data. These tools may use cookies to track sessions across visits. You can opt out of analytics cookies via your browser settings or a cookie consent tool.',
      'We use identification tools including RB2B to identify companies visiting our website based on IP address. This data is used for sales outreach purposes and does not identify individual users by name.',
    ],
  },
  {
    title: '6. Security',
    body: [
      'We implement industry-standard security measures to protect your information, including encryption in transit (TLS), encryption at rest, access controls, and regular security reviews.',
      'No method of transmission over the internet or electronic storage is 100% secure. While we take reasonable steps to protect your information, we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials.',
    ],
  },
  {
    title: '7. Your Rights',
    body: [
      'Depending on your jurisdiction, you may have rights to access, correct, delete, or port your personal data. You may also have the right to object to or restrict certain processing.',
      'To exercise any of these rights, contact us at privacy@pristinedata.ai. We will respond within 30 days. We may need to verify your identity before processing your request.',
      'If you are located in the European Economic Area, you have the right to lodge a complaint with your local supervisory authority.',
    ],
  },
  {
    title: '8. International Transfers',
    body: [
      'Pristine is operated from the United States. If you are accessing our services from outside the United States, your information may be transferred to, stored, and processed in the United States or other countries where our service providers operate.',
      'Where required by applicable law, we ensure appropriate safeguards are in place for international data transfers, including standard contractual clauses approved by relevant regulatory authorities.',
    ],
  },
  {
    title: '9. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and, where required by law, by sending you an email notification.',
      'Your continued use of our services after the effective date of a revised policy constitutes your acceptance of the changes.',
    ],
  },
  {
    title: '10. Contact Us',
    body: [
      'If you have questions about this Privacy Policy or our data practices, please contact us at privacy@pristinedata.ai or by mail at: Pristine Inc., United States.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-2xl mx-auto px-6 py-20">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-4">Legal</p>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Privacy Policy</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Last updated: April 24, 2026</p>
          </div>

          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
            Pristine Inc. (&quot;Pristine&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the Pristine Data AI platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>

          <div className="space-y-10">
            {sections.map(({ title, body }) => (
              <section key={title} className="border-t border-slate-100 dark:border-slate-800 pt-8">
                <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">{title}</h2>
                <div className="space-y-3">
                  {body.map((p, i) => (
                    <p key={i} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
