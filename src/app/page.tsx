import { ArtifactRow } from "@/components/ArtifactRow";
import { ClassificationBanner } from "@/components/ClassificationBanner";
import { ContactForm } from "@/components/ContactForm";
import { Redacted } from "@/components/Redacted";
import { SiteNav } from "@/components/SiteNav";
import { Stamp } from "@/components/Stamp";
import { projects } from "@/lib/projects";

export default function Page() {
  return (
    <div className="page">
      <ClassificationBanner position="top" />

      <main className="shell">
        <SiteNav current="dossier" />
        <article
          className="dossier"
          aria-labelledby="dossier-title"
          aria-describedby="dossier-summary"
        >
          <header className="dossier__header">
            <div>
              <p className="dossier__id">
                DOSSIER 001 · SUBJECT: J. MIDDLER
              </p>
              <p
                id="dossier-summary"
                className="label"
                style={{ marginTop: "0.35rem" }}
              >
                File released for public review · Rev. 2026.07
              </p>
            </div>
            <div className="dossier__page">
              <div>P. 01 OF 01</div>
              <div style={{ marginTop: "0.2rem" }}>CTRL № 2026-07-JM</div>
            </div>
          </header>

          <section className="section" aria-labelledby="sec-1">
            <div className="section__header">
              <span className="section__index">§1</span>
              <h2 id="sec-1" className="section__title">
                Subject
              </h2>
              <span className="section__meta">Identification</span>
            </div>

            <h1 id="dossier-title" className="subject__name">
              Justin Middler
            </h1>
            <p className="subject__sub">
              Cyber Security Professional · Indigenous Australian · Canberra,
              ACT · Australian Public Service since 2012
            </p>

            <dl className="attrs">
              <dt className="attrs__key">Practice</dt>
              <dd className="attrs__val">
                Software Engineering // Cyber Security
              </dd>

              <dt className="attrs__key">Career</dt>
              <dd className="attrs__val">Almost 15 years · APS since 2012</dd>

              <dt className="attrs__key">Prior</dt>
              <dd className="attrs__val">
                Microsoft · Software Engineer, Core Azure control plane (C# / .NET)
              </dd>

              <dt className="attrs__key">Frameworks</dt>
              <dd className="attrs__val">
                ACSC ISM · Essential 8 · IRAP · PSPF · NIST · OWASP Top 10
              </dd>

              <dt className="attrs__key">Certifications</dt>
              <dd className="attrs__val">
                Microsoft AZ-900 · CompTIA Security+ · Acunetix WVS
              </dd>

              <dt className="attrs__key">Stack</dt>
              <dd className="attrs__val">
                C# / .NET · PowerShell · TypeScript · Python · Java · Go ·
                Swift · JavaScript · Docker · Kubernetes · SQL
              </dd>

              <dt className="attrs__key">Status</dt>
              <dd className="attrs__val">
                Operational. Open to selective engagements.
              </dd>
            </dl>

            <div className="stamp__row">
              <Stamp rotate={-6}>Declassified · Public Release</Stamp>
            </div>
          </section>

          <section className="section" aria-labelledby="sec-2">
            <div className="section__header">
              <span className="section__index">§2</span>
              <h2 id="sec-2" className="section__title">
                Mission Record
              </h2>
              <span className="section__meta">Service History</span>
            </div>

            <div className="record">
              <div className="record__entry">
                <h3 className="record__title">Cloud Security Engineer</h3>
                <p className="record__org">
                  <Redacted label="Reveal agency">
                    Department of Employment and Workplace Relations
                  </Redacted>
                  &nbsp;·&nbsp;2024 to 2026
                </p>
                <p className="record__body">
                  Led cloud-security uplift across Microsoft Azure, including
                  the adoption of Palo Alto Prisma Cloud and Cortex Cloud.
                  Engineered detection rules, playbooks, threat-hunting
                  queries, custom analytics, compliance monitoring, and
                  vulnerability-management workflows. Built C# and PowerShell
                  pipelines that processed hundreds of thousands of security
                  records into Power BI reporting for executives, aligned to
                  the ISM, Essential Eight, and Azure security guidance.
                </p>
                <p className="record__tags">
                  <span>Prisma · Cortex</span>
                  <span>Azure</span>
                  <span>C# · PowerShell</span>
                  <span>Power BI</span>
                  <span>Cloud posture</span>
                </p>
              </div>

              <div className="record__entry">
                <h3 className="record__title">Cyber Security Engineer</h3>
                <p className="record__org">
                  <Redacted label="Reveal agency">
                    Department of Employment and Workplace Relations
                  </Redacted>
                  &nbsp;·&nbsp;09/2022 to 2024
                </p>
                <p className="record__body">
                  Provided senior technical direction across security
                  engineering, incident response, cloud security, and
                  automation. Led the migration from a legacy on-premises SIEM
                  to Microsoft Sentinel and helped establish a cloud-native
                  Security Operations capability. Implemented incident-response
                  case management and SOAR, built threat-intelligence ingestion
                  and executive reporting, and engineered detections across
                  Sentinel, Defender XDR, and Defender for Endpoint.
                </p>
                <p className="record__tags">
                  <span>Sentinel</span>
                  <span>Defender XDR</span>
                  <span>SOAR</span>
                  <span>Incident response</span>
                  <span>Detection engineering</span>
                </p>
              </div>

              <div className="record__entry">
                <h3 className="record__title">
                  Software Engineer · Azure Control Plane
                </h3>
                <p className="record__org">Microsoft · Earlier career</p>
                <p className="record__body">
                  Contributed C# and .NET production engineering to Microsoft
                  Azure control-plane services supporting infrastructure used
                  by hundreds of millions of people. The work developed direct
                  experience in hyperscale cloud engineering, secure software
                  development, and resilient platform design.
                </p>
                <p className="record__tags">
                  <span>C# / .NET</span>
                  <span>Azure</span>
                  <span>Control plane</span>
                  <span>Hyperscale</span>
                </p>
              </div>

              <div className="record__entry">
                <h3 className="record__title">
                  Cyber Security Architect
                </h3>
                <p className="record__org">
                  <Redacted label="Reveal agency">
                    Department of Education, Skills and Employment
                  </Redacted>
                  &nbsp;·&nbsp;01/2021 to 08/2022
                </p>
                <p className="record__body">
                  Provided security advice for major proposed federal projects,
                  including threat modelling, secure SDLC, secure code review,
                  OWASP Top 10 controls, ISM, and PSPF. Delivered a secure
                  container proof of concept and led architecture for AKS,
                  OpenShift, and Tanzu. Guided teams on three-tier application
                  architecture, software-defined networking, Azure, and
                  Kubernetes.
                </p>
                <p className="record__tags">
                  <span>SDLC</span>
                  <span>Threat Modelling</span>
                  <span>Containers · K8s</span>
                  <span>SDN</span>
                  <span>OWASP</span>
                </p>
              </div>

              <div className="record__entry">
                <h3 className="record__title">Cyber Security Officer</h3>
                <p className="record__org">
                  <Redacted label="Reveal agency">
                    Department of Education, Skills and Employment
                  </Redacted>
                  &nbsp;·&nbsp;09/2019 to 01/2021
                </p>
                <p className="record__body">
                  Advised internal stakeholders across cloud, hybrid, and
                  on-premises workloads. Briefed the CISO and ITSA on findings,
                  contributed to cyber-security policy and strategy, mentored
                  APS staff, and coordinated with vendors, penetration testers,
                  and IRAP assessors.
                </p>
                <p className="record__tags">
                  <span>Security architecture</span>
                  <span>IRAP</span>
                  <span>Risk advice</span>
                  <span>Policy</span>
                </p>
              </div>

              <div className="record__entry">
                <h3 className="record__title">Managing Director</h3>
                <p className="record__org">DEUCEM Pty Ltd · 02/2019 to 12/2019</p>
                <p className="record__body">
                  Led an Indigenous Australian startup specialising in software
                  development, mobile applications, machine learning, and cyber
                  security.
                </p>
                <p className="record__tags">
                  <span>Leadership</span>
                  <span>Software delivery</span>
                  <span>Mobile</span>
                  <span>ML / AI</span>
                </p>
              </div>

              <div className="record__entry">
                <h3 className="record__title">Security Software Engineer</h3>
                <p className="record__org">NJOY Security · 08/2018 to 01/2019</p>
                <p className="record__body">
                  Delivered front-end and back-end development, security
                  automation, Azure automation, and IRAP and PSPF consulting.
                  Helped prepare successful PROTECTED IRAP assessments for
                  Google and Salesforce.
                </p>
                <p className="record__tags">
                  <span>Security automation</span>
                  <span>Azure</span>
                  <span>IRAP · PSPF</span>
                  <span>Full stack</span>
                </p>
              </div>

              <div className="record__entry">
                <h3 className="record__title">Chatbot Software Developer</h3>
                <p className="record__org">
                  <Redacted label="Reveal agency">Department of Jobs and Small Business</Redacted>
                  &nbsp;·&nbsp;09/2017 to 08/2018
                </p>
                <p className="record__body">
                  Led design and implementation of the department&apos;s first AI
                  help-desk chatbot using C#, Web API 2, Microsoft Bot
                  Framework, Azure, microservices, and event-driven architecture.
                  The service reduced first-level call-centre demand while
                  meeting or exceeding its first-contact service target.
                </p>
                <p className="record__tags">
                  <span>C# · Web API</span>
                  <span>Bot Framework</span>
                  <span>Azure</span>
                  <span>Microservices</span>
                </p>
              </div>

              <div className="record__entry">
                <h3 className="record__title">DevOps Engineer</h3>
                <p className="record__org">
                  <Redacted label="Reveal agency">Department of Jobs and Small Business</Redacted>
                  &nbsp;·&nbsp;03/2017 to 08/2018
                </p>
                <p className="record__body">
                  Implemented build and release templates in TFS and Azure
                  DevOps, plus end-to-end deployment automation using custom
                  PowerShell DSC. Provisioned Windows Server environments and
                  used Dynatrace dashboards and alerting to identify issues
                  before production impact.
                </p>
                <p className="record__tags">
                  <span>Azure DevOps · TFS</span>
                  <span>PowerShell DSC</span>
                  <span>Dynatrace</span>
                  <span>CI/CD</span>
                </p>
              </div>

              <div className="record__entry">
                <h3 className="record__title">Automation Testing Software Engineer</h3>
                <p className="record__org">
                  <Redacted label="Reveal agency">Department of Jobs and Small Business</Redacted>
                  &nbsp;·&nbsp;09/2016 to 08/2018
                </p>
                <p className="record__body">
                  Established a stable, centralised Selenium automation
                  framework using Page Object Model practices. Provisioned test
                  infrastructure and Microsoft Test Manager agents to deliver
                  parallel automated testing through department-wide CI/CD
                  pipelines.
                </p>
                <p className="record__tags">
                  <span>Selenium · POM</span>
                  <span>MTM</span>
                  <span>Parallel testing</span>
                  <span>Test engineering</span>
                </p>
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="sec-3">
            <div className="section__header">
              <span className="section__index">§3</span>
              <h2 id="sec-3" className="section__title">
                Notable Impact
              </h2>
              <span className="section__meta">Selected · redacted</span>
            </div>

            <span className="rule" aria-hidden="true" />

            <ul className="impact">
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.01</span>
                <p className="impact__body">
                  Led the technical uplift from a legacy on-premises SIEM to
                  Microsoft Sentinel and helped establish a cloud-native
                  Security Operations capability.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.02</span>
                <p className="impact__body">
                  Implemented incident-response case management and SOAR,
                  strengthening operational governance, automation, and
                  response maturity.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.03</span>
                <p className="impact__body">
                  Engineered detections and hunting capability across Sentinel,
                  Defender XDR, Defender for Endpoint, Prisma Cloud, and Cortex
                  Cloud, improving fidelity across cloud, identity, and endpoint.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.04</span>
                <p className="impact__body">
                  Built C# and PowerShell automation to ingest, enrich, and
                  analyse hundreds of thousands of cloud-security and compliance
                  records for operational and executive reporting.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.05</span>
                <p className="impact__body">
                  Provided technical leadership through ATO activities,
                  Australian Government control mapping, and practical risk and
                  compliance advice across Azure and AWS.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.06</span>
                <p className="impact__body">
                  Delivered a secure container proof of concept and led
                  architecture for production-capable AKS, OpenShift, and Tanzu
                  platforms.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.07</span>
                <p className="impact__body">
                  Helped prepare successful PROTECTED IRAP assessments for
                  Google and Salesforce while working at NJOY Security.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.08</span>
                <p className="impact__body">
                  Led the department&apos;s first AI help-desk chatbot and
                  established reusable DevOps and automated-testing capability
                  across the engineering practice.
                </p>
              </li>
            </ul>

            <div className="stamp__row">
              <Stamp rotate={-7}>Outcomes · Available on Request</Stamp>
            </div>
          </section>

          <section className="section" aria-labelledby="sec-4">
            <div className="section__header">
              <span className="section__index">§4</span>
              <h2 id="sec-4" className="section__title">
                Field Artifacts
              </h2>
              <span className="section__meta">
                Recent · github.com/jusso-dev
              </span>
            </div>

            <span className="rule" aria-hidden="true" />

            <div className="artifacts">
              {projects.map((p, i) => (
                <ArtifactRow
                  key={p.name}
                  index={`4.${String(i + 1).padStart(2, "0")}`}
                  name={p.name}
                  description={p.description}
                  lang={p.lang}
                  updated={p.updated}
                  href={p.href}
                />
              ))}
            </div>

            <div className="stamp__row">
              <Stamp rotate={-10}>Review Complete · J.M.</Stamp>
            </div>
          </section>

          <section className="section" aria-labelledby="sec-5">
            <div className="section__header">
              <span className="section__index">§5</span>
              <h2 id="sec-5" className="section__title">
                Address &amp; Disposition
              </h2>
              <span className="section__meta">Channels</span>
            </div>

            <div className="contact">
              <div className="contact__line">
                <span className="attrs__key">Repository</span>
                <span className="attrs__val">
                  <a
                    href="https://github.com/jusso-dev"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/jusso-dev
                  </a>
                </span>
              </div>
              <div className="contact__line">
                <span className="attrs__key">Engagement</span>
                <span className="attrs__val">
                  Selective. Australian Federal context preferred. Cyber and
                  platform work prioritised.
                </span>
              </div>
            </div>

            <ContactForm />

            <p className="acknowledgement">
              <span className="acknowledgement__label">
                Acknowledgement of Country
              </span>
              <span className="acknowledgement__body">
                I acknowledge the Traditional Custodians of the lands on
                which this work is carried out, and pay respect to Elders
                past, present, and emerging. Sovereignty was never ceded.
              </span>
            </p>

            <div className="colophon">
              <div>
                <div>{"// END OF DOSSIER //"}</div>
                <div style={{ marginTop: "0.3rem", color: "var(--ink-faint)" }}>
                  Authenticated &middot; J. Middler
                </div>
              </div>
              <div className="colophon__right">
                <div>FILE CTRL № 2026-07-JM</div>
                <div style={{ marginTop: "0.3rem", color: "var(--ink-faint)" }}>
                  REV 2026.07 · STATIC EXPORT
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      <ClassificationBanner position="bottom" />
    </div>
  );
}
