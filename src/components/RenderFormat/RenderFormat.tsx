import { ReactNode } from "react";

interface Props<T> {
  list: T[];
  renderList: (list: T) => ReactNode;
  extractId: (list: T) => string;
  className?: string;
}

export default function RenderFormat<T>({ 
  renderList, list, extractId 
}: Props<T>) {
  return (
    <>
      <ul>
        {list.map((item, index) => (
          <li key={`${index} - ${extractId(item)}`}>
            {renderList(item)}
          </li>
        ))}
      </ul>
    </>
  )
}