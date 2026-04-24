// CardList.jsx
import Card from "./Card";
import Button from "./Button";
import React, { useState, useEffect } from 'react';

const CardList = ({ data }) => {    
    const limit = 20;
    const perPage = 10;
    const defaultDataset = data.slice(0, limit);
    const [offset, setOffset] = useState(0);
    const [products, setProducts] = useState(defaultDataset);
    const handlePrevious = () => setOffset(offset - perPage);
    const handleNext = () => setOffset(offset + perPage);
    useEffect(() => {
        setProducts(data.slice(offset, offset + limit));
    }, [offset, limit, data]);
    return (
        <div className="cf pa2">
            <div className="mt2 mb2">
                {products.map((product) => (
                    <Card key={product.id} { ...product } />
                ))};
            </div>
            <div className="flex items-center justify-center pa4">
                <Button text="Previous" handleClick={handlePrevious} />
                <Button text="Next" handleClick={handleNext} />
            </div>
        </div>
    );
}


export default CardList;