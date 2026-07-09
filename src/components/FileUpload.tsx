'use client';

import * as React from 'react';
import { AlertCircle, CheckCircle2, File as FileIcon, Loader2, UploadCloud, X } from 'lucide-react';
import { cn } from '@olwiba/cn';
import { Button } from '../primitives/Button';

export interface FileUploadEntry {
  id: string;
  file: File;
  /** 0–100. Omit while pending, or when not tracking progress. */
  progress?: number;
  status?: 'pending' | 'uploading' | 'done' | 'error';
  error?: string;
}

export interface FileUploadProps {
  /** Comma-separated MIME types / extensions, e.g. `"image/png,image/jpeg"`. */
  accept?: string;
  multiple?: boolean;
  maxSizeMb?: number;
  maxFiles?: number;
  /** Controlled file list — pass this (with `onFilesChange`) to drive upload progress from your own network layer. */
  files?: FileUploadEntry[];
  /** Uncontrolled default list. */
  defaultFiles?: FileUploadEntry[];
  onFilesChange?: (files: FileUploadEntry[]) => void;
  /** Fired with the raw, already-validated `File` objects a user just added. */
  onFilesAdded?: (files: File[]) => void;
  disabled?: boolean;
  /** Helper text under the drop zone, e.g. "PNG or JPG, up to 5MB". */
  hint?: string;
  className?: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * Drag-and-drop file picker with a validated queue list. One component —
 * toggle `multiple`/`accept`/`maxSizeMb`/`maxFiles` rather than reaching for
 * a separate dropzone per use case. Progress/status is presentation-only;
 * wire `files`/`onFilesChange` to your own upload layer to drive it.
 */
export function FileUpload({
  accept,
  multiple = false,
  maxSizeMb,
  maxFiles,
  files: filesProp,
  defaultFiles,
  onFilesChange,
  onFilesAdded,
  disabled,
  hint,
  className,
}: FileUploadProps) {
  const [internalFiles, setInternalFiles] = React.useState<FileUploadEntry[]>(defaultFiles ?? []);
  const [isDragging, setIsDragging] = React.useState(false);
  const [validationError, setValidationError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const files = filesProp ?? internalFiles;

  const setFiles = React.useCallback(
    (next: FileUploadEntry[]) => {
      if (!filesProp) setInternalFiles(next);
      onFilesChange?.(next);
    },
    [filesProp, onFilesChange],
  );

  const acceptList = React.useMemo(
    () => accept?.split(',').map((a) => a.trim().toLowerCase()).filter(Boolean) ?? [],
    [accept],
  );

  const matchesAccept = (file: File) => {
    if (!acceptList.length) return true;
    const name = file.name.toLowerCase();
    return acceptList.some((pattern) =>
      pattern.startsWith('.') ? name.endsWith(pattern) : file.type === pattern || file.type.startsWith(pattern.replace('/*', '/')),
    );
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || disabled) return;
    const incoming = Array.from(fileList);
    const room = maxFiles ? Math.max(0, maxFiles - files.length) : Infinity;
    if (maxFiles && room <= 0) {
      setValidationError(`You can only add up to ${maxFiles} file${maxFiles === 1 ? '' : 's'}.`);
      return;
    }

    const accepted: File[] = [];
    let rejected = false;
    for (const file of incoming.slice(0, room)) {
      if (!matchesAccept(file)) { rejected = true; continue; }
      if (maxSizeMb && file.size > maxSizeMb * 1024 * 1024) { rejected = true; continue; }
      accepted.push(file);
    }

    setValidationError(rejected ? `Some files were skipped — check the file type and size limit.` : null);
    if (!accepted.length) return;

    const entries: FileUploadEntry[] = accepted.map((file) => ({ id: makeId(), file, status: 'pending' }));
    setFiles(multiple ? [...files, ...entries] : entries);
    onFilesAdded?.(accepted);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors',
          isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-foreground/30',
          disabled && 'pointer-events-none opacity-50',
        )}
      >
        <UploadCloud className="size-8 text-muted-foreground" />
        <p className="text-sm font-medium">
          <span className="text-primary underline underline-offset-4">Click to upload</span> or drag and drop
        </p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => { handleFiles(e.target.files); e.target.value = ''; }}
        />
      </div>

      {validationError && <p className="text-sm font-medium text-destructive">{validationError}</p>}

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map(({ id, file, progress, status = 'pending', error }) => (
            <li key={id} className="flex items-center gap-3 rounded-lg border bg-card/60 px-3 py-2.5">
              <FileIcon className="size-5 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">{formatBytes(file.size)}</span>
                </div>
                {status === 'uploading' && (
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress ?? 0}%` }} />
                  </div>
                )}
                {status === 'error' && error && <p className="mt-1 text-xs text-destructive">{error}</p>}
              </div>
              {status === 'uploading' && <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />}
              {status === 'done' && <CheckCircle2 className="size-4 shrink-0 text-primary" />}
              {status === 'error' && <AlertCircle className="size-4 shrink-0 text-destructive" />}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 shrink-0"
                onClick={() => removeFile(id)}
              >
                <X className="size-3.5" />
                <span className="sr-only">Remove {file.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
