import Link from "next/link";
import { Button, Result } from "antd";

export default function NotFound() {
    return (
        <Result
            status="404"
            title="Publication not found"
            subTitle="The requested publication could not be found in this portfolio."
            extra={
                <Link href="/">
                    <Button type="primary">Back to portfolio</Button>
                </Link>
            }
        />
    );
}
