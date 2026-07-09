'use client';
import { FileUpload } from '@olwiba/ui';

export default function Demo() {
  return (
    <div className="mx-auto max-w-md p-8">
      <FileUpload
        multiple
        accept="image/png,image/jpeg"
        maxSizeMb={5}
        maxFiles={4}
        hint="PNG or JPG, up to 5MB each"
      />
    </div>
  );
}
