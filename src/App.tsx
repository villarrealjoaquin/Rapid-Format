import { useState } from "react";
import { toast } from "sonner";
import {
  ConversionControls,
  Converter,
  CopyText,
  Footer,
  Formats,
  Header,
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
      if (error instanceof SyntaxError || error instanceof Error) {
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
      <Header />
      <main className="w-full flex flex-wrap items-center justify-center min-h-[calc(100vh-200px)] gap-5 mt-10 lg:mt-0">
        <article className="flex flex-col gap-3">
          <Formats onValueChange={setFromFormat} lists={INPUT_ALL_FORMATS} />
          <Converter
            onQueryChange={handleQueryChange}
            placeholder="Copia tu formato..."
            value={dataToConvert}
          />
        </article>
        <div className="flex flex-col lg:flex-row gap-5 items-center z-50">
          <article className="p-4 lg:p-0">
            <ConversionControls
              fromFormat={fromFormat}
              toFormat={toFormat}
              onConvertClick={processFormat}
              isEqual={isEqual}
            />
          </article>
          <article className="flex flex-col gap-3">
            <div className="flex gap-3 justify-between">
              <Formats onValueChange={setToFormat} lists={OUTPUT_ALL_FORMATS} />
              <CopyText text={output} onDeleteOutput={handleDeleteOutput} />
            </div>
            <div>
              <Converter
                key={output}
                onQueryChange={handleQueryChange}
                readonly={true}
                value={output}
              />
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
