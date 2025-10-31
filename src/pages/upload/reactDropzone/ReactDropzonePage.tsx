import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ReactDropzonePage = () => {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(prev => [...prev, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [] // 이미지 파일만 허용
        },
        maxSize: 5 * 1024 * 1024, // 5MB 제한
    });

    return (
        <div
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
        >
            <div
                style={{
                    backgroundColor: '#f8fafc',
                    padding: '20px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: '1px solid #e2e8f0',
                }}
            >
                <h1
                    style={{
                        color: '#1e293b',
                        marginBottom: '10px',
                        fontSize: '28px',
                        fontWeight: 'bold',
                    }}
                >
                    📤 React Dropzone 파일 업로드
                </h1>
            </div>
            <div
                style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    marginBottom: '20px',
                }}
            >
                <h2
                    style={{
                        color: '#1e293b',
                        marginBottom: '20px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}
                >
                    파일 업로드 영역
                </h2>

                <div>
                    <div
                        {...getRootProps()}
                        style={{
                            border: '2px dashed #A0A0A0',
                            borderRadius: '8px',
                            padding: '24px',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop your image here ✨</p>
                        ) : (
                            <p>Drag & Drop or Click to Upload Image</p>
                        )}
                    </div>

                    {/* 파일 목록 */}
                    {files.length > 0 && (
                        <div style={{ marginTop: '20px' }}>
                            <h4>Uploaded Files</h4>
                            <ul>
                                {files.map(file => (
                                    <li key={file.name}>
                                        {file.name} - {file.size} bytes
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReactDropzonePage;
