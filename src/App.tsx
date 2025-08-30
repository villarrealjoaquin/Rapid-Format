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
import { ConversionKeys } from "./types/convert.types";
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
  const { t } = useTranslations();

  const isEqual = fromFormat === toFormat;

  const processFormat = () => {
    try {
      const conversionMap: Record<ConversionKeys, () => string> = {
        [ConversionKeys.OBJECT_TO_JSON]: () => convertToJson(dataToConvert),
        [ConversionKeys.OBJECT_TO_INTERFACE]: () =>
          convertToInterface(dataToConvert),
        [ConversionKeys.JSON_TO_OBJECT]: () => convertToObj(dataToConvert),
        [ConversionKeys.JSON_TO_INTERFACE]: () =>
          convertToInterface(dataToConvert),
      };

      const conversionKey = `${fromFormat}-${toFormat}` as ConversionKeys;
      const conversionFunction = conversionMap[conversionKey];
      if (conversionFunction) setOutput(conversionFunction());
    } catch (error) {
      console.error(error);
      if (error instanceof SyntaxError || error instanceof Error) {
        toast.error(t("errors.conversionError"));
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
      <main
        className="w-full flex flex-col flex-wrap whitespace-pre-wrap items-center justify-center mt-4 min-h-[calc(100vh-200px)] lg:flex-row lg:gap-10"
        aria-label={t("accessibility.main")}
        role="main"
      >
        <section
          className="flex flex-col gap-3"
          aria-label={t("accessibility.inputSection")}
        >
          <div className="z-50" aria-label={t("accessibility.formatSelector")}>
            <Formats
              onValueChange={setFromFormat}
              lists={INPUT_ALL_FORMATS}
              excludeFormat={toFormat}
            />
          </div>
          <div className="z-50" aria-label={t("accessibility.textConverter")}>
            <Converter
              onQueryChange={handleQueryChange}
              placeholder={t("converter.inputPlaceholder")}
              value={dataToConvert}
            />
          </div>
        </section>
        <section
          className="p-10 z-50 lg:p-0"
          aria-label={t("accessibility.conversionControls")}
        >
          <ConversionControls
            fromFormat={fromFormat}
            toFormat={toFormat}
            onConvertClick={processFormat}
            isEqual={isEqual}
          />
        </section>
        <section
          className="flex flex-col gap-3"
          aria-label={t("accessibility.outputSection")}
        >
          <div className="flex gap-3 justify-between">
            <div
              className="z-50"
              aria-label={t("accessibility.formatSelector")}
            >
              <Formats
                onValueChange={setToFormat}
                lists={OUTPUT_ALL_FORMATS}
                excludeFormat={fromFormat}
              />
            </div>
            <CopyText text={output} onDeleteOutput={handleDeleteOutput} />
          </div>
          <div className="z-50" aria-label={t("accessibility.textConverter")}>
            <Converter
              key={output}
              onQueryChange={handleQueryChange}
              readonly={true}
              value={output}
            />
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
