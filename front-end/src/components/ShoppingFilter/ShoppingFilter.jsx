import React from "react";

const FILTER_OPTS = {
    status: [
        { label: "Planning", value: "Planning" },
        { label: "Completed", value: "Completed" }
    ],
    
    timeline: [
        { label: "Before Tet", value: "Before Tet" },
        { label: "30 Tet", value: "30 Tet" },
        { label: "Mung 1-3", value: "Mung 1-3" }
    ]
};

export const ShoppingFilter = ({
    filters, 
    onFilterChange, 
    categories = []
}) => {
    
    const handleCheckboxChange = (group, value) => {
        const currentValues = filters[group] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(item => item !== value)
            : [...currentValues, value];
        
        onFilterChange({ ...filters, [group]: newValues });
    };
    
    const MAX_PRICE_LIMIT = 5000000; 
    
    const formatPrice = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    const handleSliderChange = (e, type) => {
        let value = parseInt(e.target.value) || 0;
        
        if (type === 'min') {
            if (value > filters.priceRange[1]) value = filters.priceRange[1];
            onFilterChange({ ...filters, priceRange: [value, filters.priceRange[1]] });
        } else {
            if (value < filters.priceRange[0]) value = filters.priceRange[0];
            onFilterChange({ ...filters, priceRange: [filters.priceRange[0], value] });
        }
    };
    
    const getPercent = (value) => Math.round(((value) / MAX_PRICE_LIMIT) * 100);
    
    return (
        <div className="w-full md:w-[175px] shrink-0 text-left">
            {/* HEADER */}
            <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-strong" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <h3 className="font-bold text-2xl text-primary-strong font-sans">Filter</h3>
            </div>
            
            {/* STATUS */}
            <div className="mb-4">
                <h4 className="font-semibold text-primary-strong text-base mb-2 font-sans text-left">Status</h4>
                <div className="flex flex-col gap-1">
                    {FILTER_OPTS.status.map((opt) => (
                        <FilterCheckbox 
                            key={opt.value} 
                            label={opt.label} 
                            checked={filters.status?.includes(opt.value)} 
                            onChange={() => handleCheckboxChange('status', opt.value)}
                        />
                    ))}
                </div>
            </div>
            
            {/* TIMELINE */}
            <div className="mb-4">
                <h4 className="font-semibold text-primary-strong text-base mb-2 font-sans text-left">Timeline</h4>
                <div className="flex flex-col gap-1">
                    {FILTER_OPTS.timeline.map((opt) => (
                        <FilterCheckbox 
                            key={opt.value} 
                            label={opt.label} 
                            checked={filters.timeline?.includes(opt.value)} 
                            onChange={() => handleCheckboxChange('timeline', opt.value)}
                        />
                    ))}
                </div>
            </div>
            
            {/* CATEGORY */}
            <div className="mb-4">
                <h4 className="font-semibold text-primary-strong text-base mb-2 font-sans text-left">Category</h4>
                <div className="flex flex-col gap-1 max-h-[140px] overflow-y-auto">
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <FilterCheckbox 
                                key={cat} 
                                label={cat} 
                                checked={filters.categories?.includes(cat)} 
                                onChange={() => handleCheckboxChange('categories', cat)}
                            />
                        ))
                    ) : (
                        <span className="text-xs text-primary-strong/65 italic font-sans">No categories available</span>
                    )}
                </div>
            </div>
            
            {/* PRICE RANGE */}
            <div>
                <div className="flex items-baseline gap-1 mb-3">
                    <h4 className="font-semibold text-primary-strong text-base font-sans text-left">Price Range</h4>
                </div>
                
                {/* Slider */}
                <div className="relative w-full h-5 mb-2">
                    {/* Track background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded-full -translate-y-1/2"></div>
                    
                    {/* Active track */}
                    <div 
                        className="absolute top-1/2 h-1 bg-primary rounded-full -translate-y-1/2"
                        style={{ 
                            left: `${getPercent(filters.priceRange[0])}%`, 
                            right: `${100 - getPercent(filters.priceRange[1])}%` 
                        }}
                    ></div>
                    
                    {/* Min slider */}
                    <input 
                        type="range" 
                        min={0} 
                        max={MAX_PRICE_LIMIT} 
                        step={1000}
                        value={filters.priceRange[0]}
                        onChange={(e) => handleSliderChange(e, 'min')}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-30"
                        style={{ 
                            clipPath: `inset(0 ${100 - getPercent((filters.priceRange[0] + filters.priceRange[1]) / 2)}% 0 0)` 
                        }}
                    />
                    
                    {/* Max slider */}
                    <input 
                        type="range" 
                        min={0} 
                        max={MAX_PRICE_LIMIT} 
                        step={1000}
                        value={filters.priceRange[1]}
                        onChange={(e) => handleSliderChange(e, 'max')}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-30"
                        style={{ 
                            clipPath: `inset(0 0 0 ${getPercent((filters.priceRange[0] + filters.priceRange[1]) / 2)}%)` 
                        }}
                    />
                    
                    {/* Min thumb */}
                    <div 
                        className="absolute w-4 h-4 bg-primary rounded-full shadow-md top-1/2 -translate-y-1/2 -ml-2 pointer-events-none z-40"
                        style={{ left: `${getPercent(filters.priceRange[0])}%` }}
                    ></div>
                    
                    {/* Max thumb */}
                    <div 
                        className="absolute w-4 h-4 bg-primary rounded-full shadow-md top-1/2 -translate-y-1/2 -ml-2 pointer-events-none z-40"
                        style={{ left: `${getPercent(filters.priceRange[1])}%` }}
                    ></div>
                </div>
                
                {/* Price inputs */}
                <div className="flex flex-col gap-1 mt-3 w-full">
                    <div className="flex items-center gap-1">
                        <input 
                            type="number" 
                            min={0}
                            max={filters.priceRange[1]}
                            step={1000}
                            value={filters.priceRange[0]}
                            onChange={(e) => handleSliderChange(e, 'min')}
                            className="w-[75px] min-w-0 px-1 py-1 border border-primary/30 rounded bg-surface text-primary-strong text-center outline-none focus:border-primary font-sans text-[10px]"
                        />
                        <span className="text-primary-strong text-xs shrink-0">-</span>
                        <input 
                            type="number" 
                            min={filters.priceRange[0]}
                            max={MAX_PRICE_LIMIT}
                            step={1000}
                            value={filters.priceRange[1]}
                            onChange={(e) => handleSliderChange(e, 'max')}
                            className="w-[75px] min-w-0 px-1 py-1 border border-primary/30 rounded bg-surface text-primary-strong text-center outline-none focus:border-primary font-sans text-[10px]"
                        />
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-primary-strong/65">
                        <span className="w-[75px] text-center">{formatPrice(filters.priceRange[0])} VND</span>
                        <span className="shrink-0">-</span>
                        <span className="w-[75px] text-center">{formatPrice(filters.priceRange[1])} VND</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FilterCheckbox = ({ label, checked, onChange }) => (
    <div className="flex items-center gap-2 py-0.5">
        <div className="relative flex items-center shrink-0">
            <input
                type="checkbox"
                id={`filter-${label}`}
                className="peer appearance-none w-4 h-4 border-2 border-primary bg-transparent checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                checked={checked}
                onChange={onChange}
            />
            <svg 
                className="absolute w-2.5 h-2.5 text-white hidden peer-checked:block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        <label 
            htmlFor={`filter-${label}`}
            className="text-primary-strong text-sm font-sans select-none cursor-pointer"
        >
            {label}
        </label>
    </div>
);