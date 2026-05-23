import { useRef } from 'react'
import { Camera, X } from 'lucide-react'

interface ImagePickerProps {
  value: string | null
  onChange: (url: string | null) => void
}

export function ImagePicker({ value, onChange }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      onChange(URL.createObjectURL(file))
    }
  }

  function remove() {
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {value ? (
        <div className="relative w-full h-36 rounded-lg overflow-hidden">
          <img src={value} alt="Item" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={remove}
            className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full h-24 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-lg flex flex-col items-center justify-center gap-1.5 text-stone-400 dark:text-stone-500 hover:border-stone-300 dark:hover:border-stone-600 hover:text-stone-500 dark:hover:text-stone-400 transition-colors cursor-pointer"
        >
          <Camera size={18} strokeWidth={1.5} />
          <span className="text-xs font-medium">Add a photo</span>
        </button>
      )}
    </>
  )
}
