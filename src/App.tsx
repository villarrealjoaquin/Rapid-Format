import { useState } from "react";
import { toast } from "sonner";
import {
  AppSidebar,
  Converter,
  CopyText,
  Header
} from "./components";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/sonner";
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
    <SidebarProvider>
      <div className="flex flex-col w-full h-screen overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-auto w-full p-4 md:p-6">
              <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
                <article className="flex flex-col gap-3 flex-1 min-w-0 w-full lg:w-auto">
                  {/* <Formats
                    onValueChange={setFromFormat}
                    lists={INPUT_ALL_FORMATS}
                    excludeFormat={toFormat}
                  /> */}
                  <div className="h-10 hidden lg:block"></div>
                  <div className="flex-1 min-h-[300px] lg:min-h-0 z-50">
                    <Converter
                      onQueryChange={handleQueryChange}
                      placeholder="Copia tu formato..."
                      value={dataToConvert}
                    />
                  </div>
                </article>
                {/* <article className="flex justify-end">
                  <ConversionControls
                    fromFormat={fromFormat}
                    toFormat={toFormat}
                    onConvertClick={processFormat}
                    isEqual={isEqual}
                  />
                </article> */}
                <article className="flex flex-col gap-3 flex-1 min-w-0 w-full lg:w-auto">
                  <div className="flex gap-3 justify-end h-10">
                    {/* <Formats
                      onValueChange={setToFormat}
                      lists={OUTPUT_ALL_FORMATS}
                      excludeFormat={fromFormat}
                    /> */}
                    <CopyText text={output} onDeleteOutput={handleDeleteOutput} />
                  </div>
                  <div className="flex-1 min-h-[300px] lg:min-h-0 z-50">
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
          </div>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}

export default App;
