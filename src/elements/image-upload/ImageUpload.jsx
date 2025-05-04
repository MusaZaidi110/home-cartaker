import { useCallback, useState, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './ImageUpload.css';

const ImageUpload = ({
  multiple = false,
  maxFiles = 5,
  maxSizeMB = 2,
  accept = 'image/*',
  text = 'Drag & drop an image here, or click to select',
  onFilesChange,
  required = false,
  externalError = null,
  initialFiles = [],
}) => {
  const [files, setFiles] = useState(initialFiles);
  const [internalError, setInternalError] = useState('');
  const [touched, setTouched] = useState(false);

  // Combined error state (only show after interaction)
  const showError = touched || files.length > 0 || externalError;
  const error = showError ? (externalError || internalError) : '';

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setTouched(true);
    setInternalError('');

    if (fileRejections.length > 0) {
      const rejectionError = fileRejections[0].errors[0].message;
      setInternalError(rejectionError);
      onFilesChange?.([]);
      return;
    }

    const newFiles = multiple
      ? [...files, ...acceptedFiles].slice(0, maxFiles)
      : [acceptedFiles[0]];

    setFiles(newFiles);
    onFilesChange?.(newFiles);
  }, [files, multiple, maxFiles, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize: maxSizeMB * 1024 * 1024,
    multiple,
    noClick: files.length >= maxFiles && multiple,
    noKeyboard: files.length >= maxFiles && multiple,
  });

  const removeFile = useCallback((index) => {
    setTouched(true);
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange?.(newFiles);
    
    if (required && newFiles.length === 0) {
      setInternalError('This field is required');
    } else {
      setInternalError('');
    }
  }, [files, onFilesChange, required]);

  // Validate when required or files change
  useEffect(() => {
    if (required && files.length === 0 && touched) {
      setInternalError('This field is required');
    } else {
      setInternalError('');
    }
  }, [required, files.length, touched]);

  // Memoize preview URLs
  const filePreviews = useMemo(() => (
    files.map((file, index) => ({
      id: `${file.name}-${file.lastModified}-${index}`,
      url: URL.createObjectURL(file),
      name: file.name,
      index
    }))
  ), [files]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      filePreviews.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [filePreviews]);

  return (
    <div className="image-upload-container">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''} ${error ? 'error' : ''} ${files.length >= maxFiles && multiple ? 'disabled' : ''}`}
        aria-disabled={files.length >= maxFiles && multiple}
      >
        <input {...getInputProps()} />
        <div className="dropzone-content">
          {isDragActive ? (
            <p>Drop the image(s) here...</p>
          ) : (
            <p>{text}</p>
          )}
        </div>
      </div>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <div className="preview-container">
          <h4>Selected {files.length > 1 ? 'Images' : 'Image'}:</h4>
          <div className="preview-grid">
            {filePreviews.map(({ id, url, name, index }) => (
              <div key={id} className="preview-item">
                <img
                  src={url}
                  alt={name}
                  className="preview-image"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="remove-btn"
                  aria-label={`Remove ${name}`}
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;