import { HelpCircle } from "lucide-react";
import { useTranslations } from "../../hooks/useTranslations";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function Help() {
  const { t } = useTranslations();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-black/90 border-gray-700 text-white hover:bg-purple-700 hover:border-purple-600 hover:text-white hover:scale-105 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          aria-label={t("help.openDialog")}
        >
          <HelpCircle width={16} height={16} aria-hidden="true" />
          <span className="hidden md:inline font-medium">
            {t("help.title")}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[500px] bg-white [&>button]:text-black"
        aria-describedby="help-description"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-600 flex items-center gap-2">
            <HelpCircle width={24} height={24} aria-hidden="true" />
            {t("help.title")}
          </DialogTitle>
          <p id="help-description" className="sr-only">
            {t("help.dialogDescription")}
          </p>
        </DialogHeader>
        <main className="space-y-4">
          <section
            className="bg-purple-50 p-4 rounded-lg border border-purple-600"
            aria-labelledby="instructions-heading"
          >
            <h3
              id="instructions-heading"
              className="font-semibold text-purple-600 mb-2"
            >
              {t("help.howToUse")}:
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-black">
              <li>{t("help.step1")}</li>
              <li>{t("help.step2")}</li>
              <li>{t("help.step3")}</li>
              <li>{t("help.step4")}</li>
            </ol>
          </section>
        </main>
      </DialogContent>
    </Dialog>
  );
}
