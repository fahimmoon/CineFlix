import { motion } from 'framer-motion';

const categories = [
  {
    id: 'action',
    name: 'Action',
    image: 'https://source.unsplash.com/300x200/?action',
    count: 245
  },
  // Add more categories...
];

const CategoryGrid = ({ selectedCategory, setSelectedCategory, activeQuickFilter }) => {
  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      layout
    >
      {categories.map((category) => (
        <motion.div
          key={category.id}
          layoutId={category.id}
          className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
          onClick={() => setSelectedCategory(category)}
          whileHover={{ scale: 1.05 }}
        >
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <h3 className="text-2xl font-bold">{category.name}</h3>
            <p className="text-gray-400">{category.count} titles</p>
          </div>
          <motion.div
            className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100"
            whileHover={{ scale: 1.2 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryGrid;
