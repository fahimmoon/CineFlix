import { motion } from 'framer-motion';

const FilterBar = ({
  activeTab,
  setActiveTab,
  activeFilter,
  setActiveFilter,
  activeSortOption,
  setActiveSortOption
}) => {
  const tabs = ['movies', 'tvShows', 'series'];
  const filters = ['all', 'action', 'comedy', 'drama', 'sci-fi', 'horror'];
  const sortOptions = ['trending', 'newest', 'rating'];

  return (
    <div className="sticky top-20 z-10 bg-gradient-to-b from-black to-transparent py-4 -mx-4 px-4 mb-8">
      <div className="flex flex-col gap-6">
        {/* Tabs */}
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              className={`relative text-lg font-semibold whitespace-nowrap capitalize ${
                activeTab === tab ? 'text-white' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
            >
              {tab.replace('tv', 'TV ')}
              {activeTab === tab && (
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary"
                  layoutId="activeTab"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                activeFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
          <select
            className="bg-gray-800 rounded-lg px-4 py-2 text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            value={activeSortOption}
            onChange={(e) => setActiveSortOption(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option} value={option} className="capitalize">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
