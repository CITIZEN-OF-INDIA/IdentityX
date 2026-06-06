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

    const selected = acceptedFiles[0];

    if (!selected) return;

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

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

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

      setResults(
        response.data.recognized_names
      );

    } catch (error) {

      console.error(error);

      alert("Recognition Failed");

    } finally {

      setLoading(false);

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