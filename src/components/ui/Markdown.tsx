import React from 'react';

interface MarkdownProps {
  content: string | string[];
  className?: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ content, className }) => {
  if (!content) return null;

  // Helper to parse inline markdown elements (bold, italic, code, links)
  const parseInline = (text: string): React.ReactNode[] => {
    let tokens: { type: 'text' | 'bold' | 'italic' | 'code' | 'link'; content: string; url?: string }[] = [
      { type: 'text', content: text }
    ];

    // 1. Parse Links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    tokens = tokens.flatMap(token => {
      if (token.type !== 'text') return [token];
      const result = [];
      let lastIndex = 0;
      let match;
      linkRegex.lastIndex = 0;
      while ((match = linkRegex.exec(token.content)) !== null) {
        if (match.index > lastIndex) {
          result.push({ type: 'text' as const, content: token.content.substring(lastIndex, match.index) });
        }
        result.push({ type: 'link' as const, content: match[1], url: match[2] });
        lastIndex = linkRegex.lastIndex;
      }
      if (lastIndex < token.content.length) {
        result.push({ type: 'text' as const, content: token.content.substring(lastIndex) });
      }
      return result;
    });

    // 2. Parse Bold: **text** or __text__
    const boldRegex = /\*\*([^*]+)\*\*|__([^_]+)__/g;
    tokens = tokens.flatMap(token => {
      if (token.type !== 'text') return [token];
      const result = [];
      let lastIndex = 0;
      let match;
      boldRegex.lastIndex = 0;
      while ((match = boldRegex.exec(token.content)) !== null) {
        if (match.index > lastIndex) {
          result.push({ type: 'text' as const, content: token.content.substring(lastIndex, match.index) });
        }
        result.push({ type: 'bold' as const, content: match[1] || match[2] });
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < token.content.length) {
        result.push({ type: 'text' as const, content: token.content.substring(lastIndex) });
      }
      return result;
    });

    // 3. Parse Italics: *text* or _text_
    const italicRegex = /\*([^*]+)\*|_([^_]+)_/g;
    tokens = tokens.flatMap(token => {
      if (token.type !== 'text') return [token];
      const result = [];
      let lastIndex = 0;
      let match;
      italicRegex.lastIndex = 0;
      while ((match = italicRegex.exec(token.content)) !== null) {
        if (match.index > lastIndex) {
          result.push({ type: 'text' as const, content: token.content.substring(lastIndex, match.index) });
        }
        result.push({ type: 'italic' as const, content: match[1] || match[2] });
        lastIndex = italicRegex.lastIndex;
      }
      if (lastIndex < token.content.length) {
        result.push({ type: 'text' as const, content: token.content.substring(lastIndex) });
      }
      return result;
    });

    // 4. Parse Inline Code: `code`
    const codeRegex = /`([^`]+)`/g;
    tokens = tokens.flatMap(token => {
      if (token.type !== 'text') return [token];
      const result = [];
      let lastIndex = 0;
      let match;
      codeRegex.lastIndex = 0;
      while ((match = codeRegex.exec(token.content)) !== null) {
        if (match.index > lastIndex) {
          result.push({ type: 'text' as const, content: token.content.substring(lastIndex, match.index) });
        }
        result.push({ type: 'code' as const, content: match[1] });
        lastIndex = codeRegex.lastIndex;
      }
      if (lastIndex < token.content.length) {
        result.push({ type: 'text' as const, content: token.content.substring(lastIndex) });
      }
      return result;
    });

    return tokens.map((token, idx) => {
      switch (token.type) {
        case 'bold':
          return <strong key={idx} className="font-bold text-text-light-primary dark:text-text-dark-primary">{token.content}</strong>;
        case 'italic':
          return <em key={idx} className="italic text-text-light-primary dark:text-text-dark-primary">{token.content}</em>;
        case 'code':
          return <code key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-mono text-sm text-accent-orange">{token.content}</code>;
        case 'link':
          return <a key={idx} href={token.url} target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline">{token.content}</a>;
        default:
          return <span key={idx}>{token.content}</span>;
      }
    });
  };

  const contentString = Array.isArray(content) ? content.join('\n') : content;

  // Split content by lines and group into block elements
  const lines = contentString.split('\n');
  const blocks: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];

  const flushList = () => {
    if (currentListItems.length > 0) {
      blocks.push(
        <ul key={`list-${blocks.length}`} className="list-disc pl-6 mb-4 space-y-1.5">
          {currentListItems}
        </ul>
      );
      currentListItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushList();
      continue;
    }

    // Check for Headers
    const headerMatch = line.match(/^(#{1,6})\s*(.*)/);
    if (headerMatch) {
      flushList();
      const level = headerMatch[1].length;
      const text = headerMatch[2];
      if (level === 1) {
        blocks.push(
          <h1 key={i} className="text-2xl font-extrabold text-text-light-primary dark:text-text-dark-primary mt-10 mb-4">
            {parseInline(text)}
          </h1>
        );
      } else if (level === 2) {
        blocks.push(
          <h2 key={i} className="text-xl font-bold text-text-light-primary dark:text-text-dark-primary mt-8 mb-3 border-b border-border-light dark:border-border-dark pb-1.5">
            {parseInline(text)}
          </h2>
        );
      } else {
        blocks.push(
          <h3 key={i} className="text-lg font-bold text-text-light-primary dark:text-text-dark-primary mt-6 mb-2">
            {parseInline(text)}
          </h3>
        );
      }
    }
    // Check for Bullet Lists
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      currentListItems.push(
        <li key={i} className="text-text-light-secondary dark:text-text-dark-secondary">
          {parseInline(line.substring(2))}
        </li>
      );
    }
    // Check for Blockquotes
    else if (line.startsWith('> ')) {
      flushList();
      blocks.push(
        <blockquote key={i} className="border-l-4 border-accent-orange pl-4 italic text-text-light-secondary dark:text-text-dark-secondary my-4">
          {parseInline(line.substring(2))}
        </blockquote>
      );
    }
    // Plain Paragraph
    else {
      flushList();
      blocks.push(
        <p key={i} className="mb-4 leading-relaxed">
          {parseInline(line)}
        </p>
      );
    }
  }

  flushList();

  return <div className={className}>{blocks}</div>;
};
