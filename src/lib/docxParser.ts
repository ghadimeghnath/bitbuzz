import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import * as cheerio from 'cheerio';
import sanitizeHtml from 'sanitize-html';

export interface Coordinator {
  name: string;
  phone?: string;
  email?: string;
}

export interface JudgingCriteria {
  criterion: string;
  points: string;
}

export interface AdditionalInfo {
  heading: string;
  content: string[];
}

export interface EventData {
  slug: string;
  title: string;
  category: string;
  about: string;
  date: string;
  teamSize: string;
  rounds: string;
  rules: string[];
  judgingCriteria: JudgingCriteria[];
  studentCoordinators: Coordinator[];
  staffCoordinators: Coordinator[];
  additionalInfo: AdditionalInfo[];
  colorCls: {
    text: string;
    bg: string;
    border: string;
    hoverBg: string;
  };
  id: string;
}

// Fallback color themes based on slug hash
const getColorCls = (slug: string) => {
  const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const themes = [
    { text: "text-brand-light-green", bg: "bg-brand-light-green", border: "border-brand-light-green", hoverBg: "hover:bg-brand-light-green" },
    { text: "text-brand-coral", bg: "bg-brand-coral", border: "border-brand-coral", hoverBg: "hover:bg-brand-coral" },
    { text: "text-brand-mustard-yellow", bg: "bg-brand-mustard-yellow", border: "border-brand-mustard-yellow", hoverBg: "hover:bg-brand-mustard-yellow" },
    { text: "text-brand-orange", bg: "bg-brand-orange", border: "border-brand-orange", hoverBg: "hover:bg-brand-orange" },
    { text: "text-brand-bright-orange", bg: "bg-brand-bright-orange", border: "border-brand-bright-orange", hoverBg: "hover:bg-brand-bright-orange" },
    { text: "text-brand-lime-yellow", bg: "bg-brand-lime-yellow", border: "border-brand-lime-yellow", hoverBg: "hover:bg-brand-lime-yellow" }
  ];
  return themes[hash % themes.length];
};

const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br', 'span'],
  allowedAttributes: {
    'a': ['href']
  }
};

/** Strip HTML and return plain text */
function plainText(html: string): string {
  return cheerio.load(html)('body').text().trim();
}

/** Extract a key-value pair from a line like "Name of the Event : Foo Bar" */
function extractValue(text: string, ...prefixes: string[]): string | null {
  for (const prefix of prefixes) {
    const regex = new RegExp(`^${prefix}\\s*[:\\-–]\\s*(.+)`, 'i');
    const match = text.match(regex);
    if (match) return match[1].trim();
  }
  return null;
}

/** Detect if a paragraph text represents a known section heading */
function detectSectionKey(text: string): string | null {
  const t = text.toLowerCase().trim();

  if (/^rules\s*(and|&)?\s*regulations/.test(t) || /^guidelines/.test(t) || /^rules\s*:/.test(t)) {
    return 'rules';
  }
  if (/^judging\s*criteria/.test(t) || /^evaluation\s*criteria/.test(t)) {
    return 'judging';
  }
  if (/^student\s*coordinator/.test(t)) {
    return 'student_coordinator';
  }
  if (/^faculty\s*coordinator/.test(t) || /^staff\s*coordinator/.test(t)) {
    return 'faculty_coordinator';
  }
  if (/^coordinators?\s*(details?)?/.test(t)) {
    return 'coordinator_generic';
  }
  if (/^about(\s+the\s+event)?/.test(t)) {
    return 'about';
  }
  if (/^game\s+setup/.test(t) || /^format/.test(t)) {
    return 'setup';
  }
  return null;
}

/** 
 * Detect if a paragraph is a key-value metadata line.
 * Returns { key, value } or null. 
 */
function detectMetadata(text: string): { key: string; value: string } | null {
  const kvPatterns: Array<{ key: string; regex: RegExp }> = [
    { key: 'title', regex: /^name\s+of\s+the\s+event\s*[:\-–]/i },
    { key: 'type', regex: /^type\s+of\s+event\s*[:\-–]/i },
    { key: 'participants', regex: /^number\s+of\s+participants\s*[:\-–]/i },
    { key: 'rounds', regex: /^number\s+of\s+rounds?\s*[:\-–]/i },
  ];

  for (const { key, regex } of kvPatterns) {
    if (regex.test(text)) {
      const value = text.replace(regex, '').trim();
      // Remove any leading colon/dash remnants
      return { key, value: value.replace(/^[:\-–\s]+/, '').trim() };
    }
  }
  return null;
}

/** Parse coordinator lines into structured Coordinator objects */
function parseCoordinatorBlock(lines: string[]): Coordinator[] {
  const coordinators: Coordinator[] = [];
  const phoneRegex = /(?:\+?91[-.\s]?)?(?:\(?\d{3,5}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{4,5}/;
  const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;

  let current: Partial<Coordinator> = {};

  const flush = () => {
    if (current.name) {
      coordinators.push(current as Coordinator);
    }
    current = {};
  };

  for (const line of lines) {
    const text = plainText(line);
    if (!text) continue;

    // Detect sub-labels like "Name:", "Contact Number:", "Email:"
    const nameMatch = text.match(/^(?:name\s*[:\-–]\s*)(.+)/i);
    const phoneMatch = text.match(phoneRegex);
    const emailMatch = text.match(emailRegex);

    if (nameMatch) {
      flush();
      current.name = nameMatch[1].trim();
    } else if (emailMatch && phoneMatch) {
      // Line has both email and phone
      if (!current.email) current.email = emailMatch[0];
      if (!current.phone) current.phone = phoneMatch[0];
    } else if (emailMatch) {
      if (!current.email) current.email = emailMatch[0];
      // If it also contains a name before @
      const beforeAt = text.split('@')[0].trim();
      if (!current.name && beforeAt && !/^\d+/.test(beforeAt) && beforeAt.length > 3) {
        // Could be part of email – don't treat as name
      }
    } else if (phoneMatch) {
      if (!current.phone) current.phone = phoneMatch[0];
    } else {
      // Plain text line — treat as name if we don't have one yet
      if (!current.name && text.length > 1 && !/^contact\s*(no|number)/i.test(text) && !/^email/i.test(text)) {
        flush();
        current.name = text;
      }
    }
  }
  flush();

  return coordinators.filter(c => c.name && c.name.length > 1);
}

/** Parse judging criteria from lines */
function parseJudgingCriteria(lines: string[]): JudgingCriteria[] {
  const criteria: JudgingCriteria[] = [];
  const pointsRegex = /[:\-–]\s*(\d+)\s*(?:marks?|points?|mks?|pts?)?$/i;
  const inlineRegex = /^(.+?)\s*[\-–:]\s*(\d+)\s*(?:marks?|points?|mks?|pts?)?$/i;

  for (const line of lines) {
    const text = plainText(line);
    if (!text) continue;

    // Try inline "Criterion – N points" pattern
    const inlineMatch = text.match(inlineRegex);
    if (inlineMatch) {
      criteria.push({ criterion: inlineMatch[1].trim(), points: inlineMatch[2] });
      continue;
    }

    // Try table row-like: text followed by points
    const trailingMatch = text.match(pointsRegex);
    if (trailingMatch) {
      const criterion = text.replace(pointsRegex, '').trim();
      if (criterion) {
        criteria.push({ criterion, points: trailingMatch[1] });
        continue;
      }
    }

    // Otherwise push as a plain criterion without points
    if (text.length > 2) {
      criteria.push({ criterion: text, points: '' });
    }
  }

  return criteria;
}

export async function parseDocxEvent(slug: string): Promise<EventData | null> {
  const filePath = path.join(process.cwd(), 'public', 'events', `${slug}.docx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const buffer = fs.readFileSync(filePath);
  const result = await mammoth.convertToHtml({ buffer });
  const rawHtml = sanitizeHtml(result.value, sanitizeOptions);

  const $ = cheerio.load(rawHtml);

  // Default event object
  const event: EventData = {
    slug,
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    category: 'GENERAL',
    about: '',
    date: 'TBA',
    teamSize: 'TBA',
    rounds: 'TBA',
    rules: [],
    judgingCriteria: [],
    studentCoordinators: [],
    staffCoordinators: [],
    additionalInfo: [],
    colorCls: getColorCls(slug),
    id: Math.floor(Math.random() * 99).toString().padStart(2, '0')
  };

  // ─── Phase 1: Collect all paragraph/list elements with their text ───────────
  type Element = { tag: string; html: string; text: string };
  const elements: Element[] = [];

  $('body').children().each((_, el) => {
    if (el.type !== 'tag') return;
    const tag = el.name.toLowerCase();
    const html = $(el).html() || '';
    const text = $(el).text().trim();
    if (text || tag === 'table') {
      elements.push({ tag, html, text });
    }
  });

  // ─── Phase 2: Parse metadata key-value lines (name, type, participants, rounds) ─
  // These appear before any section heading
  const metadataConsumed = new Set<number>();

  for (let i = 0; i < elements.length; i++) {
    const { text } = elements[i];
    const meta = detectMetadata(text);
    if (meta) {
      metadataConsumed.add(i);
      switch (meta.key) {
        case 'title':
          // Prefer the docx title over slug-derived one
          if (meta.value) event.title = meta.value;
          break;
        case 'type':
          event.category = meta.value.toUpperCase();
          break;
        case 'participants':
          event.teamSize = meta.value;
          break;
        case 'rounds':
          event.rounds = meta.value;
          break;
      }
    }
  }

  // ─── Phase 3: Section-based parsing ────────────────────────────────────────
  // Walk elements, detect section boundaries, accumulate lines per section
  type SectionName =
    | 'preamble'
    | 'about'
    | 'rules'
    | 'judging'
    | 'student_coordinator'
    | 'faculty_coordinator'
    | 'coordinator_generic'
    | 'setup'
    | string;

  let currentSection: SectionName = 'preamble';
  const sections: Map<SectionName, string[]> = new Map();
  const sectionOrder: SectionName[] = [];
  // Track which element index started each section (for additional info heading)
  const sectionHeadings: Map<SectionName, string> = new Map();

  const pushToSection = (section: SectionName, content: string) => {
    if (!sections.has(section)) {
      sections.set(section, []);
      sectionOrder.push(section);
    }
    sections.get(section)!.push(content);
  };

  for (let i = 0; i < elements.length; i++) {
    if (metadataConsumed.has(i)) continue;

    const { tag, html, text } = elements[i];

    // Check if this element is a heading tag
    const isHeading = tag === 'h1' || tag === 'h2' || tag === 'h3';

    // Check for section heading — either real heading or bold paragraph
    const isBoldParagraph =
      tag === 'p' &&
      ($(html).find('strong').length > 0 || html.startsWith('<strong>')) &&
      text.length < 200; // headings are short

    if (isHeading || isBoldParagraph) {
      const sectionKey = detectSectionKey(text);
      if (sectionKey) {
        currentSection = sectionKey;
        sectionHeadings.set(currentSection, text);
        continue; // Don't add the heading itself as content
      }
    }

    // Also try detecting section from plain paragraph text (some docs don't bold headings)
    if (tag === 'p' && text.length < 120) {
      const sectionKey = detectSectionKey(text);
      if (sectionKey) {
        currentSection = sectionKey;
        sectionHeadings.set(currentSection, text);
        continue;
      }
    }

    // For list items within a list, handle ul/ol specially
    if (tag === 'ul' || tag === 'ol') {
      $(html).find('li').each((_, li) => {
        const liHtml = $(li).html() || '';
        const liText = $(li).text().trim();
        if (liText) {
          pushToSection(currentSection, sanitizeHtml(liHtml, sanitizeOptions));
        }
      });
      continue;
    }

    // Tables – push the whole table HTML into current section
    if (tag === 'table') {
      pushToSection(currentSection, sanitizeHtml(html, sanitizeOptions));
      continue;
    }

    // Regular paragraph
    if (text) {
      pushToSection(currentSection, sanitizeHtml(html, sanitizeOptions));
    }
  }

  // ─── Phase 4: Map sections to EventData fields ──────────────────────────────

  const knownSections = new Set(['preamble', 'about', 'rules', 'judging', 'student_coordinator', 'faculty_coordinator', 'coordinator_generic', 'setup']);

  for (const [section, lines] of sections.entries()) {
    switch (section) {
      case 'preamble':
        // Preamble contains metadata lines already parsed — skip or use for about if blank
        if (!event.about) {
          const text = lines.map(plainText).filter(Boolean).join(' ');
          if (text) event.about = lines.join('<br/>');
        }
        break;

      case 'about':
        event.about = lines.join('<br/>');
        break;

      case 'rules':
        event.rules.push(...lines.filter(l => plainText(l).length > 0));
        break;

      case 'judging':
        event.judgingCriteria.push(...parseJudgingCriteria(lines));
        break;

      case 'faculty_coordinator':
        event.staffCoordinators.push(...parseCoordinatorBlock(lines));
        break;

      case 'student_coordinator':
        event.studentCoordinators.push(...parseCoordinatorBlock(lines));
        break;

      case 'coordinator_generic': {
        // Generic coordinator block — try to split by name entries
        const all = parseCoordinatorBlock(lines);
        event.studentCoordinators.push(...all);
        break;
      }

      case 'setup':
        // Game setup goes to additional info
        event.additionalInfo.push({
          heading: sectionHeadings.get(section) || 'Game Setup',
          content: lines.filter(l => plainText(l).length > 0)
        });
        break;

      default:
        // Any other named section goes to additional info
        if (!knownSections.has(section) && lines.length > 0) {
          event.additionalInfo.push({
            heading: sectionHeadings.get(section) || section,
            content: lines.filter(l => plainText(l).length > 0)
          });
        }
        break;
    }
  }

  // ─── Phase 5: Fallbacks & cleanup ────────────────────────────────────────────

  if (!event.about || event.about.trim() === '') {
    event.about = `<p>${event.title} is one of the exciting events at our tech fest. More details will be provided at the venue.</p>`;
  }

  if (event.rules.length === 0) {
    event.rules.push('Rules and guidelines will be explained at the venue.');
  }

  if (!event.title || event.title.toLowerCase() === 'name of the event') {
    event.title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  return event;
}
