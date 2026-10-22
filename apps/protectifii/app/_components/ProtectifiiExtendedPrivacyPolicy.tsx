import Link from "next/link"

const CONTACT_EMAIL = "contact@protectifii.com"
const DO_NOT_SELL_HREF = "/do-not-sell-my-personal-information"
const COOKIES_HREF = "/cookies-and-other-technology#cookies-and-other-technology"
const ADDRESS = "12540 SW Leveton Dr #P2150, Tualatin, OR 97062"

const p = "text-sm sm:text-base md:text-lg leading-relaxed mb-5 text-[#1e1e1e] font-inter"
const h2 = "text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#1e1e1e] font-inter"
const h3 = "text-lg sm:text-xl md:text-2xl font-bold mb-3 text-[#1e1e1e] font-inter"
const ul = "list-disc pl-5 sm:pl-6 mb-5 space-y-2 text-sm sm:text-base md:text-lg leading-relaxed text-[#1e1e1e] font-inter"
const linkClass = "text-blue-600 hover:text-blue-800 underline font-inter"

type ProtectifiiExtendedPrivacyPolicyProps = {
  sectionId?: string
}

export default function ProtectifiiExtendedPrivacyPolicy({
  sectionId = "protectifii-extended-privacy-policy",
}: ProtectifiiExtendedPrivacyPolicyProps) {
  return (
    <div>
      <section
        id={sectionId}
        className="p-5 md:p-8 lg:p-10 xl:px-16 2xl:px-20 bg-white"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#1e1e1e] font-inter">
                  Privacy Policy
                </h1>
                <p className="mt-3 text-base sm:text-lg text-[#1e1e1e] font-inter">
                  Protectifii Privacy Policy
                </p>
                <p className="mt-2 text-sm sm:text-base text-[#475467] font-inter">
                  Last revised: January 1, 2026
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className={p}>
                  Your privacy is important to us. This Privacy Policy (the &quot;Privacy Policy&quot;)
                  governs the use of your Personal Information (as defined below) in connection with
                  any websites, online services, and/or applications owned or operated by Protectifii
                  (&quot;we,&quot; &quot;us,&quot; &quot;our,&quot; or &quot;Protectifii&quot;), including, without limitation, in
                  connection with:
                </p>
                <ul className={ul}>
                  <li>
                    the websites currently located at protectifii.com and any other website owned by
                    us upon which this Privacy Policy is linked (collectively, the &quot;Site&quot;); and
                  </li>
                  <li>
                    any other services, transactions, engagements, or other interactions you have
                    with us (all of which are collectively referred to as the &quot;Services&quot;).
                  </li>
                </ul>
                <p className={p}>
                  This Privacy Policy explains what information we collect about you, how we use or
                  disclose such information, how to exercise any rights you may have with respect to
                  your Personal Information (including any rights to opt-out of certain uses of your
                  information), and the safeguards we have in place to reduce the risk of
                  unauthorized access and use.
                </p>
                <p className={p}>
                  Please carefully read this Privacy Policy, which is part of our{" "}
                  <Link href="/terms-of-use" className={linkClass}>
                    Terms of Use
                  </Link>
                  , before using our Site and/or Services. If you do not agree with the Terms of Use
                  and/or the Privacy Policy, you must refrain from using our Site and/or Services. By
                  accessing or using our Site/Services you agree to our use of your information
                  consistent with the Terms of Use and this Privacy Policy.
                </p>

                <h2 className={h2}>1. INSURANCE DISCLAIMER</h2>
                <p className={p}>
                  We are not an insurance company or an insurance agent. We help connect individuals
                  and businesses with companies that may be able to provide insurance products. We do
                  not charge individuals or businesses to submit inquiries regarding obtaining
                  insurance through our Site/Services; instead, we receive a payment from the
                  companies with whom we connect potential buyers such as insurance agents, insurers,
                  and third-party insurance service websites (such websites and their operators
                  referred to herein as &quot;Insurance Services&quot;).
                </p>

                <h2 className={h2}>2. PRIVACY POLICY CHANGES</h2>
                <p className={p}>
                  This Privacy Policy is subject to change. We encourage you to review this Privacy
                  Policy frequently for any revisions or amendments. Such changes to this Privacy
                  Policy will be posted on the Site and will be effective immediately upon posting.
                  You will be deemed to have been made aware of and have accepted the changes by your
                  continued use of the Site or Services.
                </p>

                <h2 className={h2}>3. INFORMATION WE COLLECT</h2>
                <h3 className={h3}>a. Personal Information</h3>
                <p className={p}>
                  When you view content on our website, we automatically collect PII about your
                  computer hardware and software. This information can include your IP address,
                  browser type, domain names, internet service provider (ISP), the files viewed on
                  our site (e.g., HTML pages, graphics, etc.), operating system, clickstream data,
                  access times and referring website addresses. We use this information to provide
                  general statistics regarding use of the Websites. For these purposes, we do link
                  this automatically-collected data to other Personal Information such as name, email
                  address, address, and phone number.
                </p>
                <p className={p}>
                  We collect information that personally identifies, relates to, describes, or is
                  capable of being associated with you (&quot;Personal Information&quot;), including:
                </p>
                <ul className={ul}>
                  <li>
                    Personal Identifiers (e.g., name, date of birth, social security number,
                    driver&apos;s license number, IP address, login username &amp; password)
                  </li>
                  <li>
                    Characteristics of Protected Classifications (e.g., gender, sex, marital status,
                    sexual orientation)
                  </li>
                  <li>
                    Contact Information (e.g., mailing address, email address, phone number, fax
                    number)
                  </li>
                  <li>
                    Commercial Information (e.g., motor vehicles owned/leased, use of motor
                    vehicles, residence information, insurance claim history, desired insurance
                    products)
                  </li>
                  <li>
                    Financial Account Information (e.g., credit card number, checking account
                    number)
                  </li>
                  <li>
                    Consumer Reports (e.g., criminal and driving history reports, credit reports)
                  </li>
                  <li>
                    Internet or Other Electronic Network Activity (e.g., browsing history, search
                    history, other information regarding your use of our Site/Services that can be
                    associated with you)
                  </li>
                  <li>Professional or Employment-Related Information (e.g., occupation)</li>
                  <li>Education Information (e.g., highest level of education obtained)</li>
                  <li>Health Information (e.g., tobacco use, medical history)</li>
                  <li>
                    Device, browser, and location information, such as computer make and model,
                    browser type and version, IP address (to determine geographic location for
                    marketing purposes, in compliance with applicable laws).
                  </li>
                </ul>
                <p className={p}>
                  This information can be provided to us by you through our websites or webforms
                  and/or information we collect automatically when you use our websites and webforms.
                </p>
                <p className={p}>
                  Inferences drawn from the above categories of Personal Information that relate to
                  your preferences, characteristics, psychological trends, predispositions, behavior,
                  attitudes, intelligence, abilities, and aptitudes.
                </p>
                <p className={p}>
                  The types of Personal Information we collect about you may vary based on how you
                  use the Site and/or Services and your role in the insurance marketplace (e.g.,
                  consumer, agent, insurer).
                </p>
                <p className={p}>
                  From time to time, and in order to provide you with the best service possible, we
                  may use your information for automated decision making.
                </p>

                <h3 className={h3}>b. Consumer Report Notice</h3>
                <p className={p}>
                  In some cases, insurance agents, insurers, and Insurance Services may need to
                  obtain additional background information about you. For example, consumer reports
                  (including credit reports) may be ordered in connection with your insurance
                  application. These reports provide information that may assist in determining your
                  eligibility for insurance and the price you may be charged. Consumer reports may
                  also be used for updates, renewals, or extensions of insurance. Insurance companies
                  may also obtain and use a credit-based insurance score based on information
                  contained in your consumer report. Insurance agents, insurers, and Insurance
                  Services may use a third-party service provider in connection with the development
                  of your insurance score and rate quote. By providing information to us for use in
                  obtaining an insurance quote, you give your express consent for insurance agents,
                  Insurers, Insurance Services, and associated third-party service providers with
                  whom we share your Personal Information to obtain and use a consumer report as
                  described in this paragraph.
                </p>

                <h3 className={h3}>c. Usage Data</h3>
                <p className={p}>
                  We automatically collect information in connection with the actions you take on the
                  Site and in connection with using the Services (&quot;Usage Data&quot;). For example, each
                  time you use the Site, we use a log file to automatically collect your IP address,
                  the type of web browser you use, the type of device you use, your device&apos;s
                  operating system, your Internet Service Provider, the pages you view, referring and
                  exit pages, the date and time of your visit, and the number of clicks to, from, and
                  within the Site. We use this information to improve the performance and
                  functionality of our Site and Services, and to better understand how individuals
                  interact with our Site and Services. If this information is capable of being
                  associated with you, directly or indirectly, we treat it as Personal Information.
                  If this information is not capable of being individually associated with you, we
                  treat it as Usage Data.
                </p>

                <h3 className={h3}>d. Call Recording</h3>
                <p className={p}>
                  We and/or our Service Providers (as defined below), may record all calls and retain
                  the content of all text messages or other written/electronic communications between
                  you and us and/or our Service Provider, regardless of whether we make the call to
                  you or you make the call to us. By communicating with us, you consent to such
                  recording and retention of communications.
                </p>

                <h3 className={h3}>e. Session Recording</h3>
                <p className={p}>
                  We and/or our Service Providers (as defined below), may monitor and/or record and
                  retain the content of all activity, clicks, and keystrokes on our owned and
                  affiliated websites for informational and quality control purposes. By continuing
                  to utilize our website and its content, you consent to such recording and
                  retention.
                </p>

                <h2 className={h2}>4. HOW WE COLLECT INFORMATION</h2>
                <h3 className={h3}>a. Voluntary Disclosure</h3>
                <p className={p}>
                  We may ask you to provide us with Personal Information when you register with the
                  Site/Services, submit an inquiry form, complete a survey, communicate with us
                  (online or offline), sign-up for a newsletter, and at other times. You are not
                  required to provide us your Personal Information; however, if you choose not to
                  provide the requested information, you may not be able to use some or all of the
                  features of the Site or Services or we may not be able to fulfill your requested
                  interaction.
                </p>

                <h3 className={h3}>b. Third-Party Data Sources</h3>
                <p className={p}>
                  We collect Personal Information from third-party data sources such as insurance
                  agents, insurers, Insurance Services, consumer reporting companies, and data
                  brokerage companies. This Personal Information may be appended to Personal
                  Information we have already collected from or about you.
                </p>

                <h3 id="cookies-and-other-technology" className={`${h3} scroll-mt-24`}>
                  c. Cookies
                </h3>
                <p className={p}>
                  We use cookies (a small text file placed on your computer to identify your computer
                  and browser) to improve the experience of the Site and Services, such as saving
                  your preferences from visit to visit to present you with a customized version of
                  the Site. Many web browsers are initially set up to accept cookies. You can reset
                  your web browser to refuse all cookies or to indicate when a cookie is being sent.
                  However, certain features of the Site or Services may not work if you delete or
                  disable cookies.
                </p>
                <p className={p}>We use the following types of cookies:</p>
                <ul className={ul}>
                  <li>
                    <span className="font-bold">Essential Cookies.</span> These Cookies are required
                    for the operation of our Sites (for example, to enable you to log into secure
                    areas of our website or use a shopping cart). These Cookies enable you to move
                    around the Sites and use their features. Disabling these Cookies will encumber
                    the Sites&apos; performance and may make the features and service unavailable.
                  </li>
                  <li>
                    <span className="font-bold">Session Cookies:</span> Session cookies keep track of
                    you or your information as you move from page to page within the Site and are
                    typically deleted once you close your browser.
                  </li>
                  <li>
                    <span className="font-bold">Persistent Cookies:</span> Persistent cookies reside
                    on your system and allow us to customize your experience if you leave and later
                    return to the Site/Services. For example, persistent cookies may allow us to
                    remember your preferences.
                  </li>
                  <li>
                    <span className="font-bold">Analytics and Customization Cookies:</span> Analytics
                    cookies help us understand how our Site is working and who is visiting our Site.
                    We may use these types of Cookies to ensure that visitors can easily find the
                    information they are looking for on our websites. Google Analytics is one tool we
                    use and you can learn more by reviewing Google&apos;s Privacy Policy.
                  </li>
                  <li>
                    <span className="font-bold">Functionality Cookies:</span> These Cookies are used
                    to recognize you when you return to our Sites. This enables us to personalize our
                    content for you, greet you by name, and remember your preferences (for example,
                    your choice of language or region).
                  </li>
                  <li>
                    <span className="font-bold">Advertising Cookies:</span> These Cookies record your
                    online activities, including your visits to our Sites, the pages you have
                    visited, and the links and advertisements you have clicked. One purpose of this
                    is to help make the content displayed on our Sites more relevant to you. Another
                    purpose is to allow us and our service providers to deliver advertisements or
                    other communications to you that are designed to be more relevant to your
                    apparent interests. When we and our service providers do so, this also involves
                    partners such as publishers, data management platforms, and demand-side platforms
                    that help to manage the data. For example, if you look at one page on one of our
                    Sites, we may cause an advertisement to be delivered to you, on our Sites, or on
                    other sites, for products referenced on that page or for similar products and
                    services. We and our service providers and partners may also append other data to
                    information collected by these Cookies, including information obtained from third
                    parties, and share this information with third parties for the purpose of
                    delivering ads to you.
                  </li>
                </ul>
                <p className={p}>
                  Depending on the circumstances, we may use cookies to collect Personal Information,
                  Usage Data, or both.
                </p>
                <p className={p}>
                  Some cookies may be placed by third parties such as Google, Facebook, Twitter, or
                  LinkedIn. Personal Information collected by third-party cookies is governed by each
                  third-party&apos;s privacy policy.
                </p>
                <p className={p}>
                  Your acceptance of cookies is not required for visiting our website.
                </p>
                <p className={p}>
                  Most internet browsers accept cookies automatically. If you do not wish this to be
                  so, you may set up your browser so that it will inform you about the setting of
                  cookies so that you may permit this only in individual cases; or that you refuse to
                  accept cookies for certain cases or on a general basis; or that you activate the
                  automatic deletion of the cookies when you close the browser. In addition, you may
                  at any time delete cookies that have already been set by using an internet browser
                  or other software programs.
                </p>
                <p className={p}>
                  Many devices and browsers give you the option to manage and/or disable cookies and
                  other online tracking technologies. To opt-out of the use of these technologies,
                  you can change your browser options to stop accepting cookies or to prompt you
                  before accepting cookies. To assist you, we compiled directions for some commonly
                  used browsers below. Keep in mind that not all devices and browsers are the same so
                  the methods described below may not work for your browser, browser version, or
                  device and may change at any time. We encourage you to refer to the relevant
                  instructions for your particular device or browser.
                </p>
                <p className={p}>
                  Before you dive in, please note, if you opt out of the collection and use of
                  information via cookies and other tracking technologies, you may still see
                  customized advertising displayed by advertising networks from which you have not
                  opted out. In addition, your opt-out will not prevent any advertising network from
                  displaying advertising that is not customized to you and your interests and,
                  consequently, may be less relevant to you. You will need to make such choices on
                  each browser and device you may use to visit our websites and webforms.
                </p>
                <p className={p}>
                  <span className="font-bold">Disabling Cookies in Browsers.</span> When you elect to
                  opt-out on a website, including our websites, an opt-out cookie is placed on your
                  device. Then when you visit the same website, the opt-out cookie tells the website
                  you opted out. This means that blocking all cookies may then prevent the websites
                  from operating as expected and may also prevent your consent choices from being
                  stored. This may mean that if you opt-out and then block cookies, we may not know
                  about, or be able to honor, your opt-out. You should also be aware that blocking
                  cookies on your computer will not affect your consent choices on a different
                  device, such as a mobile device. You may want to keep this in mind when determining
                  your browser cookie settings. For more information on how to disable cookies on the
                  most common browsers see below.
                </p>
                <ul className={ul}>
                  <li>
                    <span className="font-bold">Google Chrome:</span> At the top right, click
                    &quot;⋮&quot; icon, and then Settings. At the bottom, click Advanced. Under
                    &quot;Privacy and security&quot;, click Site settings and then Cookies. Turn Allow
                    sites to save and read cookie data on or off.
                  </li>
                  <li>
                    <span className="font-bold">Apple Safari:</span> On Mac: Safari &gt; Preferences,
                    click &quot;Privacy&quot;. On iOS: Settings &gt; Safari, then turn on &quot;Block All
                    Cookies&quot;.
                  </li>
                  <li>
                    <span className="font-bold">Mozilla Firefox:</span> Click the menu button
                    &quot;☰&quot; and select &quot;Preferences&quot;. Select the &quot;Privacy &amp;
                    Security&quot; panel and go to the &quot;Cookies and Site Data&quot; section.
                  </li>
                  <li>
                    <span className="font-bold">Microsoft Edge:</span> More button &quot;⋯&quot; &gt;
                    Settings. Select &quot;View Advanced Settings&quot;. Under &quot;Privacy and
                    security&quot;, click Site settings and then Cookies. Under &quot;Privacy and
                    Services&quot; &gt; &quot;Cookies&quot;.
                  </li>
                </ul>
                <p className={p}>
                  <span className="font-bold">Other Options for Disabling Online Tracking.</span>{" "}
                  Blocking cookies in your browser may not prevent cross-site tracking of your online
                  activity using other online tracking technologies. In addition to managing your
                  cookie settings for your browser, you can opt-out of tracking directly with the
                  businesses that operate the tracking technologies. To opt-out of certain analytic
                  tracking by our service providers visit the links below:
                </p>
                <ul className={ul}>
                  <li>
                    Google Analytics:{" "}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      https://tools.google.com/dlpage/gaoptout
                    </a>
                  </li>
                  <li>
                    Bing:{" "}
                    <a
                      href="https://about.ads.microsoft.com/en-us/resources/policies/personalized-ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      Personalized ads
                    </a>
                    ,{" "}
                    <a
                      href="http://choice.microsoft.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      http://choice.microsoft.com/
                    </a>
                  </li>
                </ul>
                <p className={p}>
                  <span className="font-bold">Do Not Track.</span> Some web browsers may transmit
                  &quot;do not track&quot; signals. Web browsers may incorporate or activate these
                  features differently, making it unclear if users have consciously activated them.
                  As a result, we do not take steps to respond to such signals.
                </p>

                <h3 className={h3}>d. Online Behavioral Advertising</h3>
                <p className={p}>
                  We may work with third-party advertisers, search providers, and ad networks
                  (&quot;Advertisers&quot;) to learn more about you and show you ads or other content that
                  we believe would be relevant to you. Advertisers may collect and use information
                  about your use of the Site or Services as well as other websites and services.
                  These companies may use cookies and other online tracking technologies to collect
                  and use your information. We and/or Advertisers may also append other data to the
                  data collected by Advertisers to create an interest profile of individual users. We
                  try to retain and analyze data in a way that anonymizes it, but it is possible that
                  we may collect or use Personal Information as part of our online behavioral
                  advertising activities. Our Privacy Policy does not cover any use of information by
                  an Advertiser. Advertisements may be shown via the Site, the Services, or on
                  third-party websites. You can visit the Network Advertising Initiative website at{" "}
                  <a
                    href="https://www.networkadvertising.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    www.networkadvertising.org
                  </a>{" "}
                  or the Digital Advertising Alliance&apos;s website at{" "}
                  <a
                    href="https://www.digitaladvertisingalliance.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    www.digitaladvertisingalliance.org
                  </a>{" "}
                  to learn more about Internet advertising companies and how to opt out of their
                  information collection.
                </p>

                <h3 className={h3}>e. Information from Advertisements and Insurance Services</h3>
                <p className={p}>
                  If you arrive at the Site via an advertisement (e.g., banner ad) or an Insurance
                  Service, we may collect information regarding the advertisement or Insurance
                  Service with which you interacted and your interactions (e.g., item clicked, date
                  and time).
                </p>

                <h3 className={h3}>f. Tracking Pixels and Clear GIFs</h3>
                <p className={p}>
                  We employ software technology that enables us to track certain aspects of a
                  user&apos;s visit to the Site. This technology helps us better manage content on
                  the Site by informing us what content is effective, how consumers engage with the
                  Site, and how consumers arrive at and/or depart from the Site. The software
                  typically uses two methods to track user activity: (1) &quot;tracking pixels&quot; and
                  (2) &quot;clear gifs.&quot; Tracking pixels are pieces of executable code that are
                  embedded in a web page that track usage activity including which pages are viewed,
                  when they are viewed, and how long the pages are viewed. Clear gifs are tiny
                  graphics with unique identifiers which are embedded in web pages and email messages
                  that track whether or not a user has viewed a particular web page or email message.
                  User activity information may be associated with additional information about a
                  user&apos;s session, such as IP addresses and the type of browser used, and
                  Personal Information, if provided by the user.
                </p>
                <p className={p}>
                  If you arrive at the Site by &quot;clicking through&quot; from another website, then
                  certain information about you that you provided to that other website, such as the
                  terms you were searching that led you to the Site, may be transmitted to us and we
                  may use it. You should review the privacy policy of any website from which you
                  reached the Site to determine what information was collected by that website and
                  for what purpose(s) you agreed that website could use that information. We may
                  retain information about you provided to us by other websites, and will only use it
                  in accordance with this Privacy Policy. Such information may be associated with
                  other Usage Data or Personal Information.
                </p>

                <h3 className={h3}>g. Google Analytics Advertising Features</h3>
                <p className={p}>
                  We utilize certain Google Analytics tools to improve the Site experience for our
                  users, but also to aggregate the characteristics and browsing habits of our users,
                  on an anonymized basis, to provide products and services that are more tailored to
                  our users.
                </p>

                <h3 className={h3}>h. Social Media Widgets</h3>
                <p className={p}>
                  The Site may include social media features, such as the Facebook, YouTube,
                  LinkedIn, and Twitter widgets. These features may collect information about your IP
                  address and the pages you visit on our Site as well as other Personal Information.
                  A cookie may be set to ensure that a feature properly functions. Your interactions
                  with social media features are governed by the privacy policies of the companies
                  that provide them.
                </p>

                <h2 className={h2}>5. HOW WE USE AND SHARE INFORMATION</h2>
                <h3 className={h3}>a. Generally</h3>
                <p className={p}>We use Personal Information for internal purposes, such as to:</p>
                <ul className={ul}>
                  <li>Provide you with the Site and Services;</li>
                  <li>Process or complete transactions you requested;</li>
                  <li>
                    Improve the Site and Services, including customization and personalization;
                  </li>
                  <li>
                    Communicate with you / Notify you of our or third-party products and services via
                    mail, email, telephone, and/or text messaging;
                  </li>
                  <li>Market our or third-party products and services to you;</li>
                  <li>
                    Communicate with you about the Site, the Services, and other matters via mail,
                    email, telephone and/or text messaging;
                  </li>
                  <li>Perform marketing and non-marketing analytics;</li>
                  <li>Operate information security and anti-fraud programs;</li>
                  <li>
                    Perform day-to-day business operations such as accounting, bookkeeping, and legal
                    compliance;
                  </li>
                  <li>Respond to governmental and other legal requests; and</li>
                  <li>
                    Compile information and analyses to enhance the customer experience and improve
                    our business.
                  </li>
                  <li>
                    Develop, operate, improve, deliver, maintain and protect our services, including
                    websites and webforms.
                  </li>
                  <li>
                    Enhance our services and your experience with them by using information we
                    collect automatically by cookies and other technologies.
                  </li>
                </ul>

                <h3 className={h3}>b. Testimonials</h3>
                <p className={p}>
                  If you provide a testimonial, we may post it publicly on the Site or in other
                  advertising material. By providing a testimonial, you give us permission to use it
                  in any manner and for any purpose, including in marketing and advertising
                  communications, without compensation to you.
                </p>

                <h3 className={h3}>c. Service Providers</h3>
                <p className={p}>
                  From time to time, we may establish a relationship with other businesses that we
                  believe are trustworthy and that we believe have privacy practices consistent with
                  ours that may include corporate affiliates (&quot;Service Providers&quot;). We contract
                  with Service Providers to provide certain services to us, including:
                </p>
                <ul className={ul}>
                  <li>Online hosting and maintenance;</li>
                  <li>Marketing and promotion design and management;</li>
                  <li>Facilitating communications;</li>
                  <li>Payment processing;</li>
                  <li>Collection of accounts;</li>
                  <li>Management of access to services;</li>
                  <li>Business analytics (marketing and non-marketing);</li>
                  <li>
                    IT and network administration such as data storage and management, website
                    hosting, and data security;
                  </li>
                  <li>Professional services as legal and accounting;</li>
                  <li>Identity and contact information validation; and</li>
                  <li>
                    Day-to-day business operations such as courier services, facilities management,
                    and document destruction vendors.
                  </li>
                </ul>
                <p className={p}>
                  We only provide our Service Providers with the information necessary for them to
                  perform these services on our behalf. Each Service Provider is expected to use
                  reasonable security measures appropriate to the nature of the information involved
                  to protect your Personal Information from unauthorized access, use, or disclosure.
                  Service Providers are prohibited from using Personal Information other than as
                  specified by us. We share the following types of Personal Information with one or
                  more Service Providers: personal identifiers; characteristics of protected
                  classification; contact information; commercial information; financial account
                  information; consumer reports; internet or other electronic network activity;
                  professional or employment-related information; education information; health
                  information; and inferences drawn from the above categories of Personal Information
                  that relate to your preferences, characteristics, psychological trends,
                  predispositions, behavior, attitudes, intelligence, abilities, and aptitudes.
                </p>

                <h3 className={h3}>d. Third-Party Selling</h3>
                <p className={p}>
                  We sell your Personal Information to third-party companies who want to advertise
                  and market products or services likely to be of interest to you, or to provide you
                  with special offers and opportunities because of your relationship with us. For
                  example, we may sell your Personal Information to insurance agents who may be able
                  to provide the type of insurance you are interested in obtaining or Insurance
                  Services that may obtain and present additional insurance options. In the past
                  twelve months we have sold the following types of Personal Information with one or
                  more third-party companies for their marketing purposes: personal identifiers;
                  characteristics of protected classification; contact information; commercial
                  information; financial account information; consumer reports; internet or other
                  electronic network activity; professional or employment-related information;
                  education information; health information; and inferences drawn from the above
                  categories of Personal Information that relate to your preferences, characteristics,
                  psychological trends, predispositions, behavior, attitudes, intelligence,
                  abilities, and aptitudes.
                </p>
                <p className={p}>
                  The information we share with advertisers and other third parties and the
                  information you provide directly to such advertisers and other third parties is
                  subject to each advertiser&apos;s or other third party&apos;s privacy policy.
                  Please read each advertiser or third party&apos;s policy to learn more information
                  about their collection practices and the choices you can make about how they
                  collect and use your personal information. Please note, an advertiser may keep the
                  information we share with them (that you provided to us through our websites and
                  webforms) whether or not you elect to purchase their services. The agreements we
                  have with those advertisers and third parties that partner with us require them to
                  secure any personal information (personal data) we provide them, limit how they use
                  such information, and comply with national, state and other applicable privacy
                  regulations. Data obtained through the short code program will not be shared with
                  any third-parties for their marketing purposes.
                </p>

                <h3 className={h3}>e. Email Marketing</h3>
                <p className={p}>
                  We may use your Personal Information to market products or services likely to be of
                  interest to you, or to provide you with special offers and opportunities, via
                  email. With respect to commercial email communications from us, you may opt out of
                  these emails via a link in the footer of all commercial email messages.
                </p>

                <h2 className={h2}>6. SECURITY</h2>
                <p className={p}>
                  We recognize the importance of safeguarding the confidentiality of your Personal
                  Information. Accordingly, we employ commercially reasonable administrative,
                  technical, and physical safeguards to protect your Personal Information from
                  unauthorized access, disclosure, and use. Even with these safeguards, no data
                  transmission over the Internet or other network can be guaranteed 100% secure. As a
                  result, while we strive to protect information transmitted on or through our Site
                  and Services we cannot, and do not, guarantee the security of any information you
                  or we transmit on our Site or using our Services, or that you or we transmit over
                  any other electronic network and you accept any associated risk.
                </p>

                <h2 className={h2}>7. BLOGS &amp; FORUMS</h2>
                <p className={p}>
                  Our Site and/or Services may contain features such as blogs, forums, message
                  boards, or other public-facing message systems. If you use one of these features,
                  your comments, including any Personal Information you share, will be viewable to
                  other users and the public. You use such features at your own risk. We are not
                  responsible for the Personal Information you share using such features or any
                  consequences that result therefrom.
                </p>
                <p className={p}>
                  We reserve the right, but are under no obligation, to remove any comments from such
                  features that we believe, in our sole discretion, constitute defamation, libel,
                  slander, obscenity, pornography, profanity, hate speech, discrimination, or
                  otherwise offend other users or our brand.
                </p>

                <h2 className={h2}>8. OTHER WEBSITES</h2>
                <p className={p}>
                  Please be aware that third-party websites accessible through the Site or Services
                  may have their own privacy and data collection policies and practices. We are not
                  responsible for any actions, content of websites, or privacy policies of such third
                  parties. You should check the applicable privacy policies of those third parties
                  when providing information through linked websites.
                </p>

                <h2 className={h2}>9. COMPLIANCE WITH LAWS AND LAW ENFORCEMENT</h2>
                <p className={p}>
                  We cooperate with government and law enforcement officials and private parties to
                  enforce and comply with the law. We may disclose Personal Information, Usage Data,
                  and any other information about you to government or law enforcement officials or
                  private parties if, in our sole discretion, we believe it is necessary or
                  appropriate to respond to legal requests (including court orders, investigative
                  demands, and subpoenas), to protect the safety, property, or rights of ourself,
                  users, or any other third party, to prevent or stop any illegal, unethical, or
                  legally actionable activity, or to comply with law.
                </p>

                <h2 className={h2}>10. OTHER TRANSFERS</h2>
                <p className={p}>
                  We may share Personal Information and Usage Data with businesses controlling,
                  controlled by, or under common control with us. If we are merged, acquired, or
                  sold, or in the event of a transfer of some or all of our assets, we may disclose or
                  transfer Personal Information and Usage Data in connection with such transaction.
                </p>

                <h2 className={h2}>11. HOW LONG WE RETAIN YOUR DATA</h2>
                <p className={p}>
                  We retain your Personal Information for as long as we have a relationship with you.
                  We also retain your Personal Information for a period of time after our
                  relationship with you has ended where there is an ongoing business need to retain
                  it. This includes retention to comply with our legal, regulatory, tax, and/or
                  accounting obligations. Generally, we retain Personal Information until you ask us
                  to delete it, or otherwise in accordance with applicable law and our internal data
                  retention policies.
                </p>

                <h2 className={h2}>12. CHILDREN&apos;S PRIVACY</h2>
                <p className={p}>
                  The Site is not intended for children under the age of 18 and we do not knowingly
                  collect Personal Information from children under the age of 18. If we become aware
                  that we have inadvertently received Personal Information from a child under the age
                  of 18, we will delete such information from our records.
                </p>

                <h2 className={h2}>13. OPT OUT</h2>
                <p className={p}>
                  You have the right to opt out of receiving marketing from us by emailing us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                    {CONTACT_EMAIL}
                  </a>
                  . If you opt out of marketing you will still receive transactional messages, such
                  as responses to your questions. If you opt-out of receiving marketing
                  communications from our business partners with whom we have shared your
                  information, you will still receive marketing communications from us and any other
                  business partners with whom your information was shared. If you do not wish us to
                  track your location, you can turn off the GPS location or push notifications on
                  your phone or personal computer through your local settings.
                </p>

                <h2 className={h2}>14. CONTACT US</h2>
                <p className={p}>
                  If you have any questions about our Site, Services, or this Privacy Policy, please
                  email us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                    {CONTACT_EMAIL}
                  </a>
                  . You may also send us a letter to the following address:
                </p>
                <p className={p}>
                  Protectifii
                  <br />
                  Attn: Privacy Dept.
                  <br />
                  {ADDRESS}
                </p>

                <h2 className={h2}>15. EUROPEAN VISITORS</h2>
                <p className={p}>
                  In connection with the General Data Protection Regulation (GDPR) applicable in the
                  European Economic Area (EEA), we eliminate or limit the use of cookies and similar
                  technologies with visitors from the EEA (excluding our corporate website available
                  at www.protectifii.com, which continues to use cookies for all users unless opted
                  out). Specifically:
                </p>
                <ul className={ul}>
                  <li>
                    If you visit a third-party site that uses our services, we will not place any
                    cookies on your device unless you have provided your consent and were provided
                    with notice of our privacy practices and your ability to opt-out at any time.
                  </li>
                  <li>
                    We will not seek your consent to use cookies in this instance, though the
                    advertiser or their website publisher may do so.
                  </li>
                  <li>
                    If you visit one of our websites, we will only place limited third-party cookies,
                    such as those made available for analytics purposes by Google and Bing. In this
                    case, we will only add these after you indicate your consent. If you do not
                    consent, then no cookies will be written to your device.
                  </li>
                  <li>
                    If you do not consent or opt out, you will still be able to use our websites, but
                    certain functionality may be limited. To enable this feature, we use third-party
                    tools to determine your geographic location; if these tools indicate that you are
                    in the EEA, then we treat your visit as above. If you feel that you are subject
                    to GDPR, but we have nonetheless used cookies in connection with your visit
                    without consent (which may be due to a failure of the third party geolocation
                    tools, your use of a proxy server, your location outside of the EEA at the time
                    of your visit, or some other factor beyond our control) please notify us at{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                      {CONTACT_EMAIL}
                    </a>{" "}
                    and make sure to include any relevant details so that we can ensure proper
                    treatment of your data under GDPR.
                  </li>
                </ul>

                <h2 className={h2}>16. ADDITIONAL CALIFORNIA CONSUMER RIGHTS</h2>
                <p className={p}>
                  The California Consumer Privacy Act (&quot;CCPA&quot;) gives California residents
                  certain rights to access and delete their &quot;Personal Information,&quot; and to
                  opt out of the sale of their Personal Information. The CCPA also requires
                  businesses to disclose in their privacy policies information about how they
                  collect, use, and share Personal Information. This section of the privacy policy
                  contains the disclosures we are required to make and summarizes the rights that
                  California residents have under the CCPA.
                </p>
                <p className={p}>
                  For purposes of this section, the term &quot;Personal Information&quot; means Personal
                  Information under Cal. Civ. Code 1798.140(o) as amended from time to time. To the
                  extent that any other provision of this Privacy Policy conflicts with a provision
                  of this section, the provision in this section controls as to California residents.
                </p>

                <h3 className={h3}>a. Right to Know</h3>
                <p className={p}>
                  You have the right to request that we provide you (i) the categories and/or
                  specific pieces of Personal Information we collected about you; (ii) the categories
                  of sources from which your Personal Information was collected; (iii) the business
                  or commercial purpose for which we collected your Personal Information; and (iv)
                  the categories of third parties with whom we shared your Personal Information. If
                  we sold or disclosed your Personal Information to third parties, you also have the
                  right to request that we provide you (i) the categories of Personal Information we
                  collected about you; (ii) the categories of your Personal Information we sold to
                  third parties; (iii) the categories of third parties to whom we sold your Personal
                  Information; and (iv) the categories of your Personal Information we disclosed to
                  third parties.
                </p>
                <p className={p}>
                  Please note that we are not permitted to provide access to specific pieces of
                  Personal Information if the Personal Information is sensitive or creates a high
                  risk of potential harm from disclosure to an unauthorized person such as financial
                  account information, health information, social security numbers, or driver&apos;s
                  license numbers. If we withhold specific personal information because of its
                  sensitivity or risk, we will inform you.
                </p>
                <p className={`${p} font-bold`}>
                  Categories of Information Collected, Disclosed or Sold in the Past 12 Months
                </p>
                <p className={p}>
                  The below table discloses the categories of Personal Information that we have
                  collected in the past 12 months from the effective date of this Privacy Policy. For
                  each category of Personal Information, the table identifies whether we have sold to
                  a third party, or disclosed for a business purpose, the category of Personal
                  Information; and the categories of third parties to whom the information was
                  disclosed or sold. The table does not include Personal Information provided to us
                  by partners or other customers in a business-to-business context.
                </p>
                <div className="mb-5 overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse text-left text-sm text-[#1e1e1e] font-inter">
                    <thead>
                      <tr className="bg-[#f8fafc]">
                        <th className="border border-gray-300 px-3 py-2 font-bold">
                          Category of Personal Information Collected
                        </th>
                        <th className="border border-gray-300 px-3 py-2 font-bold">
                          Sold or Disclosed?
                        </th>
                        <th className="border border-gray-300 px-3 py-2 font-bold">
                          Category of Third Parties to Whom the Personal Information was Sold or
                          Disclosed
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">
                          Identifiers, including your name, IP address, email address, phone, address
                        </td>
                        <td className="border border-gray-300 px-3 py-2">Disclosed</td>
                        <td className="border border-gray-300 px-3 py-2">
                          We have disclosed for a business purpose this category of Personal
                          Information to Service Providers
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">
                          Customer records information, including signature, bank account number,
                          address
                        </td>
                        <td className="border border-gray-300 px-3 py-2">Disclosed</td>
                        <td className="border border-gray-300 px-3 py-2">
                          We have disclosed for a business purpose this category of Personal
                          Information to Service Providers
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">
                          Characteristics of Protected Classifications
                        </td>
                        <td className="border border-gray-300 px-3 py-2">Not Sold or Disclosed</td>
                        <td className="border border-gray-300 px-3 py-2">—</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">
                          Commercial Information, including records of services that you have
                          purchased in the past
                        </td>
                        <td className="border border-gray-300 px-3 py-2">Disclosed</td>
                        <td className="border border-gray-300 px-3 py-2">
                          We have disclosed for a business purpose this category of Personal
                          Information to Service Providers
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">
                          Internet or Other Network Activity Information, including information about
                          how you interact with our website
                        </td>
                        <td className="border border-gray-300 px-3 py-2">Disclosed</td>
                        <td className="border border-gray-300 px-3 py-2">
                          We have disclosed for a business purpose this category of Personal
                          Information to Service Providers
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">Geolocation Data</td>
                        <td className="border border-gray-300 px-3 py-2">Not sold or Disclosed</td>
                        <td className="border border-gray-300 px-3 py-2">—</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2">
                          Professional or Employment-Related Information, including your job title
                          and organizational affiliation
                        </td>
                        <td className="border border-gray-300 px-3 py-2">Disclosed</td>
                        <td className="border border-gray-300 px-3 py-2">
                          We have disclosed for a business purpose this category of Personal
                          Information to Service Providers
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className={h3}>b. Right to Deletion</h3>
                <p className={p}>
                  You have the right to request that we delete any Personal Information we have
                  collected about you. Please understand that we are not required to honor a
                  deletion request if we need the information to complete a requested or reasonably
                  anticipated transaction, prevent security incidents or fraud, enable internal uses
                  that are reasonably aligned with your expectations, comply with legal obligations,
                  or perform other functions permitted by law.
                </p>

                <h3 className={h3}>c. Exercising your Rights to Know and Deletion</h3>
                <p className={p}>
                  You may exercise your Rights to Know and Deletion by emailing us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                    {CONTACT_EMAIL}
                  </a>{" "}
                  or completing the form on our{" "}
                  <Link href={DO_NOT_SELL_HREF} className={linkClass}>
                    CCPA Request Page
                  </Link>
                  . Please be specific in your request and provide sufficient information to allow us
                  to locate your Personal Information in our systems based on your request. We will
                  retain a record of your request, including a deletion request, in accordance with
                  law. Additional information about our timeframe for response and identity
                  verification is available on our{" "}
                  <Link href={DO_NOT_SELL_HREF} className={linkClass}>
                    CCPA Request Page
                  </Link>
                  .
                </p>
                <p className={p}>
                  Request information about our collection, use, and sharing of their information (a
                  &quot;Request to Know&quot;), including:
                </p>
                <ul className={ul}>
                  <li>
                    the categories and specific pieces of Personal Information we have collected
                    about them;
                  </li>
                  <li>
                    the categories of sources from which we have collected their Personal
                    Information;
                  </li>
                  <li>
                    the business or commercial purpose for collecting or selling their Personal
                    Information;
                  </li>
                  <li>the categories of their Personal Information that we have sold; and</li>
                  <li>
                    the categories of third parties with whom we have shared, disclosed for a
                    business purpose, or sold their Personal Information, and which categories of
                    Personal Information we have sold to which categories of third parties.
                  </li>
                </ul>
                <p className={p}>
                  We will not discriminate against users for exercising these rights. We may charge
                  users different prices or provide different levels or quality of goods or services,
                  if the difference is reasonably related to the value of their data. We may also
                  offer financial incentives for the collection, sale, or deletion of your Personal
                  Information. In addition, some Personal Information is essential for us to provide
                  the Services. For example, we cannot provide you with an insurance quote without
                  first collecting some Personal Information about you. In such instances, your
                  refusal to provide the necessary Personal Information will result in the inability
                  to use our Service.
                </p>

                <h3 className={h3}>d. Right to Opt Out, Correct Inaccuracies</h3>
                <p className={p}>
                  You have the right to direct us not to sell your Personal Information to third
                  parties. You may exercise your Right to Opt Out by emailing us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                    {CONTACT_EMAIL}
                  </a>{" "}
                  or completing the form on our{" "}
                  <Link href={DO_NOT_SELL_HREF} className={linkClass}>
                    CCPA Request Page
                  </Link>
                  . Please provide sufficient information to allow us to locate your Personal
                  Information in our systems.
                </p>
                <p className={p}>
                  Please contact us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                    {CONTACT_EMAIL}
                  </a>{" "}
                  if you would like to request access to the PII that we have collected online from
                  you, or to correct factual errors in such information.
                </p>

                <h3 className={h3}>e. Non-Discrimination Notice</h3>
                <p className={p}>
                  We will not discriminate against you for exercising your rights under the CCPA or
                  this Privacy Policy.
                </p>

                <h3 className={h3}>f. California &quot;Do Not Track&quot; Disclosure</h3>
                <p className={p}>
                  Do Not Track is a web browser privacy preference that causes the web browser to
                  broadcast a signal to websites requesting that a user&apos;s activity not be
                  tracked. At this time, our Site and Services do not respond to &quot;do not
                  track&quot; signals.
                </p>

                <h3 className={h3}>g. California Site Ownership Disclosure</h3>
                <p className={p}>
                  Under California Civil Code Section 1789.3, California residents are entitled to
                  the following information: The provider of the Site is Protectifii, {ADDRESS}. To
                  file a complaint regarding the Site or to receive further information about the
                  Site, please contact us. You may also contact the Complaint Assistance Unit of the
                  Division of Consumer Services of the Department of Consumer Affairs in writing at
                  1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone
                  at (800) 952-5210.
                </p>

                <h3 className={h3}>h. Right to Non-Discrimination</h3>
                <p className={p}>
                  Should you wish to exercise your rights as a resident of California, we will not
                  discriminate against you by showing you different products or services based solely
                  upon your request. Kindly note, however, if the advertisers require additional data
                  or information from you before providing quotes, rates, or other information,
                  exercising your California rights may limit the number and range of advertisers who
                  are displayed in response to your request.
                </p>

                <h3 className={h3}>i. Do Not Sell My Personal Information</h3>
                <p className={p}>
                  Some of our sharing activities may be a &quot;sale&quot; of personal information under
                  California law. For example, when we share information we collected automatically
                  from you with advertisers in order to create consumer profiles and present our
                  advertisers&apos; products and services to you. Subject to certain exceptions, as a
                  California resident, you may opt-out of the &quot;sale&quot; of your personal
                  information at any time by taking the following actions:
                </p>
                <ul className={ul}>
                  <li>
                    For information collected automatically through cookies and similar tracking
                    technologies change your browser settings to stop accepting cookies or to prompt
                    you before accepting cookies. To learn more, read{" "}
                    <Link href={COOKIES_HREF} className={linkClass}>
                      Cookies and Other Technologies
                    </Link>
                    .
                  </li>
                  <li>
                    For all other information, if you wish to put on file with us your preference to
                    opt-out of our sharing of your personal Information with third parties for such
                    third parties&apos; direct marketing purposes or to find out more about your
                    opt-out rights, please submit your request through our{" "}
                    <Link href={DO_NOT_SELL_HREF} className={linkClass}>
                      Do Not Sell My Personal Information form
                    </Link>
                    .
                  </li>
                </ul>

                <h3 className={h3}>j. Shine the Light</h3>
                <p className={p}>
                  California residents may, no more than once per calendar year, request from us
                  information about our disclosure of certain categories of personal information to
                  third parties for direct marketing purposes. To be valid, requests must be
                  submitted to us by emailing{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                    {CONTACT_EMAIL}
                  </a>{" "}
                  and noting that the request is a &quot;Shine the Light Request.&quot; We will provide
                  you within 30 days of receiving your request, a list of the categories of personal
                  information (also known as personal data) disclosed to third parties for direct
                  marketing purposes during the immediately preceding calendar year and the names and
                  addresses of the third parties.
                </p>

                <h3 className={h3}>k. Minors</h3>
                <p className={p}>
                  Visitors under 16 years of age are not permitted to use and/or submit their
                  personal information at any Site. We do not knowingly solicit or collect
                  information from visitors under 16 years of age. We encourage parents and guardians
                  to spend time online with their children and to participate in and monitor the
                  interactive activities of their children. The CCPA and Children&apos;s Online
                  Privacy Protection Act imposes certain requirements on website operators that have
                  actual knowledge that they collect personally identifiable information from
                  children under 13 years of age. If we learn that personally identifiable
                  information of persons less than 13 years of age has been collected without
                  verifiable parental consent, then we will take the appropriate steps to delete this
                  information. To make such a request, or if you have any questions or concerns about
                  the Privacy Policy for the website or its implementation, please contact us at:{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>

                <h2 className={h2}>17. Nevada Residents</h2>
                <p className={p}>
                  Subject to certain exceptions, some of our data sharing practices may be considered
                  a &quot;sale&quot; of your personal information under Nevada Revised Statutes 603A.
                  Nevada residents may opt-out of the &quot;sale&quot; of personal information covered
                  under the statute, by exercising your cookie consent options as detailed in{" "}
                  <Link href={COOKIES_HREF} className={linkClass}>
                    Cookies and Other Technologies
                  </Link>{" "}
                  or by submitting your request through our{" "}
                  <Link href={DO_NOT_SELL_HREF} className={linkClass}>
                    Do Not Sell My Personal Information form
                  </Link>{" "}
                  or email us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>

                <h2 className={h2}>18. Retention of Your Personal Data</h2>
                <p className={p}>
                  We will retain your Personal data only for as long as necessary for the purposes
                  set out in this Privacy Policy and to comply with our legal obligations, resolve
                  disputes and enforce our legal agreements and policies. We will also retain Usage
                  Data for internal analysis purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
