import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    if (!selectedFile) {
      console.log('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://localhost:8080/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmission}>Submit</button>
    </div>
  );
}

export default App;
