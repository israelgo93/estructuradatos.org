"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

interface HeapAnalysisData {
	nodeCount: number
	height: number
	minValue: number | null
	maxValue: number | null
}

function analyzeHeap(heapArray: number[]): HeapAnalysisData {
	if (heapArray.length === 0) {
		return {
			nodeCount: 0,
			height: 0,
			minValue: null,
			maxValue: null,
		}
	}

	const nodeCount = heapArray.length
	const height = Math.floor(Math.log2(nodeCount)) + 1
	const minValue = Math.min(...heapArray)
	const maxValue = Math.max(...heapArray)

	return {
		nodeCount,
		height,
		minValue,
		maxValue,
	}
}

export function HeapAnalysis({ heapArray }: { heapArray: number[] }) {
	const { t } = useTranslation()
	const analysis = analyzeHeap(heapArray)

	if (heapArray.length === 0) {
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
		<div className="grid gap-6 md:grid-cols-2">
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
