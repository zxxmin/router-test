import { useState, useEffect } from "react";
import type {CompanyInfo} from "../../types/CompanyTypes";

// named export로 변경
const CompanyDetail = () => {
    const [info, setInfo] = useState<CompanyInfo>();

    useEffect(() => {
        setInfo({
            id: 1,
            title: "Company 상세 내용",
        });
    }, []);

    return <div>{info?.title}</div>;
};

export default CompanyDetail;
