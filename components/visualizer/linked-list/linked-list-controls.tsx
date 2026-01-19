"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useTranslation } from "react-i18next"

interface LinkedListControlsProps {
  onInsertFront: (value: number) => void
  onInsertBack: (value: number) => void
  onDeleteFront: () => void
  onDeleteBack: () => void
  onReverse: () => void
  isAnimating: boolean
  isEmpty: boolean
}

export function LinkedListControls({
  onInsertFront,
  onInsertBack,
  onDeleteFront,
  onDeleteBack,
  onReverse,
  isAnimating,
  isEmpty,
}: LinkedListControlsProps) {
  const { t } = useTranslation()
  const [value, setValue] = useState("")
  const [insertAtFront, setInsertAtFront] = useState(true)

  const handleInsert = () => {
    const num = Number(value)
    if (!isNaN(num)) {
      if (insertAtFront) {
        onInsertFront(num)
      } else {
        onInsertBack(num)
      }
      setValue("")
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">{t('controls.listControls')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Insert Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="insert-position">{t('controls.insertAtFront')}</Label>
            <Switch
              id="insert-position"
              checked={insertAtFront}
              onCheckedChange={setInsertAtFront}
              disabled={isAnimating}
            />
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('controls.enterValue')}
              onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
              disabled={isAnimating}
              className="flex-1"
            />
            <Button 
              onClick={handleInsert}
              disabled={isAnimating || !value.trim()}
            >
              {t('controls.insert')}
            </Button>
          </div>
        </div>

        {/* Delete Controls */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={onDeleteFront}
            disabled={isAnimating || isEmpty}
            variant="secondary"
          >
            {t('controls.deleteFront')}
          </Button>
          <Button 
            onClick={onDeleteBack}
            disabled={isAnimating || isEmpty}
            variant="secondary"
          >
            {t('controls.deleteBack')}
          </Button>
        </div>

        {/* Reverse Control */}
        <Button 
          onClick={onReverse}
          disabled={isAnimating || isEmpty}
          className="w-full"
          variant="outline"
        >
          {t('controls.reverseList')}
        </Button>
      </CardContent>
    </Card>
  )
} 