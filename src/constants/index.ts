export const INPUT_ALL_FORMATS = ["JSON", "Object"];
export const OUTPUT_ALL_FORMATS = ["JSON", "Object", "Interface"];
export const CONVERSIONS = [
    {
      from: "Object",
      to: "JSON",
      description: 'combinations.objectToJsonDesc',
    },
    {
      from: "Object",
      to: "Interface",
      description: 'combinations.objectToInterfaceDesc',
    },
    {
      from: "JSON",
      to: "Object",
      description: 'combinations.jsonToObjectDesc',
    },
    {
      from: "JSON",
      to: "Interface",
      description: 'combinations.jsonToInterfaceDesc',
    },
  ];