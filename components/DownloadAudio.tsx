// DownloadButton.tsx
import React from 'react';
import axios from 'axios';

import { TbDownload } from 'react-icons/tb';

interface DownloadAudioProps {
  fileUrl: string;
  fileName: string;
}

const DownloadAudio: React.FC<DownloadAudioProps> = ({ fileUrl, fileName }) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(fileUrl, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a temporary link element and trigger a download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <button
      id='download'
      aria-label='audioDownload'
      title='CustomAudioDownload'
      onClick={handleDownload}
      className="py-2 px-4 rounded"
    >
      <TbDownload size={24} />
    </button>
  );
};

export default DownloadAudio;
