import { ArrowUturnLeftIcon, ArrowUturnRightIcon } from "@heroicons/react/24/outline";

export const UndoRedoButtons = ({ handleUndo, handleRedo, canUndo = true, canRedo = true }) => {
  return (
    <div className="flex gap-2">
      {/* Undo */}
      <button
        onClick={handleUndo}
        disabled={!canUndo}
        className={`relative p-2 rounded-full transition
          ${canUndo 
            ? "hover:bg-accent/20 active:scale-95 cursor-pointer" 
            : "opacity-40 cursor-not-allowed"
          }
        `}
      >
        <ArrowUturnLeftIcon className="h-5 w-5 text-gray-700" />
      </button>

      {/* Redo */}
      <button
        onClick={handleRedo}
        disabled={!canRedo}
        className={`relative p-2 rounded-full transition
          ${canRedo 
            ? "hover:bg-accent/20 active:scale-95 cursor-pointer" 
            : "opacity-40 cursor-not-allowed"
          }
        `}
      >
        <ArrowUturnRightIcon className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  );
};