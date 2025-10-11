import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

type LightboxImage = {
  id: number;
  url: string;
  alt?: string;
};

type LightboxModalProps = {
  images: LightboxImage[];
  trigger: React.ReactNode;
  initialIndex?: number;
};

const LightboxModal = ({
  images,
  trigger,
  initialIndex = 0,
}: LightboxModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "Escape") setIsOpen(false);
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {trigger}
      </DialogTrigger>

      <DialogContent
        className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-none"
        onKeyDown={handleKeyDown}
        aria-describedby="lightbox-description"
      >
        <DialogTitle className="sr-only">
          Image Gallery - {currentImage.alt || `Image ${currentIndex + 1}`}
        </DialogTitle>
        <div id="lightbox-description" className="sr-only">
          Image gallery viewer. Use arrow keys to navigate between images, escape to close, or click the zoom button to zoom in and out.
        </div>
        <div className="relative w-full h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-black/50">
            <div className="flex items-center gap-4">
              <span className="text-white text-sm">
                {currentIndex + 1} of {images.length}
              </span>

              {/* Zoom toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleZoom}
                className="text-white hover:bg-white/20"
              >
                {isZoomed ? (
                  <ZoomOut className="w-4 h-4" />
                ) : (
                  <ZoomIn className="w-4 h-4" />
                )}
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4 text-white" />
            </Button>
          </div>

          {/* Main Image */}
          <div className="flex-1 relative overflow-hidden flex items-center justify-center">
            <img
              src={currentImage.url}
              alt={currentImage.alt || `Image ${currentIndex + 1}`}
              className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
                isZoomed ? "scale-150 cursor-grab" : "cursor-zoom-in"
              }`}
              onClick={toggleZoom}
              draggable={false}
            />

            {/* Navigation arrows - only show if more than 1 image */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white rounded-full w-12 h-12"
                >
                  <ChevronLeft className="size-10 bg-gray-700 rounded-full" />
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white rounded-full w-12 h-12"
                >
                  <ChevronRight className="size-10 bg-gray-700 rounded-full" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnail Strip - only show if more than 1 image */}
          {images.length > 1 && (
            <div className="bg-black/50 p-4">
              <div className="flex gap-2 justify-center overflow-x-auto max-w-full">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all ${
                      index === currentIndex
                        ? "border-white shadow-lg"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LightboxModal;
