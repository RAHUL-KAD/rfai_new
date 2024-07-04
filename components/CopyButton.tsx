import { useState } from "react";

interface CopyButtonProps {
    text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'copied' | 'error'>('idle');

    const handleCopy = async () => {
        try {
            setCopyStatus('copying');
            await navigator.clipboard.writeText(text);
            setCopyStatus('copied');
            setTimeout(() => {
                setCopyStatus('idle');
            }, 2000);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            setCopyStatus('error');
        }
    };
    
    let buttonText = 'Copy';
    if (copyStatus === 'copying') buttonText = 'Copying...';
    else if (copyStatus === 'copied') buttonText = 'Copied!';
    else if (copyStatus === 'error') buttonText = 'Error!';

    return (
        <div>
            <button
                className={`mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    copyStatus === 'copying' && 'opacity-50 cursor-not-allowed'
                }`}
                onClick={handleCopy}
                disabled={copyStatus === 'copying'}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default CopyButton;
