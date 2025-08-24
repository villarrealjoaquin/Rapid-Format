import { useState } from "react";
import { toast } from "sonner";
import {
  Background,
  Combinations,
  ConversionControls,
  Converter,
  CopyText,
  Footer,
  Formats,
  Header,
  Help,
} from "./components";
import { Toaster } from "./components/ui/sonner";
import { INPUT_ALL_FORMATS, OUTPUT_ALL_FORMATS } from "./constants";
import {
  convertToInterface,
  convertToJson,
  convertToObj,
} from "./utils/formattingUtils";

function App() {
  const [fromFormat, setFromFormat] = useState("");
  const [toFormat, setToFormat] = useState("");
  const [dataToConvert, setDataToConvert] = useState("");
  const [output, setOutput] = useState("");

  const isEqual = fromFormat === toFormat;

  const processFormat = () => {
    try {
      const conversionMap: Record<string, () => string> = {
        "Object-JSON": () => convertToJson(dataToConvert),
        "Object-Interface": () => convertToInterface(dataToConvert),
        "JSON-Object": () => convertToObj(dataToConvert),
        "JSON-Interface": () => convertToInterface(dataToConvert),
      };

      const conversionKey = `${fromFormat}-${toFormat}`;
      const conversionFunction = conversionMap[conversionKey];
      if (conversionFunction) setOutput(conversionFunction());
    } catch (error) {
      console.error(error);
      if (error instanceof SyntaxError) {
        toast.error(
          "Error en el formato de entrada, asegúrate de que los datos son correctos."
        );
      }
    }
  };

  const handleDeleteOutput = () => {
    setOutput("");
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataToConvert(e.target.value);
  };

  return (
    <>
      <Background />
      <Header />
      <div className="fixed top-4 right-4 z-50 flex gap-3">
        <Help />
        <Combinations />
      </div>

      <main className="w-full flex flex-col items-center">
        <div className="flex flex-col lg:flex-row justify-center gap-4">
          <article className="flex flex-col gap-3">
            <Formats onValueChange={setFromFormat} lists={INPUT_ALL_FORMATS} />
            <Converter
              onQueryChange={handleQueryChange}
              placeholder="Copia tu formato..."
              value={dataToConvert}
            />
          </article>

          <ConversionControls
            fromFormat={fromFormat}
            toFormat={toFormat}
            onConvertClick={processFormat}
            isEqual={isEqual}
          />

          <article className="flex flex-col gap-3">
            <Formats onValueChange={setToFormat} lists={OUTPUT_ALL_FORMATS} />
            <div className="relative">
              <Converter
                key={output}
                onQueryChange={handleQueryChange}
                readonly={true}
                value={output}
              />
              <CopyText text={output} onDeleteOutput={handleDeleteOutput} />
            </div>
          </article>
        </div>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
