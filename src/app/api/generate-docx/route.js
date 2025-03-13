import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();

    // Read template file
    const templatePath = path.join(process.cwd(), 'public/template.docx');
    const template = await fs.readFile(templatePath);

    // Process document
    const zip = new PizZip(template);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData(data);
    
    try {
      doc.render();
    } catch (error) {
      throw new Error(`Error rendering document: ${error.message}`);
    }

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=generated-document.docx'
      }
    });
  } catch (error) {
    console.error('Error generating DOCX:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate document'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}