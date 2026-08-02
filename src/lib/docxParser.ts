import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import * as cheerio from 'cheerio';
import sanitizeHtml from 'sanitize-html';

export interface Coordinator {
  name: string;
  phone?: string;
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
  rules: string[];
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

// Fallback color themes based on category or random
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

const sanitizeOptions = {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br', 'span' ],
  allowedAttributes: {
    'a': [ 'href' ]
  }
};

function parseCoordinators(content: string[]): Coordinator[] {
  const coordinators: Coordinator[] = [];
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;

  for (const line of content) {
    const text = cheerio.load(line)('body').text().trim();
    if (!text) continue;

    // Check for phone number
    const match = text.match(phoneRegex);
    if (match) {
      const phone = match[0];
      let name = text.replace(phone, '').trim();
      // Remove trailing hyphens or commas
      name = name.replace(/^[-:,]+|[-:,]+$/g, '').trim();
      if (!name) name = "Coordinator";
      coordinators.push({ name, phone });
    } else {
      coordinators.push({ name: text });
    }
  }

  return coordinators;
}

export async function parseDocxEvent(slug: string): Promise<EventData | null> {
  const filePath = path.join(process.cwd(), 'public', 'events', `${slug}.docx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const buffer = fs.readFileSync(filePath);
  const result = await mammoth.convertToHtml({ buffer });
  let html = result.value;

  // Sometimes mammoth creates empty paragraphs, let's clean them up before parsing
  html = sanitizeHtml(html, sanitizeOptions);
  
  const $ = cheerio.load(html);

  // Default values
  const event: EventData = {
    slug,
    title: slug.replace(/-/g, ' ').toUpperCase(),
    category: 'GENERAL',
    about: '',
    date: 'TBA',
    teamSize: 'TBA',
    rules: [],
    studentCoordinators: [],
    staffCoordinators: [],
    additionalInfo: [],
    colorCls: getColorCls(slug),
    id: Math.floor(Math.random() * 99).toString().padStart(2, '0')
  };

  const sections = new Map<string, string[]>();
  let currentSection = 'title_implicit'; 
  
  $('body').children().each((_, el) => {
    if (el.type !== 'tag') return;

    const tagName = el.name.toLowerCase();
    if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
      const headingText = $(el).text().trim().toLowerCase();
      if (headingText) {
        currentSection = headingText;
        if (!sections.has(currentSection)) {
          sections.set(currentSection, []);
        }
      }
    } else {
      const htmlContent = $(el).html();
      // For lists, we might want to extract individual li items so they array map cleanly in the UI
      if (tagName === 'ul' || tagName === 'ol') {
        $(el).children('li').each((_, liEl) => {
          const liHtml = $(liEl).html();
          if (liHtml && liHtml.trim()) {
            if (!sections.has(currentSection)) sections.set(currentSection, []);
            sections.get(currentSection)!.push(sanitizeHtml(liHtml, sanitizeOptions));
          }
        });
      } else if (htmlContent && htmlContent.trim()) {
        const textContent = $(el).text().trim();
        if (textContent) {
           // Also sanitize just to be sure
           if (!sections.has(currentSection)) sections.set(currentSection, []);
           sections.get(currentSection)!.push(sanitizeHtml(htmlContent, sanitizeOptions));
        }
      }
    }
  });

  // Extract from parsed sections based on reserved keywords
  for (const [key, contentArray] of sections.entries()) {
    const lowerKey = key.toLowerCase();

    // Map to Event Title
    if (lowerKey.includes('name of the event') || lowerKey.includes('event name')) {
       const text = cheerio.load(contentArray.join(' '))('body').text().trim();
       if (text) event.title = text.replace(/Name of the Event\s*[:\-]?\s*/i, '').trim();
    }
    // Map to Category
    else if (lowerKey.includes('type of event') || lowerKey.includes('category')) {
       const text = cheerio.load(contentArray.join(' '))('body').text().trim();
       if (text) {
         let cat = text.replace(/Type of Event.*[:\-]?\s*/i, '').trim().toUpperCase();
         event.category = cat || 'GENERAL';
       }
    }
    // Map to Team Size
    else if (lowerKey.includes('number of participants') || lowerKey.includes('team size')) {
       const text = cheerio.load(contentArray.join(' '))('body').text().trim();
       if (text) event.teamSize = text.replace(/Number of Participants.*[:\-]?\s*/i, '').trim();
    }
    // Map to About
    else if (lowerKey === 'about' || lowerKey.includes('about the event')) {
       event.about = contentArray.join('<br/>');
    }
    // Map to Rules
    else if (lowerKey.includes('rules') || lowerKey.includes('guidelines') || lowerKey.includes('regulations')) {
       event.rules.push(...contentArray);
    }
    // Map to Date
    else if (lowerKey.includes('date') || lowerKey.includes('schedule')) {
       const text = cheerio.load(contentArray.join(' '))('body').text().trim();
       if (text) event.date = text;
    }
    // Map to Student Coordinators
    else if (lowerKey.includes('student coordinator')) {
       event.studentCoordinators.push(...parseCoordinators(contentArray));
    }
    // Map to Staff Coordinators
    else if (lowerKey.includes('faculty coordinator') || lowerKey.includes('staff coordinator')) {
       event.staffCoordinators.push(...parseCoordinators(contentArray));
    }
    // Anything else goes to additional info if it isn't title_implicit
    else {
      if (key !== 'title_implicit' && contentArray.length > 0) {
        event.additionalInfo.push({
          heading: key,
          content: contentArray
        });
      } else if (key === 'title_implicit') {
        // If there was content before the first heading, put it in About if About is empty
        if (!event.about) {
           event.about = contentArray.join('<br/>');
        }
      }
    }
  }

  // Fallback for about if still empty
  if (!event.about) {
    event.about = "No description provided.";
  }
  // Fallback for rules if empty
  if (event.rules.length === 0) {
    event.rules.push("Rules will be explained at the venue.");
  }
  if (!event.title || event.title.toLowerCase() === 'name of the event') {
    event.title = slug.replace(/-/g, ' ').toUpperCase();
  }

  return event;
}
