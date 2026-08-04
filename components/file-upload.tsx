"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, File, X, CheckCircle } from "lucide-react"

interface FileUploadProps {
  onFilesUploaded?: (files: File[]) => void
  acceptedTypes?: string[]
  maxFileSize?: number // em MB
  maxFiles?: number
}

export function FileUpload({
  onFilesUploaded,
  acceptedTypes = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"],
  maxFileSize = 10,
  maxFiles = 5,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      // Verificar tipo de arquivo
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
      if (!acceptedTypes.includes(fileExtension)) {
        alert(`Tipo de arquivo não aceito: ${file.name}`)
        return false
      }

      // Verificar tamanho
      if (file.size > maxFileSize * 1024 * 1024) {
        alert(`Arquivo muito grande: ${file.name} (máx. ${maxFileSize}MB)`)
        return false
      }

      return true
    })

    const totalFiles = files.length + validFiles.length
    if (totalFiles > maxFiles) {
      alert(`Máximo de ${maxFiles} arquivos permitidos`)
      return
    }

    setFiles((prev) => [...prev, ...validFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const simulateUpload = async () => {
    setUploading(true)
    setUploadProgress(0)

    // Simular upload com progresso
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setUploadProgress(i)
    }

    setUploading(false)
    onFilesUploaded?.(files)

    // Limpar arquivos após upload
    setTimeout(() => {
      setFiles([])
      setUploadProgress(0)
    }, 1000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="h-5 w-5 mr-2" />
          Upload de Arquivos
        </CardTitle>
        <CardDescription>
          Envie documentos, comprovantes e certificados (máx. {maxFiles} arquivos, {maxFileSize}MB cada)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Área de Drop */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
          <input
            type="file"
            multiple
            accept={acceptedTypes.join(",")}
            onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
            className="hidden"
            id="file-input"
          />
          <Button variant="outline" onClick={() => document.getElementById("file-input")?.click()} disabled={uploading}>
            Selecionar Arquivos
          </Button>
        </div>

        {/* Tipos aceitos */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-600">Tipos aceitos:</span>
          {acceptedTypes.map((type) => (
            <Badge key={type} variant="secondary" className="text-xs">
              {type.toUpperCase()}
            </Badge>
          ))}
        </div>

        {/* Lista de arquivos */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Arquivos selecionados:</h4>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 text-slate-500" />
                  <div>
                    <div className="font-medium text-sm">{file.name}</div>
                    <div className="text-xs text-slate-500">{formatFileSize(file.size)}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeFile(index)} disabled={uploading}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Progress bar durante upload */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Enviando arquivos...</span>
              <span className="text-sm text-slate-500">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}

        {/* Botão de upload */}
        {files.length > 0 && !uploading && (
          <Button onClick={simulateUpload} className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Enviar {files.length} arquivo{files.length > 1 ? "s" : ""}
          </Button>
        )}

        {/* Feedback de sucesso */}
        {uploadProgress === 100 && !uploading && (
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            <span className="text-green-800 font-medium">Arquivos enviados com sucesso!</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
