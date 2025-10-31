import { useRef, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// FilePond 플러그인들
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

// 플러그인 등록
registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize
);

// CSS는 위에서 import

interface FilePondUploadProps {
    onFileUpload?: (files: File[]) => void;
    onFileRemove?: (files: File[]) => void;
    onFileUpdate?: (files: File[]) => void;
    onSave?: (files: File[]) => void;
    maxFiles?: number;
    maxFileSize?: string;
    acceptedFileTypes?: string[];
    allowMultiple?: boolean;
    instantUpload?: boolean;
    server?: any;
    disabled?: boolean;
    showSaveButton?: boolean;
}

const FilepondUpload = ({
    onFileUpload,
    onFileRemove,
    onFileUpdate,
    onSave,
    maxFiles = 50,
    maxFileSize = '50MB',
    acceptedFileTypes = [
        'image/*',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
    ],
    allowMultiple = true,
    instantUpload = true,
    server = {
        process: (
            _fieldName: string,
            file: File,
            _metadata: any,
            load: (serverId: string) => void,
            _error: (errorText: string) => void,
            progress: (progress: number) => void,
            abort: () => void
        ) => {
            // 가짜 업로드 시뮬레이션
            let intervalId: NodeJS.Timeout | null = null;

            const fakeProgress = () => {
                let progressValue = 0;
                intervalId = setInterval(() => {
                    progressValue += Math.random() * 30;
                    progress(progressValue);

                    if (progressValue >= 100) {
                        progressValue = 100;
                        if (intervalId) clearInterval(intervalId);

                        // 성공 응답 시뮬레이션
                        console.log('업로드 완료 - success 상태로 변경');
                        load('fake-file-id-' + Date.now());
                    }
                }, 200);
            };

            // 1초 후 시작
            setTimeout(fakeProgress, 1000);

            // 취소 함수
            return {
                abort: () => {
                    if (intervalId) clearInterval(intervalId);
                    abort();
                }
            };
        }
    },
    disabled = false,
    showSaveButton = true,
}: FilePondUploadProps) => {
    const [files, setFiles] = useState<any[]>([]);
    const pondRef = useRef<FilePond>(null);

    const handleUpdateFiles = (fileItems: any[]) => {
        const fileObjects = fileItems.map((fileItem: any) => fileItem.file);
        setFiles(fileItems);

        if (onFileUpdate) {
            onFileUpdate(fileObjects);
        }
    };

    const handleAddFile = (error: any, file: any) => {
        if (error) {
            console.error('파일 추가 오류:', error);
            return;
        }

        // 파일 추가 시 즉시 검증
        const validation = validateFiles([file.file]);

        if (!validation.valid) {
            // 검증 실패 시 파일 제거
            if (pondRef.current) {
                pondRef.current.removeFile(file.id);
            }
            alert('파일 검증 실패:\n' + validation.errors.join('\n'));
            return;
        }

        // 검증 성공 시 파일 추가
        if (onFileUpload) {
            onFileUpload([file.file]);
        }

        console.log('파일 추가 성공:', file.file.name);
    };

    const handleRemoveFile = (error: any, file: any) => {
        if (error) {
            console.error('파일 제거 오류:', error);
            return;
        }

        // 파일 제거 시 상태 업데이트
        setFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));

        if (onFileRemove) {
            onFileRemove([file.file]);
        }
    };

    const handleFilePondInit = () => {
        setFiles([]);
    };

    const validateFiles = (
        files: File[]
    ): { valid: boolean; errors: string[] } => {
        const errors: string[] = [];

        // 파일 개수 체크
        if (files.length > maxFiles) {
            errors.push(`최대 ${maxFiles}개 파일만 업로드할 수 있습니다.`);
        }

        // 파일 크기 및 형식 체크
        files.forEach((file) => {
            // 파일 크기 체크
            const maxSizeBytes =
                parseInt(maxFileSize) *
                (maxFileSize.includes('MB') ? 1024 * 1024 : 1024);
            if (file.size > maxSizeBytes) {
                errors.push(`${file.name}: 파일 크기가 ${maxFileSize}를 초과합니다.`);
            }

            // 파일 형식 체크 (이미지와 엑셀만 허용)
            const isImage = file.type.startsWith('image/');
            const isExcel =
                file.type ===
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'application/vnd.ms-excel' ||
                file.name.toLowerCase().endsWith('.xlsx') ||
                file.name.toLowerCase().endsWith('.xls');

            if (!isImage && !isExcel) {
                errors.push(
                    `${file.name}: 이미지(.jpg, .png, .gif 등) 또는 엑셀(.xlsx, .xls) 파일만 업로드 가능합니다.`
                );
            }
        });

        return {
            valid: errors.length === 0,
            errors,
        };
    };

    const handleSave = () => {
        const fileObjects = files.map((fileItem: any) => fileItem.file);

        if (fileObjects.length === 0) {
            alert('저장할 파일이 없습니다.');
            return;
        }

        // 실제 서버 저장 API 호출
        if (onSave) {
            onSave(fileObjects);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <FilePond
                ref={pondRef}
                files={files}
                onupdatefiles={handleUpdateFiles}
                onaddfile={handleAddFile}
                onremovefile={handleRemoveFile}
                oninit={handleFilePondInit}
                allowMultiple={allowMultiple}
                maxFiles={maxFiles}
                maxFileSize={maxFileSize}
                acceptedFileTypes={acceptedFileTypes}
                server={server}
                disabled={disabled}
                name='files'
                labelIdle='Drop files here...'
                instantUpload={instantUpload}
                allowRemove={true}
                allowReplace={true}
                allowDrop={true}
                allowBrowse={true}
                allowPaste={true}
                checkValidity={true}
                maxParallelUploads={50}
                labelFileProcessing='업로드 중...'
                labelFileProcessingComplete='업로드 완료'
                labelFileProcessingError='업로드 오류'
            />

            {/* 저장 버튼 */}
            {showSaveButton && (
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <button
                        onClick={handleSave}
                        disabled={files.length === 0}
                        style={{
                            backgroundColor: files.length === 0 ? '#9ca3af' : '#3b82f6',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '14px 28px',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: files.length === 0 ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow:
                                files.length === 0
                                    ? 'none'
                                    : '0 4px 12px rgba(59, 130, 246, 0.3)',
                            opacity: files.length === 0 ? 0.6 : 1,
                        }}
                        onMouseEnter={e => {
                            if (files.length > 0) {
                                e.currentTarget.style.backgroundColor = '#2563eb';
                                e.currentTarget.style.boxShadow =
                                    '0 6px 16px rgba(59, 130, 246, 0.4)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (files.length > 0) {
                                e.currentTarget.style.backgroundColor = '#3b82f6';
                                e.currentTarget.style.boxShadow =
                                    '0 4px 12px rgba(59, 130, 246, 0.3)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }
                        }}
                    >
                        {files.length === 0
                            ? '파일을 먼저 추가하세요'
                            : `${files.length}개 파일 저장`}
                    </button>
                </div>
            )}

        </div>
    );
};

export default FilepondUpload;
