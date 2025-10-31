import {useState} from 'react';
import FilepondPage from "./filepond/FilepondPage";
import ReactDropzonePage from "./reactDropzone/ReactDropzonePage";

const FilePage = () => {
    const tabs = ['Filepond', 'React Dropzone', 'React Uploady'];
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <>
            <ul
                style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '8px',
                    alignItems: 'center',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '20px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
            >
                {tabs.map((tab, index) => (
                    <li key={index}>
                        <button
                            onClick={() => setTabIndex(index)}
                            style={{
                                padding: '8px',
                                backgroundColor: '#f8fafc',
                                borderRadius: '8px',
                                marginBottom: '24px',
                                border: '1px solid #e2e8f0',
                            }}
                        >
                            {tab}
                        </button>
                    </li>
                ))}
            </ul>

            {tabIndex === 0 && <FilepondPage />}
            {tabIndex === 1 && <ReactDropzonePage />}
        </>
    )
};

export default FilePage;
