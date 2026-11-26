/**
 * Renderizador ligero y seguro de Markdown a HTML para el Blog SEO.
 * Escapa HTML arbitrario antes de transformar encabezados, listas, énfasis, citas, enlaces e imágenes.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeUrl(url: string): string {
  const trimmed = url.trim();
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:')
  ) {
    return escapeHtml(trimmed);
  }
  return '#';
}

function formatInline(raw: string): string {
  let out = escapeHtml(raw);
  // Inline code
  out = out.replace(/`([^`]+)`/g, '<code class="rounded bg-ink/8 px-1.5 py-0.5 text-[0.9em]">$1</code>');
  // Images ![alt](url)
  out = out.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (_, alt, url) =>
      `<img src="${sanitizeUrl(url)}" alt="${alt}" loading="lazy" class="my-6 w-full rounded-2xl border border-ink/10 object-cover" />`
  );
  // Links [label](url)
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, label, url) =>
      `<a href="${sanitizeUrl(url)}" class="text-accent-blue underline underline-offset-4 hover:text-accent-orange transition-colors" rel="noopener noreferrer">${label}</a>`
  );
  // Bold **text**
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-ink">$1</strong>');
  // Italic *text*
  out = out.replace(/\*([^*]+)\*/g, '<em class="font-serif italic text-[1.05em]">$1</em>');
  return out;
}

export function renderMarkdown(markdown: string): string {
  const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let inList = false;
  let inCode = false;
  let codeLines: string[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    html.push(`<p class="mb-5 leading-relaxed text-ink/85">${formatInline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!inList) return;
    html.push('</ul>');
    inList = false;
  };

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      flushParagraph();
      closeList();
      if (inCode) {
        html.push(
          `<pre class="my-6 overflow-x-auto rounded-2xl border border-ink/10 bg-ink p-4 text-sm text-canvas"><code>${escapeHtml(
            codeLines.join('\n')
          )}</code></pre>`
        );
        codeLines = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      closeList();
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph();
      closeList();
      html.push(`<h3 class="mt-8 mb-3 text-xl font-medium tracking-tight text-ink">${formatInline(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph();
      closeList();
      html.push(`<h2 class="mt-10 mb-4 text-2xl font-medium tracking-tight text-ink sm:text-3xl">${formatInline(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith('# ')) {
      flushParagraph();
      closeList();
      html.push(`<h2 class="mt-10 mb-4 text-3xl font-medium tracking-tight text-ink">${formatInline(trimmed.slice(2))}</h2>`);
      continue;
    }

    if (trimmed.startsWith('> ')) {
      flushParagraph();
      closeList();
      html.push(
        `<blockquote class="my-6 border-l-2 border-accent-blue pl-5 font-serif italic text-xl text-ink/80">${formatInline(
          trimmed.slice(2)
        )}</blockquote>`
      );
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      if (!inList) {
        html.push('<ul class="my-5 list-disc space-y-2 pl-6 text-ink/85">');
        inList = true;
      }
      html.push(`<li>${formatInline(trimmed.replace(/^[-*]\s+/, ''))}</li>`);
      continue;
    }

    closeList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();
  if (inCode && codeLines.length > 0) {
    html.push(
      `<pre class="my-6 overflow-x-auto rounded-2xl border border-ink/10 bg-ink p-4 text-sm text-canvas"><code>${escapeHtml(
        codeLines.join('\n')
      )}</code></pre>`
    );
  }

  return html.join('\n');
}

export function estimateReadingMinutes(markdown: string): number {
  const words = String(markdown || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
