"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useTranslation } from "react-i18next"

interface StackControlsProps {
  onPush: (value: number) => void
  onPop: () => void
  onClear: () => void
  isAnimating: boolean
  isFull: boolean
  isEmpty: boolean
}

export function StackControls({
  onPush,
  onPop,
  onClear,
  isAnimating,
  isFull,
  isEmpty,
}: StackControlsProps) {
  const { t } = useTranslation()
  const [value, setValue] = useState("")

  const handlePush = () => {
    const num = Number(value)
    if (!isNaN(num)) {
      onPush(num)
      setValue("")
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">{t('controls.stackControls')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t('controls.enterValue')}
            onKeyDown={(e) => e.key === 'Enter' && !isFull && handlePush()}
            disabled={isAnimating || isFull}
            className="flex-1"
          />
          <Button 
            onClick={handlePush}
            disabled={isAnimating || isFull}
          >
            {t('controls.push')}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={onPop}
            disabled={isAnimating || isEmpty}
            variant="secondary"
          >
            {t('controls.pop')}
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