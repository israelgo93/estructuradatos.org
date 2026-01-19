"use client"

import { AVLTreeNode } from "./types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

interface TreeAnalysis {
  nodeCount: number
  height: number
  leafCount: number
  isBalanced: boolean
  minValue: number | null
  maxValue: number | null
  internalNodes: number
  balanceFactors: { [key: string]: number }
  perfectlyBalanced: boolean
}

function analyzeAVLTree(tree: AVLTreeNode | null): TreeAnalysis {
  const analysis: TreeAnalysis = {
    nodeCount: 0,
    height: 0,
    leafCount: 0,
    isBalanced: true,
    minValue: null,
    maxValue: null,
    internalNodes: 0,
    balanceFactors: {},
    perfectlyBalanced: true,
  }

  if (!tree) return analysis

  // Helper function to get height
  function getHeight(node: AVLTreeNode | null): number {
    if (!node) return 0
    return node.height
  }

  // Helper function to get balance factor
  function getBalanceFactor(node: AVLTreeNode): number {
    return getHeight(node.left) - getHeight(node.right)
  }

  // Traverse tree to collect data
  function traverse(node: AVLTreeNode): number {
    analysis.nodeCount++

    if (!node.left && !node.right) {
      analysis.leafCount++
    } else {
      analysis.internalNodes++
    }

    if (analysis.minValue === null || node.value < analysis.minValue) {
      analysis.minValue = node.value
    }
    if (analysis.maxValue === null || node.value > analysis.maxValue) {
      analysis.maxValue = node.value
    }

    // Calculate and store balance factor
    const balanceFactor = getBalanceFactor(node)
    analysis.balanceFactors[node.value] = balanceFactor

    // Check if tree violates AVL property
    if (Math.abs(balanceFactor) > 1) {
      analysis.isBalanced = false
    }

    // Check if tree is perfectly balanced
    if (Math.abs(balanceFactor) !== 0) {
      analysis.perfectlyBalanced = false
    }

    const leftHeight = node.left ? traverse(node.left) : 0
    const rightHeight = node.right ? traverse(node.right) : 0

    return Math.max(leftHeight, rightHeight) + 1
  }

  analysis.height = traverse(tree)

  return analysis
}

export function AVLTreeAnalysis({ tree }: { tree: AVLTreeNode | null }) {
  const { t } = useTranslation()
  const analysis = analyzeAVLTree(tree)

  if (!tree) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {t('analysis.noData')}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>{t('analysis.basicProperties')}</CardTitle>
          <CardDescription>{t('analysis.coreCharacteristics')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>{t('analysis.totalNodes')}:</span>
            <span className="font-mono">{analysis.nodeCount}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('analysis.height')}:</span>
            <span className="font-mono">{analysis.height}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('analysis.leafNodes')}:</span>
            <span className="font-mono">{analysis.leafCount}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('analysis.internalNodes')}:</span>
            <span className="font-mono">{analysis.internalNodes}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('analysis.balanceAnalysis')}</CardTitle>
          <CardDescription>{t('analysis.avlBalance')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>{t('analysis.isAvlBalanced')}:</span>
            <span className={analysis.isBalanced ? "text-green-500" : "text-red-500"}>
              {analysis.isBalanced ? t('analysis.yes') : t('analysis.no')}
            </span>
          </div>
          <div className="flex justify-between">
            <span>{t('analysis.perfectlyBalanced')}:</span>
            <span className={analysis.perfectlyBalanced ? "text-green-500" : "text-yellow-500"}>
              {analysis.perfectlyBalanced ? t('analysis.yes') : t('analysis.no')}
            </span>
          </div>
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">{t('analysis.balanceFactors')}:</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(analysis.balanceFactors).map(([node, factor]) => (
                <div key={node} className="flex justify-between gap-2 px-2 py-1 rounded-md bg-muted">
                  <span>Node {node}:</span>
                  <span className={Math.abs(factor) <= 1 ? "text-green-500" : "text-red-500"}>
                    {factor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('analysis.valueRange')}</CardTitle>
          <CardDescription>{t('analysis.coreCharacteristics')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>{t('analysis.minValue')}:</span>
            <span className="font-mono">{analysis.minValue}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('analysis.maxValue')}:</span>
            <span className="font-mono">{analysis.maxValue}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 