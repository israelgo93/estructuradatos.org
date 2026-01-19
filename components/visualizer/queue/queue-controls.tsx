"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useTranslation } from "react-i18next"

interface QueueControlsProps {
  onEnqueue: (value: number) => void
  onDequeue: () => void
  onClear: () => void
  isAnimating: boolean
  isFull: boolean
  isEmpty: boolean
}

export function QueueControls({
  onEnqueue,
  onDequeue,
  onClear,
  isAnimating,
  isFull,
  isEmpty,
}: QueueControlsProps) {
  const { t } = useTranslation()
  const [value, setValue] = useState("")

  const handleEnqueue = () => {
    const num = Number(value)
    if (!isNaN(num)) {
      onEnqueue(num)
      setValue("")
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">{t('controls.queueControls')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t('controls.enterValue')}
            onKeyDown={(e) => e.key === 'Enter' && !isFull && handleEnqueue()}
            disabled={isAnimating || isFull}
            className="flex-1"
          />
          <Button 
            onClick={handleEnqueue}
            disabled={isAnimating || isFull}
          >
            {t('controls.enqueue')}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={onDequeue}
            disabled={isAnimating || isEmpty}
            variant="secondary"
          >
            {t('controls.dequeue')}
          </Button>
          <Button 
            onClick={onClear}
            disabled={isAnimating || isEmpty}
            variant="destructive"
          >
            {t('controls.clear')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 