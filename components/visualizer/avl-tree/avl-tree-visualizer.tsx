"use client"

import dynamic from "next/dynamic"
import { AVLTreeControls } from "@/components/visualizer/avl-tree/avl-tree-controls"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAVLTree } from "@/hooks/use-avl-tree"
import { AVLTreeAnalysis } from "./avl-tree-analysis"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslation } from "react-i18next"
import { InteractiveExplanation } from "@/components/visualizer/shared/interactive-explanation"
import { AVL_TREE_EXPLANATION_DATA } from "@/components/visualizer/shared/explanation-data"

const AVLTreeDisplay = dynamic(
  () => import("@/components/visualizer/avl-tree/avl-tree-display").then(mod => ({ default: mod.AVLTreeDisplay })),
  { ssr: false, loading: () => <Skeleton className="h-[500px] w-full rounded-xl" /> }
)

interface AVLTreeVisualizerProps {
  content: React.ReactNode
}

export function AVLTreeVisualizer({ content }: AVLTreeVisualizerProps) {
  const { 
    tree, 
    highlightedNodes, 
    insert, 
    inorderTraversal, 
    preorderTraversal, 
    postorderTraversal, 
    clear,
    isAnimating,
    traversalHistory,
    rotationHistory,
  } = useAVLTree()

  const handleTraversal = async (type: "inorder" | "preorder" | "postorder") => {
    switch (type) {
      case "inorder":
        await inorderTraversal()
        break
      case "preorder":
        await preorderTraversal()
        break
      case "postorder":
        await postorderTraversal()
        break
    }
  }

  const { t } = useTranslation()

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('common.avlTree')}</h1>
        <p className="text-muted-foreground">
          {t('avlTree.description')}
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
              <AVLTreeControls 
                onInsert={insert}
                onClear={clear}
                onTraversal={handleTraversal}
                isAnimating={isAnimating}
                traversalHistory={traversalHistory}
                rotationHistory={rotationHistory}
              />
            </div>
            <div className="xl:col-span-2">
              <AVLTreeDisplay 
                tree={tree}
                highlightedNodes={highlightedNodes}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          <AVLTreeAnalysis tree={tree} />
        </TabsContent>
        
        <TabsContent value="explanation">
          <InteractiveExplanation data={AVL_TREE_EXPLANATION_DATA} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 