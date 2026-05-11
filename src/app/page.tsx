import { ArtifactRow } from "@/components/ArtifactRow";
import { ClassificationBanner } from "@/components/ClassificationBanner";
import { ContactForm } from "@/components/ContactForm";
import { Redacted } from "@/components/Redacted";
import { Stamp } from "@/components/Stamp";
import { projects } from "@/lib/projects";

export default function Page() {
  return (
    <div className="page">
      <ClassificationBanner position="top" />

      <main className="shell">
        <article
          className="dossier"
          aria-labelledby="dossier-title"
          aria-describedby="dossier-summary"
        >
          <header className="dossier__header">
            <div>
              <p className="dossier__id">
                DOSSIER 001 — SUBJECT: J. MIDDLER
              </p>
              <p
                id="dossier-summary"
                className="label"
                style={{ marginTop: "0.35rem" }}
              >
                File released for public review · Rev. 2026.05
              </p>
            </div>
            <div className="dossier__page">
              <div>P. 01 OF 01</div>
              <div style={{ marginTop: "0.2rem" }}>CTRL № 2026-05-JM</div>
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
              ACT · Practising 2012 — present
            </p>

            <dl className="attrs">
              <dt className="attrs__key">Practice</dt>
              <dd className="attrs__val">
                Software Engineering // Cyber Security
              </dd>

              <dt className="attrs__key">Tenure</dt>
              <dd className="attrs__val">12 years + · 2012 — present</dd>

              <dt className="attrs__key">Prior</dt>
              <dd className="attrs__val">
                Microsoft — Software Engineer, Core Azure Networking (C# / .NET)
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
                TypeScript · Rust · Python · C# / .NET · PHP · Swift /
                React Native · PowerShell · Docker · SQL
              </dd>

              <dt className="attrs__key">Status</dt>
              <dd className="attrs__val">
                Operational. Open to selective engagements.
              </dd>
            </dl>

            <div className="stamp__row">
              <Stamp rotate={-6}>Declassified — Public Release</Stamp>
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
                <h3 className="record__title">Cyber Security Engineer</h3>
                <p className="record__org">
                  <Redacted label="Reveal agency">
                    Australian Federal Government
                  </Redacted>
                  &nbsp;·&nbsp;2022 — present
                </p>
                <p className="record__body">
                  Uplift of departmental Security Orchestration, Automation
                  and Response (SOAR) capability and modernisation of the
                  Security Information &amp; Event Management (SIEM) platform,
                  including migration to Microsoft Sentinel. Built threat
                  intelligence ingestion pipelines and executive reporting
                  feeding SES and branch-head briefings. Drove ISM and
                  Essential 8 compliance uplift in the internal cloud, and
                  trained APS and contractor staff on Azure, automation, and
                  industry-standard software engineering practice.
                </p>
                <p className="record__tags">
                  <span>SOAR</span>
                  <span>SIEM · Sentinel</span>
                  <span>Threat Intel</span>
                  <span>ISM · Essential 8</span>
                  <span>Azure</span>
                </p>
              </div>

              <div className="record__entry">
                <h3 className="record__title">
                  Software Engineer · Core Azure Networking
                </h3>
                <p className="record__org">Microsoft · 12 months · ending 2022</p>
                <p className="record__body">
                  Production work on the Azure networking plane in C# / .NET.
                  Underlying components relied on daily by hundreds of millions
                  of users. Returned to the federal practice on completion.
                </p>
                <p className="record__tags">
                  <span>C# / .NET</span>
                  <span>Azure</span>
                  <span>Networking</span>
                  <span>Hyperscale</span>
                </p>
              </div>

              <div className="record__entry">
                <h3 className="record__title">
                  Cyber Security Architect · Cyber Security Officer
                </h3>
                <p className="record__org">
                  <Redacted label="Reveal agency">
                    Australian Federal Government
                  </Redacted>
                  &nbsp;·&nbsp;2019 — 2022
                </p>
                <p className="record__body">
                  Cyber security subject-matter advice across cloud, hybrid,
                  and on-premises workloads. Threat modelling, secure SDLC,
                  secure code review, OWASP Top 10 implementation review.
                  Delivered a secure container proof-of-concept environment
                  and led architecture for production container management
                  platforms (AKS, OpenShift, Tanzu). Briefed CISO / ITSA on
                  findings; mentored permanent and contractor staff.
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
                <h3 className="record__title">
                  Software Engineering · DevOps · Automation
                </h3>
                <p className="record__org">
                  <Redacted label="Reveal agency">
                    Australian Federal Government
                  </Redacted>
                  &nbsp;·&nbsp;2012 — 2018
                </p>
                <p className="record__body">
                  Six years across engineering roles supporting platforms
                  that underpin Australia&apos;s public-facing unemployment,
                  skills, and training services. Lead developer on the
                  department&apos;s first AI chatbot (Microsoft Bot Framework,
                  C#, microservice / event-driven on Azure). Introduced
                  centralised Selenium / Page Object Model automation
                  testing; stood up end-to-end CI/CD on Azure DevOps and TFS
                  with custom PowerShell DSC. Server health monitoring with
                  Dynatrace dashboards for proactive incident prevention.
                </p>
                <p className="record__tags">
                  <span>AI / Bot Framework</span>
                  <span>CI/CD</span>
                  <span>Selenium · POM</span>
                  <span>PowerShell DSC</span>
                  <span>Azure DevOps</span>
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
                  Introduced automated UI testing and automated server-health
                  monitoring across a federal department&apos;s engineering
                  practice (2014 — 2016). Patterns and pipelines still in
                  active use.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.02</span>
                <p className="impact__body">
                  Contributed architecture, infrastructure, release, and code
                  to the platforms behind Australia&apos;s public-facing
                  unemployment, skills, and training programs.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.03</span>
                <p className="impact__body">
                  Shipped to the Azure networking plane at Microsoft. Code
                  paths exercised daily by hundreds of millions of users
                  worldwide.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.04</span>
                <p className="impact__body">
                  Re-joined the federal practice in 2022 within a Technology
                  Architecture team. Uplifted and standardised architecture
                  artefacts still in use; introduced cadenced internal and
                  external stakeholder rituals that materially improved
                  inter-agency turnaround on hosting requests.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.05</span>
                <p className="impact__body">
                  Built a lightweight task-tracking system for the EL2
                  practice lead, giving real-time visibility of team
                  workload to senior executives and improving resource
                  allocation.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.06</span>
                <p className="impact__body">
                  Lifted the department&apos;s SOAR capability and migrated
                  its SIEM to Microsoft Sentinel. Built threat-intelligence
                  ingestion and reporting pipelines now used to brief SES
                  and branch heads on cyber threat trends.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.07</span>
                <p className="impact__body">
                  Drove ISM and Essential 8 compliance uplift across the
                  team&apos;s internal cloud. Introduced automation that
                  replaced manual administrative actions in Azure.
                </p>
              </li>
              <li className="impact__item">
                <span className="impact__index" aria-hidden="true">3.08</span>
                <p className="impact__body">
                  Contributed to open-source projects the team relies on, so
                  the department consumes safer, better-maintained software
                  from the community.
                </p>
              </li>
            </ul>

            <div className="stamp__row">
              <Stamp rotate={-7}>Outcomes — Available on Request</Stamp>
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
              <Stamp rotate={-10}>Review Complete — J.M.</Stamp>
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
                <div>FILE CTRL № 2026-05-JM</div>
                <div style={{ marginTop: "0.3rem", color: "var(--ink-faint)" }}>
                  REV 2026.05 · STATIC EXPORT
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
