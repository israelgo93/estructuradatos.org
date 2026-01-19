"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Binary, TreePine, Box, List, ArrowLeftRight, MessageSquare, ArrowRightLeft, Camera, X } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function HomePage() {
	const { t } = useTranslation()

	const sections = {
		dataStructures: [
			{
				name: t('common.linkedList'),
				description: t('linkedList.description'),
				href: "/visualizer/linked-list",
				icon: List,
			},
			{
				name: t('common.stack'),
				description: t('stack.description'),
				href: "/visualizer/stack",
				icon: ArrowLeftRight,
			},
			{
				name: t('common.queue'),
				description: t('queue.description'),
				href: "/visualizer/queue",
				icon: ArrowLeftRight,
			},
			{
				name: t('common.binaryTree'),
				description: t('binaryTree.description'),
				href: "/visualizer/binary-tree",
				icon: Binary,
			},
			{
				name: t('common.avlTree'),
				description: t('avlTree.description'),
				href: "/visualizer/avl-tree",
				icon: TreePine,
			},
			{
				name: t('common.heap'),
				description: t('heap.description'),
				href: "/visualizer/heap",
				icon: Box,
			},
		],
		applications: [
			{
				name: t('common.messageQueue'),
				description: t('landing.messageQueueDesc'),
				href: "/visualizer/queue-applications",
				icon: MessageSquare,
			},
			{
				name: t('common.polynomial'),
				description: t('landing.polynomialDesc'),
				href: "/visualizer/polynomial",
				icon: X,
			},
			{
				name: t('common.dijkstra'),
				description: t('dijkstra.description'),
				href: "/visualizer/dijkstra",
				icon: ArrowRightLeft,
			},
			{
				name: t('common.computerVision'),
				description: t('landing.computerVisionDesc'),
				href: "/visualizer/computer-vision",
				icon: Camera,
			},
		]
	}

	return (
		<div className="container py-8 max-w-7xl mx-auto">
			<div className="flex flex-col items-center text-center mb-12">
				<div className="flex items-center gap-3 mb-6">
					<BrainCircuit className="h-10 w-10" />
					<h1 className="text-3xl font-bold tracking-tight">{t('common.title')}</h1>
				</div>
				<p className="text-muted-foreground text-lg max-w-2xl">
					{t('landing.heroDescription')}
				</p>
			</div>

			<div className="space-y-12">
				{/* Data Structures Section */}
				<section>
					<h2 className="text-2xl font-semibold mb-6">{t('common.dataStructures')}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{sections.dataStructures.map((ds) => {
							const Icon = ds.icon
							return (
								<Link key={ds.href} href={ds.href}>
									<Card className="h-full hover:bg-muted/50 transition-colors">
										<CardHeader>
											<div className="flex items-center gap-2">
												<Icon className="h-6 w-6" />
												<CardTitle>{ds.name}</CardTitle>
											</div>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-base">{ds.description}</CardDescription>
										</CardContent>
									</Card>
								</Link>
							)
						})}
					</div>
				</section>

				{/* Applications Section */}
				<section>
					<h2 className="text-2xl font-semibold mb-6">{t('common.applications')}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{sections.applications.map((app) => {
							const Icon = app.icon
							return (
								<Link key={app.href} href={app.href}>
									<Card className="h-full hover:bg-muted/50 transition-colors">
										<CardHeader>
											<div className="flex items-center gap-2">
												<Icon className="h-6 w-6" />
												<CardTitle>{app.name}</CardTitle>
											</div>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-base">{app.description}</CardDescription>
										</CardContent>
									</Card>
								</Link>
							)
						})}
					</div>
				</section>
			</div>
		</div>
	)
}
