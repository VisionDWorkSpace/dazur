"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { X, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { FileUpload } from "@/lib/types"

interface PhotoUploadProps {
  label: string
  description?: string
  required?: boolean
  maxFiles?: number
  photos: FileUpload[]
  onUpload: (files: File[]) => void
  onRemove: (id: string) => void
}

export function PhotoUpload({
  label,
  description,
  required,
  maxFiles = 10,
  photos,
  onUpload,
  onRemove,
}: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"))
      onUpload(files)
    },
    [onUpload],
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : []
      onUpload(files)
      e.target.value = ""
    },
    [onUpload],
  )

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1">
        <label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      </div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`photo-upload-${label}`)?.click()}
      >
        <input
          id={`photo-upload-${label}`}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          Arraste fotografias para aqui ou <span className="text-primary font-medium">clique para selecionar</span>
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">Máximo {maxFiles} fotografias • JPEG, PNG</p>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-3">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={photo.fileUrl || "/placeholder.svg"}
                alt={photo.fileName}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="destructive" size="icon" onClick={() => onRemove(photo.id)} className="h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
