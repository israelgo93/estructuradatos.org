"use client"

import dynamic from "next/dynamic"
import { HeapControls } from "@/components/visualizer/heap/heap-controls"
import { HeapArray } from "@/components/visualizer/heap/heap-array"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useHeap } from "@/hooks/use-heap"
import { useTranslation } from "react-i18next"
import { Skeleton } from "@/components/ui/skeleton"
import { InteractiveExplanation } from "@/components/visualizer/shared/interactive-explanation"
import { HEAP_EXPLANATION_DATA } from "@/components/visualizer/shared/explanation-data"
import { HeapAnalysis } from "@/components/visualizer/heap/heap-analysis"

const HeapDisplay = dynamic(
  () => import("@/components/visualizer/heap/heap-display").then(mod => ({ default: mod.HeapDisplay })),
  { ssr: false, loading: () => <Skeleton className="h-[500px] w-full rounded-xl" /> }
)

interface HeapVisualizerProps {
  content: React.ReactNode
}

export function HeapVisualizer({ content }: HeapVisualizerProps) {
  const { t } = useTranslation()
  const { 
    heap,
    heapArray,
    heapType,
    highlightedNodes,
    insert,
    insertMany,
    toggleHeapType,
    clear,
  } = useHeap()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {heapType === 'max' ? `Max ${t('common.heap')}` : `Min ${t('common.heap')}`}
        </h1>
        <p className="text-muted-foreground">
          {t('heap.description')}
        </p>
      </div>

      <Tabs defaultValue="visualization" className="w-full space-y-6">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="visualization">{t('common.visualization')}</TabsTrigger>
					<TabsTrigger value="analysis">{t('common.analysis')}</TabsTrigger>
					<TabsTrigger value="explanation">{t('common.explanation')}</TabsTrigger>
				</TabsList>
        
        <TabsContent value="visualization" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1 space-y-6">
              <HeapControls 
                onInsert={insert}
                onInsertMany={insertMany}
                onClear={clear}
                onToggleType={toggleHeapType}
                heapType={heapType}
              />
              <HeapArray array={heapArray} />
            </div>
            <div className="xl:col-span-2">
              <HeapDisplay 
                heap={heap}
                highlightedNodes={highlightedNodes}
              />
            </div>
          </div>
        </TabsContent>

				<TabsContent value="analysis">
					<HeapAnalysis heapArray={heapArray} />
				</TabsContent>
        
        <TabsContent value="explanation">
          <InteractiveExplanation data={HEAP_EXPLANATION_DATA} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
