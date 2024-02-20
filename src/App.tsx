import { useEffect, useState } from "react";
import {
  Combinations,
  ConversionControls,
  Converter,
  CopyText,
  ErrorMessage,
  Formats,
  Header
} from "./components";
import { convertToInterface, convertToJson, convertToObj } from "./utils/formattingUtils";

function App() {
  const [fromFormat, setFromFormat] = useState("Object");
  const [toFormat, setToFormat] = useState("JSON");
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const processFormat = () => {
    try {
      const conversionMap: Record<string, () => string> = {
        'Object-JSON': () => convertToJson(query),
        'Object-interface': () => convertToInterface(query),
        'JSON-Object': () => convertToObj(query),
        'JSON-interface': () => convertToInterface(query),
      };

      const conversionKey = `${fromFormat}-${toFormat}`;
      const conversionFunction = conversionMap[conversionKey];
      if (conversionFunction) setOutput(conversionFunction());
    } catch (error) {
      console.log(error);
      if (error instanceof SyntaxError) {
        setError("Error de sintaxis");
      } else {
        setError("Error al convertir los datos");
      }
    }
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setError('');
    }, 5000);
    return () => clearInterval(interval);
  }, [error])

  return (
    <>
      <Header />
      <main className="w-full flex flex-col items-center">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <article className="flex flex-col gap-3">
            <Converter
              onQueryChange={handleQueryChange}
              value={query}
            />
            <Formats onValueChange={setFromFormat} />
          </article>

          <Combinations />

          <article className="flex flex-col gap-3">
            <div className="relative">
              <Converter
                key={output}
                onQueryChange={handleQueryChange}
                readonly={true}
                value={output}
              />
              <CopyText text={output} />
            </div>

            <Formats onValueChange={setToFormat} />
          </article>
        </div>

        <ConversionControls
          fromFormat={fromFormat}
          toFormat={toFormat}
          onConvertClick={processFormat}
        />

        <ErrorMessage error={error} />
      </main>
    </>
  );
}

export default App;