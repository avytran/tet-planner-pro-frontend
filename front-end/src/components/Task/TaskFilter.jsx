import { FILTER_OPTS } from "@/constants/taskConstant";

export const TaskFilter = ({
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

    return (
        <div className="w-full md:w-[220px] shrink-0 text-left rounded-xl p-4 shadow-md border border-gray-200 bg-surface">
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
            {/* <div className="mb-4">
                <h4 className="font-semibold text-primary-strong text-base mb-2 font-sans text-left">Category</h4>
                <div className="flex flex-col gap-1 max-h-[140px] overflow-y-auto">
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <FilterCheckbox 
                                key={cat.id} 
                                label={cat.name} 
                                // checked={filters.categories?.includes(cat)} 
                                // onChange={() => handleCheckboxChange('categories', cat)}
                            />
                        ))
                    ) : (
                        <span className="text-xs text-primary-strong/65 italic font-sans">No categories available</span>
                    )}
                </div>
            </div> */}
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