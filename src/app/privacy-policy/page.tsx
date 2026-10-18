import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Muthu',
  description: 'Privacy Policy and data protection terms for Muthu creative agency.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-black text-white padding-primary pt-12 pb-24">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <section className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 mb-4">
            // LEGAL & COMPLIANCE
          </p>
          <h1 className="font-horas text-4xl sm:text-6xl uppercase tracking-tighter leading-none mb-4">
            Your Privacy Matters <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fce39d] to-[#fec52d]">
              To Us.
            </span>
          </h1>
          <p className="font-ppmori text-neutral-400 text-sm md:text-base leading-relaxed">
            We are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
        </section>

        {/* Policy Content */}
        <div className="space-y-10 text-neutral-300 font-ppmori text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-horas text-xl uppercase tracking-wider text-white">1. Introduction</h2>
            <p>
              Welcome to Muthu (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us.
            </p>
            <p>
              By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-horas text-xl uppercase tracking-wider text-white">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-400">
              <li><strong className="text-white">Personal Information:</strong> Name, email address, phone number, mailing address, and other contact details you provide when contacting us or registering for our services.</li>
              <li><strong className="text-white">Usage Data:</strong> Information about how you access and use our website, including IP address, browser type, operating system, referring URLs, pages viewed, and time spent on our site.</li>
              <li><strong className="text-white">Device Information:</strong> Details about your device, including device type, operating system, and unique device identifiers.</li>
              <li><strong className="text-white">Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance your experience and analyze usage patterns.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-horas text-xl uppercase tracking-wider text-white">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-400">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-horas text-xl uppercase tracking-wider text-white">4. Information Sharing and Disclosure</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-400">
              <li><strong className="text-white">With Your Consent:</strong> When you explicitly agree to the sharing of your information.</li>
              <li><strong className="text-white">Service Providers:</strong> With third-party vendors, consultants, and other service providers who perform services on our behalf.</li>
              <li><strong className="text-white">Legal Requirements:</strong> When required by law, court order, or government request.</li>
              <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
              <li><strong className="text-white">Protection of Rights:</strong> To protect the rights, property, or safety of Muthu, our customers, or others.</li>
            </ul>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties for marketing purposes without your consent.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-horas text-xl uppercase tracking-wider text-white">5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to collect and use personal information about you. Cookies are small data files stored on your device. You can control cookies through your browser settings, but disabling them may affect your experience on our site.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-400">
              <li><strong className="text-white">Essential Cookies:</strong> Required for the website to function properly.</li>
              <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
              <li><strong className="text-white">Marketing Cookies:</strong> Used to deliver relevant advertisements.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-horas text-xl uppercase tracking-wider text-white">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security assessments. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-horas text-xl uppercase tracking-wider text-white">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-horas text-xl uppercase tracking-wider text-white">8. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-400">
              <li><strong className="text-white">Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete information.</li>
              <li><strong className="text-white">Deletion:</strong> Request deletion of your personal information, subject to certain exceptions.</li>
              <li><strong className="text-white">Portability:</strong> Request transfer of your data to another service provider.</li>
              <li><strong className="text-white">Objection:</strong> Object to the processing of your personal information for certain purposes.</li>
              <li><strong className="text-white">Restriction:</strong> Request limitation of how we process your information.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-horas text-xl uppercase tracking-wider text-white">9. Third-Party Links and Services</h2>
            <p>
              Our website may contain links to third-party websites or services that are not owned or controlled by us. This Privacy Policy does not apply to these third parties. We encourage you to read the privacy policies of any third-party services you use.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-horas text-xl uppercase tracking-wider text-white">10. Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-horas text-xl uppercase tracking-wider text-white">11. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-horas text-xl uppercase tracking-wider text-white">12. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. We encourage you to review this Privacy Policy periodically.
            </p>
            <p className="italic text-neutral-500">Last Updated: December 27, 2025</p>
          </section>

          <section className="space-y-3 border-t border-neutral-900 pt-8">
            <h2 className="font-horas text-xl uppercase tracking-wider text-white">13. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400">
              <li>Email: <a href="mailto:info@muthu.design" className="text-yellow-400 hover:underline">info@muthu.design</a></li>
              <li>Phone: <a href="tel:+919048326777" className="text-yellow-400 hover:underline">+91 9048 326 777</a></li>
              <li>Address: Ln-1, Kutty Sahib Layout Rd, near Model Engineering College, Thrikkakara, Edappally, Kochi, 682021</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
