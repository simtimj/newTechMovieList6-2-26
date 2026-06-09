
interface WatchTabsProps {
  setWatchFilter: (watchState: string) => void
}


export default function WatchTabs({setWatchFilter}: WatchTabsProps) {

  

  return (
    <div 
      className="mb-0"
    >
      <button
        className="border p-2 rounded-sm border-gray-400 text-gray-700"
        onClick={(e) => setWatchFilter("Watched")}
        >Watched
      </button>
      <button
        className="border p-2 rounded-sm border-gray-400 text-gray-700"
        onClick={() => setWatchFilter("To Watch")}
        >To Watch
      </button>
    </div>
  )
}

