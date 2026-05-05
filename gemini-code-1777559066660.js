const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, Header, TabStopType, TabStopPosition
} = require('docx');
const fs = require('fs');

// ─── CONFIGURATION PORSCHE X RAYCAST ───
const DARK_OBSIDIAN = "07080a"; // Fond profond
const WHITE = "FFFFFF";         // Texte pur et moderne
const SURFACE = "101111";       // Cartes et Dock
const SILVER = "CECECE";        // Texte secondaire
const BORDER_ALPHA = "252829";  // Bordures ultra-fines

// ─── HELPERS DE STYLE ───
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 200 },
    children: [new TextRun({ text, font: "Inter", size: 48, bold: true, color: WHITE, characterSpacing: 8 })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 120 },
    children: [new TextRun({ text, font: "Inter", size: 32, bold: true, color: WHITE, characterSpacing: 4 })]
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    children: [new TextRun({ text, font: "Inter", size: 22, color: SILVER, ...opts })]
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, font: "Inter", size: 22, color: SILVER })]
  });
}

// ─── CONSTRUCTION DU DOCUMENT ───
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Inter", size: 22, color: SILVER } } }
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "OBSIDIAN GT", bold: true, color: WHITE, characterSpacing: 10 }),
              new TextRun({ text: "\tDESIGN SYSTEM V2", color: SILVER }),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }]
          })
        ]
      })
    },
    children: [
      h1("OBSIDIAN GT"),
      body("Fusion entre la précision chirurgicale de Raycast et l'élégance statutaire de Porsche."),
      
      h2("1. Direction Artistique"),
      bullet("Thème : Gris-Noir Obsidienne (#07080a). Pas de blanc pur en fond."),
      bullet("Typographie : Flat Design. Blanc Pur pour les titres, Inter avec tracking positif (+0.4px)."),
      bullet("Lumière : Utilisation de bordures rgba(255,255,255,0.08) pour la structure."),

      h2("2. Navigation Flottante (Le Dock)"),
      bullet("Position : Fixée en bas, centrée."),
      bullet("Style : Fond #101111 à 80% d'opacité avec flou de profondeur (Backdrop Blur)."),
      bullet("Action : Bouton pilule 'Réserver' en blanc pur, texte noir à droite."),

      h2("3. Composants Immersifs"),
      bullet("Cartes : Images plein format avec coins arrondis de 12px."),
      bullet("Badges : Type 'Modèle' (ex: ÉLECTRIQUE) en haut à gauche sur fond #1b1c1e."),
      bullet("Interactions : Transitions sèches à l'apparition, fluides au survol (opacité 0.6)."),

      h2("4. Palette Technique"),
      new Table({
        width: { size: 9000, type: WidthType.DXA },
        rows: [
          new TableRow({ children: [
            new TableCell({ children: [new Paragraph("Role")], shading: { fill: SURFACE } }),
            new TableCell({ children: [new Paragraph("Hex")], shading: { fill: SURFACE } })
          ]}),
          new TableRow({ children: [
            new TableCell({ children: [new Paragraph("Background")] }),
            new TableCell({ children: [new Paragraph("#07080a")] })
          ]}),
          new TableRow({ children: [
            new TableCell({ children: [new Paragraph("Heading")] }),
            new TableCell({ children: [new Paragraph("#FFFFFF")] })
          ]})
        ]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('Obsidian-GT-Design.docx', buffer);
  console.log('Fichier Obsidian-GT-Design.docx créé avec succès !');
});