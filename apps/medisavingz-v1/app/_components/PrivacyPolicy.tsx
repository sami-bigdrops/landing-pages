"use client"

const p = "mb-5 text-sm leading-relaxed text-[#1e1e1e] font-inter sm:text-base md:text-lg"
const h2 = "mb-4 text-xl font-bold text-[#1e1e1e] font-inter sm:text-2xl md:text-3xl"
const h3 = "mb-3 text-lg font-bold text-[#1e1e1e] font-inter sm:text-xl md:text-2xl"
const li = "text-sm leading-relaxed text-[#1e1e1e] font-inter sm:text-base md:text-lg"
const link = "text-blue-600 hover:text-blue-800 font-inter"

const noticeRows = [
  {
    category:
      "Identifiers, such as names, online identifiers, IP addresses, email addresses, and other similar identifiers.",
    sold: "Yes",
  },
  {
    category:
      "Personal information categories listed in the California Customer Records statute, such as names.",
    sold: "Yes",
  },
  {
    category:
      "Protected classification characteristics under federal law or California law, such as age.",
    sold: "Yes",
  },
  {
    category:
      "Commercial information, such as products or services purchased, obtained, or considered.",
    sold: "Yes",
  },
  {
    category:
      "Internet or other electronic network activity information, such as browsing history and information regarding interactions with our Sites and advertisements.",
    sold: "Yes",
  },
  {
    category: "Geolocation data, such as IP location.",
    sold: "Yes",
  },
  {
    category:
      "Audio, electronic, visual, or similar information, such as phone call recordings.",
    sold: "No",
  },
  {
    category:
      "Inferences, meaning inferences drawn from any of the information in the above-listed categories of information.",
    sold: "Yes",
  },
  {
    category:
      "Sensitive personal information, such as Social Security numbers, driver's license/state ID card numbers, passport numbers, and account log-in information in combination with passwords.",
    sold: "No",
  },
] as const

const ccpaRows = [
  { type: "Requests to Know", received: "9", complied: "0", denied: "9", avg: "1" },
  { type: "Requests to Delete", received: "1", complied: "0", denied: "1", avg: "2" },
  { type: "Requests to Correct", received: "2", complied: "0", denied: "2", avg: "2" },
  {
    type: "Requests to Opt Out of the Sale of Personal Information**",
    received: "773",
    complied: "773",
    denied: "0",
    avg: "0",
  },
  { type: "Requests to Limit", received: "0", complied: "0", denied: "0", avg: "N/A" },
] as const

export default function PrivacyPolicy() {
  return (
    <div>
      <section
        id="privacy-policy"
        className="bg-white p-5 md:p-8 lg:p-10 xl:px-16 2xl:px-20"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col gap-8">
            <div className="rounded-lg bg-white p-6 shadow-lg md:p-8">
              <div className="mb-8 text-center">
                <h1 className="font-inter text-center text-3xl font-bold text-[#1e1e1e] sm:text-4xl md:text-5xl lg:text-6xl">
                  Privacy Policy
                </h1>
                <p className="mt-4 font-inter text-sm text-[#4B5563] md:text-base">
                  Last Updated: July 2026
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <div>
                  <p className={p}>
                    In this Privacy Policy, we describe how MediSavingz and our affiliated and
                    subsidiary companies (collectively, &quot;MediSavingz,&quot; &quot;we,&quot;
                    or &quot;us&quot;) collect, use, disclose, and protect the personal
                    information about our customers and users of our websites and services.
                  </p>
                  <p className={p}>
                    We provide online and over the telephone information about certain insurance
                    products and can connect you with a licensed insurance agent to assist with
                    enrollment into an insurance plan offered by a third-party insurer. By calling
                    us or completing a web form, you will have the opportunity to speak with a
                    licensed insurance agent who can help determine your eligibility, provide
                    information about the plans that we offer, answer your questions and/or assist
                    with enrollment into a plan (individually and collectively, the
                    &quot;Services&quot;).
                  </p>
                  <p className={p}>
                    If you apply through the Services for insurance offered by third party insurers
                    with whom we work (each a &quot;Third Party Insurer&quot;), we will share your
                    personal information with such Third-Party Insurer so that they may evaluate
                    and process your application. The use of your personal information by a
                    Third-Party Insurer is subject to that Third Party Insurer&apos;s notice and
                    not this Privacy Policy.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Notice at Collection</h2>
                  <p className={p}>
                    We collect the categories of personal information listed in the table below.
                  </p>

                  <div className="mb-5 overflow-x-auto">
                    <table className="w-full min-w-[520px] border-collapse text-left text-sm text-[#1e1e1e] md:text-base">
                      <thead>
                        <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                          <th className="px-3 py-3 font-bold">
                            Category of Personal Information Collected
                          </th>
                          <th className="px-3 py-3 font-bold whitespace-nowrap">
                            Sold or Shared
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {noticeRows.map((row) => (
                          <tr key={row.category} className="border-b border-[#E5E7EB] align-top">
                            <td className="px-3 py-3">{row.category}</td>
                            <td className="px-3 py-3">{row.sold}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className={p}>
                    We disclose each of the above listed categories of personal information to our
                    service providers for business purposes. As indicated in the chart, we collect
                    certain &quot;sensitive personal information&quot; (as defined by applicable
                    law). However, we do not use or disclose sensitive personal information for any
                    purpose outside of the limited permissible purposes set forth in applicable
                    law. These purposes include providing the Services and preventing, detecting,
                    and investigating security incidents.
                  </p>
                  <p className={p}>
                    We use the personal information that we collect for the following purposes:
                  </p>
                  <ul className="mb-5 list-disc space-y-3 pl-5">
                    <li className={li}>
                      <span className="font-bold">Providing the Services and related support,</span>{" "}
                      including to confirm, process, or otherwise complete your requested
                      transaction(s); to process and fulfill your orders and requests for products
                      and services; to process your application for one or more insurance policies;
                      to provide troubleshooting and other technical support; and to fulfill other
                      customer service and support purposes.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Communicating with you,</span> including to
                      respond to your requests, submissions, and inquiries; to request feedback
                      from you; and to send you important updates and communications about this
                      Privacy Policy and/or other applicable terms and conditions.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Protecting the integrity of the Services,</span>{" "}
                      including to verify your identity and to detect and prevent fraud and
                      unauthorized activities.
                    </li>
                    <li className={li}>
                      <span className="font-bold">
                        Analyzing and improving the Services and our business,
                      </span>{" "}
                      including to better understand how you and others access and use the
                      Services; to evaluate and improve the Services and our business operations;
                      to develop new features, offerings, and services; to conduct surveys and
                      other evaluations; and to fulfill other research and analytical purposes.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Personalizing the Services,</span> including to
                      tailor content we display on the Sites and send you relating to the Services
                      (e.g., information that is relevant to your geographic area); to offer
                      personalized help and instructions; and/or to otherwise personalize your
                      experiences with the Services.
                    </li>
                    <li className={li}>
                      <span className="font-bold">
                        Sending marketing and promotional communications,
                      </span>{" "}
                      including emails and other communications about the Services and/or those of
                      our affiliates and other parties that we think may interest you. Such
                      communications would come from us; we do not share phone numbers with third
                      parties for the purpose of enabling them to send marketing text messages or
                      to place telemarketing calls to you, unless we obtain consent from you to do
                      so. Where required by applicable law, we will obtain your consent to use your
                      personal information for marketing and related purposes. We do not use
                      personal information that you provide us on your insurance application(s) for
                      marketing or promotional purposes. Details on how to exercise your choices
                      with respect to marketing and promotional communications from us can be found
                      in the &quot;Your Choices&quot; section below.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Engaging in interest-based advertising,</span>{" "}
                      including to send or display advertising on the Sites and/or across other
                      websites, mobile applications, social media platforms, and other online
                      services that are tailored to your interests and to evaluate, measure, and
                      improve the effectiveness of our advertising campaigns. We do not use
                      personal information that you provide us on your insurance application(s) for
                      interest-based advertising purposes. Details on how to exercise your choices
                      with respect to interest-based advertising can be found in the &quot;Your
                      Choices&quot; section below. Securing and protecting our business, including
                      to protect and secure our business operations, our assets, the Services, and
                      our systems and networks and to investigate, prevent, detect, and take action
                      regarding fraud, unauthorized access, situations involving potential threats
                      to the rights or safety of any person or third party, and/or other
                      unauthorized activities or misconduct.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Defending our legal rights,</span> including to
                      manage and respond to actual and/or potential legal disputes and claims
                      and/or to otherwise establish, defend, or protect our rights or interests,
                      including in the context of anticipated or actual litigation.
                    </li>
                    <li className={li}>
                      <span className="font-bold">
                        Auditing, reporting, corporate governance, and internal operations,
                      </span>{" "}
                      including to carry out financial, tax, and accounting audits and audits and
                      assessments of our operations, privacy and/or security posture, financial
                      controls, risks, and compliance with legal obligations; to carry out our
                      general business, accounting, record keeping, and legal functions; to
                      maintain appropriate business records; to enforce company policies and
                      procedures; and to carry out business transactions (e.g., any actual or
                      contemplated merger, acquisition, asset sale or transfer, financing,
                      bankruptcy, or restructuring of all or part of our business).
                    </li>
                    <li className={li}>
                      <span className="font-bold">Satisfying our legal obligations,</span> including
                      to comply with applicable laws and regulations and respond to lawful requests
                      and communications, such as warrants, subpoenas, court orders, and/or
                      regulatory or law enforcement requests.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Consent.</span> We will also use your personal
                      information as described to you at the point of information collection or
                      with your consent.
                    </li>
                  </ul>
                  <p className={p}>
                    We &quot;sell&quot; or &quot;share&quot; your personal information for
                    &quot;targeted advertising&quot; (as such terms are defined in applicable state
                    law) and other marketing purposes to business partners and third parties, such
                    as data analytics providers, advertising technology vendors, third-party
                    advertising networks, and social media platforms (as described in more detail
                    below). We do not knowingly collect or sell the personal information of
                    individuals under the age of 18. You may exercise your right to opt out of such
                    disclosures by contacting us at{" "}
                    <a href="mailto:contact@medisavingz.com" className={link}>
                      contact@medisavingz.com
                    </a>
                    .
                  </p>
                  <p className={p}>
                    We retain each category of personal information that we collect for as long as
                    necessary to fulfill the purposes described in this Privacy Policy including to
                    satisfy legal or reporting requirements.
                  </p>
                  <p className={p}>
                    More information, including a description of your legal rights, can be found
                    below under &quot;Your Choices.&quot;
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Scope</h2>
                  <p className={p}>
                    This Privacy Policy applies to the personal information that MediSavingz
                    collects or receives about individuals who use our products and Services (as
                    defined below), either for themselves or on behalf of an organization or
                    entity:
                  </p>
                  <ul className="mb-5 list-disc space-y-2 pl-5">
                    <li className={li}>
                      through any website that includes a link to this Privacy Policy (each, a
                      &quot;Site&quot; and collectively, the &quot;Sites&quot;);
                    </li>
                    <li className={li}>
                      in connection with our business development and marketing activities; and
                    </li>
                    <li className={li}>
                      through our other interactions with you (e.g., when you speak with one of our
                      call center representatives over the telephone, communicate with us online or
                      through SMS/text messaging, write to us to learn about the insurance products
                      we offer, provide us with feedback or complete an online survey related to
                      our products, etc.).
                    </li>
                  </ul>
                  <p className={p}>
                    The above-listed activities and our interactions with you are included as part
                    of the &quot;Services.&quot;
                  </p>
                  <p className={p}>
                    This Privacy Policy does not apply to any third-party websites, mobile
                    applications, services, or products maintained by other companies, including
                    those that are linked to or accessible from the Services. In addition, this
                    Privacy Policy does not apply to any personal information that we collect and
                    process that is subject to the Health Insurance Portability and Accountability
                    Act of 1996 (HIPAA) or the Gramm-Leach Bliley Act (GLBA), including the
                    implementing regulations associated with these laws. This Privacy Policy also
                    does not apply to &quot;consumer health data&quot; which is a subset of
                    personal information defined under the Washington State My Health My Data Act.
                  </p>
                  <p className={p}>
                    In this Privacy Policy, &quot;personal information&quot; means any information
                    that identifies, relates to, describes, is reasonably capable of being
                    associated with, or could reasonably be linked, directly or indirectly, to you,
                    which is sometimes called &quot;personal data.&quot;
                  </p>
                  <p className={p}>
                    By providing your personal information to us through the Services or otherwise
                    interacting with us, you understand and acknowledge that MediSavingz will
                    handle your personal information in accordance with this Privacy Policy. If you
                    do not want this Privacy Policy to apply to you, please do not use the Services
                    or interact with us. If required by applicable law, we will obtain your consent
                    to collect, use, transfer, and/or disclose your personal information.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Collection of Personal Information</h2>
                  <p className={p}>
                    Depending on how you use the Services and how you otherwise interact with us,
                    we may collect your personal information in several ways, including: (1)
                    directly from you; (2) automatically when you visit and interact with the
                    Sites; and (3) in some cases, from third-party sources, such as Third-Party
                    Insurers, in connection with the Services.
                  </p>
                  <p className={p}>
                    Generally, we collect your personal information on a voluntary basis. However,
                    if you decline to provide certain personal information that is marked
                    mandatory, you may not be able to access certain Services, or we may be unable
                    to fully respond to your inquiry. The personal information that we collect, and
                    process will vary depending upon the exact circumstances of your interaction
                    with us. Additional details regarding our collection of your personal
                    information are included below.
                  </p>

                  <h3 className={h3}>Information Collected Directly from You</h3>
                  <p className={p}>
                    We collect personal information that you provide to us when you inquire about
                    or use the Services, request a quote from us, fill out forms or fields on the
                    Sites, create or submit an application through the Services, request
                    information from us, sign up for our newsletters or our email list, participate
                    in a survey or promotion administered by us (or on our behalf), or when you
                    otherwise communicate or interact with us (via the Sites, telephone, email, or
                    other means).
                  </p>
                  <p className={p}>
                    Depending on the context of your interactions with us and the Services, the
                    categories of personal information that we may collect directly from you
                    include:
                  </p>
                  <ul className="mb-5 list-disc space-y-2 pl-5">
                    <li className={li}>
                      Contact information, including your name, email address, and telephone
                      numbers.
                    </li>
                    <li className={li}>
                      Unique identifiers, including your government-issued identification
                      number(s) (e.g., Social Security number, driver&apos;s license/state ID card
                      number, or passport number).
                    </li>
                    <li className={li}>
                      Demographic information, including your birth year.
                    </li>
                    <li className={li}>
                      Payment information, including your credit/debit card information and billing
                      address.
                    </li>
                    <li className={li}>
                      Correspondence and communications, including any correspondence related to
                      providing you with the Services and recordings of our email and phone
                      conversations with you.
                    </li>
                    <li className={li}>
                      Preferences, including how frequently you wish to receive marketing and
                      promotional communications from us.
                    </li>
                    <li className={li}>
                      Other information you choose to provide, including any information you
                      include in any forms that you complete and submit on the Sites and other
                      information that you provide during your interactions with us.
                    </li>
                  </ul>

                  <h3 className={h3}>Information Collected Automatically</h3>
                  <p className={p}>
                    When you visit and interact with the Sites, we (and our vendors and partners)
                    use cookies, pixels tags, log files, and other similar technologies to collect
                    certain information automatically.
                  </p>
                  <p className={p}>
                    The specific types of information we (and our vendors and partners) may collect
                    include:
                  </p>
                  <ul className="mb-5 list-disc space-y-2 pl-5">
                    <li className={li}>
                      Browser and device information, including your browser type, device type,
                      operating system, software version, Internet Protocol (IP) address and/or
                      other unique identifiers assigned to your device, and the location of your
                      device.
                    </li>
                    <li className={li}>
                      Usage and interaction information, including the date and time of your
                      visit(s) to the Sites; the referring URL(s), clickstream data (e.g., data
                      about the areas or pages on the Sites you view and links you click),
                      keystrokes, mouse movements, form field entries, recordings of chat sessions,
                      your use of and inputs to other AI-supported tools, and other use of and
                      overall engagement with our Website and Services.
                    </li>
                  </ul>
                  <p className={p}>
                    The information that we collect automatically may be linked with other personal
                    information we (and our vendors and partners) collect. For more information,
                    see the Cookies and Analytics section below.
                  </p>

                  <h3 className={h3}>Information Received from Third-Party Sources</h3>
                  <p className={p}>
                    We may obtain your personal information from other sources, including our
                    service providers, our business partners, our analytics partners, social media
                    platforms, and publicly accessible databases. Sometimes, we collect information
                    about you from the Third-Party Insurers or other companies that we work with to
                    provide you our Services, or they may provide us with your information at your
                    direction. The information that we receive from these sources may include
                    contact information, demographic information, and internet or other electronic
                    network activity information. We use the information that we receive from these
                    sources to help us maintain the accuracy of or supplement the information that
                    we collect; personalize your experience with the Services; conduct internal
                    business analysis; and fulfill other business or commercial purposes described
                    in this Privacy Policy.
                  </p>
                  <p className={p}>
                    Additionally, if we help you identify, apply for, or obtain insurance from a
                    Third-Party Insurer, we may receive limited information back from the
                    Third-Party Insurer when your insurance policy is issued (e.g., the date, term,
                    premium amount, payment terms, etc.).
                  </p>

                  <h3 className={h3}>Combination of Information</h3>
                  <p className={p}>
                    We may combine the personal information that we receive from and about you,
                    including information you provide to us, information we automatically collect
                    through the Sites, and information we receive from third-party sources. Where
                    applicable, we will use, disclose, and protect the combined information as
                    described in this Privacy Policy.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Disclosure of Personal Information</h2>
                  <p className={p}>
                    We may disclose each of the categories of personal information we collect to
                    the following categories of recipients for business purposes:
                  </p>
                  <ul className="mb-5 list-disc space-y-3 pl-5">
                    <li className={li}>
                      <span className="font-bold">Our Affiliates and Subsidiaries.</span> We
                      disclose your personal information to our affiliated companies (i.e.,
                      companies that own or control, or that are under common ownership, control,
                      or management with us) for business, operational, promotional, and marketing
                      purposes (but not for the purpose of enabling them to send marketing text
                      messages or to place telemarketing calls to you unless we obtain consent from
                      you to do so).
                    </li>
                    <li className={li}>
                      <span className="font-bold">Our Service Providers:</span> We disclose your
                      personal information to third-party service providers who use the information
                      to perform services for us, such as hosting providers, auditors, advisors,
                      consultants, and customer service/support providers.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Third-Party Insurers:</span> If you request a
                      quote, services, or information from a Third-Party Insurer; request that we
                      match your request with relevant Third-Party Insurers (each, a
                      &quot;Request&quot;); or submit an application to a Third-Party Insurer (an
                      &quot;Application&quot;), we will disclose your personal information to the
                      relevant Third-Party Insurer(s). The Third-Party Insurer(s) will use and
                      further disclose your personal information subject to the Third-Party
                      Insurer&apos;s own privacy notice and applicable terms.
                    </li>
                  </ul>
                  <p className={`${p} font-semibold uppercase`}>
                    If you make a Request or submit an Application, you acknowledge, understand,
                    and consent to our disclosure of your personal information to the relevant
                    Third-Party Insurer(s), who may contact you directly via telephone, fax, and/or
                    email. You may receive telephone calls as a consequence of submitting a Request
                    on the Sites, even if you are on the National Do Not Call Registry or any other
                    Do Not Call Registry.
                  </p>
                  <ul className="mb-5 list-disc space-y-3 pl-5">
                    <li className={li}>
                      <span className="font-bold">Our Business Partners:</span> We disclose your
                      personal information to other companies with whom we partner as necessary to
                      provide the Services and carry out other related activities. For example, we
                      may disclose personal information to third parties that co-sponsor a
                      promotion with us or that we work with to bring selected opportunities to
                      customers or potential customers. We may also disclose your personal
                      information to third parties that offer products or services that may
                      interest you.
                    </li>
                  </ul>
                  <p className={p}>
                    We have sold or shared the categories of personal information identified in the
                    Notice at Collection with the following types of recipients:
                  </p>
                  <ul className="mb-5 list-disc space-y-3 pl-5">
                    <li className={li}>
                      <span className="font-bold">Our Analytics Partners:</span> We disclose your
                      personal information to parties who assist us in performing analytics and
                      help us understand how individuals interact with the Sites and measure the
                      effectiveness of the Services and our marketing and advertising efforts.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Our Marketing and Advertising Partners:</span> We
                      disclose your personal information to our marketing and advertising partners,
                      who assist us in serving advertisements and optimizing our campaigns and/or
                      provide related services. We may provide or make available to these third
                      parties information about your browsing on the Sites and/or other information
                      about your use of the Services to help us better reach you with relevant ads
                      and/or measure our ad campaigns overtime and across devices. We do not
                      disclose personal information from your insurance application(s) or personal
                      information provided as part of a Request or Application to third parties for
                      marketing or advertising purposes. Nor do we disclose telephone numbers to
                      third parties for the purpose of enabling them to send marketing text
                      messages or to place telemarketing calls to you.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Buyers of Consumer Data:</span> We disclose your
                      personal information to third parties for lead generation, business
                      prospecting, and similar purposes.
                    </li>
                  </ul>
                  <p className={p}>
                    Details on how to exercise certain legal rights with respect to such
                    &quot;sales&quot; can be found in the &quot;Your Choices&quot; section below.
                  </p>
                  <p className={p}>
                    We also disclose personal information to the following recipients:
                  </p>
                  <ul className="mb-5 list-disc space-y-3 pl-5">
                    <li className={li}>
                      <span className="font-bold">
                        Relevant Third Parties in Connection with a Business Transaction:
                      </span>{" "}
                      We may disclose and/or transfer personal information as part of any actual or
                      contemplated merger, sale, transfer of assets, acquisition, financing, and/or
                      restructuring of all or part of our business, bankruptcy, or similar event,
                      including related to due diligence conducted prior to such event (where
                      permitted by law).
                    </li>
                    <li className={li}>
                      <span className="font-bold">Governmental and Public Authorities:</span> We
                      will disclose your personal information to governmental and public
                      authorities as necessary or permitted by the laws of any jurisdiction in
                      which we operate (e.g., in response to a subpoena or court order).
                    </li>
                    <li className={li}>
                      <span className="font-bold">Other Third Parties:</span> We may disclose your
                      personal information to other parties as we believe necessary or appropriate
                      either to: (1) respond to claims asserted against us; (2) enforce or
                      administer our agreements and terms; (3) investigate and prevent against
                      fraud and mitigate other risks; and (4) protect our rights, property, or
                      safety and/or those of others.
                    </li>
                  </ul>
                  <p className={p}>
                    Finally, we may disclose your personal information for other reasons that we
                    will describe at the time of information collection or prior to disclosing your
                    personal information. Additionally, we will disclose your personal information
                    with your consent or when you direct us to do so.
                  </p>
                  <p className={p}>
                    <span className="font-bold">Aggregate and De-identified Data.</span> We may
                    de-identify personal information and create anonymous and aggregated data sets
                    and reports to assess, improve, and develop our business, products, and
                    services; to prepare benchmarking reports on our industry; and to fulfill other
                    research, marketing, and analytics purposes. When we de-identify personal
                    information, we implement reasonable measures as required by law to ensure that
                    the de-identified data cannot be associated with any individual. We will only
                    maintain and use such data in a de-identified manner and not attempt to
                    re-identify the data, except as required or permitted by law. We may disclose
                    aggregate or de-identified information to third parties for research,
                    marketing, advertising, analytics, and/or other purposes.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Cookies and Analytics</h2>
                  <p className={p}>
                    We use cookies, pixels tags, session replay scripts, and other technologies,
                    which may be provided by third parties, on the Sites to enable certain
                    functionality and for security and fraud detection and prevention purposes. We
                    also use such technologies to collect usage information about the Sites and the
                    emails that we send, to personalize content, and to serve interest-based ads to
                    you. We may combine the information we collect via these technologies with
                    other information, including personal information that we collect directly from
                    you. Additional details about our use of these technologies can be found below.
                  </p>
                  <p className={p}>
                    <span className="font-bold">Cookies.</span> Cookies are files that are
                    transferred to your device through your web browser for record-keeping
                    purposes. Some cookies enable you to log in to the Sites or save certain
                    settings and preferences, while others allow us to track usage and activities
                    on the Sites, personalize content on the Sites, or deliver more relevant ads on
                    the Sites and third-party services. If your browser automatically accepts
                    cookies, you can set your browser options to block them. Please refer to your
                    browser&apos;s &quot;Help&quot; section to learn how to prevent your device
                    from accepting new cookies, how to have the browser notify you when you receive
                    a new cookie, or how to disable cookies altogether. If you disable cookies,
                    however, certain features on the Sites may not be available or function
                    properly.
                  </p>
                  <p className={p}>
                    <span className="font-bold">Pixel Tags and Embedded Scripts.</span> Pixel tags
                    (aka clear GIFs or web beacons) are tiny graphics with a unique identifier,
                    similar in function to cookies. In contrast to cookies, which are stored on
                    your device, pixel tags are embedded invisibly on web pages. We may use these
                    in connection with the Sites to, among other things, track activity on the
                    Sites and gather usage information and personalize and manage content on the
                    Sites. We may also use these in HTML emails to help us identify when our emails
                    are viewed, track whether our emails are forwarded, and track email response
                    rates.
                  </p>
                  <p className={p}>
                    <span className="font-bold">Session Replay Scripts.</span> We use session replay
                    software to capture information concerning your interaction(s) with the Sites,
                    including keystrokes, mouse movements, and clicks; movements within a webpage
                    and through a Site; interactions with menus, banners, and forms; and form field
                    entries. We may use third-party software embedded in the script of a Site to
                    monitor your interaction with the Site and/or for our compliance verification
                    purposes, which may mean that the third-party software provider also collects
                    this information. By using the Sites, you consent to this collection and
                    disclosure of your information.
                  </p>
                  <p className={p}>
                    <span className="font-bold">Google Analytics.</span> We use Google Analytics to
                    better understand how users interact with the Sites. For information on Google
                    Analytics&apos; information handling practices and how you can control the use
                    of information sent to Google, please visit{" "}
                    <a
                      href="https://policies.google.com/technologies/partner-sites"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={link}
                    >
                      https://policies.google.com/technologies/partner-sites
                    </a>
                    . If you wish to prevent your information from being used by Google Analytics,
                    Google has developed the Google Analytics opt-out browser add-on available at{" "}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={link}
                    >
                      https://tools.google.com/dlpage/gaoptout
                    </a>
                    .
                  </p>
                  <p className={p}>
                    <span className="font-bold">
                      Opt-Out Preference Signals and &quot;Do-Not-Track&quot; Signals.
                    </span>{" "}
                    If you enable the Global Privacy Control (&quot;GPC&quot;) on your browser when
                    visiting the Sites, the Sites will treat the signal as a valid request to
                    exercise your opt-out right(s) under applicable privacy law. Please note the
                    Sites do not recognize or respond to any signal which your browser might
                    transmit through its so-called &quot;Do Not Track&quot; (&quot;DNT&quot;)
                    feature. If you wish to disable cookies on the Sites, you should not rely on
                    DNT browser settings.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Interest-Based Advertising</h2>
                  <p className={p}>
                    We work with third-party ad networks, channel partners, measurement service
                    providers, analytics providers, and others (&quot;third-party ad companies&quot;)
                    to display advertising on the Sites and to manage or measure our advertising on
                    third-party websites, social media platforms, mobile apps, and online services.
                    We and these third-party ad companies may use cookies, pixels tags, and other
                    tools to collect activity information when you visit the Sites (and third-party
                    websites and services), as well as your IP address, device ID, cookie and
                    advertising IDs, other online identifiers, general location information, and,
                    with your consent, your device&apos;s geolocation information. We and these
                    third-party ad companies use this information to serve more relevant ads and
                    content to you and to evaluate the success of such ads and content.
                  </p>
                  <p className={p}>
                    <span className="font-bold">Custom Lists and Matching.</span> We may create and
                    disclose hashed customer list information (such as name and email address) to
                    third parties—such as Facebook and Twitter—so that we can better target ads and
                    content to you and others with similar interests on third-party services. These
                    third parties use the personal information we provide to help us target ads and
                    to enforce their terms, but we do not permit them to use or disclose the
                    personal information we provide to other third-party advertisers.
                  </p>
                  <p className={p}>
                    <span className="font-bold">Opt Out of Interest-Based Advertising.</span> You
                    may be able to opt out of receiving interest-based advertising using the
                    browser opt-out tools and consumer choice mechanisms provided by interest-based
                    advertising self-regulatory groups by following the link below:
                  </p>
                  <p className={p}>
                    Digital Advertising Alliance (DAA):{" "}
                    <a
                      href="https://youradchoices.com/control"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={link}
                    >
                      https://youradchoices.com/control
                    </a>
                  </p>
                  <p className={p}>
                    Please note that you will need to opt out separately on all of your browsers
                    and devices, as each opt-out will apply only to the specific browser or device
                    from which you opt out. If you delete or reset your cookies, change browsers,
                    or use a different device, you will have to opt out again on that browser or
                    device.
                  </p>
                  <p className={p}>
                    Using the opt-out method linked above will not opt you out of being served
                    advertising. Specifically, you may continue to receive generic or
                    &quot;contextual&quot; ads on the Sites. You may also continue to receive ads
                    tailored to your interests on other websites from companies that do not
                    participate in the above-listed programs.
                  </p>
                  <p className={p}>
                    Some of our advertising partners may provide you with additional choices with
                    respect to interest-based advertising. For example, certain social media
                    platforms may allow you to control your advertising preferences directly
                    through their services. Please review the privacy policies of the third-party
                    services you use for more information.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Information Retention</h2>
                  <p className={p}>
                    We retain personal information as long as necessary to accomplish the purposes
                    identified in this Privacy Policy, including to satisfy our legal and reporting
                    requirements. This means that we may be required to maintain your personal
                    information, for example, to: (1) comply with our legal or regulatory
                    compliance needs (e.g., maintaining records of transactions you have made with
                    us); (2) exercise, establish, or defend legal claims; and/or (3) protect against
                    fraudulent or abusive activity. For these and possibly other reasons, we may be
                    unable to delete personal information upon your request in certain cases.
                  </p>
                  <p className={p}>
                    We may retain different categories of personal information for different
                    periods of time for the instances stated above. However, it is our policy as an
                    organization that when personal information is no longer needed or after legal
                    authority to retain it has expired, personal information will be deleted,
                    destroyed, or de-identified in accordance with applicable law and pursuant to
                    procedures established in relation to the relevant services, systems, or
                    processes. Retention periods for records maintained by us, including those
                    containing personal information, are established based upon business need,
                    statutory and regulatory record keeping requirements in the geographies where
                    we do business, and legal obligations.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Your Choices</h2>
                  <p className={p}>
                    We provide you with the ability to make certain choices about how we use your
                    personal information, as described below.
                  </p>
                  <p className={p}>
                    <span className="font-bold">State Privacy Rights and Requests:</span> Residents
                    of California, Colorado, Connecticut, Delaware, Indiana, Iowa, Kentucky,
                    Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon,
                    Rhode Island, Texas, Tennessee, Utah, Virginia, or any other state with an
                    applicable privacy law have certain rights relating to the collection, use,
                    disclosure, and other processing of their personal information. The exact scope
                    of these rights may vary by state:
                  </p>
                  <ul className="mb-5 list-disc space-y-3 pl-5">
                    <li className={li}>
                      <span className="font-bold">Right to Know.</span> You may have the right to
                      know what personal information we have collected about you, including the
                      categories of sources from which the personal information is collected, the
                      business or commercial purpose for collecting, selling, or sharing personal
                      information, the categories of third parties to whom we disclose personal
                      information, the categories of personal information disclosed to third
                      parties, and the specific pieces of personal information we have collected
                      about you.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Right to Request Categories of Third Parties.</span>{" "}
                      You may have the right to request a list of the categories of third parties
                      with which we disclose your personal information.
                    </li>
                    <li className={li}>
                      <span className="font-bold">
                        Right to Request Specific List of Third Parties.
                      </span>{" "}
                      You may have the right to request a list of the specific third parties with
                      which we disclose your personal information.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Right to Data Portability.</span> You may have the
                      right to access your personal information in a portable format.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Right to Delete.</span> You may have the right to
                      request that we delete personal information that we have collected from or
                      about you, subject to certain exceptions.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Right to Correct.</span> You may have the right to
                      correct inaccurate personal information that we may maintain about you,
                      subject to appropriate verification.
                    </li>
                    <li className={li}>
                      <span className="font-bold">
                        Right to Opt Out of Certain Types of Personal Information Uses and
                        Disclosures.
                      </span>{" "}
                      We use and disclose to third parties personal information for analytics and
                      advertising purposes. Accordingly, you may have the right to opt out of the
                      &quot;sale&quot; or &quot;sharing&quot; of your personal information, or the
                      use and disclosure of your personal information for &quot;targeted
                      advertising&quot; (as these terms are defined in applicable law).
                    </li>
                    <li className={li}>
                      <span className="font-bold">RIDTPPA.</span> The Rhode Island Data Transparency
                      and Privacy Protection Act (RIDTPPA) entitles Rhode Island residents to know
                      the third parties to which we sell or may sell their personal information. We
                      do not sell personal information for payment; however, we may share your
                      personal information with certain third parties as described in this Privacy
                      Notice.
                    </li>
                  </ul>
                  <p className={p}>
                    To exercise any of your privacy rights, please contact us at{" "}
                    <a href="mailto:contact@medisavingz.com" className={link}>
                      contact@medisavingz.com
                    </a>
                    . To exercise your right to opt out of the sale or sharing of your personal
                    information for targeted advertising, please email{" "}
                    <a href="mailto:contact@medisavingz.com" className={link}>
                      contact@medisavingz.com
                    </a>
                    . Alternatively, you may use a browser-based opt-out preference signal, such as
                    Global Privacy Control (GPC). Upon receipt or detection, we will treat the
                    signal as a valid request to opt out of the sale or sharing of personal
                    information linked to that browser and any consumer profile we have associated
                    with that browser. Please note that if you use different browsers or browser
                    profiles, you will have to enable the signal on each one that you use.
                  </p>
                  <p className={p}>
                    We will not discriminate against you for exercising one of these legal rights.
                  </p>
                  <p className={p}>
                    Exercising your rights does not require you to create an account with us.
                    Following the submission of your request, we will acknowledge our receipt of it
                    and verify it. To verify your request, we may ask you to provide the following
                    information:
                  </p>
                  <ul className="mb-5 list-disc space-y-3 pl-5">
                    <li className={li}>
                      For a request to know categories of personal information that we collect, we
                      will verify your identity to a reasonable degree of certainty by matching at
                      least two data points provided by you against information in our systems that
                      are considered reasonably reliable for the purposes of verifying a
                      consumer&apos;s identity.
                    </li>
                    <li className={li}>
                      For a request to know specific pieces of personal information or for requests
                      to correct or delete personal information, we will verify your identity to a
                      high degree of certainty by matching at least three pieces of personal
                      information provided by you to personal information maintained in our systems
                      and also by obtaining a signed declaration under penalty of perjury that you
                      are the consumer whose personal information is the subject of the request.
                    </li>
                  </ul>
                  <p className={p}>
                    Where applicable, we will use the requested information for verification
                    purposes only. We may decline certain requests if we cannot verify your
                    identity and confirm that the personal information we maintain relates to you.
                    We will never ask to verify your identity to exercise your opt out rights.
                  </p>
                  <p className={p}>
                    Following the successful verification of your request, we will process and
                    respond to it in accordance with applicable privacy laws. We may decline
                    certain requests if we cannot verify your identity and confirm that the
                    personal information we maintain relates to you.
                  </p>
                  <p className={p}>
                    <span className="font-bold">Authorized Agents.</span> You may authorize someone
                    to submit a privacy rights request on your behalf (an &quot;authorized
                    agent&quot;). An authorized agent will need to demonstrate that you have
                    authorized them to act on your behalf, unless you have provided the agent with
                    power of attorney pursuant to applicable probate law. Depending on the evidence
                    provided, we may also contact you to verify your identity with us or request
                    confirmation from you that the agent is authorized to submit the request on
                    your behalf.
                  </p>
                  <p className={p}>
                    <span className="font-bold">Appealing Privacy Rights Decisions.</span> In the
                    event that we do not take action on your request, you may also have the right
                    to appeal the decision. To appeal our decision, please send an email to{" "}
                    <a href="mailto:contact@medisavingz.com" className={link}>
                      contact@medisavingz.com
                    </a>{" "}
                    with the subject line &quot;U.S. State Privacy Rights Request Appeal.&quot; If
                    you are unsatisfied with the way that we have handled your appeal, you have the
                    right to complain to your state&apos;s Attorney General.
                  </p>
                  <p className={p}>
                    <span className="font-bold">Marketing Communications Preferences:</span> You
                    may opt out of receiving marketing communications from us as follows:
                  </p>
                  <ul className="mb-5 list-disc space-y-3 pl-5">
                    <li className={li}>
                      <span className="font-bold">Email:</span> To stop receiving marketing-related
                      emails from us on a going-forward basis, please send an e-mail to{" "}
                      <a href="mailto:contact@medisavingz.com" className={link}>
                        contact@medisavingz.com
                      </a>{" "}
                      requesting that we stop sending you marketing-related emails.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Direct Mail:</span> To stop receiving promotional
                      offers from us through direct mail on a going-forward basis, please email us
                      at{" "}
                      <a href="mailto:contact@medisavingz.com" className={link}>
                        contact@medisavingz.com
                      </a>{" "}
                      requesting that we stop sending you direct mail marketing communications.
                    </li>
                    <li className={li}>
                      <span className="font-bold">Phone:</span> To stop receiving marketing phone
                      calls from us on a going-forward basis, please ask to be placed on our Do Not
                      Call list when you receive a call from us, or send an email to{" "}
                      <a href="mailto:contact@medisavingz.com" className={link}>
                        contact@medisavingz.com
                      </a>{" "}
                      and provide the telephone number you wish to have placed on our Do Not Call
                      list.
                    </li>
                  </ul>
                  <p className={p}>
                    Please note that even if you opt out of receiving marketing communications from
                    us, you will still receive non-marketing or transactional communications from
                    us, including responses to your inquiries/requests.
                  </p>
                  <p className={p}>
                    To unsubscribe from a Third-Party Insurer&apos;s communications, you must
                    contact such Third-Party Insurer directly.
                  </p>
                  <p className={p}>
                    <span className="font-bold">Interest-Based Advertising:</span> To exercise your
                    interest-based advertising choices, please review and follow the instructions
                    set forth in the Interest-Based Advertising section above.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Third-Party Links and Services</h2>
                  <p className={p}>
                    The Sites may contain links to third-party owned and/or operated services,
                    which are not governed by this Privacy Policy. These third-party services have
                    separate privacy policies and information handling practices, and we have no
                    responsibility or liability relating to such policies or practices. We
                    encourage you to review all third parties&apos; privacy policies before
                    providing them with your personal information.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Information Security</h2>
                  <p className={p}>
                    We take certain physical, electronic, contractual, and managerial steps to
                    safeguard and secure the personal information we collect. Despite this, the
                    security of the transmission of information via the Internet cannot always be
                    guaranteed and you acknowledge this in your access and use of the Sites.
                  </p>
                  <p className={p}>
                    Please note that it is your responsibility to maintain the confidentiality of
                    the password associated with any account that you create on the Sites, if any.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Minors</h2>
                  <p className={p}>
                    The Services are not designed for individuals under the age of 18, and we do
                    not knowingly solicit or collect personal information from individuals under
                    the age of 18. If we gain actual knowledge that we have collected or received
                    personal information relating to anyone under the age of 18, we will take
                    reasonable steps to delete it.
                  </p>
                  <p className={p}>
                    <span className="font-bold">CCPA Metrics.</span> In calendar year 2025, we
                    received and responded to consumer requests under the California Consumer
                    Privacy Act (&quot;CCPA&quot;) as set forth in the table below:
                  </p>

                  <div className="mb-3 overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-left text-sm text-[#1e1e1e] md:text-base">
                      <thead>
                        <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                          <th className="px-3 py-3 font-bold">Request Type</th>
                          <th className="px-3 py-3 font-bold">Number of Requests Received</th>
                          <th className="px-3 py-3 font-bold">
                            Number of Requests With Which We Complied (in whole or in part)
                          </th>
                          <th className="px-3 py-3 font-bold">Number of Requests Denied*</th>
                          <th className="px-3 py-3 font-bold">
                            Average Response Time (Number of Days)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ccpaRows.map((row) => (
                          <tr key={row.type} className="border-b border-[#E5E7EB] align-top">
                            <td className="px-3 py-3">{row.type}</td>
                            <td className="px-3 py-3">{row.received}</td>
                            <td className="px-3 py-3">{row.complied}</td>
                            <td className="px-3 py-3">{row.denied}</td>
                            <td className="px-3 py-3">{row.avg}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mb-2 text-sm leading-relaxed text-[#1e1e1e] font-inter sm:text-base">
                    *This includes requests that were denied because we were unable to verify the
                    identity of the requestor.
                  </p>
                  <p className={p}>
                    **This may include requests from states other than California. This does not
                    include users who disabled non-essential cookies on our websites.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Changes to this Privacy Policy</h2>
                  <p className={p}>
                    We may amend this Privacy Policy from time to time to reflect changes in our
                    information handling and privacy practices and/or changes in applicable law.
                  </p>
                  <p className={p}>
                    The &quot;Last Updated&quot; date at the top of this page indicates when this
                    Privacy Policy was last revised. When we make changes, we will revise the date
                    at the top of this page and, in the case of material changes, we will provide
                    appropriate online notice to you. This notice may be provided via a temporary
                    banner on our Site, an email sent to users for whom we have an email address,
                    or by temporarily noting &quot;UPDATED&quot; next to the Privacy Policy link in
                    the footer of the website.
                  </p>
                  <p className={p}>
                    Unless otherwise stated, the current version of this Privacy Policy applies to
                    all personal information under our control. We encourage you to review this
                    Privacy Policy periodically to remain informed about our information handling
                    and privacy practices.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Contact Us</h2>
                  <p className={p}>
                    If you have any questions or suggestions regarding this Privacy Policy or our
                    information handling practices, you should feel free to email us at{" "}
                    <a href="mailto:contact@medisavingz.com" className={link}>
                      contact@medisavingz.com
                    </a>
                    .
                  </p>
                  <p className="text-sm leading-relaxed text-[#1e1e1e] font-inter sm:text-base md:text-lg">
                    MediSavingz
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
