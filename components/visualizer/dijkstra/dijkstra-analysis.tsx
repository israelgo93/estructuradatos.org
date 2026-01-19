"use client"

import { Graph } from "@/hooks/use-dijkstra"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "react-i18next"

interface DijkstraAnalysisProps {
  graph: Graph
  distances: Map<string, number>
  path: string[]
  visitedNodes: Set<string>
}

export function DijkstraAnalysis({
  graph,
  distances,
  path,
  visitedNodes,
}: DijkstraAnalysisProps) {
  const { t } = useTranslation()
  const shortestDistance = path.length > 0 ? distances.get(path[path.length - 1]) : null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('analysis.graphStructure')}</CardTitle>
          <CardDescription>{t('analysis.basicGraphMetrics')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>{t('analysis.nodes')}:</span>
            <span className="font-mono">{graph.nodes.length}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('analysis.edges')}:</span>
            <span className="font-mono">{graph.edges.length}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('analysis.averageDegree')}:</span>
            <span className="font-mono">
              {graph.nodes.length > 0 
                ? (2 * graph.edges.length / graph.nodes.length).toFixed(2)
                : '0.00'
              }
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('analysis.algorithmProgress')}</CardTitle>
          <CardDescription>{t('analysis.currentSearchStatus')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>{t('analysis.visitedNodes')}:</span>
            <span className="font-mono">{visitedNodes.size}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('analysis.remainingNodes')}:</span>
            <span className="font-mono">
              {graph.nodes.length - visitedNodes.size}
            </span>
          </div>
          <div className="flex justify-between">
            <span>{t('analysis.progress')}:</span>
            <span className="font-mono">
              {graph.nodes.length > 0
                ? `${((visitedNodes.size / graph.nodes.length) * 100).toFixed(1)}%`
                : '0%'
              }
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('analysis.pathAnalysis')}</CardTitle>
          <CardDescription>{t('analysis.shortestPathDetails')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>{t('analysis.pathLength')}:</span>
            <span className="font-mono">{path.length - 1} {t('analysis.edgesCount')}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('analysis.totalDistance')}:</span>
            <span className="font-mono">
              {shortestDistance === null || shortestDistance === Infinity 
                ? '∞' 
                : shortestDistance
              }
            </span>
          </div>
          <div className="flex justify-between">
            <span>{t('analysis.path')}:</span>
            <span className="font-mono">
              {path.length > 0 ? path.join(' → ') : t('analysis.none')}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 