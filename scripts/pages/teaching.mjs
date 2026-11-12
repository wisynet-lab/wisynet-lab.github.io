import { esc, pageIntro, badge, icon, contactBand } from '../lib/components.mjs';

export default ({ site, teaching }) => `
  ${pageIntro('LEARN WITH US', 'Knowledge moves forward.', teaching.intro)}
  <section class="container section-content">
    <p class="content-note">
      These are sample teaching cards, not confirmed courses or current teaching assignments.
      Official course details will be added here.
    </p>
    <div class="course-grid">${teaching.courses
        .map(
          (course, index) => `
            <article class="course-card">
              <div class="course-number">${icon('book')}<span>0${index + 1}</span></div>
              ${badge(course.level)}
              <h2>${esc(course.title)}</h2>
              <p>${esc(course.description)}</p>
              <details>
                <summary>Course information</summary>
                <p>${esc(course.details)}</p>
              </details>
            </article>`,
        )
        .join('')}
    </div>
    <div class="student-note">
      <p class="eyebrow">FOR STUDENTS</p>
      <h2>Bring your curiosity to the lab.</h2>
      <p>
        Interested in research at WiSyNet? Contact the principal investigator to discuss interests
        and potential opportunities. Project listings will be added as they become available.
      </p>
      <a class="text-link" href="mailto:${esc(site.email)}">
        Start a conversation <span aria-hidden="true">↗</span>
      </a>
    </div>
  </section>
  ${contactBand(site)}
`;
