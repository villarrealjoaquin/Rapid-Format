import { useTranslations } from "@/hooks/useTranslations";
import { ReactNode } from "react";

interface Props<T> {
  list: T[];
  renderList: (list: T) => ReactNode;
  extractId: (list: T) => string;
  className?: string;
}

export default function RenderFormat<T>({
  renderList,
  list,
  extractId,
}: Props<T>) {
  const { t } = useTranslations();

  return (
    <ul role="listbox" aria-label={t("formats.formatSelector")}>
      {list.map((item, index) => (
        <li key={`${index} - ${extractId(item)}`}>{renderList(item)}</li>
      ))}
    </ul>
  );
}
