"use client";

import { motion } from "framer-motion";
import { Button, Space, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import { ResearchPill } from "@/components/atoms/research-pill";

const { Paragraph, Title } = Typography;

export function HeroSection({ areas = [], spotlight, stats = [] }) {
    return (
        <section className="masthead">
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="masthead-copy"
            >
                <p className="masthead-kicker">Research Portfolio</p>
                <Title className="masthead-title">Damodar Gautam</Title>
                <p className="masthead-subtitle">Agricultural researcher focused on seed systems, production efficiency, and rural livelihoods.</p>
                <Paragraph className="masthead-description">
                    A personal portfolio of publications examining lentil production, value chains, climate-resilient technologies,
                    underutilized crops, and farming systems in Nepal.
                </Paragraph>
                <Space wrap size={12} className="masthead-actions">
                    <Button type="primary" size="large" icon={<ArrowRightOutlined />} href="#publications" className="hero-button-primary">
                        Browse Publications
                    </Button>
                    <Button
                        size="large"
                        className="hero-button-secondary"
                        href="https://scholar.google.com/citations?hl=en&user=o_zl-E8AAAAJ"
                        target="_blank"
                    >
                        Google Scholar
                    </Button>
                </Space>
                <div className="focus-ribbon">
                    {areas.map((area) => (
                        <ResearchPill key={area} label={area} />
                    ))}
                </div>
            </motion.div>

            <motion.aside
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="profile-card"
            >
                <div className="profile-card-top">
                    <div className="profile-seal">DG</div>
                    <div>
                        <p className="profile-card-kicker">Research profile</p>
                        <h3 className="profile-card-title">Selected academic work</h3>
                    </div>
                </div>

                <p className="profile-card-summary">
                    The portfolio brings together journal articles and applied studies on agricultural systems, adoption behavior,
                    and rural development outcomes.
                </p>

                <dl className="profile-card-list">
                    <div>
                        <dt>Recent publication</dt>
                        <dd>{spotlight?.title || "Selected publications"}</dd>
                    </div>
                    <div>
                        <dt>Venue</dt>
                        <dd>{spotlight?.venue || "Academic portfolio"}</dd>
                    </div>
                    <div>
                        <dt>Core themes</dt>
                        <dd>Seed systems, adoption, productivity, rural livelihoods</dd>
                    </div>
                </dl>

                <div className="profile-card-stats">
                    {stats.map((item) => (
                        <div key={item.label} className="profile-card-stat">
                            <span>{item.value}</span>
                            <small>{item.label}</small>
                        </div>
                    ))}
                </div>
            </motion.aside>
        </section>
    );
}
