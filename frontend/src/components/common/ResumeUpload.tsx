import { useId, useRef } from 'react';
import { FileUp, X } from 'lucide-react';

type Props = {
  value: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  label?: string;
  accept?: string;
};

export default function ResumeUpload({
  value,
  onChange,
  disabled,
  label = 'Resume (optional)',
  accept = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}: Props) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2 text-left">
      <label htmlFor={inputId} className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            onChange(f);
          }}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-sm border border-input bg-card px-4 py-2.5 font-body text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-muted/30 disabled:opacity-50"
        >
          <FileUp className="h-4 w-4 text-primary" />
          {value ? 'Change file' : 'Choose file'}
        </button>
        {value && (
          <span className="flex items-center gap-2 font-body text-sm text-muted-foreground">
            <span className="max-w-[200px] truncate">{value.name}</span>
            <button
              type="button"
              disabled={disabled}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Remove file"
              onClick={() => {
                onChange(null);
                if (inputRef.current) {
                  inputRef.current.value = '';
                }
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        )}
      </div>
      <p className="font-body text-xs text-muted-foreground">PDF, DOC, or DOCX · max 10MB</p>
    </div>
  );
}
