import { useState, useEffect } from "react";
import type { DashboardInfo } from "../../../dashboard";

// named export로 변경
export const DashboardDetail = () => {
    const [info, setInfo] = useState<DashboardInfo>();

    useEffect(() => {
        setInfo({
            id: 1,
            title: "Dashboard 상세 내용",
        });
    }, []);

    return <div>{info?.title}</div>;
};
