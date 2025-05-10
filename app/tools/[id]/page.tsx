import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getToolById, getCategoryBySlug, getTools } from '@/lib/supabase'; // Import getTools
import { SAMPLE_TOOL } from '@/lib/constants';
import { formatDate, getCategoryIcon } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { ArrowLeftIcon } from '@heroicons/react/solid'; // Correct import from heroicons

interface ToolPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const tools = await getTools();  // Fetch tools data here
  return tools.map((tool) => ({
    id: tool.id.toString(),  // Ensure id is converted to a string
  }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const tool = await getToolById(params.id);
  if (!tool) notFound();

  let category = null;
  if (tool.category_id) {
    try {
      category = await getCategoryBySlug(tool.category_id);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  }

  // Displaying Pricing plans inside ToolPage
  const getPricingDisplay = (pricing: any) => {
    return pricing.map((plan: any, index: number) => (
      <div key={index} className="p-4 border border-gray-300 rounded-lg mb-4">
        <h4 className="font-bold">{plan.plan}</h4>
        <p className="text-xl font-semibold">{plan.price}</p>
        <p className="text-sm">{plan.description}</p>
        <Button asChild className="w-full mt-4">
          <Link href={`/tools/${tool.id}`}>
            Choose Plan
          </Link>
        </Button>
      </div>
    ));
  };

  // Displaying Features in a separate box inside ToolPage
  const getFeaturesDisplay = (pricing: any) => {
    return pricing.map((plan: any, index: number) => (
      plan.features && plan.features.length > 0 && (
        <div key={index} className="border p-4 mb-4 rounded-lg">
          <h5 className="font-semibold">{plan.title}</h5> {/* Dynamically created title */}
          <ul>
            {plan.features.map((feature: string, featureIndex: number) => (
              <li key={featureIndex}>{feature}</li>
            ))}
          </ul>
        </div>
      )
    ));
  };

  const imageUrl = tool.image_url || SAMPLE_TOOL.image_url;
  let CategoryIcon: React.ComponentType<any> | null = null;

  if (category?.icon) {
    CategoryIcon = dynamic(() => dynamicIconImport(category.icon || getCategoryIcon(category?.name)), {
      ssr: false,
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link href="/tools">
            <ArrowLeftIcon className="h-4 w-4" /> {/* Correctly using ArrowLeftIcon */}
            Back to tools
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl overflow-hidden border aspect-video relative bg-accent/50">
            <Image src={imageUrl} alt={tool.name} fill className="object-cover" />
          </div>

          <div className="prose prose-sm max-w-none dark:prose-invert">
            <h2 className="text-2xl font-bold">Description</h2>
            <p>{tool.description}</p>

            {tool.pricing && Array.isArray(tool.pricing) && tool.pricing.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mt-8">Features</h2>
                {getFeaturesDisplay(tool.pricing)}
              </>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-xl p-6 bg-card">
            <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>

            {tool.rating && (
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={cn(
                      "mr-0.5",
                      i < Math.floor(tool.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
                <span className="ml-2 text-muted-foreground">{tool.rating}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {CategoryIcon && <CategoryIcon className="h-3 w-3" />}
                  {category.name}
                </Badge>
              )}
            </div>

            {tool.pricing && Array.isArray(tool.pricing) && tool.pricing.length > 0 && (
              <div className="space-y-4">
                {getPricingDisplay(tool.pricing)}
              </div>
            )}

            <div className="space-y-4">
              <Button asChild className="w-full">
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  Visit Website <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
