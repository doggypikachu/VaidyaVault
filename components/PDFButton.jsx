
'use client';
import { jsPDF } from 'jspdf';
export default function PDFButton({ entry }){
  const make = ()=>{
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(entry.name || 'Vaidya Vault Entry', 10, 16);
    doc.setFontSize(11);
    const lines = [
      `Region: ${entry.region||''}`,
      `Coordinates: ${entry.coordinates?.join(', ')||''}`,
      `Keywords: ${(entry.keywords||[]).join(', ')}`,
      `Themes: ${(entry.themes||[]).join(', ')}`,
      `Years: ${(entry.years||[]).join(' – ')}`,
      '',
      'Summary:',
      entry.summary||'',
      '',
      (entry.tips?`Tips: ${entry.tips}`:'')
    ].join('\n');
    const split = doc.splitTextToSize(lines, 180);
    doc.text(split, 10, 26);
    const y = 26 + split.length * 6 + 6;
    doc.setFontSize(12);
    doc.text('Documents', 10, y);
    let yPos = y + 6;
    (entry.documents||[]).forEach(d => {
      const t = `• ${d.title} (${d.type}) — ${d.url}`;
      const wrap = doc.splitTextToSize(t, 180);
      doc.text(wrap, 10, yPos);
      yPos += wrap.length * 6 + 2;
      if (yPos > 280) { doc.addPage(); yPos = 16; }
    });
    doc.save((entry.id||'entry') + '.pdf');
  };
  return <button onClick={make} className="ghost text-sm">Download PDF</button>;
}
