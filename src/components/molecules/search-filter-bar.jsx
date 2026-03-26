"use client";

import { Input, Segmented } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export function SearchFilterBar({ query, onQueryChange, activeFilter, onFilterChange, filters }) {
    return (
        <div className="search-filter-bar">
            <Input
                className="search-filter-input"
                size="large"
                value={query}
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search by title, venue, author, or summary"
                onChange={(event) => onQueryChange(event.target.value)}
            />
            <Segmented
                className="search-filter-segmented"
                value={activeFilter}
                onChange={onFilterChange}
                options={filters}
                block
                size="large"
            />
        </div>
    );
}
