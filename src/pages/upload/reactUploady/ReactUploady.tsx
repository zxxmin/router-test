import Uploady from "@rpldy/uploady";
import UploadDropZone from "@rpldy/upload-drop-zone";
import UploadPreview from "@rpldy/upload-preview";

const ReactUploadyPage = () => {
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

                <Uploady
                    destination={{
                        url: "/api/upload", // 업로드 API 주소
                    }}
                >
                    <UploadDropZone
                        extraProps={{
                            style: {
                                width: "100%",
                                height: "200px",
                                border: "2px dashed #007bff",
                                borderRadius: "12px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                margin: "0 auto",
                            }
                        }}
                    >
                        <p style={{ textAlign: "center", color: "#555" }}>
                            📂 Drag & Drop or Click to Upload
                        </p>
                    </UploadDropZone>

                    {/* 미리보기 리스트 */}
                    <UploadPreview
                        previewComponentProps={{
                            style: {
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "6px",
                                marginRight: "10px",
                                marginTop: "12px",
                            },
                        }}
                    />
                </Uploady>
            </div>
        </div>




    );
};

export default ReactUploadyPage;
