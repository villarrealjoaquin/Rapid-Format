import { useEffect, useState } from "react";
import {
  Combinations,
  ConversionControls,
  Converter,
  CopyText,
  ErrorMessage,
  Footer,
  Formats,
  Header
} from "./components";
import { INPUT_ALL_FORMATS, OUTPUT_ALL_FORMATS } from "./constants";
import { convertToInterface, convertToJson, convertToObj } from "./utils/formattingUtils";

function App() {
  const [fromFormat, setFromFormat] = useState("");
  const [toFormat, setToFormat] = useState("");
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
      if (error instanceof SyntaxError) {
        setError("Error de sintaxis");
      }
    }
  }

  const handleDeleteOutput = () => {
    setOutput("");
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
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(135%_145%_at_50%_30%,#000_40%,#63e_100%)]"></div>
      <Header />
      <main className="w-full flex flex-col items-center">
        <div className="flex flex-col lg:flex-row justify-center gap-4">
          <article className="flex flex-col gap-3">
            <Converter
              onQueryChange={handleQueryChange}
              placeholder="Copia tu formato..."
              value={query}
            />
            <Formats onValueChange={setFromFormat} lists={INPUT_ALL_FORMATS} />
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
              <CopyText text={output} onDeleteOutput={handleDeleteOutput} />
            </div>

            <Formats onValueChange={setToFormat} lists={OUTPUT_ALL_FORMATS} />
          </article>
        </div>

        <ConversionControls
          fromFormat={fromFormat}
          toFormat={toFormat}
          onConvertClick={processFormat}
        />

        <ErrorMessage error={error} />

      </main>
      <Footer />

    </>
  );
}

export default App;