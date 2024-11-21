import React, { useEffect, useState } from 'react';
import './FileConverter.scss';
import { ArrowRight, Upload, Download } from 'lucide-react';
import * as uuid from 'uuid';


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

interface ConvertInfo {
  id : number,
  userUUID : string,
  status : string,
  ErrorCode : string,
  conversionType : string,
  completedAt : Date,
  conversionName : string,
  conversionPath : string,
}

// Main Component
const FileConverter = () => {
  const [files, setFiles]= useState<File[]>([]);
  const [convertTo, setConvertTo] = useState<string>('7z');
  const [progress, setProgress] = useState<number>(0);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploadingSuccess, setIsUploadingSuccess] = useState<boolean>(false);
  const [convertFiles, setConvertFiles] = useState<ConvertInfo[]>([]);

  let formData = new FormData();

  // set userUUID 
  useEffect(()=>{
    if (!localStorage.getItem('userUUID')) {
      localStorage.setItem('userUUID', uuid.v6());
    }
  }, []);

  // upload File Change


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const userUUID = localStorage.getItem('userUUID');
    if (event.target.files) {
      setIsUploading(false);
      setIsUploadingSuccess(false);
      setIsConverting(false);
      setProgress(0);
     
      const validFiles = Array.from(event.target.files).filter((file)=>{
        if(file.size > 50 * 1024 * 1024){
          alert(`${file.name}은(는) 50MB를 초과합니다`);
          return false;
        }
        return true;
      });
      
      setFiles(validFiles);
    }
  };
  
  
  // upload button logic
  const handleUpload = async ()=>{
    if(files.length === 0) return;
    setIsUploading(true);
    
    const userUUID = localStorage.getItem('userUUID') || '';
    formData.append('userUUID', userUUID);

    files.map((item)=>{
      formData.append('file',item);
    })

    try{
      const response = await fetch('http://localhost:3400/fileconvert/uploadFile', {
        method : "post",
        mode : "cors",
        cache : "no-cache",
        credentials : "same-origin",
        body : formData,
      });

      if(!response.ok){
        throw new Error(`서버 연결 실패 ${response.statusText}`)
      }

      setIsUploadingSuccess(true);
      const result = response.json();
      result.then((e)=>{console.log(e)});
    } 
    catch(err){
      console.error('uploading', err);
    } 
    finally {
      setIsUploading(false);
    }
  } 

  const handleConvert = async ()=>{
    const userUUID = localStorage.getItem('userUUID') || '';
    try{
      setIsConverting(true);
      const response : Response = await fetch('http://localhost:3400/fileconvert/convertFile', {
        method : 'POST',
        credentials : 'same-origin',
        mode : 'cors',
        cache : 'no-cache',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({userUUID : userUUID,
          conversionType : convertTo
        }),
      });
      
      if(!response.ok){
        throw new Error(`서버 연결 실패 ${response.statusText}`);
      }

      const result = await response.json();
      if(result){
        setProgress(100);
        setIsConverting(false);
        setConvertFiles(result);
      }
    } catch(err){
      console.error('convert', err);
    } 
    
  }

  const handleDownload = async (file : ConvertInfo)=>{
    try{
      console.log(file);
      const userUUID = localStorage.getItem('userUUID') || '';
      const response = await fetch('http://localhost:3400/fileconvert/downloadFile',{
         method : 'POST',
         credentials : 'same-origin',
         cache : 'no-cache',
         mode : 'cors',
         headers : {
          'Content-Type' : 'application/json'
         },
         body : JSON.stringify({
          userUUID: userUUID,
          filepath: file.conversionPath,
        }),
      });

      if(!response.ok){
        throw new Error('')
      }


      const blob = await response.blob();
      
      const a : HTMLAnchorElement = document.createElement('a');
      a.download = file.conversionName+"."+file.conversionType;
      a.href = URL.createObjectURL(blob);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    }
    catch(err){
      console.error('download', err);
    }
  }

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
              accept=".zip,.tar,.7z,.tar.gz,.gz,.bz2,.rar"
            />
            <label htmlFor="file-upload" className="file-upload-label">
              <Upload style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
              Select File
            </label>
            {files.length > 0 ? (
              <div>
                <div className="file-count">{files.length} File</div>
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
            <option value="tgz">tgz</option>
          </select>

          {/* Convert button */}
          {!isUploadingSuccess && (
            <button
              onClick={handleUpload}
              disabled={files.length === 0 || isConverting}
              className="button"
            >
              <ArrowRight style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
              upload files  
            </button>
          )}

          {isUploadingSuccess && (
            <button onClick={handleConvert}
            disabled={files.length === 0 || isConverting || !isUploadingSuccess} 
            style={{display : progress === 100 ? 'none' : 'block'}}
            className='button'>
              <ArrowRight style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
              uploading complete! convert to {convertTo} 
            </button>
          )}

          {isConverting && (
            <>
            <div className='loader-box'>
              <div className="loader"></div>
              <div 
              style={{display : progress === 100 ? 'none' : 'block'}}
              >
                <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight : 'bold' }}>it is converting now. wait a minutes.</p>
              </div>
            </div>
            </>
          )}
          
          {progress === 100 && (
            convertFiles.map((e,index)=>(
              <button className="button" onClick={()=>handleDownload(e)} key={index}>
              <Download style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} />
              {e.conversionName + "." + e.conversionType}
            </button>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FileConverter;
