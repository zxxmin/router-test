import {useState} from 'react';
import FilepondUpload from "./components/FilepondUpload";

const FilepondPage = () => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleFileUpload = (files: File[]) => {
        setUploadedFiles(prev => [...prev, ...files]);
        console.log('업로드된 파일들:', files);
    };

    const handleFileRemove = (files: File[]) => {
        setUploadedFiles(prev =>
            prev.filter(
                file => !files.some(removedFile => removedFile.name === file.name)
            )
        );
        console.log('제거된 파일들:', files);
    };

    const handleFileUpdate = (files: File[]) => {
        setUploadedFiles(files);
        console.log('업데이트된 파일들:', files);
    };

    const handleSave = (files: File[]) => {
        console.log('저장할 파일들:', files);

        // 실제 API 호출 시뮬레이션
        const saveToAPI = async () => {
            try {
                // FormData 생성
                const formData = new FormData();
                files.forEach((file, index) => {
                    formData.append(`file_${index}`, file);
                });

                // API 호출 (실제 서버가 있다면)
                // const response = await fetch('/api/upload', {
                //   method: 'POST',
                //   body: formData,
                // });

                // 시뮬레이션
                await new Promise(resolve => setTimeout(resolve, 1000));

                // 성공 메시지
                const successMessage = `✅ ${files.length}개 파일이 성공적으로 서버에 저장되었습니다!\n\n저장된 파일:\n${files.map(f => `• ${f.name} (${formatFileSize(f.size)})`).join('\n')}`;
                alert(successMessage);
                console.log('파일 저장 완료:', files);

                // 저장 성공 후 파일 목록 초기화
                setUploadedFiles([]);
            } catch (error) {
                console.error('파일 저장 오류:', error);
                alert('❌ 파일 저장 중 오류가 발생했습니다.\n다시 시도해주세요.');
            }
        };

        saveToAPI();
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (file: File) => {
        if (file.type.startsWith('image/')) return '🖼️';
        if (
            file.type ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.type === 'application/vnd.ms-excel' ||
            file.name.toLowerCase().endsWith('.xlsx') ||
            file.name.toLowerCase().endsWith('.xls')
        )
            return '📊';
        return '📎';
    };

    const downloadFile = (file: File) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const previewImage = (file: File) => {
        if (file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            window.open(url, '_blank');
        }
    };

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
                    📤 FilePond 파일 업로드
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
                <FilepondUpload
                    onFileUpload={handleFileUpload}
                    onFileRemove={handleFileRemove}
                    onFileUpdate={handleFileUpdate}
                    onSave={handleSave}
                    maxFiles={10}
                    maxFileSize='10MB'
                    acceptedFileTypes={[
                        'image/*',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'application/vnd.ms-excel',
                    ]}
                    allowMultiple={true}
                    //   allowReorder={true}
                    //   allowRevert={true}
                    showSaveButton={true}
                />
            </div>

            {uploadedFiles.length > 0 && (
                <div
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
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
                        업로드된 파일 목록
                    </h2>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '16px',
                        }}
                    >
                        {uploadedFiles.map((file, index) => (
                            <div
                                key={index}
                                style={{
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    backgroundColor: '#f8fafc',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '12px',
                                    }}
                                >
                                    <span style={{fontSize: '24px', marginRight: '12px'}}>
                                        {getFileIcon(file)}
                                    </span>
                                    <div style={{flex: 1, minWidth: 0}}>
                                        <h3
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: '#374151',
                                                margin: 0,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {file.name}
                                        </h3>
                                        <p
                                            style={{
                                                fontSize: '12px',
                                                color: '#6b7280',
                                                margin: '4px 0 0 0',
                                            }}
                                        >
                                            {formatFileSize(file.size)} • {file.type}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '8px',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <button
                                        onClick={() => downloadFile(file)}
                                        style={{
                                            padding: '6px 12px',
                                            backgroundColor: '#3b82f6',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                        }}
                                    >
                                        📥 다운로드
                                    </button>
                                    {file.type.startsWith('image/') && (
                                        <button
                                            onClick={() => previewImage(file)}
                                            style={{
                                                padding: '6px 12px',
                                                backgroundColor: '#10b981',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '12px',
                                            }}
                                        >
                                            👁️ 미리보기
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilepondPage;
