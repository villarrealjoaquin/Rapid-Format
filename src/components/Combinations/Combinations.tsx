import { CONVERSIONS } from "@/constants";
import { ArrowLeftRight } from "lucide-react";
import { useTranslations } from "../../hooks/useTranslations";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function Combinations() {
  const { t } = useTranslations();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-black/90 border-gray-700 text-white hover:bg-purple-700 hover:border-purple-600 hover:text-white hover:scale-105 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-gray-500/25"
          aria-label={t("combinations.openDialog")}
        >
          <ArrowLeftRight width={16} height={16} aria-hidden="true" />
          <span className="hidden md:inline font-medium">
            {t("combinations.title")}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] bg-white [&>button]:text-black"
        aria-describedby="combinations-description"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-600 flex items-center gap-2">
            <ArrowLeftRight width={24} height={24} aria-hidden="true" />
            {t("combinations.title")}
          </DialogTitle>
          <p id="combinations-description" className="sr-only">
            {t("combinations.dialogDescription")}
          </p>
        </DialogHeader>
        <ul
          className="grid gap-4 mt-4"
          aria-label={t("combinations.conversionList")}
        >
          {CONVERSIONS.map((conversion, index) => (
            <li key={`conversion-${conversion.from}-${conversion.to}-${index}`}>
              <article
                className="bg-purple-50 p-4 rounded-lg border border-purple-200 hover:border-purple-600 transition-colors"
                aria-labelledby={`conversion-title-${index}`}
              >
                <header className="flex items-center justify-between mb-2">
                  <h3 id={`conversion-title-${index}`} className="sr-only">
                    {t("combinations.itemTitle", {
                      from: conversion.from,
                      to: conversion.to,
                    })}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="bg-purple-700 text-white px-3 py-1 rounded-md text-sm font-medium">
                      {conversion.from}
                    </span>
                    <span className="text-purple-700" aria-hidden="true">
                      <ArrowLeftRight width={16} height={16} />
                    </span>
                    <span className="bg-black text-white px-3 py-1 rounded-md text-sm font-medium">
                      {conversion.to}
                    </span>
                  </div>
                </header>
                <p className="text-black/90 text-sm">
                  {t(conversion.description)}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
