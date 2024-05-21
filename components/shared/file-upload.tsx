import React, { useState, forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CloudUpload, X } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    field?: { value: any; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void };
}

const FileUpload = forwardRef<HTMLInputElement, InputProps>(({ className, id, field, ...props }, ref) => {
    const [uploadedFile, setUploadedFile] = useState<string | ArrayBuffer | null>(field?.value || null);

    function handleFileChange(event: any) {
        if (!event.target.files) return;

        const file = event.target.files[0];
        if (!file) return;

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setUploadedFile(fileReader.result);
        };
        fileReader.readAsDataURL(file);

        if (field) {
            field.onChange(event);
        }
    }

    const removeImage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setUploadedFile(null);

        if (field) {
            const changeEvent = {
                target: {
                    value: "",
                },
            } as React.ChangeEvent<HTMLInputElement>;
            field.onChange(changeEvent);
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <label
                onChange={handleFileChange}

                htmlFor={id} className={cn(!uploadedFile && `flex flex-col items-center w-full lg:w-3/4 h-64 max-h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50`)}>
                {!uploadedFile && (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <CloudUpload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500 text-center">Max size 5MB</p>
                    </div>
                )}
                {uploadedFile && (
                    <div className="relative me-2">
                        <button
                            className="absolute right-[-5px] top-[-10px] bg-red-700 text-white rounded-full p-1 cursor-pointer"
                            type="button"
                            onClick={removeImage}
                        >
                            <X className="size-4" />
                        </button>
                        <Image
                            alt="Category image"
                            src={uploadedFile ? uploadedFile.toString() : ""}
                            className="object-contain overflow-hidden max-h-56 w-fit rounded-lg shadow-lg shadow-gray-400"
                            width={350}
                            height={250}
                        />
                    </div>
                )}
                <input
                    id={id}
                    type="file"
                    className={cn(className, "hidden")}
                    ref={ref}
                    {...props}
                />
            </label>
        </div>
    );
});

FileUpload.displayName = "FileUpload";

export { FileUpload };
