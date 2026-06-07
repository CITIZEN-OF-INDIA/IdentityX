import { useState } from "react";
import { useDropzone } from "react-dropzone";
import API from "../services/api";

function UploadBox({
  setResults,
  setLoading
}) {

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {

    // <<< DEBUG ADDED >>>
    console.log("DROPPED FILES:", acceptedFiles);

    const selected = acceptedFiles[0];

    if (!selected) {
      // <<< DEBUG ADDED >>>
      console.log("NO FILE SELECTED");
      return;
    }

    // <<< DEBUG ADDED >>>
    console.log("SELECTED FILE:", selected);

    setFile(selected);

    setPreview(
      URL.createObjectURL(selected)
    );
  };

  const { getRootProps, getInputProps } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": []
      }
    });

  const handleUpload = async () => {

    // <<< DEBUG ADDED >>>
    console.log("SCAN BUTTON CLICKED");

    // <<< DEBUG ADDED >>>
    console.log("CURRENT FILE:", file);

    if (!file) {

      // <<< DEBUG ADDED >>>
      console.log("UPLOAD STOPPED: FILE IS NULL");

      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      // <<< DEBUG ADDED >>>
      console.log(
        "API URL:",
        API.defaults.baseURL + "/recognize"
      );

      // <<< DEBUG ADDED >>>
      console.log("SENDING REQUEST...");

      const response =
        await API.post(
          "/recognize",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

      // <<< DEBUG ADDED >>>
      console.log(
        "SUCCESS RESPONSE:",
        response.data
      );

      setResults(
        response.data.recognized_names
      );

    } catch (error) {

      // <<< DEBUG ADDED >>>
      console.log("FULL ERROR:", error);

      console.log(
        "STATUS:",
        error.response?.status
      );

      console.log(
        "DATA:",
        error.response?.data
      );

      console.log(
        "HEADERS:",
        error.response?.headers
      );

      console.log(
        "MESSAGE:",
        error.message
      );

      alert("Recognition Failed");

    } finally {

      setLoading(false);

      // <<< DEBUG ADDED >>>
      console.log("REQUEST FINISHED");

    }
  };

  return (
    <div className="upload-box">

      <div
        {...getRootProps()}
        className="dropzone"
      >
        <input {...getInputProps()} />

        <h3>
          Drag & Drop Group Photo
        </h3>

        <p>
          or click to browse
        </p>

      </div>

      {preview && (

        <img
          src={preview}
          alt="preview"
          className="preview-image"
        />

      )}

      <button
        className="scan-btn"
        onClick={handleUpload}
      >
        Scan Faces
      </button>

    </div>
  );
}

export default UploadBox;