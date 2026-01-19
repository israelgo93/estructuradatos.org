"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { usePolynomial, PolynomialNode, Term } from "@/hooks/use-polynomial"
import { LinkedListDisplay } from "../linked-list/linked-list-display"
import { ListNode, LinkedList } from "../linked-list/types"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "react-i18next"

// Update ListNode type to include term
interface ExtendedListNode extends ListNode {
  term?: Term
}

function adaptPolynomialToLinkedList(
  head: string | null,
  nodes: Map<string, PolynomialNode>
): LinkedList {
  const adaptedNodes = new Map<string, ExtendedListNode>()
  
  nodes.forEach((node, id) => {
    adaptedNodes.set(id, {
      id,
      value: id,
      next: node.next,
      prev: null,
      term: node.term
    })
  })

  return {
    head,
    tail: null,
    nodes: adaptedNodes,
    type: 'SLL'
  }
}

export function PolynomialMultiplication() {
	const { t } = useTranslation()
  const [poly1Input, setPoly1Input] = useState("")
  const [poly2Input, setPoly2Input] = useState("")
  const {
    poly1,
    poly2,
    result,
    steps,
    currentStep,
    highlightedNodes,
    createPolynomial,
    loadExample,
    parsePolynomial,
    multiply,
    setCurrentStep,
    setPoly1,
    setPoly2
  } = usePolynomial()

  const handleCustomInput = () => {
    try {
      const terms1 = parsePolynomial(poly1Input)
      const terms2 = parsePolynomial(poly2Input)
      setPoly1(createPolynomial(terms1))
      setPoly2(createPolynomial(terms2))
    } catch {
      console.error("Invalid input format")
    }
  }

  const formatPolynomialNode = (nodeId: string, nodes: Map<string, ExtendedListNode>) => {
    const node = nodes.get(nodeId)
    if (node?.term) {
      const { term } = node
      if (term.exponent === 0) return term.coefficient.toString()
      const coef = term.coefficient === 1 ? '' : term.coefficient === -1 ? '-' : term.coefficient.toString()
      const exp = term.exponent === 1 ? 'x' : `x<sup>${term.exponent}</sup>`
      return (
        <span dangerouslySetInnerHTML={{ 
          __html: `${coef}${exp}`
        }} />
      )
    }
    return nodeId.toString()
  }

  // Add animation variants
  const nodeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  }

  // Add step animation controls
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (isAutoPlaying && currentStep < steps.length - 1) {
      timeoutId = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 1500)
    } else if (currentStep >= steps.length - 1) {
      setIsAutoPlaying(false)
    }
    return () => clearTimeout(timeoutId)
  }, [isAutoPlaying, currentStep, steps.length, setCurrentStep])

  return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-[300px_1fr]">
			<div className="space-y-6">
				<Card className="p-4 border-none p-0">
					<h3 className="font-semibold mb-4">{t('polynomial.controlsTitle')}</h3>
					<div className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm">{t('polynomial.firstPolynomial')}</label>
							<Input
								value={poly1Input}
								onChange={(e) => setPoly1Input(e.target.value)}
								placeholder={t('polynomial.polynomialPlaceholder')}
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm">{t('polynomial.secondPolynomial')}</label>
							<Input
								value={poly2Input}
								onChange={(e) => setPoly2Input(e.target.value)}
								placeholder={t('polynomial.polynomialPlaceholder')}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Button onClick={handleCustomInput}>{t('polynomial.setPolynomials')}</Button>
							<Button variant="outline" onClick={loadExample}>{t('polynomial.useExample')}</Button>
						</div>
					</div>
				</Card>

				<Card className="p-4">
					<h3 className="font-semibold mb-4">{t('polynomial.operationHistory')}</h3>
					<div className="space-y-2">
						{steps.map((step, index) => (
							<div
								key={index}
								className={`text-sm p-2 rounded ${
									index === currentStep ? 'bg-muted' : ''
								}`}
							>
								{step.message}
							</div>
						))}
					</div>
				</Card>
			</div>

			<div className="space-y-6">
				<Card className="p-4">
					<h3 className="font-semibold mb-4">{t('polynomial.firstPolynomial')}</h3>
					<LinkedListDisplay
						list={adaptPolynomialToLinkedList(poly1.head, poly1.nodes)}
						highlightedNodes={highlightedNodes.poly1}
						message=""
						format={(nodeId) => formatPolynomialNode(nodeId, adaptPolynomialToLinkedList(poly1.head, poly1.nodes).nodes)}
					/>
				</Card>

				<Card className="p-4">
					<h3 className="font-semibold mb-4">{t('polynomial.secondPolynomial')}</h3>
					<LinkedListDisplay
						list={adaptPolynomialToLinkedList(poly2.head, poly2.nodes)}
						highlightedNodes={highlightedNodes.poly2}
						message=""
						format={(nodeId) => formatPolynomialNode(nodeId, adaptPolynomialToLinkedList(poly2.head, poly2.nodes).nodes)}
					/>
				</Card>

				{result.head && (
					<Card className="p-4">
						<h3 className="font-semibold mb-4">{t('polynomial.result')}</h3>
						<AnimatePresence mode="popLayout">
							<motion.div
								key={currentStep}
								initial="initial"
								animate="animate"
								exit="exit"
								variants={nodeVariants}
							>
								<LinkedListDisplay
									list={adaptPolynomialToLinkedList(result.head, result.nodes)}
									highlightedNodes={highlightedNodes.result}
									message=""
									format={(nodeId) => formatPolynomialNode(nodeId, adaptPolynomialToLinkedList(result.head, result.nodes).nodes)}
								/>
							</motion.div>
						</AnimatePresence>
					</Card>
				)}

				<div className="flex gap-2">
					<Button 
						onClick={multiply}
						disabled={!poly1.head || !poly2.head || steps.length > 0}
					>
						{t('polynomial.startMultiplication')}
					</Button>

					{steps.length > 0 && (
						<>
							<Button
								variant="outline"
								onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
								disabled={currentStep <= 0}
							>
								{t('polynomial.previousStep')}
							</Button>
							<Button
								onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
								disabled={currentStep >= steps.length - 1}
							>
								{t('polynomial.nextStep')}
							</Button>
						</>
					)}

					<Button
						variant="outline"
						onClick={() => setIsAutoPlaying(!isAutoPlaying)}
					>
						{isAutoPlaying ? t('polynomial.pause') : t('polynomial.autoPlay')}
					</Button>
				</div>
			</div>
		</div>
	)
} 