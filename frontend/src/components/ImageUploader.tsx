import { Button, Card, CardBody, Progress } from '@heroui/react'
import { ImagePlus, Sparkles, Trash2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { useAppStore } from '@/store/useAppStore'

export const ImageUploader = () => {
  const { setImage, analyzeImage, isAnalyzing } = useAppStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      setPreview(base64)
      setImage(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      processFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleAnalyze = () => {
    if (preview) {
      analyzeImage(preview)
    }
  }

  const handleClear = () => {
    setPreview(null)
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <Card
        className={`border-none shadow-xl bg-content1/80 backdrop-blur-md transition-all duration-300 ${
          isDragging ? 'ring-2 ring-primary scale-[1.02]' : ''
        }`}
      >
        <CardBody className="p-7">
          {!preview ? (
            <div
              role="presentation"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`flex flex-col items-center gap-6 py-10 px-6 rounded-2xl border-2 border-dashed transition-all duration-300 ${
                isDragging
                  ? 'border-primary bg-primary/10'
                  : 'border-default-200 hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <div className="relative">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <ImagePlus size={44} className="text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 bg-warning text-warning-foreground p-1 rounded-full animate-pulse">
                  <Sparkles size={12} />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3">
                  What's in your fridge?
                </h3>
                <p className="text-default-400 text-sm">
                  Drag & drop an image or use the buttons below
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="relative group rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={preview}
                  alt="Fridge content"
                  className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Button
                  isIconOnly
                  color="danger"
                  variant="solid"
                  size="sm"
                  onPress={handleClear}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              {isAnalyzing && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-default-500">
                    <Sparkles
                      size={14}
                      className="text-warning animate-pulse"
                    />
                    <span>AI is analyzing your ingredients...</span>
                  </div>
                  <Progress
                    size="sm"
                    isIndeterminate
                    color="primary"
                    className="max-w-full"
                  />
                </div>
              )}
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />

          <div className="flex gap-4 mt-6">
            {!preview ? (
              <>
                <Button
                  color="primary"
                  variant="shadow"
                  className="flex-1 font-semibold h-14 btn-premium text-base"
                  startContent={<Upload size={18} />}
                  onPress={handleUploadClick}
                >
                  Upload
                </Button>
              </>
            ) : isAnalyzing ? (
              <div className="w-full space-y-3">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-600/20 pt-2 px-2 border border-green-500/30">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent animate-[shimmer_2s_infinite]"
                    style={{
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite linear',
                    }}
                  />
                  <div className="relative flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full border-2 border-green-500 border-t-transparent animate-spin" />
                      <Sparkles className="absolute inset-0 m-auto w-5 h-5 text-green-400 animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <p className="text-green-400 font-semibold text-sm animate-pulse">
                        🔍 Scanning your fridge...
                      </p>
                      <p className="text-green-300/70 text-xs mt-1">
                        AI is identifying ingredients
                      </p>
                    </div>
                  </div>
                  <Progress
                    size="sm"
                    isIndeterminate
                    aria-label="Analyzing..."
                    className="mt-3"
                    classNames={{
                      indicator:
                        'bg-gradient-to-r from-green-400 to-emerald-500',
                      track: 'bg-green-900/30',
                    }}
                  />
                </div>
              </div>
            ) : (
              <Button
                color="success"
                variant="shadow"
                className="w-full font-bold text-lg h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 btn-premium"
                isLoading={isAnalyzing}
                onPress={handleAnalyze}
                startContent={!isAnalyzing && <Sparkles size={20} />}
              >
                Find Recipes
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  )
}
