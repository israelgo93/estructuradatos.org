"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMessageQueue } from "@/hooks/use-message-queue"
import { MessageQueueDisplay } from "@/components/visualizer/queue-applications/message-queue-display"
import { ProducerControls } from "@/components/visualizer/queue-applications/producer-controls"
import { ConsumerControls } from "@/components/visualizer/queue-applications/consumer-controls"
import { useTranslation } from "react-i18next"
import { InteractiveExplanation } from "@/components/visualizer/shared/interactive-explanation"
import { MESSAGE_QUEUE_EXPLANATION_DATA } from "@/components/visualizer/shared/explanation-data"

export function MessageQueueVisualizer({ content }: { content: React.ReactNode }) {
	const { t } = useTranslation()
  
	const { 
		queue,
		processed,
		producers,
		consumers,
		produceMessage,
		processNextMessage,
		clear,
	} = useMessageQueue()

  return (
		<div className="container mx-auto">
			<div className="mb-6">
				<h1 className="text-3xl font-bold tracking-tight">
					{t('messageQueue.title')}
				</h1>
				<p className="text-muted-foreground">
					{t('messageQueue.description')}
				</p>
			</div>

			<Tabs defaultValue="visualization" className="w-full space-y-6">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="visualization">
						{t('common.visualization')}
					</TabsTrigger>
					<TabsTrigger value="explanation">
						{t('common.explanation')}
					</TabsTrigger>
				</TabsList>
        
				<TabsContent value="visualization" className="space-y-6">
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
						<div className="xl:col-span-1 space-y-6">
							<ProducerControls 
								producers={producers}
								onProduce={produceMessage}
							/>
							<ConsumerControls 
								consumers={consumers}
								onProcess={processNextMessage}
								queueSize={queue.length}
							/>
						</div>
						<div className="xl:col-span-2">
							<MessageQueueDisplay 
								queue={queue}
								processed={processed}
								consumers={consumers}
							/>
						</div>
					</div>
				</TabsContent>
        
				<TabsContent value="explanation">
					<InteractiveExplanation data={MESSAGE_QUEUE_EXPLANATION_DATA} />
				</TabsContent>
			</Tabs>
		</div>
	)
} 