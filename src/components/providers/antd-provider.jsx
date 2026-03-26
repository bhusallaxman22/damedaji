"use client";

import { ConfigProvider, theme } from "antd";

const customTheme = {
    algorithm: [theme.defaultAlgorithm],
    token: {
        colorPrimary: "#1d6b57",
        colorInfo: "#1d6b57",
        colorBgLayout: "#f5f0e8",
        colorTextBase: "#1f2a23",
        colorBorder: "rgba(58, 69, 61, 0.12)",
        colorTextSecondary: "#59665d",
        borderRadius: 22,
        fontFamily: "var(--font-body)",
    },
    components: {
        Button: {
            controlHeightLG: 52,
            borderRadiusLG: 999,
            fontWeight: 700,
            primaryShadow: "0 18px 40px rgba(29, 107, 87, 0.24)",
        },
        Card: {
            borderRadiusLG: 28,
        },
        Input: {
            controlHeightLG: 56,
            activeShadow: "0 0 0 4px rgba(29, 107, 87, 0.12)",
        },
        Segmented: {
            itemSelectedBg: "#183f36",
            itemSelectedColor: "#f8f5ee",
            trackBg: "rgba(24, 63, 54, 0.08)",
        },
    },
};

export function AntdProvider({ children }) {
    return <ConfigProvider theme={customTheme}>{children}</ConfigProvider>;
}
