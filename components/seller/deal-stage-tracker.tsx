'use client'

import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react'

interface DealStage {
  name: string
  status: 'completed' | 'current' | 'pending' | 'blocked'
  date?: string
  feedback?: string
}

interface DealStageTrackerProps {
  stages: DealStage[]
}

export function DealStageTracker({ stages }: DealStageTrackerProps) {
  const getIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'current':
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
      case 'blocked':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Circle className="w-5 h-5 text-gray-300" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'current':
        return 'bg-blue-100 text-blue-800'
      case 'blocked':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="space-y-4">
      {stages.map((stage, index) => (
        <div key={index} className="relative">
          {/* Connector Line */}
          {index < stages.length - 1 && (
            <div className="absolute left-[10px] top-8 bottom-0 w-0.5 bg-gray-200" />
          )}

          {/* Stage Card */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 z-10 bg-white">{getIcon(stage.status)}</div>
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">{stage.name}</h4>
                <Badge className={`text-xs ${getStatusColor(stage.status)}`}>
                  {stage.status.replace('-', ' ')}
                </Badge>
              </div>
              {stage.date && <p className="text-xs text-muted-foreground mb-1">{stage.date}</p>}
              {stage.feedback && (
                <div className="mt-2 p-3 bg-gray-50 border border-gray-200 text-sm">
                  <p className="text-muted-foreground">{stage.feedback}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
