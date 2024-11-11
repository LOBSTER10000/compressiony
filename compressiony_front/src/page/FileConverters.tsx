import React, { useState } from 'react';
import './FileConverter.scss';
import { ArrowRight, Upload, Download } from 'lucide-react';

// Header Component
const Header = () => (
  <header className="header">
    <h1>Free File Compression Converter</h1>
  </header>
);

// Footer Component
const Footer = () => (
  <footer className="footer">
    <p>&copy; 2024 Free File Compression Converter. All rights reserved.</p>
  </footer>
);

// ProgressBar Component
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="progress-bar">
    <div className="progress" style={{ width: `${progress}%` }}>
      {progress}%
    </div>
  </div>
);

// Main Component
const FileConverter = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [convertTo, setConvertTo] = useState<string>('7z');
  const [progress, setProgress] = useState<number>(0);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleConvert = () => {
    if (files.length === 0) return;
    setIsConverting(true);
    setProgress(0);

    // Simulate conversion process
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 10;
      setProgress(progressValue);
      if (progressValue >= 100) {
        clearInterval(interval);
        setIsConverting(false);
      }
    }, 500);
  };

  return (
    <div className="container">
      <Header />
      <main className="main">
        <div>
          {/* File upload section */}
          <div className="file-upload">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              multiple
              accept=".zip,.tar,.7z,.tar.gz,.gz,.bz2"
            />
            <label htmlFor="file-upload" className="file-upload-label">
              <Upload style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
              Select File
            </label>
            {files.length > 0 ? (
              <div>
                <span className="file-count">{files.length} File</span>
                <ul className="file-list">
                  {files.map((file, index) => (
                    <li key={index} className="file-name">
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <span className="file-name">Not Select</span>
            )}
          </div>

          {/* Format selection dropdown */}
          <select
            value={convertTo}
            onChange={(e) => setConvertTo(e.target.value)}
            className="select"
          >
            <option value="7z">7z</option>
            <option value="zip">zip</option>
            <option value="tar">tar</option>
            <option value="gz">gz</option>
            <option value="bz2">bz2</option>
          </select>

          {/* Convert button */}
          <button
            onClick={handleConvert}
            disabled={files.length === 0 || isConverting}
            className="button"
          >
            <ArrowRight style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
            convert to {convertTo}  
          </button>

          {isConverting && (
            <div>
              <ProgressBar progress={progress} />
              <p style={{ textAlign: 'center', fontSize: '0.875rem' }}>{progress}% Complete</p>
            </div>
          )}

          {progress === 100 && (
            <button className="button">
              <Download style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
              {files.length > 1 ? '모든 파일 다운로드' : `${files[0].name} 다운로드`}
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FileConverter;
