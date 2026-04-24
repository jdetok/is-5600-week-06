// CardList.jsx
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";
import React, { useState, useEffect } from 'react';

const CardList = ({ data }) => {    
    const limit = 10;
    const defaultDataset = data.slice(0, limit);

    // pagination functionality
    const [offset, setOffset] = useState(0);
    const [products, setProducts] = useState(defaultDataset);
    
    // filtered dataset to enable search functionality
    const [filteredData, setFilteredData] = useState(data);

    // search functionality
    const filterTags = (tag) => {
        const filtered = tag ?
            data.filter((p) => p.tags.some((t) => t.title.toLowerCase().includes(tag.toLowerCase()))) : data;
        setFilteredData(filtered);
        setOffset(0);
    };

    // single function for pagination button press
    const handlePress = (direction) => {
        if (direction !== 'next' && direction !== 'previous') throw new Error("expected 'next' or 'previous'");
        setOffset(direction === 'next' ? offset + limit : offset - limit);
    }

    // keep pagination state updated
    useEffect(() => {
        setProducts(filteredData.slice(offset, offset + limit));
    }, [offset, filteredData]);

    return (
        <div className="cf pa2">
            <div className="mt2 mb2">
                {products.map((product) => (
                    <Card key={product.id} { ...product } />
                ))};
            </div>
            <div className="flex items-center justify-center pa4">
                <Search handleSearch={filterTags}/>
                {offset > 0 && <Button text="Previous" handleClick={() => handlePress('previous')} />}
                {offset + limit < filteredData.length && <Button text="Next" handleClick={() => handlePress('next')} />}
            </div>
        </div>
    );
}

export default CardList;