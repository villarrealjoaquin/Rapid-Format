export const INPUT_ALL_FORMATS = ['JSON', 'Object'];
export const OUTPUT_ALL_FORMATS = ['JSON', 'Object', 'interface'];
export const CONVERSIONS = [
    {
      from: "Object",
      to: "JSON",
      description: "Convierte objetos JavaScript a formato JSON",
    },
    {
      from: "Object",
      to: "Interface",
      description: "Genera interfaces TypeScript desde objetos",
    },
    {
      from: "JSON",
      to: "Object",
      description: "Transforma JSON a objetos JavaScript",
    },
    {
      from: "JSON",
      to: "Interface",
      description: "Crea interfaces TypeScript desde JSON",
    },
  ];