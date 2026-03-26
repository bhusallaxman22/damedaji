import "antd/dist/reset.css";
import "./globals.css";

import { AntdProvider } from "@/components/providers/antd-provider";

export const metadata = {
    title: "Damodar Gautam | Research Portfolio",
    description: "Professional research portfolio for Damodar Gautam.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AntdProvider>{children}</AntdProvider>
            </body>
        </html>
    );
}
