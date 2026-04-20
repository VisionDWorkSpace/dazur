"use client"

import * as React from "react"
import { X, ImageIcon, Camera } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { PhotoUpload } from "@/lib/types"

interface AssetPhotoUploadProps {
  photos: PhotoUpload[]
  onUpload: (files: File[]) => void
  onRemove: (id: string) => void
  maxPhotos?: number
  required?: boolean
}

export function AssetPhotoUpload({ photos, onUpload, onRemove, maxPhotos = 10, required }: AssetPhotoUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false)

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"))
      if (files.length > 0) {
        onUpload(files.slice(0, maxPhotos - photos.length))
      }
    },
    [onUpload, photos.length, maxPhotos],
  )

  const handleFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : []
      if (files.length > 0) {
        onUpload(files.slice(0, maxPhotos - photos.length))
      }
      e.target.value = ""
    },
    [onUpload, photos.length, maxPhotos],
  )

  const canAddMore = photos.length < maxPhotos

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Camera className="w-5 h-5 text-primary" />
        <div>
          <h4 className="text-sm font-semibold">
            {required ? "Fotografias do Ativo" : "Evidências Visuais"}
            {required && <span className="text-destructive ml-1">*</span>}
          </h4>
          <p className="text-xs text-muted-foreground">
            {required
              ? "Imagens reais para validação e apresentação a investidores"
              : "Capturas de ecrã, logotipos, ou outras evidências visuais"}{" "}
            ({photos.length}/{maxPhotos})
          </p>
        </div>
      </div>

      {canAddMore && (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("photo-upload-input")?.click()}
        >
          <input
            id="photo-upload-input"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            Arraste imagens ou <span className="text-primary font-medium">clique para selecionar</span>
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">JPEG, PNG • Máx. 10MB por imagem</p>
        </div>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {photos.map((photo, index) => (
            <div key={photo.id} className="relative group aspect-square rounded-lg overflow-hidden bg-secondary border">
              <img
                src={photo.fileUrl || "/placeholder.svg"}
                alt={`Foto ${index + 1}`}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="destructive" size="icon" onClick={() => onRemove(photo.id)} className="h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {index === 0 && (
                <div className="absolute top-1.5 left-1.5 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded font-medium">
                  Capa
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {photos.length === 0 && required && (
        <p className="text-xs text-amber-600">Adicione pelo menos uma fotografia do ativo</p>
      )}
    </div>
  )
}
