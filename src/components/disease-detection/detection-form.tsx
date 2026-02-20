'use client';

import { detectDiseaseAction } from '@/lib/actions/detect-disease';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, DragEvent } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { DetectionResult } from './detection-result';
import { cn } from '@/lib/utils';

const initialState = {
  success: false,
};

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={disabled || pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Analyze Leaf Image'
      )}
    </Button>
  );
}

const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export function DetectionForm() {
  const [state, formAction] = useFormState(detectDiseaseAction, initialState);
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);
  const [dataUri, setDataUri] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  if (state.error) {
    toast({
      variant: 'destructive',
      title: 'Analysis Failed',
      description: state.error,
    });
    state.error = undefined; // Clear error after showing toast
  }

  const processFile = async (file: File) => {
    if (file.size > 4 * 1024 * 1024) { // 4MB limit for Gemini
      toast({
        variant: 'destructive',
        title: 'File too large',
        description: 'Please upload an image smaller than 4MB.',
      });
      return;
    }
    setPreview(URL.createObjectURL(file));
    const uri = await fileToDataUri(file);
    setDataUri(uri);
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setDataUri('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardContent className="p-6">
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="photo">Leaf Image</Label>
              <div className="relative">
                {preview ? (
                  <div className="relative group">
                    <Image
                      src={preview}
                      alt="Leaf preview"
                      width={500}
                      height={300}
                      className="rounded-lg object-cover w-full aspect-[16/9]"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className={cn(
                      'flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted',
                      dragActive && 'border-primary bg-primary/10'
                    )}
                    onClick={() => fileInputRef.current?.click()}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP (MAX. 4MB)
                    </p>
                  </div>
                )}
                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/webp"
                />
                <input type="hidden" name="photoDataUri" value={dataUri} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="plantDescription">
                Optional: Plant Description
              </Label>
              <Textarea
                id="plantDescription"
                name="plantDescription"
                placeholder="e.g., 'Tomato plant, leaves are yellowing with brown spots.'"
                rows={3}
              />
            </div>

            <div className="flex flex-col gap-2">
              <SubmitButton disabled={!dataUri} />
              {preview && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemoveImage}
                  className="w-full"
                >
                  Upload Another Image
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <DetectionResult result={state.result} uploadedImage={preview} />
    </div>
  );
}
