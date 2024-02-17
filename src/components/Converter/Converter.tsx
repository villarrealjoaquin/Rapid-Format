import { Textarea } from "../ui/textarea";


export default function Converter() {

  return (
    <div className="flex flex-col gap-3 text-white">
      <Textarea placeholder="Type your message here." />
    </div>
  );
}
