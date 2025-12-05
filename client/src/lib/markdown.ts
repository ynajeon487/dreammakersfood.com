export function parseMarkdown(text: string): string {
  let html = text;

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-primary mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-primary mt-4 mb-2">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-primary mt-4 mb-2">$1</h1>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-primary">$1</strong>');
  
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

  // Bullet points
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>');
  
  // Numbered lists
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4">$1. $2</li>');

  // Line breaks
  html = html.replace(/\n/g, '<br/>');

  return html;
}
