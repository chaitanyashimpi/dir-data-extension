import React, { useState } from 'react';
import "./App.css";
import Header from "./components/Header";

function App() {
  const [folderSelected, setFolderSelected] = useState(false);
  const [filesData, setFilesData] = useState([]);
  const [directoryPath, setDirectoryPath] = useState('');

  const handleClick = () => {
    document.getElementById("selectFile").click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      // Extract file details
      const data = Array.from(files).map((file, index) => {
        const { name, type, size, lastModified } = file;
        return {
          srNo: index + 1,
          name,
          type,
          size: size / 1024, // Convert to KB
          date: new Date(lastModified).toLocaleDateString(),
          time: new Date(lastModified).toLocaleTimeString()
        };
      });

      setFilesData(data);
      setDirectoryPath(files[0].webkitRelativePath.split('/')[0]); // Extract directory name
      setFolderSelected(true);
    }
  };

  return (
    <>
      <main>
        <Header />
        <section className="mainSection">
          {!folderSelected && (
            <div className="selectFolder">
              <span className="upload" onClick={handleClick}>
                <strong className="icon">⬆️</strong>
                <p>Select the directory</p>
              </span>
              <input
                type="file"
                webkitdirectory="true"
                style={{ display: "none" }}
                id="selectFile"
                onChange={handleFileChange}
              />
            </div>
          )}
          {folderSelected && (
            <div className="folderSelected">
              <p className="folderPath">Path of Directory Selected: <span>{directoryPath}</span></p>
              <table>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Size (KB)</th>
                  </tr>
                </thead>
                <tbody>
                  {filesData.map(file => (
                    <tr key={file.srNo}>
                      <td>{file.srNo}</td>
                      <td>{file.name}</td>
                      <td>{file.date}</td>
                      <td>{file.time}</td>
                      <td>{file.type}</td>
                      <td>{file.size.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
