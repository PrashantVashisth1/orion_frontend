import React from 'react';

// --- IMPORT YOUR LOCAL IMAGES HERE ---
// You will need to create these files in your src/assets folder
import professional1 from '../../../assets/prof-1.avif';
import professional2 from '../../../assets/prof2.avif';
import professional3 from '../../../assets/prof3.avif';
import professional4 from '../../../assets/prof4.avif';
import professional5 from '../../../assets/prof5.avif';
import professional6 from '../../../assets/prof6.webp';
import professional7 from '../../../assets/prof7.avif';
import professional8 from '../../../assets/prof8.avif';
import professional9 from '../../../assets/prof9.avif';
import professional10 from '../../../assets/prof10.avif';
import professional11 from '../../../assets/prof11.avif';
import professional12 from '../../../assets/prof12.avif';
// --- END IMAGE IMPORTS ---

// Define the type for an image
interface PersonImage {
  src: string; // This will now be the imported image module
  alt: string;
  gridClasses: string; // For specific placement in the 4x4 grid
}

// Define the type for a grid cell
interface GridCell {
    src?: string; 
    alt: string;
    isImage: boolean;
    gridClasses: string;
    indexInImagesArray?: number; // To help identify which image from peopleImages to use
}

const ConnectSection: React.FC = () => {
  // Array of 12 image data objects using imported local assets
  const peopleImages: PersonImage[] = [
    // ROW 1: Top Row (4 Images)
    { src: professional1, alt: 'Professional 1', gridClasses: 'col-start-1 row-start-1' },
    { src: professional2, alt: 'Professional 2', gridClasses: 'col-start-2 row-start-1' },
    { src: professional3, alt: 'Professional 3', gridClasses: 'col-start-3 row-start-1' },
    { src: professional4, alt: 'Professional 4', gridClasses: 'col-start-4 row-start-1' },
    
    // ROW 2: Middle Top Row (2 Images on sides)
    { src: professional5, alt: 'Professional 5', gridClasses: 'col-start-1 row-start-2' },
    { src: professional6, alt: 'Professional 8', gridClasses: 'col-start-4 row-start-2' }, // Renamed from Professional 8 to Professional 6 to match 12 images
    
    // ROW 3: Middle Bottom Row (2 Images on sides)
    { src: professional7, alt: 'Professional 9', gridClasses: 'col-start-1 row-start-3' }, // Renamed from Professional 9 to Professional 7
    { src: professional8, alt: 'Professional 12', gridClasses: 'col-start-4 row-start-3' }, // Renamed from Professional 12 to Professional 8

    // ROW 4: Bottom Row (4 Images)
    { src: professional9, alt: 'Professional 13', gridClasses: 'col-start-1 row-start-4' }, // Renamed from Professional 13 to Professional 9
    { src: professional10, alt: 'Professional 14', gridClasses: 'col-start-2 row-start-4' }, // Renamed from Professional 14 to Professional 10
    { src: professional11, alt: 'Professional 15', gridClasses: 'col-start-3 row-start-4' }, // Renamed from Professional 15 to Professional 11
    { src: professional12, alt: 'Professional 16', gridClasses: 'col-start-4 row-start-4' }, // Renamed from Professional 16 to Professional 12
  ];

  // Logic to correctly build the 16-cell grid array (12 images, 4 empty center cells)
  const allGridCells: GridCell[] = Array(16).fill(null).map((_, index) => {
    const col = (index % 4) + 1;
    const row = Math.floor(index / 4) + 1;
    const gridClasses = `col-start-${col} row-start-${row}`;
    
    const foundImage = peopleImages.find(p => p.gridClasses === gridClasses);
    
    if (foundImage) {
        return { ...foundImage, isImage: true }; 
    } else {
        // These are the 4 empty center cells
        return { alt: `Empty Cell ${index}`, isImage: false, gridClasses };
    }
  });

  return (
    <div className="relative w-full min-h-[600px] bg-white overflow-hidden flex flex-col items-center justify-center py-12 px-4">
      
      {/* Background Structure (Light Gray Base) */}
      <div className="absolute inset-0 z-0 bg-gray-100">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-100/50 to-transparent" />
      </div>

      {/* --- STRUCTURED 4x4 GRID LAYOUT (z-10) --- */}
      <div className="relative grid grid-cols-4 grid-rows-4 gap-4 max-w-7xl mx-auto p-4 md:p-8 lg:p-12 z-10 w-full h-full">
        {allGridCells.map((cell, index) => (
          <div 
            key={index}
            className={`w-full h-[180px] md:h-[220px] p-2 bg-white rounded-xl shadow-lg flex items-center justify-center 
                        ${cell.gridClasses} ${cell.isImage ? '' : 'bg-transparent shadow-none'}`}
          >
            {cell.isImage ? (
                <img 
                    src={cell.src} // Local image src
                    alt={cell.alt} 
                    className="w-full h-full object-cover rounded-lg" 
                />
            ) : (
                // Empty center cells
                <div className="w-full h-full bg-transparent"></div>
            )}
          </div>
        ))}
      </div>
      {/* --- END: STRUCTURED 4x4 GRID LAYOUT --- */}

      {/* --- CENTRAL TEXT BLOCK (z-50) with BLURRY BACKGROUND --- */}
      <div className="absolute z-50 text-center flex flex-col items-center justify-center 
                      top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-1/2 h-[400px] 
                      bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100/50"> {/* Added blur background */}
        
        {/* Headline */}
        <h1 className="text-5xl md:text-8xl font-extrabold text-gray-900 leading-none mb-3 tracking-tighter drop-shadow-sm">
          Connect with 
          <span className="text-gray-500 drop-shadow-md"> Tomorrow's Minds</span> {/* Changed to gray for contrast on white background */}
        </h1>
        
        {/* Description Text */}
        <p className="text-lg md:text-xl text-gray-700 font-medium mt-3 mb-8 max-w-lg mx-auto">
          Join a thriving ecosystem where investors, startups, mentors, and students collaborate to build the future
        </p>
        
      </div>
      {/* --- END: CENTRAL TEXT BLOCK --- */}

    </div>
  );
};

export default ConnectSection;