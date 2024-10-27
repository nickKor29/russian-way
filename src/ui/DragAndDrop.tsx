import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Error from "./FormError";

const DropzoneContainer = styled.div<{ $rounded: boolean }>`
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ $rounded }) => ($rounded ? "200px" : "100%")};
  height: ${({ $rounded }) => ($rounded ? "200px" : "auto")};
  padding: ${({ $rounded }) => ($rounded ? "0" : "20px")};
  border: 2px dashed var(--color-brand-700);
  border-radius: ${({ $rounded }) => ($rounded ? "50%" : "4px")};
  background-color: var(--color-grey-0);
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  overflow: hidden;
  min-height: 200px;
  max-width: ${({ $rounded }) => ($rounded ? "200px" : "none")};
  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const DropzoneText = styled.p`
  font-size: 1.7rem;
  color: var(--color-grey-700);
`;

const PreviewImage = styled.img<{ $rounded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ $rounded }) => ($rounded ? "50%" : "4px")};
  margin-top: 0;
`;

interface DragAndDropProps {
  onDrop: (files: File[]) => void;
  dropTextBefore?: string;
  dropTextAfter?: string;
  fallbackComponent?: React.FC;
  previewImage?: string;
  isRequired?: boolean;
  rounded?: boolean;
  avatar?: boolean;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({
  onDrop,
  dropTextBefore,
  dropTextAfter,
  fallbackComponent: FallbackComponent,
  previewImage,
  isRequired = false,
  rounded = false,
  avatar,
}) => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        if (isRequired) {
          setError(true);
        }
        return;
      }
      const file = acceptedFiles[0];
      const objectUrl = URL.createObjectURL(file);
      setUploadedFileName(file.name);
      setUploadedFile(objectUrl);
      setError(false);
      onDrop(acceptedFiles);
    },
    [onDrop, isRequired]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });

  useEffect(() => {
    if (!avatar) {
      setUploadedFileName(null);
      setUploadedFile(null);
    }
  }, [avatar]);

  return (
    <div>
      {uploadedFile || previewImage ? (
        <DropzoneContainer {...getRootProps()} $rounded={rounded}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <DropzoneText>Отпустите файлы для загрузки</DropzoneText>
          ) : (
            <>
              {!rounded && (
                <DropzoneText>
                  {dropTextAfter
                    ? `${dropTextAfter}: ${uploadedFileName}`
                    : `Файлы загружены, чтобы изменить, загрузите новый: ${uploadedFileName}`}
                </DropzoneText>
              )}
              <PreviewImage
                src={uploadedFile || previewImage}
                alt="Превью"
                $rounded={rounded}
              />
            </>
          )}
        </DropzoneContainer>
      ) : (
        <div>
          {FallbackComponent ? <FallbackComponent /> : null}
          <DropzoneContainer {...getRootProps()} $rounded={rounded}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <DropzoneText>Отпустите файлы для загрузки</DropzoneText>
            ) : (
              <DropzoneText>
                {dropTextBefore ||
                  "Перетащите файлы сюда или щелкните, чтобы выбрать"}
              </DropzoneText>
            )}
          </DropzoneContainer>
          {error && <Error>Необходимо загрузить картинку</Error>}
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
