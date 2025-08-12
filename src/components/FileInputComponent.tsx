'use client';

import { useState } from 'react';

type Props = {
  handleFileSubmit: (fileBlob: Blob) => void;
  isSubmitting: boolean;
  isAiResponding: boolean;
};

export default function FileInputComponent({
  handleFileSubmit,
  isSubmitting,
  isAiResponding,
}: Props) {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFileName(file.name);

    const reader = new FileReader();

    reader.onload = () => {
      const fileBlob = new Blob([reader.result as ArrayBuffer], {
        type: file.type,
      });

      handleFileSubmit(fileBlob);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex items-center gap-4">
      <label className="cursor-pointer text-black bg-[#f5f5f5] px-4 py-2 rounded-full hover:bg-[#f8f8f8] transition">
        Upload File
        <input
          type="file"
          onChange={handleChange}
          disabled={isSubmitting || isAiResponding}
          className="hidden"
        />
      </label>

      {selectedFileName && (
        <span className="text-sm text-gray-300">{selectedFileName}</span>
      )}

      {isSubmitting && (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
    </div>
  );
}
