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
import { useTranslations } from "./hooks/useTranslations";
import {
  convertToInterface,
  convertToJson,
  convertToObj,
} from "./utils/formattingUtils";

function App() {
  const { t } = useTranslations();
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
        toast.error(t('errors.conversionError'));
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
      <main className="w-full flex flex-col flex-wrap whitespace-pre-wrap items-center justify-center mt-4 min-h-[calc(100vh-200px)] lg:flex-row lg:gap-10">
        <article className="flex flex-col gap-3">
          <Formats
            onValueChange={setFromFormat}
            lists={INPUT_ALL_FORMATS}
            excludeFormat={toFormat}
          />
          <Converter
            onQueryChange={handleQueryChange}
            placeholder={t('converter.inputPlaceholder')}
            value={dataToConvert}
          />
        </article>
        <article className="p-10 z-50 lg:p-0">
          <ConversionControls
            fromFormat={fromFormat}
            toFormat={toFormat}
            onConvertClick={processFormat}
            isEqual={isEqual}
          />
        </article>
        <article className="flex flex-col gap-3">
          <div className="flex gap-3 justify-between">
            <Formats
              onValueChange={setToFormat}
              lists={OUTPUT_ALL_FORMATS}
              excludeFormat={fromFormat}
            />
            <CopyText text={output} onDeleteOutput={handleDeleteOutput} />
          </div>
          <div className="z-50">
            <Converter
              key={output}
              onQueryChange={handleQueryChange}
              readonly={true}
              value={output}
            />
          </div>
        </article>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
