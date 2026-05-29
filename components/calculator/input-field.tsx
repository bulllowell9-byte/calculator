import { cn } from "@/utils/cn";

type InputFieldProps = {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  help?: string;
  onChange: (value: number) => void;
};

export function InputField({
  id,
  label,
  value,
  min = 0,
  max,
  step = 1,
  prefix,
  suffix,
  help,
  onChange
}: InputFieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
        {label}
        {help ? <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{help}</span> : null}
      </span>
      <span className="mt-2 flex h-12 items-center rounded-lg border border-slate-200 bg-white px-3 shadow-line transition focus-within:border-finance-500 focus-within:ring-2 focus-within:ring-finance-100 dark:border-slate-700 dark:bg-slate-950 dark:focus-within:ring-finance-900/50">
        {prefix ? <span className="text-sm font-semibold text-slate-500">{prefix}</span> : null}
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(event) => onChange(Number(event.target.value))}
          className={cn(
            "min-w-0 flex-1 bg-transparent px-2 text-base font-semibold text-slate-950 outline-none dark:text-white",
            !prefix && "pl-0",
            !suffix && "pr-0"
          )}
        />
        {suffix ? <span className="text-sm font-semibold text-slate-500">{suffix}</span> : null}
      </span>
    </label>
  );
}
