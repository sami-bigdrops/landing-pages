"use client"

import Link from "next/link"

const p = "mb-5 text-sm leading-relaxed text-[#1e1e1e] font-inter sm:text-base md:text-lg"
const h2 = "mb-4 text-xl font-bold text-[#1e1e1e] font-inter sm:text-2xl md:text-3xl"
const h3 = "mb-3 text-lg font-bold text-[#1e1e1e] font-inter sm:text-xl"
const link = "font-bold text-blue-600 hover:text-blue-800 font-inter"

export default function TermsOfUse() {
  return (
    <div>
      <section
        id="terms-of-use"
        className="bg-white p-5 md:p-8 lg:p-10 xl:px-16 2xl:px-20"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col gap-8">
            <div className="rounded-lg bg-white p-6 shadow-lg md:p-8">
              <div className="mb-8 text-center">
                <h1 className="font-inter text-center text-3xl font-bold text-[#1e1e1e] sm:text-4xl md:text-5xl lg:text-6xl">
                  Terms of Use
                </h1>
                <p className="mt-4 font-inter text-sm text-[#4B5563] md:text-base">
                  Last updated: July 2026
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <div>
                  <p className={p}>
                    MediSavingz and/or its affiliated and subsidiary companies (individually and/or
                    collectively, &quot;MediSavingz,&quot; &quot;we&quot; or &quot;us&quot; or
                    &quot;our&quot;) owns and operates this website, and portions of other web pages
                    and web content through which you have accessed these Terms of Use
                    (collectively, the &quot;Site&quot;). By visiting, using and/or submitting
                    information to the Site, you agree to be bound by these Terms of Use (this
                    &quot;Agreement&quot;). We may collect or receive your personal information when
                    you use this Site or our Services (defined below). Our collection, processing,
                    and maintenance of this personal information is governed by our{" "}
                    <Link href="/privacy-policy" className={link}>
                      Privacy Policy
                    </Link>{" "}
                    (the &quot;Privacy Policy&quot;), which is incorporated herein by reference and
                    made part of this Agreement. To the extent there is an inconsistency between
                    this Agreement and the Privacy Policy, the Privacy Policy shall govern.
                  </p>
                  <p className={`${p} font-semibold uppercase`}>
                    This Agreement contains an agreement to arbitrate all claims, a jury trial
                    waiver, and a class action waiver that affects your rights. In arbitration,
                    there is no judge or jury, and there is less discovery and appellate review
                    than in court. This Agreement also includes disclaimers of warranties and
                    liability that may affect your rights and ability to recover certain damages.
                    Details are set forth below. Please review carefully.
                  </p>
                  <p className={p}>
                    You acknowledge and agree that you understand MediSavingz is not an insurance
                    company. Through the Site, we may help to connect you with independent third
                    parties, such as insurance companies (&quot;Third Parties&quot; or each
                    individually, a &quot;Third Party&quot;) that might provide you with insurance
                    coverage if you choose to enroll in an insurance plan through the Site or
                    through one of our licensed insurance agents (our &quot;Services&quot;). We do
                    not, and will not, make any coverage or credit decision with any insurance
                    company or Third Party referred to you. We do not issue insurance coverage or
                    any other financial products.
                  </p>
                  <p className={p}>
                    You represent that you have the capacity to be bound by this Agreement, or if
                    you are acting on behalf of a company or other entity, you have the authority
                    to bind such company or entity.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>The Site Is Not Intended for Minors</h2>
                  <p className={p}>
                    The Site is intended to be accessed and used only by adults and is not directed
                    to minors. We do not knowingly collect personal information from anyone under
                    the age of 18 and you should not provide us with any information regarding any
                    individual under the age of 18.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Your Access and Use of the Site</h2>
                  <p className={p}>
                    Your right to access and use the Site is personal to you and is not transferable
                    by you to any other person or entity. You are only entitled to access and use
                    the Site for lawful purposes and pursuant to this Agreement. You agree not to
                    use the Site in a way that violates any laws, infringes any individual or
                    entity&apos;s rights, is inappropriate or offensive, or interferes with the Site
                    or any features on the Site (including any technological measures we employ to
                    enforce this Agreement). You acknowledge and agree that using our Site does not
                    afford you any rights to the Content (defined below) you access. You may not
                    use, copy, edit or distribute Content from our Site unless you obtain prior
                    written approval from us.
                  </p>
                  <p className={p}>
                    Any action by you that, in our sole discretion: (i) violates the terms set forth
                    in this Agreement; (ii) restricts, inhibits or prevents any access, use or
                    enjoyment of the Site; or (iii) through the use of the Site, defames, abuses,
                    harasses, offends or threatens, shall not be permitted, and may result in your
                    loss of the right to access and use the Site or access our Services. You shall
                    not metatag, provide links to or frame the Site without our prior express
                    written permission.
                  </p>
                  <p className={p}>
                    Your access and use of the Site may be interrupted from time to time for any of
                    several reasons, including, without limitation, the malfunction of equipment,
                    periodic updating, maintenance or repair of the Site or other actions that we,
                    in our sole discretion, may elect to take. We reserve the right to suspend or
                    discontinue the availability of the Site and/or any portion or feature of the
                    Site at any time in our sole discretion and without prior notice.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Your Access and Use of Our Services</h2>
                  <p className={p}>
                    Below are terms and conditions governing the Services made available to you via
                    the Site.
                  </p>
                  <p className={p}>
                    <span className="font-bold">
                      You Must Maintain the Integrity of Your Information.
                    </span>{" "}
                    To use certain Services, you may be required to provide us with information
                    about you (&quot;Your Information&quot;). If you provide Your Information to us
                    then you agree to provide true, current, complete and accurate information, and
                    not to misrepresent your identity. You also agree to keep Your Information
                    current and to update Your Information if any of Your Information changes.
                  </p>
                  <p className={p}>
                    <span className="font-bold">
                      You Are Responsible for Your Financial and Insurance Decisions.
                    </span>{" "}
                    We, through the Site, provide a venue through which you can obtain information
                    and request to be connected to licensed insurance agents and Third Parties based
                    on Your Information provided to us. It is your responsibility to vet and select
                    Third Parties. You acknowledge and agree that Third Parties are solely
                    responsible for any services that they may provide to you and that we shall not
                    be liable for any losses, costs, damages or claims in connection with, arising
                    from or related to your use of a Third Party&apos;s products or services. We
                    urge you to obtain the advice of financial advisors, insurance agents, brokers
                    or other qualified professionals who are fully aware of your individual
                    circumstances before you make any financial or insurance decisions. You
                    acknowledge and agree that you rely on your own judgment in selecting any
                    products or services offered by Third Parties.
                  </p>
                  <p className={p}>
                    <span className="font-bold">You Do Not Pay Fees to Us.</span> MediSavingz does
                    not charge consumers a fee to access the Site or Services. Third Parties,
                    however, may pay us fees in order to be matched with consumers. MediSavingz is
                    not involved with and is not responsible for any fee arrangement consumers and
                    Third Parties may enter into. You acknowledge and agree to this compensation
                    arrangement. You hereby release us of any and all losses, costs, damages or
                    claims in connection with, arising from or related to your use of a Third
                    Party&apos;s products or services, including any fees charged by a Third Party.
                  </p>
                  <p className={p}>
                    <span className="font-bold">
                      Applications and Requests for Quotes or Offers.
                    </span>{" "}
                    The Site may give you the opportunity to apply for an insurance plan (each, an
                    &quot;Application&quot;) and/or to request to be contacted by and receive quotes
                    or offers from licensed insurance agents to discuss insurance products offered
                    by Third Parties (each, a &quot;Request&quot;). Portions of the Site providing
                    this opportunity (the &quot;Request Areas&quot;) are only available to residents
                    of the United States, and may not be available in all states.
                  </p>
                  <ul className="mb-5 list-disc space-y-3 pl-5">
                    <li className={p.replace("mb-5 ", "")}>
                      We make no guarantee that you will qualify for an insurance plan with a Third
                      Party if you submit an Application, or that you will be contacted by a
                      licensed insurance agent if you submit a Request.
                    </li>
                    <li className={p.replace("mb-5 ", "")}>
                      You agree that any information that you provide in connection with your
                      Application or Request may be used and disclosed as set forth in the Privacy
                      Policy and/or as otherwise set forth at the time you provide such information.
                      You authorize Third Parties, and their affiliates and service providers, to
                      conduct all necessary research with your information, including checking your
                      credit history, if applicable, for purposes of responding to your Application
                      or Request. We are not responsible for the way a Third Party processes your
                      personal information, and we encourage you to review the privacy practices of
                      Third Parties you engage with.
                    </li>
                    <li className={p.replace("mb-5 ", "")}>
                      If you make a Request, then you expressly authorize an insurance agent to
                      contact you by telephone, text and email at the numbers and addresses provided
                      in your Request, for purposes of providing you with the quotes, products and
                      services indicated in your Request, each as applicable. You consent to receive
                      telephone calls from insurance agents to discuss the products and services
                      offered, even if the phone number that you provided on your Request is on any
                      &quot;Do Not Call&quot; list. You also consent to the recording of such calls.
                    </li>
                    <li className={p.replace("mb-5 ", "")}>
                      If you submit an Application, then you expressly authorize us and/or the
                      applicable Third Party to contact you by telephone, text and email at the
                      numbers and addresses provided in your Application, for purposes of processing
                      your Application. You provide this consent to receive telephone calls from us
                      or the applicable Third Party, even if the phone number that you provided on
                      your Request is on any &quot;Do Not Call&quot; list. You also consent to the
                      recording of such calls.
                    </li>
                    <li className={p.replace("mb-5 ", "")}>
                      You are solely responsible for complying with applicable laws and regulations
                      in connection with your use of any services offered by a Third Party,
                      including a Third Party&apos;s terms of service.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className={h2}>Our Intellectual Property Rights</h2>
                  <p className={p}>
                    Our names, graphics, logos, page headers, button icons, scripts, and service
                    names are our trademarks or trade dress in the United States and/or other
                    countries (collectively, the &quot;Proprietary Marks&quot;). You may not use the
                    Proprietary Marks without our prior express written permission, which permission
                    may be withheld in our sole discretion. MediSavingz makes no proprietary claim
                    to any third-party names, trademarks or service marks appearing on the Site. Any
                    third-party names, trademarks, and service marks are property of their
                    respective owners.
                  </p>
                  <p className={p}>
                    The information, advice, data, software and content viewable on, contained in,
                    or downloadable from the Site (collectively, the &quot;Content&quot;), including,
                    without limitation, all text, graphics, charts, pictures, photographs, images,
                    line art, icons and renditions, are copyrighted by, or otherwise licensed to, us
                    or third parties. We also own a copyright of a collective work in the selection,
                    coordination, arrangement, presentation, display and enhancement of the Content
                    (the &quot;Collective Work&quot;). All software used on the Site (the
                    &quot;Software&quot;) is our property or property of our software vendors and is
                    protected by United States and international copyright laws. Viewing, reading,
                    printing, downloading or otherwise using the Content and/or the Collective Work
                    does not entitle you to any ownership or intellectual property rights to the
                    Content, the Collective Work or the Software.
                  </p>
                  <p className={p}>
                    You shall be solely responsible for any damage resulting from your infringement
                    of our or any third party&apos;s intellectual property rights regarding the
                    Proprietary Marks, the Content, the Collective Work, the Software and/or any
                    other harm incurred by us as a direct or indirect result of your copying,
                    distributing, redistributing, transmitting, publishing or using the same for
                    purposes that are contrary to the terms and conditions of this Agreement.
                  </p>
                  <p className={p}>
                    We grant you a limited license to access, print, download or otherwise make
                    personal use of the Content and the Collective Work in the form of: (i) one
                    machine-readable copy; (ii) one backup copy; and (iii) one print copy, for your
                    non-commercial use; provided, however, that you shall not delete any proprietary
                    notices or materials with regard to the foregoing manifestations of the Content
                    and the Collective Work. You may not modify the Content or the Collective Work
                    or utilize them for any commercial purpose or any other public display,
                    performance, sale, or rental, decompile, reverse engineer, or disassemble the
                    Content or the Collective Work, or transfer the Content or the Collective Work
                    to another person or entity.
                  </p>
                  <p className={p}>
                    Except as otherwise permitted under the copyright laws of the United States, no
                    other copying, distribution, redistribution, transmission, publication or use,
                    other than the non-commercial use of the Content and the Collective Work as
                    permitted by this Agreement, is permitted by you without our express prior
                    written permission, which permission may be withheld in our sole discretion.
                  </p>
                  <p className={p}>
                    You may not use any meta tags or any other &quot;hidden text&quot; utilizing our
                    name or trademarks without express written permission, which permission may be
                    withheld in our sole discretion.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Site Access and Interference</h2>
                  <p className={p}>
                    The Site contains robot exclusion headers. You agree that you will not use any
                    robot, spider, scraper, deep link or other similar automated data gathering or
                    extraction tools, program, algorithm or methodology to access, acquire, copy or
                    monitor the Site or any portion of the Site or for any other purpose, except
                    where permitted. Additionally, you agree that you will not: (i) take any action
                    that imposes, or may impose in our sole discretion an unreasonable or
                    disproportionately large data load on our infrastructure; (ii) copy, reproduce,
                    modify, create derivative works from, distribute or publicly display any content
                    (except for your personal information) from the Site without our prior written
                    permission and the appropriate third party, as applicable; (iii) interfere or
                    attempt to interfere with the proper working of the Site or any activities
                    conducted on the Site; or (iv) bypass our robot exclusion headers or other
                    measures we may use to prevent or restrict access to the Site. Notwithstanding
                    the foregoing, we grant the operators of public search engines permission to use
                    publicly available search indices of the materials on the Site, but not caches
                    or archives of such materials. We reserve the right to revoke these exceptions
                    either generally or in specific cases.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Electronic Communications</h2>
                  <p className={p}>
                    When you visit the Site or send email to us, you are communicating with us
                    electronically. You consent to receive communications from us electronically.
                    Although we may choose to communicate with you by regular mail, we may also
                    choose to communicate with you by e-mail or by posting notices on the Site. You
                    agree that all agreements, notices, disclosures and other communications that we
                    provide to you electronically satisfy any legal requirement that such
                    communications be in writing and do not constitute unsolicited electronic
                    communications.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Your Responsibility for Equipment and Related Costs</h2>
                  <p className={p}>
                    You are responsible for obtaining and maintaining all telephone, computer
                    hardware, Internet access services and other equipment or services needed to
                    access and use the Site, and all costs and fees associated with Internet access
                    or long-distance charges incurred with regard to your access and use of the
                    Site.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Third Party Links</h2>
                  <p className={p}>
                    There may be provided on the Site links to other websites belonging to our
                    advertisers, business partners, affiliates, Service Providers and/or other third
                    parties. Such links do not constitute an endorsement by us of those websites,
                    nor the products or services listed on those websites. We are not responsible
                    for the activities or policies of those websites. We do not endorse or recommend
                    the products of any particular advertiser, business partner, affiliate or other
                    third party. We do not guarantee that the terms or rates offered by any
                    particular advertiser, business partner, affiliate, Service Provider or other
                    third party on the Site are the best terms or lowest rates available in the
                    market.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Mobile Devices</h2>
                  <p className={p}>
                    If we provide aspects of the Site via an application for your mobile or other
                    device, please be aware that your carrier&apos;s normal rates and fees may apply
                    and that the terms of this Agreement and other agreements within the application
                    apply to your use of such mobile application.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>No Representations or Warranties</h2>
                  <p className={p}>
                    The Content and all services and products associated with the Site are provided
                    to you on an &quot;as-is&quot; and &quot;as available&quot; basis. We make no
                    representations or warranties of any kind, express or implied, as to the
                    operation of the Site or the information, content, materials, products or
                    services included on or associated with the Site. You expressly agree that your
                    use of the Site and all products and services included on or associated with the
                    Site is at your sole risk.
                  </p>
                  <p className={p}>
                    We do not make any representations, warranties or guarantees, express or
                    implied, regarding the accuracy, correctness, or completeness of the Content or
                    the services and products associated with the Site, nor the safety, reliability,
                    title, timeliness, completeness, merchantability, conformity or fitness for a
                    particular purpose of the Content or the services and products associated with
                    the Site. It is your sole responsibility to independently evaluate the accuracy,
                    correctness or completeness of the Content and the services and products
                    associated with the Site. We make no representation, warranty or guarantee that
                    the Content that may be available for downloading from the Site is free of
                    infection from any viruses, worms, Trojan horses, trap doors, back doors, easter
                    eggs, time bombs, cancelbots or other code or computer programming routines that
                    contain contaminating or destructive properties or that are intended to damage,
                    detrimentally interfere with, surreptitiously intercept or expropriate any
                    system, data or personal information. We do not make any representations,
                    warranties or guarantees, express or implied, regarding any quotes or offers
                    provided on or through the Site.
                  </p>
                  <p className={p}>
                    The Content is intended only to assist you with information related to financial
                    decisions and is broad in scope and does not consider your personal financial
                    situation. Your personal financial situation is unique and the information
                    provided on this Site may not be appropriate for your situation. Accordingly,
                    before making any final decisions or implementing any financial strategy, we
                    recommend that you obtain additional information and advice of your accountant
                    and other financial advisors who are fully aware of your individual
                    circumstances. Nothing on our Site constitutes financial advice.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Limitations of Liability</h2>
                  <p className={p}>
                    To the fullest extent permitted by law, we, our members, managers, directors,
                    officers, shareholders, employees, assigns, independent contractors,
                    representatives, and agents, shall in no event be responsible to, or liable to,
                    you, or any third party, for any damages, including, but not limited to,
                    special, incidental, indirect or consequential damages that include, but are not
                    limited to, damages for any loss of profit, revenue or business, as a direct or
                    indirect result of: (i) your breach or violation of this Agreement; (ii) your
                    access and use of the Site; (iii) your delay in accessing or inability to access
                    or use the Site; (iv) your downloading of any of the Content or the Collective
                    Work for your use; (v) your reliance upon or use of the Content or the
                    Collective Work, or (vi) any information, software, products or services
                    obtained through the Site, or otherwise arising out of the use of the Site.
                  </p>
                  <p className={`${p} font-semibold uppercase`}>
                    This limitation of liability applies, in whole or in part, from breach of
                    contract, tortious behavior, negligence, strict liability or otherwise.
                    Notwithstanding the foregoing, we do not exclude liability for any condition or
                    warranty that cannot be excluded by law. Our liability for the breach of such
                    condition or warranty shall be limited to the greater of the cost of providing
                    the affected service again and the sum equivalent to US $100, except where
                    prohibited by local law.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Indemnification</h2>
                  <p className={p}>
                    You shall defend, indemnify and hold harmless Us and our members, managers,
                    directors, officers, shareholders, employees, assigns, independent contractors,
                    representatives, and agents from and against all claims and expenses, including,
                    but not limited to, attorney&apos;s fees, arising out of, or attributable to:
                    (i) any breach or violation of this Agreement by you; (ii) your failure to
                    provide accurate, complete and current personally identifiable information
                    requested or required by us; (iii) your access or use of the Site; (iv) access
                    or use of the Site under any password that may be issued to you; and/or (v) any
                    personal injury or property damage caused by you.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Governing Law</h2>
                  <p className={p}>
                    To the fullest extent allowed by law, all actions arising out of or relating to
                    the Agreement will be governed by the laws of the State of New Jersey without
                    giving effect to principles of conflict of laws. To the extent legally
                    applicable, you agree that, notwithstanding any statute of limitation to the
                    contrary, any claim or action you may wish to bring against us for any act or
                    omission arising out of or relating to the Agreement must be brought within one
                    (1) year from the date of the alleged act or omission giving rise to the claim
                    or cause of action. Failure to bring such action within the permitted time shall
                    act as a bar against all claims against us for such act or omission. You waive
                    any and all claims or rights to have any other statute of limitation apply.
                  </p>
                  <p className={p}>
                    In the event that any alleged act or omission giving rise to your claim is not
                    subject to binding arbitration, or any issue of arbitrability arises as
                    described in the below section, any such claim will be brought in the courts of
                    record of Bergen County, New Jersey, or the United States District Court for the
                    District of New Jersey, located in Newark, New Jersey. You consent to the
                    jurisdiction of such courts and waive any objection to venue.
                  </p>
                </div>

                <div id="dispute-resolution">
                  <h2 className={h2}>Dispute Resolution; Arbitration</h2>
                  <p className={`${p} font-semibold uppercase`}>
                    Please read this section carefully, as it contains an arbitration agreement (the
                    &quot;Arbitration Agreement&quot;) and may significantly affect your legal
                    rights. This section also contains a waiver of any and all rights to proceed in
                    a class, collective, consolidated, or representative action in arbitration or
                    litigation, as well as a right to have a trial by jury.
                  </p>
                  <p className={p}>
                    <span className="font-bold">Arbitration Agreement:</span> Unless you opt out as
                    set forth below, any Dispute (defined below) between you and us, any of our
                    parents, subsidiaries, affiliates, or independent contractors, or any of their
                    members, managers, directors, officers, shareholders, employees, assigns, or
                    representatives arising from or relating to the use of the Site shall be
                    resolved by final and binding arbitration. The arbitrator shall decide what is
                    subject to arbitration. MediSavingz&apos;s parents, subsidiaries, affiliates, or
                    independent contractors, and any of their members, managers, directors,
                    officers, shareholders, employees, assigns, or representatives are intended to
                    be third-party beneficiaries of this Agreement.
                  </p>
                  <p className={p}>
                    For purposes of this Section, &quot;Dispute&quot; shall include, but is not
                    limited to, any claims or controversies between you and us that are related in
                    any way to this Agreement, including, but not limited to, your use of the Site,
                    sales, returns, refunds, cancellations, defects, policies, privacy, advertising,
                    and/or any communications between you and us, whether occurring on the Site or
                    otherwise, even if the Dispute arises after the termination of your relationship
                    with us. &quot;Dispute&quot; also includes, without limitation, claims that: (a)
                    you bring against us; (b) we bring against you; (c) in any way relate to or
                    arise out of any aspect of the relationship between you and us, whether based in
                    contract, tort, statute, fraud, misrepresentation, advertising claims, or any
                    other legal theory; (d) arose before you entered into the Agreement or out of a
                    prior agreement with us (including, without limitation, claims relating to
                    advertising); (e) are subject to ongoing litigation where you are not a party or
                    a member of a certified class; and/or (f) arise after the termination of the
                    Agreement. &quot;Dispute,&quot; however, does not include disagreements or
                    claims concerning patents, copyrights, trademarks, and trade secrets and claims
                    of piracy or unauthorized use of intellectual property or claims for personal
                    bodily injury, which shall not be subject to arbitration or the notice and
                    informal process described below.
                  </p>
                  <p className={p}>
                    The arbitrator shall decide all issues except for: (a) those that are
                    specifically reserved for a court herein; (b) those issues relating to the
                    scope, validity, and enforceability of the Arbitration Agreement or any of the
                    provisions of this Section; (c) any issues arising from or relating to the
                    arbitrability of any Dispute; and (d) whether the arbitration administrator
                    cannot or will not administer the arbitration in accordance with this
                    Arbitration Agreement—all of which are for a court of competent jurisdiction to
                    decide.
                  </p>
                  <p className={p}>
                    Notwithstanding this agreement to arbitrate, the parties agree that claims for
                    only injunctive relief on an individual basis may be brought exclusively in
                    either the United States District Court for the District of New Jersey or the
                    state courts in Bergen County, New Jersey. The parties further agree that
                    judgment on any award rendered by the arbitrator(s) may be entered in any court
                    having jurisdiction thereof. This agreement to arbitrate shall survive any
                    termination of parties&apos; respective relationship, including after you have
                    stopped accessing or using the Site. This Arbitration Agreement does not in any
                    way alter your ability to bring concerns to our attention, or to raise any
                    concerns with federal, state, or local agencies.
                  </p>
                  <p className={p}>
                    There is no judge or jury in arbitration, and court review of an arbitration
                    award is limited. However, an arbitrator can award on an individual basis the
                    same damages and relief as a court and must follow the terms of this Agreement
                    as a court would.
                  </p>

                  <h3 className={h3}>a. Pre-Dispute Notice</h3>
                  <p className={p}>
                    You and we agree to engage in good faith informal efforts to resolve a dispute
                    before initiating any arbitration. The party raising a dispute, whether it be
                    you or us, must first send a written notice to the other party providing a
                    detailed description of the dispute, including: (1) the initiating party&apos;s
                    name and contact information (address, telephone number, email address); (2) the
                    nature and basis of the dispute and any claims; and (3) the nature and basis of
                    the relief sought (including a calculation of damages). Your notice to us must
                    be personally signed by you (and your attorney if you are represented by legal
                    counsel). Our notice to you must be personally signed by us (through a company
                    representative, and our attorney if we are represented by legal counsel). Your
                    notice to us must be sent to{" "}
                    <a href="mailto:contact@medisavingz.com" className={link}>
                      contact@medisavingz.com
                    </a>
                    . Our notice to you must be sent to the most recent contact information that you
                    have provided us.
                  </p>
                  <p className={p}>
                    For a period of 60 days from the date of receipt of a completed notice from the
                    other party, you and we will work together using reasonable efforts to try and
                    resolve the Dispute. If the Dispute is not resolved within this 60-day period
                    (which can be extended by agreement of the parties), you or we may commence
                    arbitration consistent with the process set forth below. Compliance with this
                    informal dispute resolution process is mandatory and a condition precedent to
                    initiating arbitration.
                  </p>
                  <p className={p}>
                    By signing a dispute notice, you and your counsel certify that to the best of
                    your and your counsel&apos;s knowledge, information, and belief, formed after an
                    inquiry reasonable under the circumstances, that: (1) the dispute notice is not
                    being presented for any improper purpose, such as to harass, cause unnecessary
                    delay, or needlessly increase the cost of dispute resolution; (2) the claims,
                    defenses and other legal contentions are warranted and are made in good faith
                    and are not frivolous; and (3) the factual and damages contentions have
                    evidentiary support or, if specifically so identified, will likely have
                    evidentiary support after a reasonable opportunity for further investigation or
                    discovery. An arbitrator is expressly authorized to impose any sanctions or
                    other relief available under Federal Rule of Civil Procedure 11 on represented
                    parties and their counsel.
                  </p>
                  <p className={p}>
                    Any applicable limitations period (including statutes of limitation) shall be
                    tolled while the parties engage in the informal dispute resolution process
                    referenced above.
                  </p>

                  <h3 className={h3}>b. Arbitration Procedures</h3>
                  <p className={p}>
                    If the parties do not reach a solution during the pre-notice dispute resolution
                    process referenced above, then, upon notice by either party to the other, all
                    disputes, claims, questions, or differences, except as provided herein, shall be
                    settled by binding arbitration. The arbitration will be administered by JAMS
                    under its applicable rules, including the Streamlined Arbitration Rules &amp;
                    Procedures, Comprehensive Arbitration Rules &amp; Procedures, and/or JAMS Mass
                    Arbitration Procedures and Guidelines, as applicable (the &quot;JAMS
                    Rules&quot;), as modified by this Agreement. The JAMS Rules are available at{" "}
                    <a
                      href="https://www.jamsadr.com/adr-rules-procedures"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={link}
                    >
                      https://www.jamsadr.com/adr-rules-procedures
                    </a>
                    . You will be responsible for up to $250 of the administration fees, or as
                    otherwise provided by the JAMS Rules. We may reduce this amount if You
                    demonstrate hardship. This Agreement is governed by the Federal Arbitration Act,
                    and any award shall be subject to judicial confirmation. Any arbitration shall
                    take place on an individual basis; class actions or arbitrations are not
                    permitted.
                  </p>
                  <p className={p}>
                    An arbitration demand must be accompanied by a certification of compliance with
                    the mandatory informal dispute resolution procedure outlined above and be
                    personally signed by the party initiating the arbitration (and counsel, if
                    represented).
                  </p>
                  <p className={p}>
                    By signing an arbitration demand, you and your counsel certify that to the best
                    of your and your counsel&apos;s knowledge, information, and belief, formed after
                    an inquiry reasonable under the circumstances, that: (1) the arbitration demand
                    are not being presented for any improper purpose, such as to harass, cause
                    unnecessary delay, or needlessly increase the cost of dispute resolution; (2)
                    the claims, defenses and other legal contentions are warranted and are made in
                    good faith and are not frivolous; and (3) the factual and damages contentions
                    have evidentiary support or, if specifically so identified, will likely have
                    evidentiary support after a reasonable opportunity for further investigation or
                    discovery. An arbitrator is expressly authorized to impose any sanctions or
                    other relief available under Federal Rule of Civil Procedure 11 on represented
                    parties and their counsel.
                  </p>
                  <p className={p}>
                    If any part of this Arbitration Agreement (including the below Additional Terms
                    Applicable to Mass Arbitrations) is deemed invalid, it shall not invalidate the
                    other parts. If JAMS is unavailable, the parties or a court will select another
                    arbitral forum.
                  </p>

                  <h3 className={h3}>c. Additional Terms Applicable to Mass Arbitrations</h3>
                  <p className={p}>
                    In the event that claimants (including you) assert or seek to assert 25 or more
                    similar arbitration demands against us with the same counsel or counsel acting
                    in coordination (&quot;Mass Arbitration&quot;), the JAMS Mass Arbitration
                    Procedures and Guidelines and the provisions of this paragraph shall apply (in
                    addition to the terms set forth in the above Arbitration Agreement). In the
                    event a Mass Arbitration is presented, you and we will attempt to agree on a
                    batching protocol where arbitrations will be filed and proceed in stages. If you
                    and we cannot agree, the parties will submit the issue to a process arbitrator
                    appointed by JAMS to decide. Any applicable limitations period (including
                    statute of limitations) shall be tolled from the time your dispute is first
                    presented to JAMS as being part of a Mass Arbitration until your dispute
                    proceeds in arbitration or is otherwise resolved.
                  </p>
                  <p className={p}>
                    This batch process shall in no way be interpreted as authorizing a class,
                    collective and/or mass arbitration or action of any kind, or arbitration
                    involving joint or consolidated claims under any circumstances, except as
                    expressly set forth in this provision. You and we agree that the parties (and
                    your and our counsel, if you and we are represented) will work together in good
                    faith to ensure that arbitration remains cost-effective for all parties.
                  </p>

                  <h3 className={h3}>d. Opt-Out Procedure</h3>
                  <p className={p}>
                    Opt-out. You have the right to opt out of the provisions of this Section by
                    sending written notice of your decision to opt-out to{" "}
                    <a href="mailto:contact@medisavingz.com" className={link}>
                      contact@medisavingz.com
                    </a>
                    .
                  </p>
                  <p className={p}>
                    The notice to opt-out must be sent within 30 days of first accepting the
                    Agreement. You must include (1) your name and residence address; (2) the email
                    address and/or telephone number you used to conduct business with us; and (3) a
                    clear statement that you want to opt out of the Arbitration Agreement.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Amendments of This Agreement</h2>
                  <p className={p}>
                    We reserve the right to update, amend and/or change this Agreement at any time
                    in its sole discretion. Notice of updates to this Agreement will be made
                    available to You. Amendments will take effect immediately upon our posting the
                    updated Agreement on the Site. You are encouraged to revisit this Agreement from
                    time to time in order to review any changes that have been made. The date on
                    which this Agreement was last updated will be noted immediately above this
                    Agreement. Your continued access and use of the Site following the posting of
                    any such changes shall automatically be deemed your acceptance of all changes.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Miscellaneous</h2>
                  <p className={p}>
                    If any portion of this Agreement is deemed unlawful, void or unenforceable by
                    any arbitrator or court of competent jurisdiction, this Agreement as a whole
                    shall not be deemed unlawful, void or unenforceable, but only that portion of
                    this Agreement that is unlawful, void or unenforceable shall be stricken from
                    this Agreement.
                  </p>
                  <p className={p}>
                    The headings contained in this Agreement are for convenience of reference only,
                    are not to be considered a part of this Agreement, and shall not limit or
                    otherwise affect in any way the meaning or interpretation of this Agreement.
                  </p>
                  <p className={p}>
                    All covenants, agreements, representations and warranties made in this
                    Agreement, as may be amended by us from time to time, shall survive your
                    acceptance of this Agreement and the termination of this Agreement.
                  </p>
                  <p className={p}>
                    This Agreement and the Privacy Policy represent the entire understanding and
                    agreement between you and us regarding the subject matter of the same, and
                    supersede all other previous agreements, understandings and/or representations
                    regarding the same.
                  </p>
                </div>

                <div>
                  <h2 className={h2}>Contact</h2>
                  <p className={p}>
                    If you have questions, comments, concerns or feedback regarding this Agreement
                    or the Site, please contact us at{" "}
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
