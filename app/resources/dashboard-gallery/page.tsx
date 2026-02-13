import client from "@/tina/__generated__/client";
import { Card, CardContent } from "@/components/ui/card";
import { ImageSkeleton } from "@/components/ui/image-skeleton";

interface GalleryImage {
  id: string;
  image: string;
}

export default async function DashboardGalleryPage() {
  // Fetch gallery images from TinaCMS
  const galleryResponse = await client.queries.galleryConnection();
  
  // Get all images
  const images = galleryResponse.data.galleryConnection.edges?.map((edge) => ({
    id: edge?.node?.id || "",
    image: edge?.node?.image || "",
  })) || [];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent mb-4">
            Dashboard Gallery
          </h1>
        </div>

        {/* Gallery Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((item, index) => (
              <Card 
                key={item.id || index} 
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <CardContent className="p-0">
                  <div className="relative h-64 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                    {item.image && (
                      <ImageSkeleton
                        src={item.image}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        objectFit="cover"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <svg
                className="w-10 h-10 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
              No Images Yet
            </h2>
            {/* <a
              href="/admin"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Go to Admin Panel
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a> */}
          </div>
        )}

        {/* Info Card */}
        {/* <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Manage Gallery Images
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                Visit the <a href="/admin" className="underline font-medium">TinaCMS admin panel</a> to add, edit, or remove gallery images. 
                You can upload up to 11 images and control their display order.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
