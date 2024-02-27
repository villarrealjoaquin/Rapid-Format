import { useEffect, useState } from "react";
import {
  Background,
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
  const [dataToConvert, setDataToConvert] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const isEqual = fromFormat === toFormat;

  const processFormat = () => {
    try {
      const conversionMap: Record<string, () => string> = {
        'Object-JSON': () => convertToJson(dataToConvert),
        'Object-interface': () => convertToInterface(dataToConvert),
        'JSON-Object': () => convertToObj(dataToConvert),
        'JSON-interface': () => convertToInterface(dataToConvert),
      };

      const conversionKey = `${fromFormat}-${toFormat}`;
      const conversionFunction = conversionMap[conversionKey];
      if (conversionFunction) setOutput(conversionFunction());
    } catch (error) {
      console.error(error);
      if (error instanceof SyntaxError) {
        setError("Error en el formato de entrada, asegúrate de que los datos de entrada son correctos.");
      }
    }
  }

  const handleDeleteOutput = () => {
    setOutput("");
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataToConvert(e.target.value);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setError('');
    }, 5000);
    return () => clearInterval(interval);
  }, [error])

  return (
    <>
      <Background />
      <Header />
      <main className="w-full flex flex-col items-center">
        <div className="flex flex-col lg:flex-row justify-center gap-4">
          <article className="flex flex-col gap-3">
            <Converter
              onQueryChange={handleQueryChange}
              placeholder="Copia tu formato..."
              value={dataToConvert}
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
          isEqual={isEqual}
        />

        <ErrorMessage error={error} />

      </main>
      <Footer />

    </>
  );
}

export default App;